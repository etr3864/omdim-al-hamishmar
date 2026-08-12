import '@/styles/base.css'
import { site } from '@/config/site'
import { thanks } from '@/content/thanks'
import { renderThanksPage } from '@/pages/thanks'
import { bootPage } from '@/scripts/boot'
import { shareWhatsApp } from '@/lib/clipboard'
import { track } from '@/lib/analytics'
import { $ } from '@/lib/dom'

document.querySelector('#app')!.innerHTML = renderThanksPage()
bootPage('thanks')
track('CompleteRegistration', { page: 'thanks' })

const shareBtn = $('[data-action="share-wa"]')
shareBtn?.addEventListener('click', () => {
  const msg = thanks.share.message.replace('{url}', site.url)
  shareWhatsApp(msg)
  track('share_whatsapp_open', { page: 'thanks' })
})

function parseCounter(raw: string): number {
  return Number(raw.replace(/[^\d]/g, '')) || 0
}

function formatCounter(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}

/** easeOutExpo - מתחיל מהר ומאט לקראת הסוף */
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function animateCounter(el: HTMLElement, target: number, durationMs = 2200): void {
  const start = performance.now()
  el.classList.add('is-counting')

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs)
    el.textContent = formatCounter(target * easeOutExpo(t))
    if (t < 1) {
      requestAnimationFrame(tick)
    } else {
      el.textContent = formatCounter(target)
      el.classList.remove('is-counting')
      el.classList.add('is-counted')
    }
  }

  requestAnimationFrame(tick)
}

const counterEl = $('[data-counter]')
if (counterEl) {
  const target = parseCounter(counterEl.getAttribute('data-target') || site.counterText)
  const run = () => animateCounter(counterEl, target)
  if (typeof IntersectionObserver === 'undefined') {
    run()
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(counterEl)
  }
}
