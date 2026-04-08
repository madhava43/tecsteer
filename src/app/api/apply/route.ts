import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

function sanitize(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\n|\r/g, " ")
    .trim()
    .slice(0, 2000);
}

const ApplySchema = z.object({
  jobTitle: z.string().min(1).max(100),
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Invalid email address").max(100),
  phone: z.string().max(20).optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").max(200).optional().or(z.literal("")),
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters").max(3000),
});

const ALLOWED_MIME_TYPES = ["application/pdf"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && origin && origin !== siteUrl) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const rawData = {
    jobTitle: formData.get("jobTitle"),
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? undefined,
    linkedin: formData.get("linkedin") ?? undefined,
    coverLetter: formData.get("coverLetter"),
  };

  const parsed = ApplySchema.safeParse(rawData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { jobTitle, fullName, email, phone, linkedin, coverLetter } = parsed.data;

  const safeJob = sanitize(jobTitle);
  const safeName = sanitize(fullName);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phone ?? "");
  const safeLinkedin = sanitize(linkedin ?? "");
  const safeCover = sanitize(coverLetter);

  const resume = formData.get("resume") as File | null;
  if (resume && resume.size > 0) {
    if (!ALLOWED_MIME_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: "Only PDF resumes are accepted." },
        { status: 400 }
      );
    }
    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Tecsteer Careers" <${process.env.EMAIL_USER}>`,
    replyTo: `${safeName} <${safeEmail}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL,
    subject: `Job Application — ${safeJob} — ${safeName}`,
    html: `
      <h2>Job Application Received</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>Position</strong></td><td>${safeJob}</td></tr>
        <tr><td><strong>Name</strong></td><td>${safeName}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
        <tr><td><strong>Phone</strong></td><td>${safePhone}</td></tr>
        <tr><td><strong>LinkedIn</strong></td><td>${safeLinkedin ? `<a href="${safeLinkedin}">${safeLinkedin}</a>` : "—"}</td></tr>
      </table>
      <h3>Cover Letter</h3>
      <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#555;">
        ${safeCover}
      </blockquote>
    `,
    attachments:
      resume && resume.size > 0
        ? [
            {
              filename: resume.name.replace(/[^a-zA-Z0-9.\-_]/g, "_"),
              content: Buffer.from(await resume.arrayBuffer()),
            },
          ]
        : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Application submitted successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Apply form email error:", error);
    return NextResponse.json(
      { message: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
