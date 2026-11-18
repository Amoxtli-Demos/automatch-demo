"use client";

import { useEffect, useRef, useState } from "react";

export function Toast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      setShow(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setShow(false), 2200);
    };
    window.addEventListener("am:toast", on);
    return () => window.removeEventListener("am:toast", on);
  }, []);
  return <div className={"toast" + (show ? " show" : "")} role="status" aria-live="polite">{msg}</div>;
}
