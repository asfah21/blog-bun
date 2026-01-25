"use client";

import { Link } from "@heroui/link";

import { Logo } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-10 px-4 border-t border-divider bg-background flex flex-col items-center gap-10">
      {/* Brand Section */}
      <div className="flex flex-col items-center gap-4 text-center">
        <Link
          className="flex items-center gap-3 active:scale-95 transition-transform"
          color="foreground"
          href="/"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-success-300 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white">
              <Logo size={38} />
            </span>
          </div>
          <span className="text-2xl font-bold tracking-tight uppercase">
            Listofont
          </span>
        </Link>
        <p className="text-default-500 text-sm font-medium max-w-xs sm:max-w-md leading-relaxed">
          Get In Touch With Us For The Best of Free and Premium Fonts
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {[
          { label: "About", href: "/about" },
          { label: "Disclaimer", href: "/disclaimer" },
          { label: "Privacy Policy", href: "/privacy" },
        ].map((link) => (
          <Link
            key={link.label}
            className="text-foreground font-bold hover:text-primary transition-all text-[15px] uppercase tracking-wide"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Copyright */}
      <div className="text-center text-default-400 text-sm font-medium">
        <p>&copy; {currentYear} Listofont™. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
