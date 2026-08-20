(() => {
  const path = location.pathname;
  if (!/\/privacy\/$/.test(path)) return;

  const match = path.match(/^\/(en|sv|da|de|pl|nl|fi)\//);
  const lang = match ? match[1] : 'no';
  const copy = {
    no: ['Analyse av nettstedet', 'Nettstedet bruker Google Analytics 4 til aggregert måling av trafikk og kampanjer, blant annet sidevisninger og trafikkilder. UTM-parametere i delte lenker kan brukes til å skille kampanjer og henvisningskilder. Opplysningene brukes til å forstå generell bruk av nettstedet og effekten av delte lenker.'],
    en: ['Website analytics', 'The website uses Google Analytics 4 for aggregated traffic and campaign measurement, including page views and traffic sources. UTM parameters in shared links may be used to distinguish campaigns and referral sources. This information is used to understand general website usage and the effect of shared links.'],
    sv: ['Analys av webbplatsen', 'Webbplatsen använder Google Analytics 4 för aggregerad mätning av trafik och kampanjer, inklusive sidvisningar och trafikkällor. UTM-parametrar i delade länkar kan användas för att skilja kampanjer och hänvisningskällor. Informationen används för att förstå den allmänna användningen av webbplatsen och effekten av delade länkar.'],
    da: ['Analyse af webstedet', 'Webstedet bruger Google Analytics 4 til aggregeret måling af trafik og kampagner, herunder sidevisninger og trafikkilder. UTM-parametre i delte links kan bruges til at skelne mellem kampagner og henvisningskilder. Oplysningerne bruges til at forstå den generelle brug af webstedet og effekten af delte links.'],
    de: ['Website-Analyse', 'Die Website verwendet Google Analytics 4 zur aggregierten Messung von Traffic und Kampagnen, einschließlich Seitenaufrufen und Traffic-Quellen. UTM-Parameter in geteilten Links können verwendet werden, um Kampagnen und Verweisquellen zu unterscheiden. Die Informationen werden genutzt, um die allgemeine Nutzung der Website und die Wirkung geteilter Links zu verstehen.'],
    pl: ['Analityka witryny', 'Witryna korzysta z Google Analytics 4 do zagregowanego pomiaru ruchu i kampanii, w tym wyświetleń stron i źródeł ruchu. Parametry UTM w udostępnianych linkach mogą służyć do rozróżniania kampanii i źródeł odesłań. Informacje te pomagają zrozumieć ogólne korzystanie z witryny i skuteczność udostępnianych linków.'],
    nl: ['Website-analyse', 'De website gebruikt Google Analytics 4 voor geaggregeerde meting van verkeer en campagnes, waaronder paginaweergaven en verkeersbronnen. UTM-parameters in gedeelde links kunnen worden gebruikt om campagnes en verwijzingsbronnen te onderscheiden. Deze informatie wordt gebruikt om het algemene gebruik van de website en het effect van gedeelde links te begrijpen.'],
    fi: ['Verkkosivuston analytiikka', 'Verkkosivusto käyttää Google Analytics 4:ää liikenteen ja kampanjoiden koottuun mittaamiseen, mukaan lukien sivunäytöt ja liikenteen lähteet. Jaettujen linkkien UTM-parametreja voidaan käyttää kampanjoiden ja viittauslähteiden erottamiseen. Tietoja käytetään verkkosivuston yleisen käytön ja jaettujen linkkien vaikutuksen ymmärtämiseen.']
  };

  const main = document.querySelector('main.content');
  if (!main || main.querySelector('[data-website-analytics]')) return;
  const contactHeading = Array.from(main.querySelectorAll('h2')).find((heading) => heading.nextElementSibling?.querySelector('a[href^="mailto:"]'));
  if (!contactHeading) return;

  const heading = document.createElement('h2');
  heading.dataset.websiteAnalytics = 'true';
  heading.textContent = copy[lang][0];
  const paragraph = document.createElement('p');
  paragraph.textContent = copy[lang][1];
  main.insertBefore(heading, contactHeading);
  main.insertBefore(paragraph, contactHeading);
})();
