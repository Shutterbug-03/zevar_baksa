import { Sparkles } from "lucide-react";

interface MarqueeProps {
  items?: string[];
}

export function Marquee({
  items = [
    "New Releases",
    "Handcrafted in India",
    "Made to Order",
    "Heirloom Jewellery",
    "Zevar Baksa",
  ],
}: MarqueeProps) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee border-y border-primary/20 bg-primary py-5 text-primary-foreground flex overflow-hidden">
      <div className="marquee-track flex items-center gap-12 flex-shrink-0 min-w-full">
        {doubled.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-6 font-display text-3xl md:text-4xl whitespace-nowrap"
          >
            <Sparkles className="h-5 w-5 opacity-70" strokeWidth={1} />
            {label}
          </span>
        ))}
      </div>
      <div className="marquee-track flex items-center gap-12 flex-shrink-0 min-w-full" aria-hidden="true">
        {doubled.map((label, i) => (
          <span
            key={i}
            className="flex items-center gap-6 font-display text-3xl md:text-4xl whitespace-nowrap"
          >
            <Sparkles className="h-5 w-5 opacity-70" strokeWidth={1} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
