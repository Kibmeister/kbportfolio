import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: "Hello, I'm Kasper",
          subHeader:
            "I'm an interaction designer specialized in UI and UX design. My works are interdiciplinary in form and expression.",
        },
      },
      no: {
        translation: {
          header: 'Hei, jeg er Kasper',
          subHeader:
            'Jeg er en interaksjonsdesigner som spesialiserer meg innenfor UI og UX design. Mine prosjekter er tverrfaglige i fasong og uttrykk.',
        },
      },
      es: {
        translation: {
          header: 'Hola, soy Kasper',
          subHeader:
            'Soy un diseñador de interacción especializado en diseño de interfaz de usuario (UI) y experiencia de usuario (UX). Mis trabajos son interdisciplinarios en forma y expresión.',
        },
      },
      it: {
        translation: {
          header: 'Ciao, sono Kasper.',
          subHeader:
            "Sono un designer di interazione specializzato nel design UI e UX. I miei lavori sono interdisciplinari nella forma e nell'espressione.",
        },
      },
      fr: {
        translation: {
          header: "Bonjour, je m'appelle Kasper.",
          subHeader:
            "Je suis un concepteur d'interaction spécialisé dans la conception d'interface utilisateur (UI) et d'expérience utilisateur (UX). Mes travaux sont interdisciplinaires dans leur forme et leur expression.",
        },
      },
      de: {
        translation: {
          header: 'Hallo, ich bin Kasper',
          subHeader:
            'Ich bin ein Interaction Designer, spezialisiert auf UI- und UX-Design. Meine Arbeiten sind interdisziplinär in Form und Ausdruck.',
        },
      },
    },
  });

export default i18n;
