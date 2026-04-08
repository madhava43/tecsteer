"use client";

import { useState, useRef, useCallback } from "react";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import { GradientText } from "@/components/ui/GradientText";
import AnimateIn from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";

export default function Contact() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    file: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string | File | null) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (!value || !(value as string).trim()) error = "First Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(value as string)) error = "Letters only.";
        break;
      case "lastName":
        if (!value || !(value as string).trim()) error = "Last Name is required.";
        else if (!/^[A-Za-z\s]+$/.test(value as string)) error = "Letters only.";
        break;
      case "phoneNumber":
        if (!value || !(value as string).trim()) error = "Phone Number is required.";
        else if (!/^\d{10}$/.test(value as string)) error = "Must be 10 digits.";
        break;
      case "email":
        if (!value || !(value as string).trim()) error = "Email is required.";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value as string))
          error = "Invalid email address.";
        break;
      case "message":
        if (!value || !(value as string).trim()) error = "Message is required.";
        else if ((value as string).length < 10) error = "At least 10 characters.";
        break;
      case "file":
        if (value) {
          const file = value as File;
          const ext = file.name.split(".").pop()?.toLowerCase();
          if (file.size / (1024 * 1024) > 5) error = "Max 5 MB.";
          else if (!ext || !["pdf", "doc", "docx"].includes(ext)) error = "PDF, DOC, or DOCX only.";
        }
        break;
    }
    return error;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }, 300);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, file }));
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setErrors((prev) => ({ ...prev, file: validateField("file", file) }));
    }, 300);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const fd = new FormData();
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("phoneNumber", formData.phoneNumber);
      fd.append("email", formData.email);
      fd.append("message", formData.message);
      if (formData.file) fd.append("file", formData.file);
      const response = await fetch("/api/contact", { method: "POST", body: fd });
      const result = await response.json() as { message?: string; error?: string };
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ firstName: "", lastName: "", phoneNumber: "", email: "", message: "", file: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        throw new Error(result.error ?? "Failed to send your message.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = cn(
    "w-full bg-bg-base border border-white/[0.08] rounded-lg px-4 py-3",
    "text-sm text-text-primary placeholder:text-text-muted",
    "focus:outline-none focus:border-accent-primary/50 focus:ring-1 focus:ring-accent-primary/20",
    "transition-colors duration-150"
  );

  return (
    <PageWrapper>
      {/* ── Hero ── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="container-base relative z-10 flex flex-col items-start gap-5">
          <AnimateIn direction="fade" delay={0}>
            <span className="eyebrow">GET IN TOUCH</span>
          </AnimateIn>
          <AnimateIn direction="up" delay={100}>
            <h1
              className="font-syne font-extrabold text-text-primary tracking-tight max-w-2xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              Let&apos;s Start a{" "}
              <GradientText>Conversation</GradientText>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={200}>
            <p className="text-text-secondary text-lg max-w-[44ch]">
              Ready to transform your business? Our team responds within one business day.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Contact content ── */}
      <section className="section-padding pt-0">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12">
            {/* Left: info + map */}
            <AnimateIn direction="left" delay={0} className="flex flex-col gap-6">
              {/* Contact details card */}
              <div className="flex flex-col gap-6 p-7 rounded-xl bg-bg-surface border border-white/[0.06] shadow-card">
                <h2 className="font-syne font-bold text-xl text-text-primary tracking-tight">Contact Details</h2>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted font-mono mb-1 uppercase tracking-wider">Office</p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        30 Knightsbridge Rd #525<br />
                        Piscataway, NJ 08854
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted font-mono mb-1 uppercase tracking-wider">Phone</p>
                      <a href="tel:+18482565361" className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-150">
                        +1 848 256 5361
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                      <Mail size={14} className="text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] text-text-muted font-mono mb-1 uppercase tracking-wider">Email</p>
                      <a href="mailto:hr@tecsteer.com" className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-150">
                        hr@tecsteer.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3031.821267210917!2d-74.48397632525702!3d40.54553774779169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c75f31be576f%3A0x3c845ad7353a899a!2s30%20Knightsbridge%20Rd%20%23525%2C%20Piscataway%2C%20NJ%2008854%2C%20USA!5e0!3m2!1sen!2sin!4v1738045840501!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Tecsteer office location"
                />
              </div>
            </AnimateIn>

            {/* Right: form */}
            <AnimateIn direction="right" delay={80} className="flex flex-col gap-6 p-8 md:p-10 rounded-xl bg-bg-surface border border-white/[0.06] shadow-card">
              <div className="flex flex-col gap-1.5">
                <h2 className="font-syne font-bold text-xl text-text-primary tracking-tight">Send a Message</h2>
                <p className="text-text-secondary text-sm">We typically respond within one business day.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                      First Name <span className="text-accent-primary">*</span>
                    </label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={inputClass} />
                    {errors["firstName"] && <p className="text-red-400 text-xs">{errors["firstName"]}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                      Last Name <span className="text-accent-primary">*</span>
                    </label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={inputClass} />
                    {errors["lastName"] && <p className="text-red-400 text-xs">{errors["lastName"]}</p>}
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phoneNumber" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                      Phone <span className="text-accent-primary">*</span>
                    </label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="10-digit number" className={inputClass} />
                    {errors["phoneNumber"] && <p className="text-red-400 text-xs">{errors["phoneNumber"]}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                      Email <span className="text-accent-primary">*</span>
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" className={inputClass} />
                    {errors["email"] && <p className="text-red-400 text-xs">{errors["email"]}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                    Message <span className="text-accent-primary">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your project or question..." className={cn(inputClass, "resize-none")} />
                  {errors["message"] && <p className="text-red-400 text-xs">{errors["message"]}</p>}
                </div>

                {/* File */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="file" className="text-[11px] font-medium text-text-muted uppercase tracking-wider font-mono">
                    Attach Resume{" "}
                    <span className="text-text-muted normal-case tracking-normal">(optional, PDF/DOC/DOCX, max 5 MB)</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="text-sm text-text-muted file:mr-3 file:px-4 file:py-2 file:rounded-md file:border file:border-white/[0.08] file:bg-bg-elevated file:text-text-secondary file:text-xs file:cursor-pointer hover:file:border-white/[0.16] hover:file:text-text-primary transition-colors"
                  />
                  {errors["file"] && <p className="text-red-400 text-xs">{errors["file"]}</p>}
                </div>

                {successMessage && (
                  <div className="flex items-center gap-2.5 p-4 rounded-lg bg-green-500/[0.08] border border-green-500/20 text-green-400 text-sm">
                    <CheckCircle size={15} />
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <p className="p-4 rounded-lg bg-red-500/[0.08] border border-red-500/20 text-red-400 text-sm">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 w-full h-10 px-6 rounded-md text-white text-sm font-medium transition-all duration-150 mt-1",
                    loading
                      ? "bg-text-muted cursor-not-allowed"
                      : "bg-accent-primary hover:brightness-110 active:scale-[0.98] shadow-glow-sm"
                  )}
                >
                  {loading ? "Sending…" : (
                    <>Send Message<ArrowRight size={14} /></>
                  )}
                </button>
              </form>
            </AnimateIn>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
