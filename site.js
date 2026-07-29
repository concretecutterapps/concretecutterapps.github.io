const SCRIPT_URL = new URL(document.currentScript.src);
const SITE_ROOT = new URL('.', SCRIPT_URL);
const IS_EXTERNAL_PREVIEW = location.hostname === 'raw.githack.com';

const LANGS = {
  no: {name:'Norsk',nav:['Personvern','Brukerstøtte','FAQ','Kontakt'],home:'Hjem',download:'Kommer snart på Google Play',tools:'Verktøy laget for faget',why:'Bygget for arbeidshverdagen',preview:'Se appen',premium:'Premium uten abonnement',premiumText:'Fjern annonser og få full tilgang med ett engangskjøp.',points:['Fungerer offline','8 språk','Metric og imperial','kg og lbs','Lokal historikk','Ingen konto nødvendig']},
  en: {name:'English',nav:['Privacy','Support','FAQ','Contact'],home:'Home',download:'Coming soon on Google Play',tools:'Tools built for the trade',why:'Built for the working day',preview:'See the app',premium:'Premium without a subscription',premiumText:'Remove ads and unlock full access with a one-time purchase.',points:['Works offline','8 languages','Metric and imperial','kg and lbs','Local history','No account required']},
  sv: {name:'Svenska',nav:['Integritet','Support','FAQ','Kontakt'],home:'Hem',download:'Kommer snart på Google Play',tools:'Verktyg för yrket',why:'Byggd för arbetsdagen',preview:'Se appen',premium:'Premium utan abonnemang',premiumText:'Ta bort annonser och få full åtkomst med ett engångsköp.',points:['Fungerar offline','8 språk','Metriskt och imperial','kg och lbs','Lokal historik','Inget konto krävs']},
  da: {name:'Dansk',nav:['Privatliv','Support','FAQ','Kontakt'],home:'Hjem',download:'Kommer snart på Google Play',tools:'Værktøjer til faget',why:'Bygget til arbejdsdagen',preview:'Se appen',premium:'Premium uden abonnement',premiumText:'Fjern annoncer og få fuld adgang med et engangskøb.',points:['Virker offline','8 sprog','Metrisk og imperial','kg og lbs','Lokal historik','Ingen konto nødvendig']},
  de: {name:'Deutsch',nav:['Datenschutz','Support','FAQ','Kontakt'],home:'Start',download:'Demnächst bei Google Play',tools:'Werkzeuge für Profis',why:'Für den Arbeitsalltag entwickelt',preview:'App ansehen',premium:'Premium ohne Abo',premiumText:'Werbung entfernen und Vollzugriff per Einmalkauf erhalten.',points:['Offline nutzbar','8 Sprachen','Metrisch und imperial','kg und lbs','Lokaler Verlauf','Kein Konto erforderlich']},
  pl: {name:'Polski',nav:['Prywatność','Pomoc','FAQ','Kontakt'],home:'Start',download:'Wkrótce w Google Play',tools:'Narzędzia dla fachowców',why:'Stworzona do codziennej pracy',preview:'Zobacz aplikację',premium:'Premium bez abonamentu',premiumText:'Usuń reklamy i uzyskaj pełny dostęp dzięki jednorazowemu zakupowi.',points:['Działa offline','8 języków','System metryczny i imperialny','kg i lbs','Historia lokalna','Bez konta']},
  nl: {name:'Nederlands',nav:['Privacy','Ondersteuning','FAQ','Contact'],home:'Home',download:'Binnenkort op Google Play',tools:'Gereedschap voor het vak',why:'Gebouwd voor de werkdag',preview:'Bekijk de app',premium:'Premium zonder abonnement',premiumText:'Verwijder advertenties en krijg volledige toegang met een eenmalige aankoop.',points:['Werkt offline','8 talen','Metrisch en imperial','kg en lbs','Lokale geschiedenis','Geen account nodig']},
  fi: {name:'Suomi',nav:['Tietosuoja','Tuki','UKK','Yhteystiedot'],home:'Etusivu',download:'Tulossa pian Google Playhin',tools:'Työhön tehdyt työkalut',why:'Rakennettu työpäivää varten',preview:'Katso sovellus',premium:'Premium ilman tilausta',premiumText:'Poista mainokset ja avaa kaikki ominaisuudet kertamaksulla.',points:['Toimii offline','8 kieltä','Metrinen ja imperial','kg ja lbs','Paikallinen historia','Ei tiliä']}
};

