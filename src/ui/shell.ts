import { site } from '@/config/site'
import { shared } from '@/content/shared'

type PageId = 'home' | 'start' | 'thanks'

const backFor: Partial<Record<PageId, { href: string; label: string }>> = {
  start: { href: site.paths.home, label: 'חזרה לדף הבית' },
  thanks: { href: site.paths.start, label: 'חזרה לביצוע' },
}

export function renderHeader(active: PageId): string {
  const back = backFor[active]
  const backBtn = back
    ? `<button type="button" class="site-header__back" data-page-back="${back.href}" aria-label="${back.label}">
        <span class="site-header__back-icon" aria-hidden="true"></span>
        <span>חזרה</span>
      </button>`
    : `<span class="site-header__back-slot" aria-hidden="true"></span>`

  return `
<header class="site-header">
  ${backBtn}
  <div class="site-header__brand">
    <img src="${site.logos.markGold}" alt="${site.name}" width="34" height="34">
    <span>${site.name}</span>
  </div>
  <span class="site-header__back-slot" aria-hidden="true"></span>
</header>`
}

type SocialItem = { id: string; label: string; href: string; icon: string }

function socialItems(): SocialItem[] {
  const items: SocialItem[] = [
    {
      id: 'whatsapp',
      label: 'וואטסאפ',
      href: `https://wa.me/${site.whatsappSupport}`,
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.88 0 1.74.46 3.45 1.34 4.95L2.05 22l5.32-1.39c1.44.78 3.07 1.2 4.67 1.2h.01c5.46 0 9.9-4.43 9.9-9.88C21.95 6.43 17.5 2 12.04 2zm5.76 14.06c-.24.67-1.4 1.23-1.94 1.31-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.93-4.36-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.38.26-.28.57-.35.76-.35h.55c.17 0 .4-.05.63.48.24.56.8 1.95.87 2.09.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.41.5-.14.14-.28.29-.12.56.16.28.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.61-.14.24.09 1.55.73 1.81.86.27.14.45.2.51.31.07.12.07.67-.17 1.34z"/></svg>`,
    },
  ]

  if (site.social.facebook) {
    items.push({
      id: 'facebook',
      label: 'פייסבוק',
      href: site.social.facebook,
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.55.45-1 1-1z"/></svg>`,
    })
  }
  if (site.social.instagram) {
    items.push({
      id: 'instagram',
      label: 'אינסטגרם',
      href: site.social.instagram,
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.4A2.9 2.9 0 1 1 14.9 12 2.9 2.9 0 0 1 12 14.9zm5.15-8.55a1.05 1.05 0 1 0 1.05 1.05 1.05 1.05 0 0 0-1.05-1.05z"/></svg>`,
    })
  }
  if (site.social.youtube) {
    items.push({
      id: 'youtube',
      label: 'יוטיוב',
      href: site.social.youtube,
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3A2.7 2.7 0 0 0 2.4 7.2 28.2 28.2 0 0 0 2 12a28.2 28.2 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28.2 28.2 0 0 0 22 12a28.2 28.2 0 0 0-.4-4.8zM10 15.2V8.8L15.2 12z"/></svg>`,
    })
  }
  if (site.social.tiktok) {
    items.push({
      id: 'tiktok',
      label: 'טיקטוק',
      href: site.social.tiktok,
      icon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.6 7.4a5.7 5.7 0 0 1-3.4-1.1v6.5a5.4 5.4 0 1 1-5.4-5.4c.3 0 .5 0 .8.1v2.7a2.8 2.8 0 1 0 2 2.7V2.5h2.6a5.7 5.7 0 0 0 3.4 3.3z"/></svg>`,
    })
  }

  return items
}

function renderSocial(): string {
  const items = socialItems()
  if (!items.length) return ''
  return `
<nav class="site-footer__social" aria-label="רשתות חברתיות">
  ${items
    .map(
      (item) => `
    <a class="site-footer__social-link" href="${item.href}" target="_blank" rel="noopener noreferrer"
      aria-label="${item.label}" data-track="social_${item.id}">
      ${item.icon}
    </a>`,
    )
    .join('')}
</nav>`
}

export function renderFooter(): string {
  return `
<footer class="site-footer">
  <div class="site-footer__inner">
    <img src="${site.logos.goldMono}" alt="${site.name}" height="56">
    <div class="site-footer__meta">
      <span>${shared.footer}</span>
      ${renderSocial()}
    </div>
  </div>
</footer>`
}
