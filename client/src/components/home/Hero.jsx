import { Sparkles } from "lucide-react";
import Container from "../ui/Container";
import ConvertCard from "./ConvertCard";
import FeatureRow from "./FeatureRow";

export default function Hero() {
  return (
    <section className="pt-20 pb-24 md:pt-28 md:pb-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="mx-auto inline-flex items-center gap-1.5 rounded-full border border-border bg-accent-soft px-3 py-1">
            <Sparkles size={12} className="text-primary" strokeWidth={2.5} />
            <span className="text-[12px] font-semibold text-primary-dark">
              OCR + AI text correction
            </span>
          </div>

          <h1 className="mx-auto mt-6 max-w-2xl text-[38px] font-extrabold leading-[1.15] text-text sm:text-[46px] lg:text-[52px]">
            Turn PDFs into Word
            <br className="hidden sm:block" /> docs you can{" "}
            <span className="text-primary">actually edit</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-7 text-muted sm:text-[17px]">
            Upload a scanned or searchable PDF and DocMorph rebuilds it as a
            clean, formatted .docx — text, layout, and all — in under a
            minute.
          </p>
        </div>

        <FeatureRow />

        <div id="convert" className="scroll-mt-24">
          <ConvertCard />
        </div>
      </Container>
    </section>
  );
}