const PAGES = ['home','privacy','support','faq','contact'];
const PAGE_PATH = {home:'',privacy:'privacy',support:'support',faq:'faq',contact:'contact'};

function route() {
  if (IS_EXTERNAL_PREVIEW) {
    const params = new URLSearchParams(location.search);
    const lang = LANGS[params.get('lang')] ? params.get('lang') : 'no';
    const page = PAGES.includes(params.get('page')) ? params.get('page') : 'home';
    return {lang,page};
  }
  const parts = location.pathname.split('/').filter(Boolean);
  let lang = 'no';
  let page = 'home';
  if (parts.length && LANGS[parts[0]]) lang = parts.shift();
  if (parts.length && PAGES.includes(parts[0])) page = parts[0];
  return {lang,page};
}

function pathFor(lang,page) {
  if (IS_EXTERNAL_PREVIEW) {
    return `${SITE_ROOT.href}index.html?lang=${encodeURIComponent(lang)}&page=${encodeURIComponent(page)}`;
  }
  return (lang === 'no' ? '' : `/${lang}`) + (PAGE_PATH[page] ? `/${PAGE_PATH[page]}/` : '/');
}

function assetUrl(path) { return new URL(path, SITE_ROOT).href; }
function esc(value) { return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char])); }
function pairs(items,cls='section-list') { return `<div class="${cls}">${items.map(([a,b])=>`<section class="info-card"><h2>${esc(a)}</h2><p>${esc(b)}</p></section>`).join('')}</div>`; }
function logoImage(className,alt) { return `<img class="${className}" data-brand-image alt="${esc(alt)}">`; }

function header(lang,page) {
  const l = LANGS[lang];
  const pages = ['privacy','support','faq','contact'];
  return `<header class="site-header"><div class="container header-inner"><a class="brand" href="${pathFor(lang,'home')}">${logoImage('brand-logo','Concrete Cutter')}</a><button class="menu-button" type="button" aria-expanded="false" aria-controls="main-nav">☰</button><nav id="main-nav">${pages.map((p,i)=>`<a ${page===p?'aria-current="page"':''} href="${pathFor(lang,p)}">${esc(l.nav[i])}</a>`).join('')}</nav><label class="language-picker"><span class="sr-only">Language</span><select id="language-select" aria-label="Language">${Object.entries(LANGS).map(([code,data])=>`<option value="${code}" ${code===lang?'selected':''}>${esc(data.name)}</option>`).join('')}</select></label></div></header>`;
}

function home(t,lang) {
  const l = LANGS[lang];
  return `<main><section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">Concrete Cutter Apps</p><h1>${esc(t.hero_title)}</h1><p class="lead">${esc(t.hero_lead)}</p><div class="hero-actions"><span class="store-badge">${esc(l.download)}</span><a class="button secondary" href="#preview">${esc(l.preview)}</a></div><div class="quick-points">${l.points.slice(0,3).map(x=>`<span>✓ ${esc(x)}</span>`).join('')}</div></div><div class="phone-stage"><div class="phone"><img alt="${esc(l.preview)}"></div><div class="premium-chip">PREMIUM</div></div></div></section><section class="container product-section"><p class="eyebrow">Concrete Cutter</p><h2>${esc(l.tools)}</h2><div class="tool-grid">${t.features.map(([a,b],i)=>`<article class="tool-card"><span class="tool-number">${String(i+1).padStart(2,'0')}</span><h3>${esc(a)}</h3><p>${esc(b)}</p></article>`).join('')}</div></section><section id="preview" class="preview-section"><div class="container preview-grid"><div><p class="eyebrow">${esc(l.preview)}</p><h2>${esc(l.why)}</h2><div class="benefit-grid">${l.points.map(x=>`<div class="benefit"><span>✓</span>${esc(x)}</div>`).join('')}</div></div><div class="screen-frame"><img alt="${esc(l.preview)}"></div></div></section><section class="container premium-section"><div><p class="eyebrow">Concrete Cutter Premium</p><h2>${esc(l.premium)}</h2><p>${esc(l.premiumText)}</p></div><div class="premium-mark">NO<br><span>SUBSCRIPTION</span></div></section></main>`;
}

