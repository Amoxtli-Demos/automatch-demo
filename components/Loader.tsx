/** CSS-only intro (desktop, first visit per session). Shown via the `use-loader` class set before first paint. */
export function Loader() {
  return (
    <div id="loader" aria-hidden="true">
      <div className="inner">
        <div className="brand notranslate" translate="no"><span>AutoMatch</span></div>
        <div className="lane"><i /></div>
      </div>
    </div>
  );
}
