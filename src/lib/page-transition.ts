const INTERNAL = new Set(['/', '/start.html', '/thanks.html', '/index.html'])
const DIR_KEY = 'omdim-pt-dir'
const HREF_KEY = 'omdim-pt-href'

export type TransitionDir = 'forward' | 'back'

function reduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function pathOf(href: string): string {
  const u = new URL(href, location.origin)
  return u.pathname.replace(/\/index\.html$/, '/') || '/'
}

function isInternalHref(href: string): boolean {
  try {
    const u = new URL(href, location.origin)
    if (u.origin !== location.origin) return false
    return INTERNAL.has(pathOf(href)) || INTERNAL.has(u.pathname)
  } catch {
    return false
  }
}

function ensureOverlay(): HTMLElement {
  let el = document.getElementById('page-transition')
  if (el) return el
  el = document.createElement('div')
  el.id = 'page-transition'
  el.className = 'page-transition'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = `
    <div class="page-transition__veil"></div>
    <div class="page-transition__bloom"></div>
    <div class="page-transition__shimmer"></div>
  `
  document.body.appendChild(el)
  return el
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

function remember(dir: TransitionDir, href: string): void {
  try {
    sessionStorage.setItem(DIR_KEY, dir)
    sessionStorage.setItem(HREF_KEY, pathOf(href))
  } catch {
    /* ignore */
  }
}

function consumeDir(): TransitionDir {
  try {
    const stored = sessionStorage.getItem(DIR_KEY) as TransitionDir | null
    sessionStorage.removeItem(DIR_KEY)
    sessionStorage.removeItem(HREF_KEY)
    if (stored === 'forward' || stored === 'back') return stored
  } catch {
    /* ignore */
  }

  const nav = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined
  if (nav?.type === 'back_forward') return 'back'
  return 'forward'
}

export async function navigateWithTransition(
  href: string,
  dir: TransitionDir = 'forward',
): Promise<void> {
  remember(dir, href)

  if (reduceMotion()) {
    location.href = href
    return
  }

  const overlay = ensureOverlay()
  const root = document.documentElement
  root.classList.remove('is-ready', 'is-entering', 'is-entering-back')
  root.classList.add(dir === 'back' ? 'is-leaving-back' : 'is-leaving')
  overlay.classList.remove('is-back')
  if (dir === 'back') overlay.classList.add('is-back')
  overlay.classList.add('is-active')

  await wait(640)
  location.href = href
}

export function bindPageTransitions(): void {
  ensureOverlay()

  const dir = consumeDir()

  if (!reduceMotion()) {
    document.documentElement.classList.add(
      dir === 'back' ? 'is-entering-back' : 'is-entering',
    )
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('is-entering', 'is-entering-back')
        document.documentElement.classList.add(
          dir === 'back' ? 'is-ready-back' : 'is-ready',
        )
      })
    })
  } else {
    document.documentElement.classList.add('is-ready')
  }

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target
      if (!(target instanceof Element)) return

      const backBtn = target.closest('[data-page-back]')
      if (backBtn instanceof HTMLElement) {
        e.preventDefault()
        const href = backBtn.getAttribute('data-page-back') || backBtn.getAttribute('href')
        if (href) void navigateWithTransition(href, 'back')
        return
      }

      const a = target.closest('a.cta[href], a[data-page-transition]')
      if (!(a instanceof HTMLAnchorElement)) return
      if (a.target === '_blank' || a.hasAttribute('download')) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (!isInternalHref(a.href)) return
      if (a.getAttribute('href')?.startsWith('#')) return

      e.preventDefault()
      const dirAttr = a.getAttribute('data-transition-dir')
      const navDir: TransitionDir = dirAttr === 'back' ? 'back' : 'forward'
      void navigateWithTransition(a.href, navDir)
    },
    true,
  )
}
