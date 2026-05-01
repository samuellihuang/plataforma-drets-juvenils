import React, { createContext, useContext, useState, useEffect } from 'react';

export const translations = {
  ca: {
    nav: {
      home: 'Inici',
      simulator: 'Simulador',
      chat: 'Assessor IA',
      langLabel: 'ES',
    },
    home: {
      badge: 'ODS 16 · Pau, Justícia i Institucions',
      heroLine1: 'Coneix els teus',
      heroLine2: 'drets legals',
      heroDesc: 'Plataforma educativa sobre drets per a joves a Espanya. Aprèn les lleis que et protegeixen amb simuladors interactius i assessorament intel·ligent.',
      entry1Label: 'Simulador d\'escenaris',
      entry1Desc: '24 situacions reals · 6 categories',
      entry2Label: 'Assessor legal amb IA',
      entry2Desc: 'Respostes en català · Disponible 24h',
      statScenarios: 'Escenaris',
      statCategories: 'Categories',
      statFree: 'Gratuït',
      howLabel: 'Com funciona',
      howTitle: 'Tres passos per aprendre els teus drets',
      step1Title: 'Escull un escenari',
      step1Desc: 'Tria entre 24 situacions reals organitzades en 6 categories: policia, treball, privacitat, escola, consum i salut.',
      step2Title: 'Pren una decisió',
      step2Desc: 'Llig el context, analitza les opcions disponibles i tria la resposta que creus que és la correcta.',
      step3Title: 'Aprèn els teus drets',
      step3Desc: 'Descobreix quina opció era la millor i per quin motiu, amb les lleis i articles exactes que t\'emparen.',
      toolsLabel: 'Eines',
      toolsTitle: 'Dues eines amb el mateix pes',
      simTitle: 'Simulador d\'escenaris',
      simDesc: 'Practica situacions reals: et para la policia, t\'ofereixen feina sense contracte o et publiquen fotos sense permís. Pren decisions i descobreix quins drets t\'emparen en cada cas.',
      simCta: 'Comença a simular',
      chatTitle: 'Assessor legal amb IA',
      chatDesc: 'Pregunta el que vulguis sobre lleis i drets a un assistent intel·ligent. Respostes clares en català, sense tecnicismes, adaptades a joves i basades en la legislació espanyola vigent.',
      chatTag1: 'Disponible 24h',
      chatTag2: 'Respostes orientatives',
      chatTag3: 'En català',
      chatCta: 'Fes una pregunta',
      odsKicker: 'Objectiu de Desenvolupament Sostenible',
      odsTitle: 'Pau, Justícia i Institucions sòlides',
      odsText: 'L\'ODS 16 de les Nacions Unides promou societats pacífiques i inclusives. Garantir que els joves coneguin els seus drets és la base d\'una democràcia sana i d\'una ciutadania activa i responsable.',
    },
    sim: {
      pageTitle: 'Simulador d\'escenaris',
      pageSubtitle: 'Posa\'t en situació i practica com respondre davant situacions legals reals.',
      allCategories: 'Tots',
      toList: 'Llista completa',
      toQuiz: 'Mode quiz',
      progress: (i, n) => `Escenari ${i} de ${n}`,
      back: '← Tots els escenaris',
      situationLabel: 'La situació',
      optionsHeader: 'Quina és la teva resposta?',
      optionsSub: 'Tria l\'opció que creus que és la correcta.',
      chosenLabel: 'Opció triada',
      resultAdequat: 'Resposta adequada',
      resultInadequat: 'Resposta inadequada',
      resultAtencio: 'Atenció',
      rightTitle: 'El teu dret',
      explainTitle: 'Explicació legal',
      tryAnother: 'Provar un altre escenari',
      retryThis: 'Tornar a aquest escenari',
      backToList: 'Llista d\'escenaris',
      nextQuiz: 'Escenari següent →',
      finishQuiz: 'Finalitzar quiz',
      completeTitle: 'Has completat tots els escenaris!',
      completeText: 'Has practicat totes les situacions.',
      restartQuiz: 'Tornar a començar',
      scenarioWord: 'Escenari',
      loading: 'Carregant escenaris…',
      errorTitle: 'No s\'han pogut carregar els escenaris.',
      retryBtn: 'Torna a intentar-ho',
    },
    chat: {
      headerName: 'Assessor de Drets Juvenils',
      headerStatus: 'Sempre disponible · Respostes orientatives',
      welcomeCA: 'Hola! Soc el teu assessor de drets legals per a joves a Espanya.\n\nPot preguntar-me sobre les teves interaccions amb la policia, drets laborals, privacitat a internet o qualsevol altre tema legal que t\'interessi.\n\nRecorda que les meves respostes són orientatives i no substitueixen un advocat o advocada professional.',
      welcomeES: '¡Hola! Soy tu asesor de derechos legales para jóvenes en España.\n\nPuedes preguntarme sobre tus interacciones con la policía, derechos laborales, privacidad en internet o cualquier otro tema legal que te interese.\n\nRecuerda que mis respuestas son orientativas y no sustituyen a un abogado o abogada profesional.',
      suggestion1: 'Quins drets tinc amb la policia?',
      suggestion2: 'Puc treballar amb 16 anys?',
      suggestion3: 'Què és el ciberassetjament?',
      placeholder: 'Escriu la teva pregunta… (Enter per enviar)',
      hint: 'Shift+Enter per saltar de línia · Enter per enviar',
      disclaimerText: 'Aquesta plataforma és una IA educativa sobre drets dels joves. La informació és orientativa i no substitueix assessorament legal professional.',
      suggestionsLabel: 'Preguntes freqüents:',
    },
    disclaimer: {
      label: 'Avís',
      text: 'Aquesta plataforma és educativa i no substitueix assessorament legal professional. Si tens una situació real, consulta un/a advocat/ada o el teu servei d\'orientació jurídica local.',
    },
  },

  es: {
    nav: {
      home: 'Inicio',
      simulator: 'Simulador',
      chat: 'Asesor IA',
      langLabel: 'CA',
    },
    home: {
      badge: 'ODS 16 · Paz, Justicia e Instituciones',
      heroLine1: 'Conoce tus',
      heroLine2: 'derechos legales',
      heroDesc: 'Plataforma educativa sobre derechos para jóvenes en España. Aprende las leyes que te protegen con simuladores interactivos y asesoramiento inteligente.',
      entry1Label: 'Simulador de escenarios',
      entry1Desc: '24 situaciones reales · 6 categorías',
      entry2Label: 'Asesor legal con IA',
      entry2Desc: 'Respuestas en español · Disponible 24h',
      statScenarios: 'Escenarios',
      statCategories: 'Categorías',
      statFree: 'Gratuito',
      howLabel: 'Cómo funciona',
      howTitle: 'Tres pasos para aprender tus derechos',
      step1Title: 'Elige un escenario',
      step1Desc: 'Elige entre 24 situaciones reales organizadas en 6 categorías: policía, trabajo, privacidad, escuela, consumo y salud.',
      step2Title: 'Toma una decisión',
      step2Desc: 'Lee el contexto, analiza las opciones disponibles y elige la respuesta que crees que es la correcta.',
      step3Title: 'Aprende tus derechos',
      step3Desc: 'Descubre qué opción era la mejor y por qué motivo, con las leyes y artículos exactos que te amparan.',
      toolsLabel: 'Herramientas',
      toolsTitle: 'Dos herramientas con el mismo peso',
      simTitle: 'Simulador de escenarios',
      simDesc: 'Practica situaciones reales: te para la policía, te ofrecen trabajo sin contrato o publican fotos tuyas sin permiso. Toma decisiones y descubre qué derechos te amparan en cada caso.',
      simCta: 'Empieza a simular',
      chatTitle: 'Asesor legal con IA',
      chatDesc: 'Pregunta lo que quieras sobre leyes y derechos a un asistente inteligente. Respuestas claras en español, sin tecnicismos, adaptadas a jóvenes y basadas en la legislación española vigente.',
      chatTag1: 'Disponible 24h',
      chatTag2: 'Respuestas orientativas',
      chatTag3: 'En español',
      chatCta: 'Haz una pregunta',
      odsKicker: 'Objetivo de Desarrollo Sostenible',
      odsTitle: 'Paz, Justicia e Instituciones sólidas',
      odsText: 'El ODS 16 de las Naciones Unidas promueve sociedades pacíficas e inclusivas. Garantizar que los jóvenes conozcan sus derechos es la base de una democracia sana y de una ciudadanía activa y responsable.',
    },
    sim: {
      pageTitle: 'Simulador de escenarios',
      pageSubtitle: 'Ponte en situación y practica cómo responder ante situaciones legales reales.',
      allCategories: 'Todos',
      toList: 'Lista completa',
      toQuiz: 'Modo quiz',
      progress: (i, n) => `Escenario ${i} de ${n}`,
      back: '← Todos los escenarios',
      situationLabel: 'La situación',
      optionsHeader: '¿Cuál es tu respuesta?',
      optionsSub: 'Elige la opción que crees que es la correcta.',
      chosenLabel: 'Opción elegida',
      resultAdequat: 'Respuesta adecuada',
      resultInadequat: 'Respuesta inadecuada',
      resultAtencio: 'Atención',
      rightTitle: 'Tu derecho',
      explainTitle: 'Explicación legal',
      tryAnother: 'Probar otro escenario',
      retryThis: 'Volver a este escenario',
      backToList: 'Lista de escenarios',
      nextQuiz: 'Escenario siguiente →',
      finishQuiz: 'Finalizar quiz',
      completeTitle: '¡Has completado todos los escenarios!',
      completeText: 'Has practicado todas las situaciones.',
      restartQuiz: 'Volver a empezar',
      scenarioWord: 'Escenario',
      loading: 'Cargando escenarios…',
      errorTitle: 'No se pudieron cargar los escenarios.',
      retryBtn: 'Volver a intentarlo',
    },
    chat: {
      headerName: 'Asesor de Derechos Juveniles',
      headerStatus: 'Siempre disponible · Respuestas orientativas',
      welcomeCA: 'Hola! Soc el teu assessor de drets legals per a joves a Espanya.\n\nPot preguntar-me sobre les teves interaccions amb la policia, drets laborals, privacitat a internet o qualsevol altre tema legal que t\'interessi.\n\nRecorda que les meves respostes són orientatives i no substitueixen un advocat o advocada professional.',
      welcomeES: '¡Hola! Soy tu asesor de derechos legales para jóvenes en España.\n\nPuedes preguntarme sobre tus interacciones con la policía, derechos laborales, privacidad en internet o cualquier otro tema legal que te interese.\n\nRecuerda que mis respuestas son orientativas y no sustituyen a un abogado o abogada profesional.',
      suggestion1: '¿Qué derechos tengo con la policía?',
      suggestion2: '¿Puedo trabajar con 16 años?',
      suggestion3: '¿Qué es el ciberacoso?',
      placeholder: 'Escribe tu pregunta… (Enter para enviar)',
      hint: 'Shift+Enter para nueva línea · Enter para enviar',
      disclaimerText: 'Esta plataforma es una IA educativa sobre derechos de los jóvenes. La información es orientativa y no sustituye asesoramiento legal profesional.',
      suggestionsLabel: 'Preguntas frecuentes:',
    },
    disclaimer: {
      label: 'Aviso',
      text: 'Esta plataforma es educativa y no sustituye asesoramiento legal profesional. Si tienes una situación real, consulta un abogado o abogada o tu servicio de orientación jurídica local.',
    },
  },
};

export const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('dj_lang') || 'ca';
  });

  function setLang(newLang) {
    setLangState(newLang);
    localStorage.setItem('dj_lang', newLang);
  }

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
