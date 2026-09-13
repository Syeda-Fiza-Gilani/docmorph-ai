import { FileStack } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";

const LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <FileStack size={16} strokeWidth={2.25} className="text-white" />
            </span>
            <span className="text-[15px] font-bold tracking-tight text-text">
              DocMorph
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13.5px] font-medium text-muted transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Button as="a" href="#convert" size="sm">
            Convert a PDF
          </Button>
        </nav>
      </Container>
    </header>
  );
}