function pageContent(t,lang,page) {
  let title = '';
  let intro = '';
  let body = '';
  if (page === 'privacy') { title=t.privacy_title; intro=t.privacy_intro; body=`<p class="eyebrow">${esc(t.updated)}</p>`+pairs(t.privacy_sections); }
  if (page === 'support') { title=t.support_title; intro=t.support_intro; body=pairs(t.support_sections); }
  if (page === 'faq') { title=t.faq_title; body=`<div class="faq-list">${t.faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`; }
  if (page === 'contact') { title=t.contact_title; intro=t.contact_intro; body=pairs(t.contact_sections); }
  return `<main class="container content page"><a class="back-link" href="${pathFor(lang,'home')}">← ${esc(LANGS[lang].home)}</a><h1>${esc(title)}</h1>${intro?`<p class="lead narrow">${esc(intro)}</p>`:''}${body}</main>`;
}

async function loadBrandAssets() {
  try {
    const encoded = await (await fetch(assetUrl('assets/logo-horizontal.webp'))).text();
    const bytes = Uint8Array.from(atob(encoded.trim()),c=>c.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));
    document.querySelectorAll('[data-brand-image]').forEach(image=>image.src=url);
  } catch (error) {
    console.warn('Could not load brand image',error);
  }
}

function footer(t,lang) {
  return `<footer><div class="container footer-grid"><div>${logoImage('footer-logo','Concrete Cutter')}<p>© 2026 ${esc(t.footer)}</p></div><div>${['privacy','support','faq','contact'].map((p,i)=>`<a href="${pathFor(lang,p)}">${esc(LANGS[lang].nav[i])}</a>`).join('')}</div></div></footer>`;
}

function render() {
  const {lang,page} = route();
  const t = window.CC_TEXT[lang] || window.CC_TEXT.no;
  document.documentElement.lang = lang;
  document.title = page === 'home' ? 'Concrete Cutter' : `${page==='privacy'?t.privacy_title:page==='support'?t.support_title:page==='faq'?t.faq_title:t.contact_title} – Concrete Cutter`;
  document.querySelector('meta[name="description"]').content = t.meta;
  document.getElementById('app').innerHTML = header(lang,page) + (page==='home'?home(t,lang):pageContent(t,lang,page)) + footer(t,lang);
  const menu = document.querySelector('.menu-button');
  const nav = document.getElementById('main-nav');
  menu.addEventListener('click',()=>{
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded',String(!open));
    nav.classList.toggle('open',!open);
  });
  document.getElementById('language-select').addEventListener('change',event=>{
    localStorage.setItem('cc-language',event.target.value);
    location.href = pathFor(event.target.value,page);
  });
  loadBrandAssets();
}

function boot() {
  const script = document.createElement('script');
  script.src = assetUrl('data.js');
  script.onload = async()=>{
    const bytes = Uint8Array.from(atob(window.CC_DATA_GZ),c=>c.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    window.CC_TEXT = JSON.parse(await new Response(stream).text());
    render();
  };
  script.onerror = ()=>{
    document.getElementById('app').innerHTML = "<main class='container content'><h1>Concrete Cutter</h1><p>Unable to load website content.</p></main>";
  };
  document.head.appendChild(script);
}

boot();
