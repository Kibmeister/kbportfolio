import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  multimodalThumbnail,
  topicoThumbnail,
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
  mike
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
  ux: web,
  ui: mobile,
  productdesigner: backend,
  frontenddeveloper: creator,
};

const imageMapExperience = {
  fourhuman: fourhuman,
  kantega: kantega,
};

const imageMapWorks = {
  topico: topicoThumbnail,
  coffeecan: multimodalThumbnail,
  coaxer: coaxerEN,
  ringmerking: RingmerkingEN,
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
}

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'React.js Developer',
    company_name: 'Starbucks',
    icon: starbucks,
    iconBg: '#383E56',
    date: 'March 2020 - April 2021',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'React Native Developer',
    company_name: 'Tesla',
    icon: tesla,
    iconBg: '#E6DEDD',
    date: 'Jan 2021 - Feb 2022',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'Web Developer',
    company_name: 'Shopify',
    icon: shopify,
    iconBg: '#383E56',
    date: 'Jan 2022 - Jan 2023',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
  {
    title: 'Full stack Developer',
    company_name: 'Meta',
    icon: meta,
    iconBg: '#E6DEDD',
    date: 'Jan 2023 - Present',
    points: [
      'Developing and maintaining web applications using React.js and other related technologies.',
      'Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.',
      'Implementing responsive design and ensuring cross-browser compatibility.',
      'Participating in code reviews and providing constructive feedback to other developers.',
    ],
  },
];

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
    description:
      'Mobile application that enables birdwatchers to register bird sightseenigs and follow up on these birds to see their habitat and more specifc information ',
    tags: [
      {
        name: 'figma',
        color: 'blue-text-gradient',
      },
      {
        name: 'design remake',
        color: 'green-text-gradient',
      },
      {
        name: 'mobile',
        color: 'pink-text-gradient',
      },
    ],
    image: RingmerkingEN,
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Coaxer',
    type: 'coaxer',
    description:
      'Mobile time management app developed through an ultra-personalized design process with the aim to alleviate stress and strucure tasks for the busy studnet by emitting personalized notification sounds.',
    tags: [
      {
        name: 'react',
        color: 'blue-text-gradient',
      },
      {
        name: 'restapi',
        color: 'green-text-gradient',
      },
      {
        name: 'scss',
        color: 'pink-text-gradient',
      },
    ],
    image: coaxerEN,
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Multimodal coffeecan',
    type: 'coffeecan',
    description:
      'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.',
    tags: [
      {
        name: 'nextjs',
        color: 'blue-text-gradient',
      },
      {
        name: 'supabase',
        color: 'green-text-gradient',
      },
      {
        name: 'css',
        color: 'pink-text-gradient',
      },
    ],
    image: multimodalThumbnail,
    source_code_link: 'https://github.com/',
  },
  {
    name: 'Topico EduTech',
    type: 'topico',
    description:
      'A EduTech tool designed for fostering collaborative work for 6th grade students, with the aim of enhancing their vocabulary of a foreign language',
    tags: [
      {
        name: 'Product design',
        color: 'blue-text-gradient',
      },
      {
        name: 'Design research',
        color: 'green-text-gradient',
      },
      {
        name: 'UI/UX design',
        color: 'pink-text-gradient',
      },
    ],
    image: topicoThumbnail,
    source_code_link: 'https://github.com/',
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
  technologies,
  experiences,
  testimonials,
  projects,
  heroTags,
  LANGUAGES,
  imageMapCoaxer,
  imageMapRingmerking,
  imageMapTestimonals,
};
