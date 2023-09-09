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
  oldwebsite,
  uxicon,
  uiicon,
  productdesignicon,
  frontendicon,
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
const modelMapTypewriter = {
  // en: typewriterEn,
  // no: typewriterNo,
  // es: typewriterEs,
  // it: typewriterIt,
  // fr: typewriterFr,
  // de: typewriterDe,
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


const testimonials = [
  {
    testimonial:
      'As the UX Lead at 4human, I have had the pleasure of working closely with Kasper for seven months. In that time, I have seen him develop into a talented and dedicated User Interface (UI) Designer. I wholeheartedly recommend Kasper for any future opportunities in the UI/UX design field. From the very beginning, Kasper demonstrated a keen eye for detail and a deep understanding of the nuances of effective user interface design. He was able to quickly learn and apply the principles of our design system, leading to a seamless integration into our team. His willingness to learn and grow, along with his receptiveness to feedback, made it an absolute joy to work with him. A significant contribution by Kasper during his time at 4human was his development of the foundation for our design system documentation. This has greatly improved the efficiency and consistency of our design projects, ultimately leading to a more cohesive user experience across our product suite. In addition to his technical skills, Kasper possesses excellent communication and collaboration abilities. He was always eager to share his insights and ideas with the team, which fostered a positive and creative work environment. His passion for UI/UX design is evident so I am confident that he will continue to excel in his career.Kasper is a valuable addition to any UX design team. He has not only proven his capabilities as a junior UI/UX designer but has also laid the groundwork for a successful and impactful career in the field. I have no doubt that Kasper will continue to impress and inspire those who have the privilege of working with him.',
    name: 'Mihael Gorensek',
    designation: 'Head Designer',
    company: '4Human',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const projects = [
  {
    name: 'Ringmerking',
    type: 'ringmerking',
    image: RingmerkingEN,
   
  },
  {
    name: 'RingmerkingSlideshow',
    type: 'ringmerkingSlideshow',
    image: RingmerkingEN,
  },
  {
    name: 'Coaxer',
    type: 'coaxer',
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
  modelMapTypewriter,
};
