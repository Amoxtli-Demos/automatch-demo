type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const ArrowRight = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2.2} {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowDown = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2.2} {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>);
export const Chat = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>);
export const Search = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>);
export const Key = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><circle cx="8" cy="15" r="4" /><path d="M10.8 12.2L21 2M17 6l3 3M14 9l2 2" /></svg>);
export const Check = (p: P) => (<svg viewBox="0 0 24 24" {...p} aria-hidden><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Send = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2.2} {...base} {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>);
export const Translate = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" /></svg>);
export const CarSmall = (p: P) => (<svg viewBox="0 0 24 24" strokeWidth={2.2} {...base} {...p}><path d="M5 15l1.6-4.6A2 2 0 0 1 8.5 9h7a2 2 0 0 1 1.9 1.4L19 15" /><path d="M4 15h16v3H4z" /><circle cx="7.5" cy="18" r="1.4" /><circle cx="16.5" cy="18" r="1.4" /></svg>);
export const EuStars = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#FFD43B" strokeWidth={2} strokeDasharray="1.5 3.2" aria-hidden><circle cx="12" cy="12" r="8" /></svg>);

/** Rolling label used by every primary button (text slides up on hover). */
export function RollLabel({ text }: { text: string }) {
  return (
    <span className="bl">
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
