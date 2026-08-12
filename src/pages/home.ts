import { site } from '@/config/site'
import { home } from '@/content/home'
import { faq } from '@/content/faq'
import { rabbis } from '@/content/rabbis'
import { shared } from '@/content/shared'
import { accentHtml, nl2br, splitTitleHtml } from '@/lib/dom'
import { ambient } from '@/ui/ambient'
import { renderCta } from '@/ui/cta'
import { renderFaq } from '@/ui/faq'
import { renderRabbisWall, renderTrustStrip } from '@/ui/rabbis'
import { renderFooter, renderHeader } from '@/ui/shell'

export function renderHomePage(): string {
  const mark = site.logos.markGold
  const trust =
    site.heroVariant === 'strip'
      ? renderTrustStrip(rabbis, shared.trustLine)
      : `
      <div class="trust-strip" style="max-width:420px">
        <img src="${rabbis[6].photo}" alt="${rabbis[6].name}" width="104" height="104"
          style="width:104px;height:104px;border-radius:50%;border:1.5px solid var(--hairline);object-fit:cover;filter:grayscale(.15)">
        <p class="punch" style="font-size:1.25rem;max-width:none">״${rabbis[6].quote}״</p>
        <span class="micro">${rabbis[6].name} · ${shared.trustLine}</span>
      </div>`

  const heroTitle = `
    <span>${accentHtml(home.hero.titleLine1, home.hero.titleAccent)}</span>
    <span class="display__soft">${home.hero.titleLine2}</span>`

  return `
${renderHeader('home')}
<main>
  <section class="hero" id="hero">
    <div class="hero__texture" style="background-image:url('${site.texture}')"></div>
    ${ambient({ variant: 'd', mark })}
    <span class="hero__basad">${home.basad}</span>
    <div class="hero__inner">
      <div class="hero__logo-wrap">
        <div class="hero__glow" aria-hidden="true"></div>
        <img class="hero__logo" src="${site.logos.mark}" alt="" width="150" height="150">
      </div>
      <h1 class="hero__title display">${heroTitle}</h1>
      <div class="hero__cta-wrap">
        <p class="hero__nudge">
          <span>${home.hero.nudge}</span>
          <span class="hero__nudge-cue" aria-hidden="true"><i></i></span>
        </p>
        ${renderCta({
          href: site.paths.start,
          label: home.hero.cta,
          underlineWord: home.hero.ctaUnderlineWord,
          className: 'cta--hero',
          attrs: 'data-track="cta_hero"',
        })}
        <span class="micro">${shared.microCta}</span>
      </div>
      ${trust}
    </div>
  </section>

  <section class="section section--video" id="video">
    ${ambient({ variant: 'a', mark })}
    <div class="section--video__glow section--video__glow--a" aria-hidden="true"></div>
    <div class="section--video__glow section--video__glow--b" aria-hidden="true"></div>
    <div class="section--video__glow section--video__glow--c" aria-hidden="true"></div>
    <div class="container stack-center section--video__content" style="gap:22px">
      <h2 class="display display--lg display--center display--wide">${accentHtml(home.video.title, home.video.titleAccent)}</h2>
      <span class="eyebrow" style="color:rgba(231,185,90,.75);letter-spacing:.04em">${home.video.caption}</span>
      <div class="video-frame video-frame--vertical video-frame--featured">
        <video controls playsinline preload="metadata" poster="${site.videos.explainPoster}"
          data-track-play="video_explain">
          <source src="${site.videos.explain}" type="video/mp4">
        </video>
      </div>
    </div>
  </section>

  <section class="section section--steps" id="steps">
    ${ambient({ variant: 'b', mark })}
    <div class="section--steps__glow section--steps__glow--a" aria-hidden="true"></div>
    <div class="section--steps__glow section--steps__glow--b" aria-hidden="true"></div>
    <div class="container stack" style="gap:var(--space-block);position:relative">
      <h2 class="display display--lg display--center display--wide">${accentHtml(home.steps.title, home.steps.titleAccent)}</h2>
      <div class="steps" data-steps>
        <div class="steps__line" aria-hidden="true">
          <span class="steps__line-track"></span>
          <span class="steps__line-fill" data-steps-fill></span>
        </div>
        ${home.steps.items
          .map(
            (s) => `
          <div class="step${s.n === 3 ? ' step--final' : ''}" data-step>
            <span class="step__n"><span>${s.n}</span></span>
            <div class="step__body">
              <h3>${s.title}</h3>
              ${s.body ? `<p>${s.body}</p>` : ''}
            </div>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section section--band" id="rabbis">
    ${ambient({ variant: 'a', mark })}
    <div class="container stack" style="gap:var(--space-block)">
      <div class="display-head display-head--center">
        <span class="eyebrow">${home.rabbis.eyebrow}</span>
        <h2 class="display display--lg display--mid">${accentHtml(home.rabbis.title, home.rabbis.titleAccent)}</h2>
      </div>
      ${renderRabbisWall(rabbis)}
    </div>
  </section>

  <section class="section section--band" id="promise">
    ${ambient({ variant: 'c', mark })}
    <div class="container stack-center">
      <h2 class="display display--lg display--stack display--promise display--center">${splitTitleHtml(home.promise.titleLead, home.promise.titleAccent)}</h2>
      <p style="max-width:54ch">${home.promise.body}</p>
      <p class="punch">${home.promise.punch}</p>
      <span class="badge-gold"><span>${home.promise.freeBadge}</span></span>
      <div class="negations">
        ${home.promise.negations
          .map(
            (t) => `
          <div class="negation">
            <span class="negation__x" aria-hidden="true">✕</span>
            <span>${t}</span>
          </div>`,
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section" id="story">
    ${ambient({ variant: 'b', mark })}
    <div class="container--text stack" style="margin-inline:auto;gap:26px">
      <h2 class="display display--lg display--ruled display--story">${accentHtml(home.story.title, home.story.titleAccent)}</h2>
      <p>${nl2br(home.story.body)}</p>
      <p class="quote-gold">${home.story.punch}</p>
    </div>
  </section>

  <section class="section section--band" id="faq">
    ${ambient({ variant: 'c', mark })}
    <div class="container--narrow stack" style="margin-inline:auto;gap:var(--space-block)">
      <h2 class="display display--lg display--center display--mid">${accentHtml(home.faq.title, home.faq.titleAccent)}</h2>
      ${renderFaq(faq)}
    </div>
  </section>

  <section class="section section--glow" id="cta-final">
    ${ambient({ variant: 'd', mark })}
    <div class="container stack-center" style="gap:22px;max-width:680px">
      <h2 class="display display--lg display--center display--final">${accentHtml(home.finalCta.title, home.finalCta.titleAccent)}</h2>
      ${renderCta({
        href: site.paths.start,
        label: home.finalCta.cta,
        underlineWord: home.finalCta.ctaUnderlineWord,
        attrs: 'data-track="cta_final"',
      })}
    </div>
  </section>
</main>
${renderFooter()}`
}
