import {
  multimodalcoffeecanthumbnail,
  usa,
  norway,
  spain,
  italy,
  france,
  germany,
  fourhuman,
  kantega,
  coaxerEN,
  coaxerNO,
  coaxerES,
  coaxerIT,
  coaxerFR,
  coaxerDE,
  RingmerkingEN,
  RingmerkingNO,
  RingmerkingES,
  RingmerkingIT,
  RingmerkingFR,
  RingmerkingDE,
  mike,
  uxicon,
  uiicon,
  productdesignicon,
  frontendicon,
  oldwebsite,
  topicoThumbnailEN,
  topicoThumbnailNO,
  topicoThumbnailES,
  topicoThumbnailIT,
  topicoThumbnailFR,
  topicoThumbnailDE,
  multimodalcoffeecanthumbnailEN,
  multimodalcoffeecanthumbnailNO,
  multimodalcoffeecanthumbnailES,
  multimodalcoffeecanthumbnailIT,
  multimodalcoffeecanthumbnailFR,
  multimodalcoffeecanthumbnailDE,
  coaxerThumbnailEN,
  coaxerThumbnailNO,
  coaxerThumbnailES,
  coaxerThumbnailIT,
  coaxerThumbnailFR,
  coaxerThumbnailDE,
  userresearchericon,
  blidekarusell7,
  blidekarusell1,
  blidekarusell2,
  blidekarusell3,
  blidekarusell4,
  blidekarusell5,
  blidekarusell6,
  empathyMapEN,
  empathyMapNO,
  empathyMapES,
  empathyMapIT,
  empathyMapFR,
  empathyMapDE,
  feedbackResultsEN,
  feedbackResultsNO,
  feedbackResultsES,
  feedbackResultsIT,
  feedbackResultsFR,
  feedbackResultsDE,
} from '../assets';

//only used for internalObserver
export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const LANGUAGES = [
  { label: 'En', code: 'en', icon: usa },
  { label: 'No', code: 'no', icon: norway },
  { label: 'Es', code: 'es', icon: spain },
  { label: 'It', code: 'it', icon: italy },
  { label: 'Fr', code: 'fr', icon: france },
  { label: 'De', code: 'de', icon: germany },
];
const imageMapAbout = {
  ux: uxicon,
  ui: uiicon,
  productdesigner: productdesignicon,
  userresearcher: userresearchericon,
};

const imageMapExperience = {
  fourhuman: fourhuman,
  kantega: kantega,
};

const imageMapWorks = {
  topico: {
    en: topicoThumbnailEN,
    no: topicoThumbnailNO,
    es: topicoThumbnailES,
    it: topicoThumbnailIT,
    fr: topicoThumbnailFR,
    de: topicoThumbnailDE,
  },
  coffeecan: {
    en: multimodalcoffeecanthumbnailEN,
    no: multimodalcoffeecanthumbnailNO,
    es: multimodalcoffeecanthumbnailES,
    it: multimodalcoffeecanthumbnailIT,
    fr: multimodalcoffeecanthumbnailFR,
    de: multimodalcoffeecanthumbnailDE,
  },
  coaxer: {
    en: coaxerThumbnailEN,
    no: coaxerThumbnailNO,
    es: coaxerThumbnailES,
    it: coaxerThumbnailIT,
    fr: coaxerThumbnailFR,
    de: coaxerThumbnailDE,
  },
  coaxerScroll: {
    en: coaxerThumbnailEN,
    no: coaxerThumbnailNO,
    es: coaxerThumbnailES,
    it: coaxerThumbnailIT,
    fr: coaxerThumbnailFR,
    de: coaxerThumbnailDE,
  },
  ringmerking: {
    en: RingmerkingEN,
    no: RingmerkingNO,
    es: RingmerkingES,
    it: RingmerkingIT,
    fr: RingmerkingFR,
    de: RingmerkingDE,
  },
  ringmerkingSlideshow: {
    en: RingmerkingEN,
    no: RingmerkingNO,
    es: RingmerkingES,
    it: RingmerkingIT,
    fr: RingmerkingFR,
    de: RingmerkingDE,
  },
  oldwebsite: {
    en: oldwebsite,
    no: oldwebsite,
    es: oldwebsite,
    it: oldwebsite,
    fr: oldwebsite,
    de: oldwebsite,
  },
};

