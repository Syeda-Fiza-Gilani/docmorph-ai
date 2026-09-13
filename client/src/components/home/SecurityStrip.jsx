import { Lock, ShieldCheck, EyeOff } from "lucide-react";
import Container from "../ui/Container";

const POINTS = [
  {
    icon: Lock,
    title: "Encrypted in transit",
    description: "Uploads travel over TLS from your browser to our servers.",
  },
  {
    icon: ShieldCheck,
    title: "Deleted after conversion",
    description: "Files and results are removed automatically once you're done.",
  },
  {
    icon: EyeOff,
    title: "Never used for training",
    description: "Your documents stay yours — we don't read or reuse them.",
  },
];

export default function SecurityStrip() {
  return (
    <section id="security" className="scroll-mt-24 bg-accent-soft/50 py-16 md:py-20">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {POINTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3.5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                <Icon size={16} className="text-primary" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-[14.5px] font-bold text-text">{title}</h3>
                <p className="mt-1 text-[13px] leading-5 text-muted">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
