import { ctaHtml } from '@/lib/dom'

export function renderCta(opts: {
  href?: string
  label: string
  underlineWord?: string
  className?: string
  attrs?: string
}): string {
  const cls = ['cta', opts.className].filter(Boolean).join(' ')
  const inner = ctaHtml(opts.label, opts.underlineWord)
  const attrs = opts.attrs ?? ''
  if (opts.href) {
    return `<a class="${cls}" href="${opts.href}" ${attrs}>${inner}</a>`
  }
  return `<button type="button" class="${cls}" ${attrs}>${inner}</button>`
}
