import { motion } from 'framer-motion';
import React from 'react';

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='black'
    strokeLinecap='round'
    {...props}
  />
);

const Menutoggle = ({ toggle, isOpen, activeMediaQuery }) => (
  <button onClick={toggle}>
    <motion.svg
      width={activeMediaQuery === 'sm' ? '40' : '34'}
      height={activeMediaQuery === 'sm' ? '40' : '34'}
      viewBox='0 0 34 34'
      initial={isOpen ? 'open' : 'closed'}
      animate={isOpen ? 'open' : 'closed'}
    >
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d='M 2 9.423 L 20 9.423'
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </motion.svg>
  </button>
);

export default Menutoggle;
