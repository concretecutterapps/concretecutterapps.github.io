document.addEventListener('DOMContentLoaded', () => {
  const supported = ['no', 'en', 'sv', 'da', 'de', 'pl', 'nl', 'fi'];
  const countryToLanguage = { NO: 'no', SE: 'sv', DK: 'da', DE: 'de', PL: 'pl', NL: 'nl', FI: 'fi' };
  const path = location.pathname;
  const match = path.match(/^\/(no|en|sv|da|de|pl|nl|fi)(\/|$)/);
  const lang = document.documentElement.lang || (match ? match[1] : 'en');
  const stripped = match ? path.slice(match[0].length - 1) : path;
  const page = stripped === '/' ? '' : stripped.replace(/^\//, '').replace(/\/$/, '');
  const suffix = `${location.search}${location.hash}`;
  const select = document.querySelector('.language-picker select');
  const manualLanguageKey = 'cc-language';
  const autoLanguageKey = 'cc-auto-language';
  const autoLanguageTimeKey = 'cc-auto-language-time';
  const autoLanguageMaxAge = 30 * 24 * 60 * 60 * 1000;

  const homePathFor = (language) => {
    if (language === 'en') return '/';
    return `/${language}/`;
  };

  const routeFor = (language) => {
    if (!supported.includes(language)) language = 'en';
    if (!page) return homePathFor(language);
    const prefix = language === 'no' ? '' : `/${language}`;
    return `${prefix}/${page}/`;
  };

  const redirectFromRoot = (language) => {
    const target = homePathFor(language);
    if (target !== '/' && path === '/') {
      location.replace(`${target}${suffix}`);
      return true;
    }
    return false;
  };

  if (path === '/') {
    const manualLanguage = localStorage.getItem(manualLanguageKey);
    if (manualLanguage && supported.includes(manualLanguage)) {
      if (redirectFromRoot(manualLanguage)) return;
    } else {
      const cachedLanguage = localStorage.getItem(autoLanguageKey);
      const cachedAt = Number(localStorage.getItem(autoLanguageTimeKey) || 0);
      if (cachedLanguage && supported.includes(cachedLanguage) && Date.now() - cachedAt < autoLanguageMaxAge) {
        if (redirectFromRoot(cachedLanguage)) return;
      } else {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1800);
        fetch('https://ipapi.co/country/', { signal: controller.signal })
          .then((response) => response.ok ? response.text() : Promise.reject(new Error('country lookup failed')))
          .then((country) => {
            const detectedLanguage = countryToLanguage[country.trim().toUpperCase()] || 'en';
            localStorage.setItem(autoLanguageKey, detectedLanguage);
            localStorage.setItem(autoLanguageTimeKey, String(Date.now()));
            redirectFromRoot(detectedLanguage);
          })
          .catch(() => {
            localStorage.setItem(autoLanguageKey, 'en');
            localStorage.setItem(autoLanguageTimeKey, String(Date.now()));
          })
          .finally(() => clearTimeout(timeout));
      }
    }
  }

  const headerActions = document.querySelector('.header-actions');
  const languagePicker = document.querySelector('.language-picker');
  if (headerActions && languagePicker && !headerActions.querySelector('.header-contact-actions')) {
    const labels = {
      no: { facebook: 'Concrete Cutter på Facebook', messenger: 'Send melding på Messenger', email: 'Send e-post til Concrete Cutter' },
      en: { facebook: 'Concrete Cutter on Facebook', messenger: 'Message Concrete Cutter on Messenger', email: 'Email Concrete Cutter' },
      sv: { facebook: 'Concrete Cutter på Facebook', messenger: 'Skicka meddelande på Messenger', email: 'Skicka e-post till Concrete Cutter' },
      da: { facebook: 'Concrete Cutter på Facebook', messenger: 'Send besked på Messenger', email: 'Send e-mail til Concrete Cutter' },
      de: { facebook: 'Concrete Cutter auf Facebook', messenger: 'Nachricht über Messenger senden', email: 'E-Mail an Concrete Cutter senden' },
      pl: { facebook: 'Concrete Cutter na Facebooku', messenger: 'Wyślij wiadomość przez Messenger', email: 'Wyślij e-mail do Concrete Cutter' },
      nl: { facebook: 'Concrete Cutter op Facebook', messenger: 'Stuur een bericht via Messenger', email: 'E-mail Concrete Cutter' },
      fi: { facebook: 'Concrete Cutter Facebookissa', messenger: 'Lähetä viesti Messengerissä', email: 'Lähetä sähköpostia Concrete Cutterille' }
    };
    const text = labels[lang] || labels.en;
    const actions = document.createElement('div');
    actions.className = 'header-contact-actions';
    actions.setAttribute('aria-label', lang === 'no' ? 'Kontakt og sosiale medier' : 'Contact and social media');
    actions.innerHTML = `
      <a class="header-icon-link" data-analytics-event="facebook_header_click" href="https://www.facebook.com/profile.php?id=61595049772372" target="_blank" rel="noopener noreferrer" aria-label="${text.facebook}" title="${text.facebook}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14 8.5V7c0-.8.5-1 1-1h2V3h-2.7C11.6 3 10 4.6 10 7v1.5H8V12h2v9h4v-9h2.7l.5-3.5H14Z"/></svg>
      </a>
      <a class="header-icon-link" data-analytics-event="messenger_header_click" href="https://m.me/61595049772372" target="_blank" rel="noopener noreferrer" aria-label="${text.messenger}" title="${text.messenger}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.9 3 3 6.7 3 11.5c0 2.7 1.3 5.1 3.4 6.6V21l2.7-1.5c.9.3 1.9.5 2.9.5 5.1 0 9-3.7 9-8.5S17.1 3 12 3Zm.9 11.4-2.3-2.5-4.5 2.5 5-5.3 2.4 2.5 4.4-2.5-5 5.3Z"/></svg>
      </a>
      <a class="header-icon-link" data-analytics-event="email_header_click" href="mailto:concretecutter.app@gmail.com" aria-label="${text.email}" title="${text.email}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h18v14H3V5Zm2 2v.3l7 5.1 7-5.1V7H5Zm14 10V9.8l-7 5-7-5V17h14Z"/></svg>
      </a>
    `;
    headerActions.insertBefore(actions, languagePicker);
  }

  if (select) {
    const expectedValue = page ? (lang === 'no' ? '/' : `/${lang}/`) : homePathFor(lang);
    if (Array.from(select.options).some((option) => option.value === expectedValue)) {
      select.value = expectedValue;
    }

    select.addEventListener('change', () => {
      const raw = select.value;
      let selected = 'en';
      if (raw === '/no/' || (raw === '/' && page)) selected = 'no';
      else if (raw === '/' && !page) selected = 'en';
      else selected = raw.match(/^\/(en|sv|da|de|pl|nl|fi)\/$/)?.[1] || 'en';

      localStorage.setItem(manualLanguageKey, selected);

      if (typeof window.ccTrack === 'function') {
        window.ccTrack('language_change', {
          from_language: lang,
          to_language: selected
        });
      }

      location.href = `${routeFor(selected)}${suffix}`;
    });
  }

  if (/\/privacy\/$/.test(path)) {
    const privacyScript = document.createElement('script');
    privacyScript.src = '/privacy-ga4.js?v=20260829';
    document.head.appendChild(privacyScript);
  }
});