const imageMapCoaxer = {
  en: coaxerEN,
  no: coaxerNO,
  es: coaxerES,
  it: coaxerIT,
  fr: coaxerFR,
  de: coaxerDE,
};
const imageMapRingmerking = {
  en: RingmerkingEN,
  no: RingmerkingNO,
  es: RingmerkingES,
  it: RingmerkingIT,
  fr: RingmerkingFR,
  de: RingmerkingDE,
};

const imageMapTestimonals = {
  one: mike,
};

const imageMapRingmerkingEmathyMap = {
  en: empathyMapEN,
  no: empathyMapNO,
  es: empathyMapES,
  it: empathyMapIT,
  fr: empathyMapFR,
  de: empathyMapDE,
};

const imageMapRingmerkingResultsMap = {
  en: feedbackResultsEN,
  no: feedbackResultsNO,
  es: feedbackResultsES,
  it: feedbackResultsIT,
  fr: feedbackResultsFR,
  de: feedbackResultsDE,
};

const imageMapImgCarousel = {
  1: { img: blidekarusell1, name: 'Fast AF registrering ' },

  2: { img: blidekarusell2, name: 'Birdfriend' },

  3: { img: blidekarusell3, name: 'Poengregistrering ' },

  4: { img: blidekarusell4, name: 'Weapons of mass registration ' },

  5: { img: blidekarusell5, name: 'Enkel import fra minnekort ' },

  6: { img: blidekarusell6, name: 'Hva er ringmerking? ' },

  7: { img: blidekarusell7, name: 'WTFugl ' },
};

const testimonials = [
  {
    name: 'Mihael Gorensek',
    designation: 'Head Designer',
    company: '4Human',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const projects = [
  {
    name: 'Ringmerking',
    type: 'ringmerkingSlideshow',
    image: RingmerkingEN,
  },
  {
    name: 'Coaxer',
    type: 'coaxer',
    image: coaxerEN,
  },
  {
    name: 'CoaxerScroll',
    type: 'coaxerScroll',
    image: coaxerEN,
  },
  {
    name: 'Multimodal coffeecan',
    type: 'coffeecan',
    image: multimodalcoffeecanthumbnail,
  },
  {
    name: 'Topico EduTech',
    type: 'topico',
    image: topicoThumbnailEN,
  },
];

const heroTags = [
  {
    id: 1,
    term: 'User Interface (UI)',
  },
  {
    id: 2,
    term: 'User Experience (UX)',
  },
  {
    id: 3,
    term: 'Interaction Design',
  },
  {
    id: 4,
    term: 'Information Architecture (IA)',
  },
  {
    id: 5,
    term: 'Wireframe',
  },
  {
    id: 6,
    term: 'Prototype',
  },
  {
    id: 7,
    term: 'Usability Testing',
  },
  {
    id: 8,
    term: 'Accessibility',
  },
  {
    id: 9,
    term: 'Responsive Design',
  },
  {
    id: 10,
    term: 'Mobile First Design',
  },
  {
    id: 11,
    term: 'Visual Design',
  },
  {
    id: 12,
    term: 'Typography',
  },
  {
    id: 13,
    term: 'Color Theory',
  },
  {
    id: 14,
    term: 'Design System',
  },
  {
    id: 15,
    term: 'UI Components',
  },
  {
    id: 16,
    term: 'Animation',
  },
  {
    id: 17,
    term: 'Motion Design',
  },
  {
    id: 18,
    term: 'CSS',
  },
  {
    id: 19,
    term: 'JavaScript',
  },
  {
    id: 20,
    term: 'React',
  },
];

export {
  imageMapAbout,
  imageMapExperience,
  imageMapWorks,
  testimonials,
  projects,
  heroTags,
  LANGUAGES,
  imageMapCoaxer,
  imageMapRingmerking,
  imageMapTestimonals,
  imageMapRingmerkingEmathyMap,
  imageMapImgCarousel,
  imageMapRingmerkingResultsMap,
};
