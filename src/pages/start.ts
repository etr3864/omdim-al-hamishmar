import { site } from '@/config/site'
import { start } from '@/content/start'
import { accentHtml } from '@/lib/dom'
import { ambient } from '@/ui/ambient'
import { renderCta } from '@/ui/cta'
import { renderFooter, renderHeader } from '@/ui/shell'

export function renderStartPage(): string {
  const mark = site.logos.markGold
  return `
${renderHeader('start')}
<main class="page-start">
  <section class="hero hero--start" id="start-hero">
    ${ambient({ variant: 'd', mark })}
    <span class="hero__basad">${start.basad}</span>
    <div class="hero__inner hero__inner--start">
      <h1 class="hero--start__title display">${accentHtml(start.title, 'העיניים')}</h1>
      <p class="hero--start__sub">${start.subtitle}</p>
      <a class="scroll-cue" href="#friend-kit" data-track="scroll_to_steps" aria-label="${start.scrollHint}">
        <span class="scroll-cue__arrow" aria-hidden="true"></span>
      </a>
    </div>
  </section>

  <div class="start-journey">
    <div class="start-journey__rail" aria-hidden="true"><i></i></div>

    <section class="start-step" id="friend-kit">
      ${ambient({ variant: 'a', mark })}
      <div class="start-step__head">
        <span class="start-step__n">${start.friendKit.step}</span>
        <div class="start-step__copy">
          <span class="step-chip">${start.friendKit.stepLabel}</span>
          <h2 class="display display--md">${accentHtml(start.friendKit.title, start.friendKit.titleAccent)}</h2>
          <p>${start.friendKit.body}</p>
        </div>
      </div>
    </section>

    <section class="start-step" id="tutorial">
      ${ambient({ variant: 'b', mark })}
      <div class="start-step__head">
        <span class="start-step__n">${start.tutorial.step}</span>
        <div class="start-step__copy">
          <span class="step-chip">${start.tutorial.stepLabel}</span>
          <h2 class="display display--md">${accentHtml(start.tutorial.title, start.tutorial.titleAccent)}</h2>
        </div>
      </div>

      <div class="tutorial">
        <div class="tutorial__media">
          <div class="tutorial__video video-frame video-frame--vertical" data-video-wrap>
            <video controls playsinline preload="metadata" muted
              poster="${site.videos.tutorialPoster}"
              data-tutorial-video
              data-track-play="video_tutorial">
              <source src="${site.videos.tutorial}" type="video/mp4">
            </video>
            <button type="button" class="sound-gate" data-unmute-play data-track="unmute_tutorial">
              <span class="sound-gate__icon" aria-hidden="true">♪</span>
              <span class="sound-gate__title">${start.tutorial.soundTitle}</span>
              <span class="sound-gate__body">${start.tutorial.soundBody}</span>
              <span class="sound-gate__cta">${start.tutorial.soundCta}</span>
            </button>
          </div>
          <div class="settings-jump" data-ios-settings>
            <button type="button" class="settings-jump__btn" data-open-screen-time data-track="open_screen_time">
              ${start.tutorial.settingsCta}
            </button>
            <p class="settings-jump__note">${start.tutorial.settingsNote}</p>
          </div>
        </div>
        <div class="tutorial__steps">
          <div class="progress">
            <div class="progress__bar"><div class="progress__fill" data-progress-fill></div></div>
            <span class="micro" data-progress-label>0 מתוך ${start.tutorial.steps.length} שלבים</span>
          </div>
          ${start.tutorial.steps
            .map(
              (label, i) => `
            <button type="button" class="check-item" data-check="${i}">
              <span class="check-item__mark" aria-hidden="true"></span>
              <span>${label}</span>
            </button>`,
            )
            .join('')}
        </div>
      </div>
    </section>

    <section class="start-step start-step--help" id="stuck">
      ${ambient({ variant: 'c', mark })}
      <div class="start-help">
        <div class="stack" style="gap:8px">
          <h2 class="display display--md">${accentHtml(start.stuck.title, start.stuck.titleAccent)}</h2>
          <p>${start.stuck.body}</p>
        </div>
        <a class="cta cta--ghost cta--sm" href="https://wa.me/${site.whatsappSupport}" target="_blank" rel="noopener"
          data-track="whatsapp_support"><span>${start.stuck.cta}</span></a>
      </div>
    </section>

    <section class="start-step start-step--final" id="done">
      ${ambient({ variant: 'd', mark })}
      <span class="start-step__n start-step__n--final">${start.done.step}</span>
      <div class="start-done">
        <h2 class="display display--md">${accentHtml(start.done.title, start.done.titleAccent)}</h2>
        <p class="start-done__hook">${accentHtml(start.done.body, start.done.bodyAccent)}</p>
        <div class="start-done__cta">
          ${renderCta({
            href: site.paths.thanks,
            label: start.done.cta,
            underlineWord: start.done.ctaUnderlineWord,
            className: 'cta--hero',
            attrs: 'data-track="complete_start"',
          })}
        </div>
      </div>
    </section>
  </div>
</main>
${renderFooter()}`
}
