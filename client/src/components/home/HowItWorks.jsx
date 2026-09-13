import { FileUp, ScanText, FileDown } from "lucide-react";
import Container from "../ui/Container";

const STEPS = [
  {
    number: "01",
    icon: FileUp,
    title: "Upload your PDF",
    description: "Drag in a scanned or searchable file, up to 50 MB.",
  },
  {
    number: "02",
    icon: ScanText,
    title: "OCR reads every line",
    description: "AI extracts text and reconstructs the original layout.",
  },
  {
    number: "03",
    icon: FileDown,
    title: "Download the .docx",
    description: "Get a clean Word file you can edit right away.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-border py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-[26px] font-extrabold text-text sm:text-[30px]">
            How it works
          </h2>
          <p className="mt-3 text-[15px] text-muted">
            Three steps between a locked-down PDF and a document you can
            actually rewrite.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-10 sm:grid-cols-3 sm:gap-8">
          {STEPS.map(({ number, icon: Icon, title, description }) => (
            <div key={number} className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="text-[13px] font-bold tabular-nums text-muted/70">
                  {number}
                </span>
                <span className="h-px flex-1 bg-border sm:hidden" />
              </div>

              <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft mx-auto sm:mx-0">
                <Icon size={18} className="text-primary" strokeWidth={2} />
              </span>

              <h3 className="mt-4 text-[15.5px] font-bold text-text">
                {title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-6 text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
