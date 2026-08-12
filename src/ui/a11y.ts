const STORAGE_KEY = 'omdimal-a11y'

type A11yFlags = {
  text: boolean
  contrast: boolean
  links: boolean
  motion: boolean
}

const DEFAULTS: A11yFlags = {
  text: false,
  contrast: false,
  links: false,
  motion: false,
}

function readFlags(): A11yFlags {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULTS }
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULTS }
  }
}

function writeFlags(flags: A11yFlags): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags))
}

function applyFlags(flags: A11yFlags): void {
  const root = document.documentElement
  root.classList.toggle('a11y-text', flags.text)
  root.classList.toggle('a11y-contrast', flags.contrast)
  root.classList.toggle('a11y-links', flags.links)
  root.classList.toggle('a11y-motion', flags.motion)
}

export function renderA11y(): string {
  return `
<aside class="a11y" data-a11y>
  <button type="button" class="a11y__tab" data-a11y-tab aria-expanded="false" aria-controls="a11y-panel">
    נגישות
  </button>
  <div class="a11y__panel" id="a11y-panel" role="dialog" aria-label="תפריט נגישות" hidden>
    <p class="a11y__title">נגישות</p>
    <button type="button" class="a11y__opt" data-a11y-toggle="text">הגדלת טקסט</button>
    <button type="button" class="a11y__opt" data-a11y-toggle="contrast">ניגודיות גבוהה</button>
    <button type="button" class="a11y__opt" data-a11y-toggle="links">הדגשת קישורים</button>
    <button type="button" class="a11y__opt" data-a11y-toggle="motion">עצירת אנימציה</button>
    <button type="button" class="a11y__reset" data-a11y-reset>איפוס</button>
  </div>
</aside>`
}

export function bindA11y(): void {
  if (!document.querySelector('[data-a11y]')) {
    document.body.insertAdjacentHTML('beforeend', renderA11y())
  }

  const root = document.querySelector<HTMLElement>('[data-a11y]')
  const tab = root?.querySelector<HTMLButtonElement>('[data-a11y-tab]')
  const panel = root?.querySelector<HTMLElement>('#a11y-panel')
  if (!root || !tab || !panel) return

  let flags = readFlags()
  applyFlags(flags)
  syncButtons()

  tab.addEventListener('click', () => {
    const open = panel.hasAttribute('hidden')
    panel.toggleAttribute('hidden', !open)
    tab.setAttribute('aria-expanded', String(open))
    root.classList.toggle('is-open', open)
  })

  root.querySelectorAll<HTMLButtonElement>('[data-a11y-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-a11y-toggle') as keyof A11yFlags | null
      if (!key || !(key in flags)) return
      flags = { ...flags, [key]: !flags[key] }
      writeFlags(flags)
      applyFlags(flags)
      syncButtons()
    })
  })

  root.querySelector('[data-a11y-reset]')?.addEventListener('click', () => {
    flags = { ...DEFAULTS }
    writeFlags(flags)
    applyFlags(flags)
    syncButtons()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) {
      panel.setAttribute('hidden', '')
      tab.setAttribute('aria-expanded', 'false')
      root.classList.remove('is-open')
      tab.focus()
    }
  })

  function syncButtons(): void {
    root!.querySelectorAll<HTMLButtonElement>('[data-a11y-toggle]').forEach((btn) => {
      const key = btn.getAttribute('data-a11y-toggle') as keyof A11yFlags | null
      if (!key) return
      btn.classList.toggle('is-on', flags[key])
      btn.setAttribute('aria-pressed', String(flags[key]))
    })
  }
}
