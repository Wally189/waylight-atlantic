(() => {
  // Year stamp
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const translations = {
    ga: {
      // Nav / brand / footer
      "nav.welcome": "Fáilte",
      "nav.about": "Fúinn",
      "nav.projects": "Tionscadail",
      "nav.pricing": "Praghsanna",
      "nav.hygiene": "Sláinteas Digiteach",
      "nav.tips": "Leideanna Saor",
      "nav.contact": "Teagmháil",
      "brand.tag": "Sláinteas digiteach eiticiúil - Suíomhanna gréasáin - Seachadadh socair",
      "footer.copy": "© <span id='year'></span> WayLight Atlantic. Gach ceart ar cosaint.",

      // Global CTAs
      "cta.book.slot": "Cuir coinne in áirithe",
      "cta.view.packages": "Féach na pacáistí",

      // Index hero
      "hero.kicker": "Téamaí fóntais, caighdeáin nua-aimseartha",
      "hero.title": "Láithreáin ghréasáin chiúine, tacaithe ag córais dhigiteacha atá eagraithe i gceart.",
      "hero.lead": "Tógann WayLight Atlantic láithreáin ghlana, thapa, iontaofa agus glanann muid an praiseach dhigiteach a itheann am, airgead agus foighne. Má tá do shocrú reatha leochaileach nó mearbhall, déanfaimid é daingean.",
      "hero.cta.primary": "Féach na pacáistí",
      "hero.cta.secondary": "Cuir coinne in áirithe",
      "hero.b1": "<strong>Gan cleasa.</strong> Struchtúr soiléir agus rialachas stuama.",
      "hero.b2": "<strong>Seachadadh tapa.</strong> Suíomh oibre is féidir leat a chothabháil gan phian.",
      "hero.b3": "<strong>Eiticiúil de réir dearadh.</strong> Níos lú torainn, níos mó comhartha.",
      "hero.steps.t1": "Éist go gasta",
      "hero.steps.d1": "Glao gearr chun a fháil amach cad atá briste agus cad a chiallaíonn “níos fearr”.",
      "hero.steps.t2": "Seachad an plean",
      "hero.steps.d2": "Runbook soiléir, scóip shocraithe, agus na chéad leathanaigh beo go pras.",
      "hero.steps.t3": "Coinnigh néata é",
      "hero.steps.d3": "Cúram éadrom: cúltacaí, gnáthaimh sláinteais, agus coigeartuithe beaga.",
      "hero.offer.title": "Cad a fhaigheann tú",
      "hero.offer.lead": "Suíomh iontaofa + córas néata taobh thiar de. An cineál is féidir leat a thabhairt do chomhghleacaí tuirseach agus fós tuigtear é.",
      "hero.offer.w1": "Suíomh gréasáin",
      "hero.offer.w1.body": "Leathanaigh ghlana, glaonna gnímh soiléire, inrochtana de réir réamhshocraithe.",
      "hero.offer.w2": "Sláinteas digiteach",
      "hero.offer.w2.body": "Bosca isteach/fillteáin, ainmnithe, ceadanna, cúltacaí, gnáthaimh chiúine.",
      "hero.offer.w3": "Tacaíocht",
      "hero.offer.w3.body": "Aistriú praiticiúil agus nótaí simplí “conas é a rith”.",
      "hero.offer.w4": "Gan cáin an anord",
      "hero.offer.w4.body": "Níos lú athoibre, níos lú iontas, níos lú “cá bhfuil an comhad sin?”.",
      "hero.offer.quick": "<strong>Tosú tapa:</strong> Má fhreagraíonn tú cúpla ceist, is féidir linn rud éigin a sheoladh go han-tapa.",
      "hero.quickstart.cta": "Tosaigh tionscadal",

      // Index sections
      "who.title": "Cé dó é seo",
      "who.sole.title": "Trádálaithe aonair",
      "who.sole.body": "Trádálaithe, seirbhísí áitiúla, comhairleoirí—duine ar bith a dteastaíonn suíomh glan “seo a dhéanaim” uathu a chothaíonn muinín.",
      "who.charity.title": "Carthanais & pobail",
      "who.charity.body": "Teachtaireacht shoiléir, leathanaigh ghlana, agus dromlach rialachais éadrom ionas nach dtiteann rudaí i neamord.",
      "who.teams.title": "Foirne beaga",
      "who.teams.body": "Nuair atá an suíomh ceart go leor ach tá nósanna digiteacha laethúla ag caitheamh uaireanta agus dea-thoil.",
      "good.title": "Conas a fhéachann “maith”",
      "good.lead": "Suíomh a luchtálann go tapa, a léann go soiléir, a fhreagraíonn na ceisteanna soiléire, agus a spreagann daoine chun gníomhú. Taobh thiar de: comhaid agus gnáthaimh nach dtitfidh as a chéile nuair a théann duine ar saoire.",
      "good.l1": "Nascleanúint shimplí, ordlathas ceart leathanaigh",
      "good.l2": "Comharthaí praghsála soiléire (gan rúndacht aisteach)",
      "good.l3": "Cosáin teagmhála a fhaigheann freagraí i ndáiríre",
      "good.l4": "Higéine bunúsach comhlíonta (príobháideachas, fianáin más gá)",
      "good.l5": "Aistrithe a choisceann “stóráil eolais”",
      "good.tip.title": "Mura ndéanann tú ach rud amháin",
      "good.tip.body": "Stad ag úsáid do bhosca isteach agus do fillteán íoslódálacha mar stóráil. Tóg struchtúr beag agus cloí leis.",
      "good.tip.cta": "Faigh na leideanna saor in aisce",
      "how.title": "Conas a oibríonn sé",
      "how.s1.title": "Diagnóis thapa",
      "how.s1.body": "Deich nóiméad chun a aithint cad atá ag briseadh muiníne nó ag caitheamh ama.",
      "how.s2.title": "Tóg / deisiú",
      "how.s2.body": "Seolaimid suíomh glan, oibre agus glanaimid na bunrudaí taobh thiar de.",
      "how.s3.title": "Aistriú",
      "how.s3.body": "Faigheann tú runbook simplí: conas é a nuashonrú, conas é a choinneáil socair.",
      "how.cta.title": "Réidh le bogadh?",
      "how.cta.body": "Seol achoimre ghearr nó cuir glao in áirithe. Coinneoidh WayLight praiticiúil é.",

      // About
      "about.hero.title": "Tógtha do dhaoine ró-ualaithe agus sínte.",
      "about.hero.lead": "Is do dhaoine é WayLight Atlantic a theastaíonn a ndomhan digiteach a bheith ciallmhar uathu: leathanaigh ghlana, fillteáin shoiléire, gnáthaimh stuama, agus suíomh nó ríomhaire a dhéanann an jab gan torann.",
      "about.cares.title": "Cad a bhfuil cúram ar WayLight faoi",
      "about.cares.l1": "<strong>Simplíocht thar chlisteacht.</strong> Córais shimplí a mhaireann an saol fíor.",
      "about.cares.l2": "<strong>Dearadh dírithe ar an úsáideoir.</strong> Go háirithe do dhaoine gnóthacha, mearbhall, nó strusmhara.",
      "about.cares.l3": "<strong>Bunsraitheanna iontaofa.</strong> Níos lú “atógáil”, níos mó “cothabháil”.",
      "about.cares.l4": "<strong>Seachadadh eiticiúil.</strong> Meas ar aird. Meas ar phríobháideachas. Meas ar am.",
      "about.promise.title": "An gealltanas",
      "about.promise.body": "Gheobhaidh tú rud is féidir leat a rith. Ní píosa leochaileach a oibríonn ach má tá WayLight Atlantic thart.",
      "about.how.title": "Conas a oibríonn WayLight",
      "about.how.c1.title": "Achoimre phraiticiúil",
      "about.how.c1.body": "Socraímid toradh amháin. Gearraimid an chuid eile. Faigheann tú seachadadh, ní aisling.",
      "about.how.c2.title": "Struchtúr glan",
      "about.how.c2.body": "Leathanaigh agus ábhar socraithe ionas gur féidir le strainséir é a stiúradh ar lá dona.",
      "about.how.c3.title": "Rialachas ciúin",
      "about.how.c3.body": "Ainmniú, fillteáin, cúltacaí, rochtain—rialacha éadroma a stopann drift.",
      "about.cta.title": "An céim is simplí uait?",
      "about.cta.body": "Inis dúinn cad a dhéanann tú agus cad a chiallaíonn “níos fearr”. Freagróimid le plean díreach.",

      // Projects
      "projects.hero.title": "Cruthúnas ar an modh.",
      "projects.hero.lead": "Tionscadail bheaga a thaispeánann conas a oibríonn dearadh WayLight: struchtúr socair, teanga shoiléir, bunús iontaofa.",
      "projects.meta.title": "Fíricí gasta",
      "projects.meta.1": "Leaganacha fóntais ar dtús",
      "projects.meta.2": "Sláinteas san áireamh",
      "projects.meta.3": "Réidh le hathúsáid",
      "projects.card1.title": "Tírdhreacháil Dhigiteach WayLight",
      "projects.card1.body": "Cur chuige simplí soiléir chun na bunghnéithe digiteacha: fillteáin, ainmnithe, nósanna cúltaca, fógraí níos ciúine.",
      "projects.card1.note": "Úsáideach do: fhoirne gnóthacha, grúpaí pobail, aon duine atá ag iarraidh “cá bhfuil an comhad sin?” a stopadh.",
      "projects.card2.title": "Teimpléid Fhóntais Suímh",
      "projects.card2.body": "Struchtúir leathanaigh in‑athúsáidte a dhéanann an jab: fáiltiú, praghsanna, Ceisteanna Coitianta, teagmháil, agus runbook simplí.",
      "projects.card2.note": "Úsáideach do: thrádálaithe aonair agus eagraíochtaí beaga a dteastaíonn luas agus muinín uathu.",
      "projects.card3.title": "Patrúin Ábhair Chiúine",
      "projects.card3.body": "Rialacha leagain amach do léitheoirí tuirseacha: rannóga gearra, ceannteidil shoiléire, céim eile infheicthe, gan maze nascleanúna.",
      "projects.card3.note": "Úsáideach do: shuímh seirbhíse, carthanais, leathanaigh eolais phoiblí.",
      "projects.cta.title": "Ag iarraidh rud cosúil leis don eagraíocht?",
      "projects.cta.body": "Roghnaigh pacáiste, nó cuir glao in áirithe agus inseoimid an bealach is simplí.",

      // Pricing
      "pricing.hero.title": "Pacáistí soiléire. Gan rúndacht.",
      "pricing.hero.lead": "Roghnaigh an rogha is simplí a thugann suíomh oibre duit agus córas níos ciúine taobh thiar de.",
      "pricing.meta.title": "Cuimsíonn sé",
      "pricing.meta.1": "Tógáil suíomh + glanadh sláinteas",
      "pricing.meta.2": "Aistriúchán simplí i nGaeilge shoiléir",
      "pricing.meta.3": "Freagra i lá gnó",
      "pricing.price.once": "íocaíocht aonuaire",
      "pricing.price.month": "in aghaidh na míosa",
      "pricing.cards.choose.starter": "Roghnaigh Tosaitheoir",
      "pricing.cards.choose.standard": "Roghnaigh Caighdeán",
      "pricing.cards.choose.care": "Roghnaigh Cúram",
      "pricing.cards.popular": "Molta",
      "pricing.cards.starter.title": "Tosaitheoir",
      "pricing.cards.starter.price": "£350.00 íocaíocht aonuaire",
      "pricing.cards.starter.lead": "Láthair ghlan, chreidiúnach — go tapa.",
      "pricing.cards.starter.l1": "Suas le 3 leathanach",
      "pricing.cards.starter.l2": "Bunriachtanais rochtana agus soghluaiste",
      "pricing.cards.starter.l3": "Cosán teagmhála simplí",
      "pricing.cards.starter.l4": "Socrú éadrom ar SEO ar an leathanach",
      "pricing.cards.standard.title": "Caighdeán",
      "pricing.cards.standard.price": "£750.00 íocaíocht aonuaire",
      "pricing.cards.standard.lead": "An “jab ceart” don chuid is mó d’eagraíochtaí beaga.",
      "pricing.cards.standard.l1": "Suas le 7 leathanach",
      "pricing.cards.standard.l2": "Leagan amach nascleanúna + tiontaithe",
      "pricing.cards.standard.l3": "Foirm + cosaint frith-spam",
      "pricing.cards.standard.l4": "Nótaí cothabhála simplí",
      "pricing.cards.standard.l5": "Tiúnadh sláinteas digiteach bunúsach",
      "pricing.cards.care.title": "Cúram & Rialú",
      "pricing.cards.care.price": "£25.00 in aghaidh na míosa",
      "pricing.cards.care.lead": "Ciúnas leanúnach: deisiúcháin bheaga, nuashonruithe, agus rialachas.",
      "pricing.cards.care.l1": "Nuashonruithe & seiceálacha míosúla",
      "pricing.cards.care.l2": "Coigeartuithe ábhair (úsáid chóir)",
      "pricing.cards.care.l3": "Seiceálacha feidhmíochta & inrochtaineachta bunúsacha",
      "pricing.cards.care.l4": "Athbhreithniú ráithiúil sláinteas digiteach",
      "pricing.faq.title": "Nótaí praghsála",
      "pricing.faq.q1": "An ndéanann tú “saor agus dea‑ghreannmhar”?",
      "pricing.faq.a1": "Déanaimid simplí. Déanaimid tapa. Déanaimid inbhuanaithe. Ní dhéanaimid leochaileach.",
      "pricing.faq.q3": "An féidir leat m'fhearann agus ríomhphost reatha a úsáid?",
      "pricing.faq.a3": "Is féidir. Coinneoimid glan agus doiciméadaithe é.",
      "pricing.faq.q4": "An féidir fianáin / anailísíocht a chur leis?",
      "pricing.faq.a4": "Más gá, sea. Mura gá, coimeádfaimid an suíomh níos ciúine.",
      "pricing.needs.title": "Cad a theastaíonn ó WayLight Atlantic uait",
      "pricing.needs.l1": "Do sheirbhísí i dteanga shimplí",
      "pricing.needs.l2": "Aon lógó/dathanna atá agat",
      "pricing.needs.l3": "Sonraí teagmhála agus an gníomh is fearr leat",
      "pricing.needs.l4": "Aon téacs comhlíonta riachtanach (más ann)",
      "pricing.cta.title": "Níl a fhios agat cén pacáiste?",
      "pricing.cta.lead": "Glao 10 nóiméad. Mínímid an rogha is simplí agus cad a bhaintfidh tú amach.",

      // Hygiene
      "hygiene.hero.title": "Rialacha beaga a stopann anord mór.",
      "hygiene.hero.lead": "Sláinteas digiteach: conas a ainmníonn tú rudaí, cá sábhálann tú iad, cé a bhfuil rochtain acu, agus cad a tharlaíonn nuair atá duine as láthair.",
      "hygiene.meta.title": "Fócas",
      "hygiene.meta.1": "Fillteáin agus ainmnithe",
      "hygiene.meta.2": "Rochtain agus ceadanna",
      "hygiene.meta.3": "Cúltacaí agus aistrithe",
      "hygiene.six.title": "Na sé riachtanas",
      "hygiene.s1.title": "Rialacha isteach",
      "hygiene.s1.body": "Ní stóráil é an bosca isteach. Doras é. Próiseáil, cuir i leataobh, nó scrios.",
      "hygiene.s2.title": "Dromlaigh fillteán",
      "hygiene.s2.body": "Struchtúr beag cobhsaí amháin. Gan “misc.” gan teorainn.",
      "hygiene.s3.title": "Coinbhinsiún ainmnithe",
      "hygiene.s3.body": "Dátaí, leaganacha, úinéirí—ionas go n-oibríonn cuardach agus stopann dúbailtí.",
      "hygiene.s4.title": "Sláinteas rochtana",
      "hygiene.s4.body": "Na daoine cearta, ag an leibhéal ceart. Bain eiteoirí. Laghdaigh spleáchas aonair.",
      "hygiene.s5.title": "Cúltacaí",
      "hygiene.s5.body": "Tástáil athchóirithe, ní cúltacaí amháin. Lipéadaigh úinéirí agus dátaí athbhreithnithe.",
      "hygiene.s6.title": "Runbook",
      "hygiene.s6.body": "Leathanach amháin “conas é a rith” ionas go bhfuil clúdach éasca nuair atá duine as láthair.",
      "hygiene.warn.title": "Cad a tharlaíonn nuair a ligtear i ndearmad é?",
      "hygiene.warn.body": "Uaireanta caillte, comhaid caillte, aistrithe mearbhall, agus spleáchas leochaileach ar dhuine amháin.",
      "hygiene.side.title": "Comharthaí go bhfuil cóiriú de dhíth",
      "hygiene.side.l1": "“Tá sé i mo bhosca isteach áit éigin.”",
      "hygiene.side.l2": "Leaganacha éagsúla á seoladh timpeall.",
      "hygiene.side.l3": "Imíonn daoine, fanann rochtain.",
      "hygiene.side.l4": "Níl a fhios ag aon duine cá bhfuil an comhad “reatha”.",
      "hygiene.side.l5": "Gan chúltacaí, nó cúltacaí nár tástáladh riamh.",
      "hygiene.cta.title": "Ag iarraidh é seo a dhéanamh néata?",
      "hygiene.cta.body": "Roghnaigh pacáiste nó cuir glao in áirithe. Aithneoimid an fhadhb agus déanfaimid na bunrudaí a dheisiú go tapa.",

      // Freebie
      "freebie.hero.title": "Deich gcóiriú ciúine is féidir leat a dhéanamh an tseachtain seo.",
      "freebie.hero.lead": "Gan aipeanna. Gan uirlisí costasacha. Rialacha beaga a stopann anord.",
      "freebie.meta.title": "Cad atá istigh",
      "freebie.meta.1": "10 mbua tapa",
      "freebie.meta.2": "Gan bogearraí le ceannach",
      "freebie.meta.3": "Léamh 5 nóiméad",
      "freebie.t1": "<strong>Ní stóráil í an bosca isteach.</strong> Má theastaíonn uait é níos déanaí, comhadlannaigh é. Má theastaíonn gníomh, tabhair tasc dó. Mura bhfuil gá, scrios.",
      "freebie.t2": "<strong>Cruthaigh dromlaigh 5 fhillteán.</strong> 01_Admin, 02_Active, 03_Reference, 04_Records, 99_Archive.",
      "freebie.t3": "<strong>Bain úsáid as dátaí in ainmneacha comhad.</strong> Cuireann YYYY-MM-DD ag an tús ord agus cuardach i gceart.",
      "freebie.t4": "<strong>Stad anord leaganacha.</strong> Comhad “reatha” amháin, úinéir amháin. Léann an chuid eile, ní scríobhann.",
      "freebie.t5": "<strong>Scríobh an líne ábhair i gceart.</strong> “Gníomh de dhíth roimh Aoine: …” is fearr ná “Hi”.",
      "freebie.t6": "<strong>Úsáid cuardach, ní scrollú.</strong> Foghlaim 3 chuardach a úsáideann tú go laethúil agus sábháil iad.",
      "freebie.t7": "<strong>Maraigh fógraí torannacha.</strong> Fág ach: teachtaireachtaí díreacha, meabhrúcháin féilire, agus tagairtí práinneacha.",
      "freebie.t8": "<strong>Coinnigh runbook aon leathanaigh.</strong> “Cá bhfuil comhaid, cé a bhfuil úinéir, conas a nuashonraítear.”",
      "freebie.t9": "<strong>Atheagar seachtainiúil 15 nóiméad.</strong> Glan íoslódálacha, próiseáil bosca isteach, athainmnigh 5 chomhad i gceart.",
      "freebie.t10": "<strong>Déan “críochnaithe” infheicthe.</strong> Cosnaíonn liosta gearr de chinn réitithe ó ríomhphoist chiorclacha agus amhras.",
      "freebie.cta.title": "An bhfuil cabhair uait chun iad seo a chur i bhfeidhm?",
      "freebie.cta.body": "Roghnaigh pacáiste nó cuir coinne in áirithe. Glanfaidh muid na bunrudaí agus fágfaidh muid runbook leat.",
      "freebie.cta.link": "Cad é sláinteas digiteach?",

      // Contact
      "contact.title": "Cuir glao in áirithe nó seol achoimre.",
      "contact.lead": "Coinnigh gearr é. Freagróimid leis an gcéim is simplí chun toradh a bhaint amach.",
      "contact.expect.title": "Cad a bheith ag súil leis",
      "contact.expect.1": "Freagra laistigh de lá gnó amháin",
      "contact.expect.2": "Céim shimplí eile, gan turscar",
      "contact.expect.3": "Glao nó achoimre scríofa — do rogha féin",
      "contact.call.title": "Cuir glao in áirithe",
      "contact.call.body": "Cliceáil an nasc chun sliotán a chur in áirithe.",
      "contact.form.title": "Seol achoimre ghearr",
      "contact.form.honeypot": "Fág é seo folamh:",
      "contact.form.name": "Ainm",
      "contact.form.name.ph": "D'ainm",
      "contact.form.email": "Ríomhphost",
      "contact.form.email.ph": "tusa@sampla.com",
      "contact.form.org": "Eagraíocht (roghnach)",
      "contact.form.org.ph": "Ainm eagras nó tionscadail",
      "contact.form.need": "Cad atá uait?",
      "contact.form.need.select": "Roghnaigh…",
      "contact.form.need.o1": "Suíomh Gréasáin nua",
      "contact.form.need.o2": "Glanadh suímh ghréasáin",
      "contact.form.need.o3": "Glanadh sláinteas digiteach",
      "contact.form.need.o4": "Cúram leanúnach",
      "contact.form.message": "Teachtaireacht",
      "contact.form.message.ph": "Cad a dhéanann tú, cad atá briste, agus cad is brí le “níos fearr”.",
      "contact.form.submit": "Seol achoimre",
      "contact.form.consent": "Trí é a sheoladh, aontaíonn tú teagmháil faoi do cheist."
    }
  };

  const langBtns = document.querySelectorAll("[data-lang-btn]");
  const root = document.documentElement;
  const body = document.body;

  const applyTranslations = (lang) => {
    body.dataset.lang = lang;
    if (lang === "ga") {
      root.style.setProperty("--teal", "#1d4f3b");
      root.style.setProperty("--teal-2", "#163b2d");
      root.style.setProperty("--muted", "#556351");
    } else {
      root.style.removeProperty("--teal");
      root.style.removeProperty("--teal-2");
      root.style.removeProperty("--muted");
    }
    
    // Handle localized images
    document.querySelectorAll('[data-lang-image]').forEach((img) => {
      const imgLang = img.getAttribute('data-lang-image');
      if (imgLang === lang) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });

    // Handle localized text blocks
    document.querySelectorAll('[data-lang-block]').forEach((block) => {
      const blockLang = block.getAttribute('data-lang-block');
      block.classList.toggle('active', blockLang === lang);
    });
    
    const dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict && dict[key]) {
        el.textContent = dict[key];
      } else if (lang === "en") {
        const original = el.getAttribute("data-i18n-en");
        if (original) el.textContent = original;
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      } else if (lang === "en") {
        const original = el.getAttribute("data-i18n-html-en");
        if (original) el.innerHTML = original;
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict && dict[key]) {
        el.setAttribute("placeholder", dict[key]);
      } else if (lang === "en") {
        const original = el.getAttribute("data-i18n-placeholder-en");
        if (original) el.setAttribute("placeholder", original);
      }
    });
    document.querySelectorAll("[data-i18n-option]").forEach((el) => {
      const key = el.getAttribute("data-i18n-option");
      if (dict && dict[key]) {
        el.textContent = dict[key];
      } else if (lang === "en") {
        const original = el.getAttribute("data-i18n-option-en");
        if (original) el.textContent = original;
      }
    });
  };

  langBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-btn");
      localStorage.setItem("waylight-lang", lang);
      langBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
      applyTranslations(lang);
    });
  });

  const defaultLang = root.lang && root.lang.toLowerCase().startsWith("ga") ? "ga" : "en";
  const initialLang = defaultLang;

  langBtns.forEach((b) => b.classList.toggle("is-active", b.getAttribute("data-lang-btn") === initialLang));
  applyTranslations(initialLang);
  localStorage.setItem("waylight-lang", initialLang);

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.classList.add('loaded');
    });
  }
})();
