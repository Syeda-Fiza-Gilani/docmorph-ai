import { ScanText, Sparkles, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: ScanText, label: "Scanned & searchable PDFs" },
  { icon: Sparkles, label: "AI text correction" },
  { icon: ShieldCheck, label: "Deleted after conversion" },
];

export default function FeatureRow() {
  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-10">
      {FEATURES.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex items-center gap-4">
          {i !== 0 && (
            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-border sm:block"
            />
          )}
          <div className="flex items-center gap-2">
            <Icon size={16} className="text-primary" strokeWidth={2} />
            <span className="text-[13.5px] font-medium text-muted">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
