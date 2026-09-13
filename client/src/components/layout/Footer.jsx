import { FileStack } from "lucide-react";
import Container from "../ui/Container";

const LINKS = [
  { label: "Convert a PDF", href: "#convert" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <FileStack size={16} strokeWidth={2.25} className="text-white" />
            </span>
            <div>
              <p className="text-[14px] font-bold text-text">DocMorph</p>
              <p className="mt-1 max-w-xs text-[13px] leading-5 text-muted">
                PDF to Word conversion powered by OCR and AI text correction.
              </p>
            </div>
          </div>

          <nav className="flex gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-medium text-muted transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-muted">
            © {new Date().getFullYear()} DocMorph. All rights reserved.
          </p>
          <p className="text-[12.5px] text-muted">
            Built with OCR &amp; AI-powered text correction.
          </p>
        </div>
      </Container>
    </footer>
  );
}
