import React from 'react';
import {Tilt} from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { imageMapAbout } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useTranslation } from 'react-i18next';

const ServiceCard = ({ index, value, id }) => {
const iconSrc = imageMapAbout[id];

  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div
        className='w-full shadow-card bg-white'
        variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className='bg-white- py-5 px-12 min-h-[280px] flex justify-evenly items-center felx-col'
        >
          <img src={iconSrc} alt={value} className='w-16 h-16 object-contain' />
          <h3 className=' text-[20px] garet-book text-center text-black'>
            {value}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('about.p')}</p>
        <h2 className={styles.sectionHeadText}>{t('about.h2')}</h2>
      </motion.div>
      <motion.p
        vairants={fadeIn('', '', 0.1, 1)}
        className='garet-book mt-4 text-black text-[17px] max-w-3xl leading-[30px]'
      >
        {t('about.subHeader')}
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 '>
        {t('about.tiltcards', { returnObjects: true }).map((value, index) => (
          <ServiceCard key={value.id} index={index} {...value} />
        ))}
      </div>
    </>
  );
};

// element type is invalid, expexted a string or class/function but received undefined - this is likely due to an export fault
export default SectionWrapper(About, 'about');
