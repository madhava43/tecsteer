import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/salesforce", label: "Salesforce" },
    { href: "/services/aws-consulting", label: "AWS Consulting" },
    { href: "/services/web-development", label: "Web Development" },
    { href: "/services/mobile-development", label: "Mobile Development" },
    { href: "/services/cybersecurity", label: "Cybersecurity" },
    { href: "/services/data-analytics", label: "Data Analytics" },
  ],
  solutions: [
    { href: "/consulting", label: "Consulting" },
    { href: "/training", label: "Trainings" },
    { href: "/services/application-services", label: "Application Services" },
    { href: "/services/ui-ux-design", label: "UI/UX Design" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-base border-t border-white/[0.06]">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="inline-block">
              <span className="font-syne font-bold text-xl text-text-primary tracking-tight">
                Tec<span className="text-accent-primary">steer</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-[30ch]">
              Empowering businesses through innovative IT services — consulting,
              staffing, and technology solutions tailored to your goals.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:hr@tecsteer.com"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                <Mail size={13} className="text-text-muted flex-shrink-0" />
                hr@tecsteer.com
              </a>
              <a
                href="tel:+18482565361"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
              >
                <Phone size={13} className="text-text-muted flex-shrink-0" />
                +1 848 256 5361
              </a>
              <div className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin size={13} className="text-text-muted flex-shrink-0 mt-0.5" />
                <span>30 Knightsbridge Rd #525<br />Piscataway, NJ 08854</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-syne font-medium text-xs text-text-primary uppercase tracking-[0.1em]">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h3 className="font-syne font-medium text-xs text-text-primary uppercase tracking-[0.1em]">
              Solutions
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-syne font-medium text-xs text-text-primary uppercase tracking-[0.1em]">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {year} Tecsteer.com — All Rights Reserved.
          </p>

          <div className="flex items-center gap-2">
            {[
              { href: "#", label: "Facebook", icon: FaFacebookF },
              { href: "#", label: "Twitter", icon: FaTwitter },
              { href: "#", label: "LinkedIn", icon: FaLinkedinIn },
            ].map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label}`}
                className="w-7 h-7 flex items-center justify-center rounded-md text-text-muted hover:text-text-secondary hover:bg-white/[0.05] transition-all duration-150"
              >
                <Icon size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
