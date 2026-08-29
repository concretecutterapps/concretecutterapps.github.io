document.addEventListener('DOMContentLoaded', () => {
  const prefixes = { no: '', en: 'en', sv: 'sv', da: 'da', de: 'de', pl: 'pl', nl: 'nl', fi: 'fi' };
  const path = location.pathname;
  const match = path.match(/^\/(en|sv|da|de|pl|nl|fi)(\/|$)/);
  const lang = document.documentElement.lang || (match ? match[1] : 'no');
  const stripped = match ? path.slice(match[0].length - 1) : path;
  const page = stripped === '/' ? '' : stripped.replace(/^\//, '').replace(/\/$/, '');
  const suffix = `${location.search}${location.hash}`;
  const select = document.querySelector('.language-picker select');

  if (select) {
    const expectedValue = lang === 'no' ? '/' : `/${lang}/`;
    if (Array.from(select.options).some((option) => option.value === expectedValue)) {
      select.value = expectedValue;
    }

    select.addEventListener('change', () => {
      const raw = select.value;
      const selected = raw.match(/^\/(en|sv|da|de|pl|nl|fi)\/$/)?.[1] || 'no';
      localStorage.setItem('cc-language', selected);

      if (typeof window.ccTrack === 'function') {
        window.ccTrack('language_change', {
          from_language: lang,
          to_language: selected
        });
      }

      const prefix = prefixes[selected] ? `/${prefixes[selected]}` : '';
      location.href = `${prefix}/${page ? `${page}/` : ''}${suffix}`;
    });
  }

  if (/\/privacy\/$/.test(path)) {
    const privacyScript = document.createElement('script');
    privacyScript.src = '/privacy-ga4.js?v=20260829';
    document.head.appendChild(privacyScript);
  }
});
