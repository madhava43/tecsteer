"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle, Upload } from "lucide-react";
import type { JobPost } from "@/lib/data/careers";
import { cn } from "@/lib/utils";

interface ApplyModalProps {
  job: JobPost;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const firstFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstFocusRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors["fullName"] = "Full name is required.";
    if (!formData.email.trim()) newErrors["email"] = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors["email"] = "Invalid email address.";
    if (!formData.coverLetter.trim() || formData.coverLetter.length < 10)
      newErrors["coverLetter"] = "Cover letter must be at least 10 characters.";
    if (formData.resume) {
      if (formData.resume.type !== "application/pdf")
        newErrors["resume"] = "Only PDF files are accepted.";
      else if (formData.resume.size > 5 * 1024 * 1024)
        newErrors["resume"] = "Resume must be under 5 MB.";
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, resume: file }));
    if (errors["resume"]) setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    setSubmitError("");
    const fd = new FormData();
    fd.append("jobTitle", job.title);
    fd.append("fullName", formData.fullName);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("linkedin", formData.linkedin);
    fd.append("coverLetter", formData.coverLetter);
    if (formData.resume) fd.append("resume", formData.resume);
    try {
      const res = await fetch("/api/apply", { method: "POST", body: fd });
      const data = await res.json() as { message?: string; error?: string };
      if (res.ok) {
        setSuccess(true);
      } else {
        setSubmitError(data.error ?? "Failed to submit. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = cn(
    "w-full bg-bg-base border border-white/10 rounded-xl px-4 py-3",
    "text-sm text-text-primary placeholder:text-text-muted",
    "focus:outline-none focus:border-accent-primary/60 focus:ring-1 focus:ring-accent-primary/20",
    "transition-colors duration-200"
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-base/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-modal-title"
    >
      <div
        className="relative bg-bg-surface border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2
                id="apply-modal-title"
                className="font-syne font-bold text-xl text-text-primary mb-1"
              >
                Apply for {job.title}
              </h2>
              <p className="text-xs text-text-muted font-mono">
                {job.department} · {job.location} · {job.type}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close application form"
              className="flex items-center justify-center w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated border border-white/8 transition-all"
              style={{ minWidth: "unset", minHeight: "unset" }}
            >
              <X size={16} />
            </button>
          </div>

          {success ? (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="font-syne font-bold text-xl text-text-primary">
                Application Submitted!
              </h3>
              <p className="text-text-secondary text-sm max-w-xs">
                Thank you for applying. We will review your application and be in touch soon.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-medium hover:bg-[#0052CC] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <Field
                label="Full Name"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors["fullName"]}
                required
                inputClass={inputClass}
                ref={firstFocusRef}
              />
              <Field
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors["email"]}
                required
                inputClass={inputClass}
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Phone"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors["phone"]}
                  inputClass={inputClass}
                />
                <Field
                  label="LinkedIn URL"
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/you"
                  error={errors["linkedin"]}
                  inputClass={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="coverLetter" className="text-sm font-medium text-text-secondary">
                  Cover Letter <span className="text-accent-primary">*</span>
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className={cn(inputClass, "resize-none")}
                  placeholder="Tell us why you are a great fit for this role..."
                />
                {errors["coverLetter"] && (
                  <p className="text-red-400 text-xs">{errors["coverLetter"]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="resume" className="text-sm font-medium text-text-secondary">
                  Resume / CV <span className="text-text-muted">(PDF, max 5 MB)</span>
                </label>
                <label
                  htmlFor="resume"
                  className={cn(
                    "flex items-center gap-3 cursor-pointer",
                    "border border-dashed border-white/15 rounded-xl px-4 py-4",
                    "hover:border-accent-primary/40 hover:bg-accent-glow transition-all duration-200"
                  )}
                >
                  <Upload size={16} className="text-text-muted flex-shrink-0" />
                  <span className="text-sm text-text-muted">
                    {formData.resume ? formData.resume.name : "Click to upload resume"}
                  </span>
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {errors["resume"] && (
                  <p className="text-red-400 text-xs">{errors["resume"]}</p>
                )}
              </div>

              {submitError && (
                <p className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full py-3 px-6 rounded-xl text-white text-sm font-medium",
                  "transition-all duration-300",
                  loading
                    ? "bg-text-muted cursor-not-allowed"
                    : "bg-accent-primary hover:bg-[#0052CC] shadow-glow-sm hover:shadow-glow-md shimmer-btn"
                )}
              >
                {loading ? "Submitting…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputClass: string;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, id, name, value, onChange, error, type = "text", placeholder, required, inputClass }, ref) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text-secondary">
        {label}
        {required && <span className="text-accent-primary ml-0.5">*</span>}
      </label>
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
);
Field.displayName = "Field";
