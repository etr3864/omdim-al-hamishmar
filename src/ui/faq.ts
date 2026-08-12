import type { FaqItem } from '@/content/faq'

export function renderFaq(items: FaqItem[]): string {
  return `
<div class="faq" data-faq>
  ${items
    .map(
      (item, i) => `
    <div class="faq__item" data-faq-item>
      <button type="button" class="faq__q" aria-expanded="false" data-faq-toggle="${i}">
        <span>${item.q}</span>
        <span class="faq__sign" aria-hidden="true">+</span>
      </button>
      <p class="faq__a">${item.a}</p>
    </div>`,
    )
    .join('')}
</div>`
}

export function bindFaq(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-faq-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item')
      if (!item) return
      const open = item.classList.toggle('is-open')
      btn.setAttribute('aria-expanded', String(open))
      const sign = btn.querySelector('.faq__sign')
      if (sign) sign.textContent = open ? '−' : '+'
    })
  })
}
