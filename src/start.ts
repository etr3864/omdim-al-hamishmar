import '@/styles/base.css'
import { start } from '@/content/start'
import { renderStartPage } from '@/pages/start'
import { bootPage } from '@/scripts/boot'
import { track } from '@/lib/analytics'
import { $all, $ } from '@/lib/dom'

document.querySelector('#app')!.innerHTML = renderStartPage()
bootPage('start')

const done = new Set<number>()
const total = start.tutorial.steps.length

function refreshProgress(): void {
  const fill = $('[data-progress-fill]')
  const label = $('[data-progress-label]')
  const pct = Math.round((done.size / total) * 100)
  if (fill) fill.style.width = `${pct}%`
  if (label) label.textContent = `${done.size} מתוך ${total} שלבים`
}

$all('[data-check]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const i = Number(btn.getAttribute('data-check'))
    const markEl = btn.querySelector('.check-item__mark')
    if (done.has(i)) {
      done.delete(i)
      btn.classList.remove('is-done')
      if (markEl) markEl.textContent = ''
    } else {
      done.add(i)
      btn.classList.add('is-done')
      if (markEl) markEl.textContent = '✓'
      track('checklist_step', { step: i + 1 })
    }
    refreshProgress()
  })
})

const video = document.querySelector<HTMLVideoElement>('[data-tutorial-video]')
const gate = $('[data-unmute-play]')
const wrap = $('[data-video-wrap]')

gate?.addEventListener('click', async () => {
  if (!video) return
  video.muted = false
  try {
    await video.play()
  } catch {
    /* ignore */
  }
  wrap?.classList.add('is-unmuted')
  gate.remove()
})

video?.addEventListener('volumechange', () => {
  if (video && !video.muted && video.volume > 0) {
    wrap?.classList.add('is-unmuted')
    gate?.remove()
  }
})

/** פתיחת מסך זמן — רק בספארי; בכרום אפל חוסמת את הקישור */
function isAppleMobile(): boolean {
  const ua = navigator.userAgent
  const iOS = /iPhone|iPad|iPod/i.test(ua)
  const iPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return iOS || iPadOS
}

function isSafariIOS(): boolean {
  if (!isAppleMobile()) return false
  const ua = navigator.userAgent
  // Chrome/Firefox/Edge/Opera באייפון = לא ספארי אמיתי
  if (/CriOS|FxiOS|EdgiOS|OPiOS|Chrome\//i.test(ua)) return false
  return /Safari/i.test(ua)
}

function showSettingsFallback(message: string): void {
  const box = $('[data-settings-fallback]')
  const msg = $('[data-settings-fallback-msg]')
  if (msg) msg.textContent = message
  box?.removeAttribute('hidden')
}

async function openScreenTimeSettings(): Promise<void> {
  // בכרום ודפדפנים אחרים — אין דרך אמינה; מציגים הנחיה
  if (!isSafariIOS()) {
    showSettingsFallback(start.tutorial.settingsChromeHint)
    return
  }

  // בספארי: ניסיון אחד בלבד (לולאה יוצרת שגיאות מערכת)
  try {
    window.location.href = 'App-prefs:root=SCREEN_TIME'
  } catch {
    /* ignore */
  }

  await new Promise((r) => setTimeout(r, 900))
  if (!document.hidden) {
    showSettingsFallback(start.tutorial.settingsSafariFail)
  }
}

const settingsBtn = $('[data-open-screen-time]')
const settingsWrap = $('[data-ios-settings]')

if (!isAppleMobile()) {
  settingsWrap?.classList.add('is-not-ios')
}

settingsBtn?.addEventListener('click', () => {
  track('open_screen_time', { ios: isAppleMobile(), safari: isSafariIOS() })
  void openScreenTimeSettings()
})
