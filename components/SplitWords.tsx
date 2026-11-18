import { Fragment } from "react";

/** Splits text into masked words for the scroll reveal. Words listed in `highlight` get the brand gradient. */
export function SplitWords({ text, highlight = "", baseDelay = 0 }: { text: string; highlight?: string; baseDelay?: number }) {
  const hl = highlight ? highlight.split(" ") : [];
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?¡¿]/g, "");
        const style = { transitionDelay: `${i * 0.055}s`, ["--d" as string]: `${baseDelay + i * 0.055}s` } as React.CSSProperties;
        return (
          <Fragment key={i}>
            <span className="w">
              <span className={hl.includes(clean) ? "grad-text" : undefined} style={style}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </>
  );
}
