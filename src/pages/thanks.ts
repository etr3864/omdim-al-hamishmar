import { site } from '@/config/site'
import { thanks } from '@/content/thanks'
import { accentHtml } from '@/lib/dom'
import { ambient } from '@/ui/ambient'
import { renderCta } from '@/ui/cta'
import { renderFooter, renderHeader } from '@/ui/shell'

export function renderThanksPage(): string {
  const mark = site.logos.markGold
  const sharePreview = thanks.share.message.replace('{url}', site.url)
  return `
${renderHeader('thanks')}
<main>
  <section class="hero" style="padding:clamp(64px,12vw,120px) 0">
    ${ambient({ variant: 'd', mark })}
    <span class="hero__basad">בס״ד</span>
    <div class="container stack-center" style="max-width:720px;gap:22px">
      <img src="${site.logos.mark}" alt="" width="96" height="96" style="width:96px;height:auto">
      <h1 class="display" style="font-size:clamp(2.2rem,8vw,4.4rem)">${accentHtml(thanks.title, thanks.titleAccent)}</h1>
      <div class="counter-row">
        <span>${thanks.counterBefore}</span>
        <span class="counter-row__n" data-counter data-target="${site.counterText}">0</span>
        <span>${thanks.counterAfter}</span>
      </div>
    </div>
  </section>

  <section class="section section--band" id="video-2" style="padding-block:clamp(3.5rem,9vw,6rem)">
    ${ambient({ variant: 'a', mark })}
    <div class="container--narrow stack-center" style="margin-inline:auto;gap:22px">
      <h2 class="display display--md display--center display--mid">${accentHtml(thanks.video.title, thanks.video.titleAccent)}</h2>
      <div class="video-frame video-frame--vertical">
        <video controls playsinline preload="metadata" poster="${site.videos.sandroPoster}"
          data-track-play="video_sandro">
          <source src="${site.videos.sandro}" type="video/mp4">
        </video>
      </div>
    </div>
  </section>

  <section class="section" id="relapse" style="padding-block:clamp(3.5rem,9vw,6rem)">
    ${ambient({ variant: 'b', mark })}
    <div class="container--text stack" style="margin-inline:auto;gap:20px">
      <h2 class="display display--md display--ruled">${accentHtml(thanks.relapse.title, thanks.relapse.titleAccent)}</h2>
      <p>${thanks.relapse.body}</p>
    </div>
  </section>

  <section class="section section--band section--glow" id="share" style="padding-block:clamp(4rem,10vw,7rem)">
    ${ambient({ variant: 'c', mark })}
    <div class="container--text stack" style="margin-inline:auto;gap:22px;align-items:center;text-align:center">
      <h2 class="display display--md display--center">${accentHtml(thanks.share.title, thanks.share.titleAccent)}</h2>
      <p>${thanks.share.body}</p>
      <div class="friend-box share-box">
        <p style="color:var(--text-1);line-height:1.8;text-align:right">״${sharePreview}״</p>
        ${renderCta({
          label: thanks.share.cta,
          className: 'cta--sm cta--hero',
          attrs: 'data-action="share-wa" data-track="share_whatsapp"',
        })}
      </div>
    </div>
  </section>
</main>
${renderFooter()}`
}
