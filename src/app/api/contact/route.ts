import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Conditionally import Upstash only when env vars are present
let ratelimit: import("@upstash/ratelimit").Ratelimit | null = null;
async function getRatelimit() {
  if (
    !ratelimit &&
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
    });
  }
  return ratelimit;
}

/** Sanitize a string to prevent HTML injection and email header injection. */
function sanitize(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\n|\r/g, " ") // prevent email header injection
    .trim()
    .slice(0, 1000); // hard length cap
}

const ContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address").max(100),
  phoneNumber: z.string().max(20).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(req: Request) {
  // CSRF origin check
  const origin = req.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && origin && origin !== siteUrl) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Rate limiting (only active when Upstash env vars are configured)
  const limiter = await getRatelimit();
  if (limiter) {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  // Validate with Zod
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phoneNumber: formData.get("phoneNumber") ?? undefined,
    message: formData.get("message"),
  };

  const parsed = ContactSchema.safeParse(rawData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, phoneNumber, message } = parsed.data;

  // Sanitize all fields before use
  const safeFirst = sanitize(firstName);
  const safeLast = sanitize(lastName);
  const safeEmail = sanitize(email);
  const safePhone = sanitize(phoneNumber ?? "");
  const safeMessage = sanitize(message);

  // Server-side file validation
  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF, DOC, and DOCX files are accepted." },
        { status: 400 }
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum allowed size is 5 MB." },
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

  const safeFilename = file?.name.replace(/[^a-zA-Z0-9.\-_]/g, "_") ?? "";

  const mailOptions = {
    from: `"Tecsteer Contact Form" <${process.env.EMAIL_USER}>`,
    replyTo: `${safeFirst} ${safeLast} <${safeEmail}>`,
    to: process.env.CONTACT_RECIPIENT_EMAIL,
    subject: `New Contact Form Submission — ${safeFirst} ${safeLast}`,
    text: [
      `First Name: ${safeFirst}`,
      `Last Name: ${safeLast}`,
      `Phone: ${safePhone}`,
      `Email: ${safeEmail}`,
      `Message:\n${safeMessage}`,
    ].join("\n"),
    html: `
      <h2>New Contact Form Submission</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        <tr><td><strong>First Name</strong></td><td>${safeFirst}</td></tr>
        <tr><td><strong>Last Name</strong></td><td>${safeLast}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${safePhone}</td></tr>
        <tr><td><strong>Email</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      </table>
      <h3>Message</h3>
      <blockquote style="border-left:3px solid #ccc;padding-left:12px;color:#555;">
        ${safeMessage}
      </blockquote>
    `,
    attachments:
      file && file.size > 0
        ? [
            {
              filename: safeFilename,
              content: Buffer.from(await file.arrayBuffer()),
            },
          ]
        : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Contact form email error:", error);
    return NextResponse.json({ message: "Failed to send email. Please try again." }, { status: 500 });
  }
}
