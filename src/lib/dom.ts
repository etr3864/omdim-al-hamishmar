export function $(sel: string, root: ParentNode = document): HTMLElement | null {
  return root.querySelector(sel)
}

export function $all(sel: string, root: ParentNode = document): HTMLElement[] {
  return Array.from(root.querySelectorAll(sel))
}

export function nl2br(text: string): string {
  return text
    .split('\n')
    .map((line) => line.trimEnd())
    .join('<br>')
}

/** מדגיש מילה/ביטוי בתוך כותרת בזהב */
export function accentHtml(text: string, accent?: string): string {
  if (!accent || !text.includes(accent)) return text
  const i = text.indexOf(accent)
  return `${text.slice(0, i)}<span class="display__accent">${accent}</span>${text.slice(i + accent.length)}`
}

/** כותרת דו־שורה: שורה ראשונה רכה, שנייה מודגשת */
export function splitTitleHtml(lead: string, accent: string): string {
  return `<span class="display__lead">${lead}</span><span class="display__accent display__accent--block">${accent}</span>`
}

/** מדגיש מילה אחרונה ב־CTA עם קו לבן */
export function ctaHtml(label: string, underlineWord?: string): string {
  if (!underlineWord || !label.includes(underlineWord)) {
    return `<span>${label}</span>`
  }
  const parts = label.split(underlineWord)
  return `<span>${parts[0]}<span class="u">${underlineWord}</span>${parts.slice(1).join(underlineWord)}</span>`
}
