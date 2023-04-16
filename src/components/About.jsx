import React from 'react';
import {Tilt} from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className='bg-white xs:w-[250px] w-full'>
      <motion.div
        className='w-full shadow-card'
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className='bg-white- py-5 px-12 min-h-[280px] flex justify-evenly items-center felx-col'
        >
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-container-title text-[20px] font-bold text-center'>
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p
        vairants={fadeIn('', '', 0.1, 1)}
        className='mt-4 text-black text-[17px] max-w-3xl leading-[30px]'
      >
        Im a pro, of course im a pro jada jada jada jada jada jada jada jada
        jadajada jada jadajada jada jadavjada jada jadajada jada jadajada jada
        jadajada jada jadajada jada jadajada jada jada
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 '>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

// element type is invalid, expexted a string or class/function but received undefined - this is likely due to an export fault
export default SectionWrapper(About, 'about');
