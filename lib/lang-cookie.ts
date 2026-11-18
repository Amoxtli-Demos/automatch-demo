import type { Lang } from "./i18n";

export const LANG_COOKIE = "am-lang";
export const LANGS: Lang[] = ["nl", "en", "es"];

/** First visit opens in Dutch; afterwards the last language the visitor picked. */
export function parseLang(v: string | undefined | null): Lang {
  return v && (LANGS as string[]).includes(v) ? (v as Lang) : "nl";
}

export function persistLang(l: Lang) {
  try {
    document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; SameSite=Lax`;
  } catch { /* ignore */ }
  try {
    localStorage.setItem(LANG_COOKIE, l);
  } catch { /* ignore */ }
}
