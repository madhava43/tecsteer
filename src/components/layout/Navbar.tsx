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

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Navbar bar ── */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(8, 12, 20, 0.90)" : "rgba(8, 12, 20, 0.70)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          transition: "background 200ms ease",
        }}
      >
        <nav
          className="flex items-center justify-between mx-auto px-4 sm:px-6"
          style={{ height: "56px", maxWidth: "72rem" }}
          aria-label="Main Navigation"
        >
          {/* ── Logo ── */}
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
                      className={cn("transition-transform duration-150", servicesOpen ? "rotate-180" : "")}
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
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg"
            style={{ color: "#8896B3" }}
            aria-label="Open menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer — full screen, rendered outside header ── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              background: "#080C14",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Drawer header — logo + close */}
            <div
              className="flex items-center justify-between px-6 flex-shrink-0"
              style={{ height: "56px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link href="/" onClick={() => setIsOpen(false)} aria-label="Tecsteer home">
                <span
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "#F0F4FF",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Tecsteer
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ color: "#8896B3" }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 pt-2 flex-1" aria-label="Mobile Navigation">
              {/* Home */}
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.22 }}
              >
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full py-4"
                  style={{
                    fontSize: "16px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 400,
                    color: "#F0F4FF",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  Home
                </Link>
              </m.div>

              {/* Services with sub-links */}
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07, duration: 0.22 }}
              >
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-4"
                  style={{
                    fontSize: "16px",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontWeight: 400,
                    color: "#F0F4FF",
                    borderBottom: mobileServicesOpen ? "none" : "1px solid rgba(255,255,255,0.06)",
                    background: "none",
                  }}
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                  <ChevronDown
                    size={16}
                    style={{
                      color: "#4A5568",
                      transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 150ms ease",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18 }}
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <Link
                        href="/services"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center py-3 pl-4"
                        style={{ fontSize: "13px", color: "#4A5568", fontFamily: "var(--font-jetbrains), monospace" }}
                      >
                        All Services →
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={service.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center py-2.5 pl-4"
                          style={{ fontSize: "14px", color: "#8896B3", fontFamily: "var(--font-dm-sans), sans-serif" }}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>

              {/* Remaining links */}
              {navLinks.slice(1).map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 + (i + 1) * 0.04, duration: 0.22 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center w-full py-4"
                    style={{
                      fontSize: "16px",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontWeight: 400,
                      color: "#F0F4FF",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
            </nav>

            {/* Contact button — pinned to bottom */}
            <m.div
              className="px-6 pb-8 pt-6 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full rounded-md font-medium"
                style={{
                  height: "48px",
                  fontSize: "15px",
                  background: "rgba(0, 102, 255, 0.15)",
                  border: "1px solid rgba(0, 102, 255, 0.3)",
                  color: "#6699FF",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                Contact Us
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
