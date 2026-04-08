"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/data/services";
import { useScrambleText } from "@/hooks/useScrambleText";

const navLinks = [
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/consulting", label: "Consulting" },
  { href: "/training", label: "Trainings" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

/** Logo wordmark — white, scrambles on hover */
function LogoWordmark() {
  const [trigger, setTrigger] = useState(false);
  const text = useScrambleText("Tecsteer", trigger, 28);

  return (
    <span
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontWeight: 700,
        fontSize: "18px",
        color: "#F0F4FF",
        letterSpacing: "-0.02em",
        cursor: "default",
      }}
      onMouseEnter={() => {
        setTrigger(false);
        setTimeout(() => setTrigger(true), 0);
      }}
    >
      {text}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled
          ? "rgba(8, 12, 20, 0.85)"
          : "rgba(8, 12, 20, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        transition: "background 200ms ease",
      }}
    >
      <nav
        className="flex items-center justify-between mx-auto px-6"
        style={{ height: "56px", maxWidth: "72rem" }}
        aria-label="Main Navigation"
      >
        {/* ── Logo — wordmark only ── */}
        <Link href="/" aria-label="Tecsteer home" className="flex-shrink-0">
          <LogoWordmark />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: isActive(link.href) ? "#F0F4FF" : "#8896B3",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F4FF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive(link.href) ? "#F0F4FF" : "#8896B3"; }}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={cn(
                      "transition-transform duration-150",
                      servicesOpen ? "rotate-180" : ""
                    )}
                    style={{ color: "#4A5568", marginLeft: "2px" }}
                  />
                </Link>

                {isActive(link.href) && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary" />
                )}

                <AnimatePresence>
                  {servicesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 pt-2 w-52"
                    >
                      <div className="bg-bg-surface border border-white/[0.08] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] p-1.5">
                        <Link
                          href="/services"
                          className="flex items-center px-3 py-2 rounded-lg mb-1 border-b border-white/[0.06] pb-2 transition-colors duration-100"
                          style={{ fontSize: "13px", color: "#4A5568" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F4FF"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "#4A5568"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                          onClick={() => setServicesOpen(false)}
                        >
                          All Services →
                        </Link>
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            className="flex items-center px-3 py-2 rounded-lg transition-colors duration-100"
                            style={{ fontSize: "13px", color: "#8896B3" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F4FF"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#8896B3"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                            onClick={() => setServicesOpen(false)}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className="transition-colors duration-150"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: isActive(link.href) ? "#F0F4FF" : "#8896B3",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#F0F4FF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive(link.href) ? "#F0F4FF" : "#8896B3"; }}
                >
                  {link.label}
                </Link>
                {isActive(link.href) && (
                  <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-primary" />
                )}
              </li>
            )
          )}
        </ul>

        {/* ── Desktop CTA ── */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center rounded-md transition-all duration-150"
          style={{
            height: "32px",
            padding: "0 16px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#6699FF",
            background: "rgba(0, 102, 255, 0.15)",
            border: "1px solid rgba(0, 102, 255, 0.3)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0, 102, 255, 0.25)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(0, 102, 255, 0.15)"; }}
        >
          Contact Us
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-150"
          style={{ color: "#8896B3" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F0F4FF"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8896B3"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <m.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} />
              </m.span>
            ) : (
              <m.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu size={18} />
              </m.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 top-14 z-40 backdrop-blur-xl"
            style={{
              background: "rgba(8, 12, 20, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            }}
            aria-hidden={!isOpen}
          >
            <div className="flex flex-col h-full overflow-y-auto pb-24 pt-3 px-4 gap-0.5">
              <m.div
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.02, duration: 0.3 }}
              >
                <Link
                  href="/"
                  className="flex items-center h-11 px-3 rounded-lg transition-colors duration-100"
                  style={{
                    fontSize: "14px",
                    color: isActive("/") ? "#F0F4FF" : "#8896B3",
                    background: isActive("/") ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                >
                  Home
                </Link>
              </m.div>

              {/* Services accordion */}
              <m.div
                initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.05, duration: 0.3 }}
              >
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full h-11 px-3 rounded-lg transition-colors duration-100"
                  style={{
                    fontSize: "14px",
                    color: isActive("/services") ? "#F0F4FF" : "#8896B3",
                    background: isActive("/services") ? "rgba(255,255,255,0.06)" : "transparent",
                  }}
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={cn("transition-transform duration-150", mobileServicesOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 mt-0.5 flex flex-col border-l border-white/[0.06] pl-3">
                        <Link
                          href="/services"
                          className="flex items-center h-9 font-mono transition-colors duration-100"
                          style={{ fontSize: "12px", color: "#4A5568" }}
                        >
                          All Services →
                        </Link>
                        {services.map((service) => (
                          <Link
                            key={service.id}
                            href={service.href}
                            className="flex items-center h-9 transition-colors duration-100"
                            style={{ fontSize: "13px", color: "#8896B3" }}
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>

              {navLinks.slice(1).map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.05 + (i + 2) * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center h-11 px-3 rounded-lg transition-colors duration-100"
                    style={{
                      fontSize: "14px",
                      color: isActive(link.href) ? "#F0F4FF" : "#8896B3",
                      background: isActive(link.href) ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}

              <m.div
                className="mt-auto pt-5"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center h-10 w-full rounded-md font-medium text-sm transition-all duration-150"
                  style={{
                    background: "rgba(0, 102, 255, 0.15)",
                    border: "1px solid rgba(0, 102, 255, 0.3)",
                    color: "#6699FF",
                  }}
                >
                  Contact Us
                </Link>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
