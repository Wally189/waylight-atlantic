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

    // Share menu
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(document.title);
    const shareMenus = document.querySelectorAll("[data-share-menu]");
    const shareToggles = document.querySelectorAll("[data-share-toggle]");

    shareMenus.forEach((menu) => {
        menu.querySelectorAll("[data-share]").forEach((item) => {
            const type = item.getAttribute("data-share");
            if (type === "facebook") {
                item.setAttribute("href", `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`);
            } else if (type === "x") {
                item.setAttribute("href", `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`);
            } else if (type === "linkedin") {
                item.setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`);
            } else if (type === "email") {
                item.setAttribute("href", `mailto:?subject=${shareTitle}&body=${shareUrl}`);
            } else if (type === "copy") {
                item.addEventListener("click", () => {
                    const label = item.textContent;
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                            item.textContent = "Copied";
                            setTimeout(() => { item.textContent = label; }, 1500);
                        });
                    } else {
                        window.prompt("Copy link:", window.location.href);
                    }
                });
            }
        });
    });

    shareToggles.forEach((btn) => {
        const menu = btn.parentElement?.querySelector("[data-share-menu]");
        if (!menu) return;
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = menu.classList.toggle("is-open");
            btn.setAttribute("aria-expanded", String(isOpen));
        });
    });

    document.addEventListener("click", (event) => {
        shareMenus.forEach((menu) => {
            if (!menu.classList.contains("is-open")) return;
            const wrapper = menu.parentElement;
            if (wrapper && !wrapper.contains(event.target)) {
                menu.classList.remove("is-open");
                const toggle = wrapper.querySelector("[data-share-toggle]");
                if (toggle) toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    const translations = {
        ga: {
            // Nav / brand / footer
            "nav.welcome": "Fáilte",
            "nav.about": "Fáinn",
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
            "projects.meta.3": "Réidh le athúsáid",
            "projects.card1.title": "Tírdhreacháil Dhigiteach WayLight",
            "projects.card1.body": "Cur chuige simplí soiléir chun na bunghnéithe digiteacha: fillteáin, ainmniú, nósanna cúltaca, fógraí níos ciúine.",
            "projects.card1.note": "Úsáideach do: fhoirne gnóthacha, grúpaí pobail, aon duine atá ag iarraidh “cá bhfuil an comhad sin?” a stopadh.",
            "projects.card2.title": "Teimpléid Fhóntais Suímh",
            "projects.card2.body": "Struchtúr leathanaigh in-athúsáidte a dhéanann an jab: fáiltiú, praghsanna, Ceisteanna Coitianta, teagmháil, agus runbook simplí.",
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
