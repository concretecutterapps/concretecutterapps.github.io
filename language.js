document.addEventListener('DOMContentLoaded', () => {
  const prefixes = { no: '', en: 'en', sv: 'sv', da: 'da', de: 'de', pl: 'pl', nl: 'nl', fi: 'fi' };
  const path = location.pathname;
  const match = path.match(/^\/(en|sv|da|de|pl|nl|fi)(\/|$)/);
  const lang = match ? match[1] : 'no';
  const stripped = match ? path.slice(match[0].length - 1) : path;
  const page = stripped === '/' ? '' : stripped.replace(/^\//, '').replace(/\/$/, '');
  const suffix = `${location.search}${location.hash}`;
  const select = document.querySelector('.language-picker select');

  if (select) {
    const codeOption = Array.from(select.options).some((option) => option.value === lang);
    select.value = codeOption ? lang : (lang === 'no' ? '/' : `/${lang}/`);

    select.addEventListener('change', () => {
      const raw = select.value;
      const selected = raw.startsWith('/')
        ? (raw.match(/^\/(en|sv|da|de|pl|nl|fi)\/$/)?.[1] || 'no')
        : raw;
      localStorage.setItem('cc-language', selected);
      const prefix = prefixes[selected] ? `/${prefixes[selected]}` : '';
      location.href = `${prefix}/${page ? `${page}/` : ''}${suffix}`;
    });
  }

  if (path === '/' && !localStorage.getItem('cc-language')) {
    location.replace(`/en/${suffix}`);
  } else if (path === '/' && localStorage.getItem('cc-language') === 'en') {
    location.replace(`/en/${suffix}`);
  }
});

const analyticsScript = document.createElement('script');
analyticsScript.src = '/analytics.js';
analyticsScript.async = true;
document.head.appendChild(analyticsScript);
