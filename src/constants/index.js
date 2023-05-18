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
  ringmerking,
  coaxer,
  multimodalThumbnail,
  topicoThumbnail,
} from '../assets';

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
  { label: 'English', code: 'en' },
  { label: 'Norwegian', code: 'no' },
  { label: 'Spanish', code: 'es' },
  { label: 'Italian', code: 'it' },
  { label: 'French', code: 'fr' },
  { label: 'German', code: 'de' },
];
const services = [
  {
    title: 'Web Developer',
    icon: web,
  },
  {
    title: 'React Native Developer',
    icon: mobile,
  },
  {
    title: 'Backend Developer',
    icon: backend,
  },
  {
    title: 'Content Creator',
    icon: creator,
  },
];

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
      'I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.',
    name: 'Sara Lee',
    designation: 'CFO',
    company: 'Acme Co',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: 'Chris Brown',
    designation: 'COO',
    company: 'DEF Corp',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: 'Lisa Wang',
    designation: 'CTO',
    company: '456 Enterprises',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
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
    image: ringmerking,
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
    image: coaxer,
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
  services,
  technologies,
  experiences,
  testimonials,
  projects,
  heroTags,
  LANGUAGES,
};
