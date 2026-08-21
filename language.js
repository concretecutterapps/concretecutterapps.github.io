document.addEventListener('DOMContentLoaded', () => {
  const prefixes = { no: '', en: 'en', sv: 'sv', da: 'da', de: 'de', pl: 'pl', nl: 'nl', fi: 'fi' };
  const path = location.pathname;
  const match = path.match(/^\/(en|sv|da|de|pl|nl|fi)(\/|$)/);
  const lang = match ? match[1] : 'no';
  const stripped = match ? path.slice(match[0].length - 1) : path;
  const page = stripped === '/' ? '' : stripped.replace(/^\//, '').replace(/\/$/, '');
  const suffix = `${location.search}${location.hash}`;
  const select = document.querySelector('.language-picker select');

  // Keep the public product name consistent across legacy localized markup.
  const oldName = 'Concrete Cutter Calculator';
  const newName = 'Concrete Cutter';
  if (document.title.includes(oldName)) {
    document.title = document.title.replaceAll(oldName, newName);
  }
  document.querySelectorAll('meta[content]').forEach((meta) => {
    if (meta.content.includes(oldName)) meta.content = meta.content.replaceAll(oldName, newName);
  });
  document.querySelectorAll('[aria-label], [alt]').forEach((element) => {
    if (element.hasAttribute('aria-label') && element.getAttribute('aria-label').includes(oldName)) {
      element.setAttribute('aria-label', element.getAttribute('aria-label').replaceAll(oldName, newName));
    }
    if (element.hasAttribute('alt') && element.getAttribute('alt').includes(oldName)) {
      element.setAttribute('alt', element.getAttribute('alt').replaceAll(oldName, newName));
    }
  });
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    if (node.nodeValue.includes(oldName)) node.nodeValue = node.nodeValue.replaceAll(oldName, newName);
  });

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

  if (/\/privacy\/$/.test(path)) {
    const privacyScript = document.createElement('script');
    privacyScript.src = '/privacy-ga4.js';
    document.head.appendChild(privacyScript);
  }

  if (path === '/' && !localStorage.getItem('cc-language')) {
    location.replace(`/en/${suffix}`);
    return;
  }
  if (path === '/' && localStorage.getItem('cc-language') === 'en') {
    location.replace(`/en/${suffix}`);
    return;
  }

  // Load analytics after title/metadata normalization so GA4 records the correct page title.
  const analyticsScript = document.createElement('script');
  analyticsScript.src = '/analytics.js';
  analyticsScript.async = true;
  document.head.appendChild(analyticsScript);
});
