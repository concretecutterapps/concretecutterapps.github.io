const GA_MEASUREMENT_ID = 'G-0SCE80VPX9';

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};

window.gtag('js', new Date());
window.gtag('config', GA_MEASUREMENT_ID, {
  page_title: document.title,
  page_location: window.location.href
});

window.ccTrack = function (eventName, params = {}) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, {
    page_path: window.location.pathname,
    page_language: document.documentElement.lang || 'unknown',
    ...params
  });
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;

  const href = link.href;
  let eventName = link.dataset.analyticsEvent || '';

  if (!eventName && href.includes('apps.apple.com')) eventName = 'app_store_click';
  if (!eventName && href.includes('play.google.com')) eventName = 'google_play_click';
  if (!eventName && link.dataset.tool) eventName = 'tool_cta_click';

  if (eventName) {
    window.ccTrack(eventName, {
      link_url: href,
      link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 100),
      tool: link.dataset.tool || undefined
    });
  }
});

const gaScript = document.createElement('script');
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(gaScript);
