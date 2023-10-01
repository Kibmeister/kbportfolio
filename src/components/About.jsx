import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { imageMapAbout } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ServiceCard = ({ index, value, id, activeMediaQuery }) => {
  const iconSrc = imageMapAbout[id];

  // console.log("About mediaquery", activeMediaQuery);

  return (
    <>
      {activeMediaQuery === 'mobile' || activeMediaQuery === 'sm' ? (
        <div className='mobile:w-[250px] w-[250px]'>
          <motion.div
            className='w-full shadow-card bg-white'
            variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
          >
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className='bg-white- py-5 min-h-[280px] flex justify-evenly items-center flex-col'
            >
              <LazyLoadImage
                src={iconSrc}
                alt={value}
                className='w-64 h-64 object-contain'
              />
              <p
                className='garet-book text-black text-[16px] font-semibold'
                style={{ margin: 0 }}
              >
                {value}
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        <Tilt className='mobile:w-[250px] w-[250px]'>
          <motion.div
            className='w-full shadow-card bg-white'
            variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
          >
            <div
              options={{ max: 45, scale: 1, speed: 450 }}
              className='bg-white- py-5 min-h-[280px] flex justify-evenly items-center flex-col'
            >
              <LazyLoadImage
                src={iconSrc}
                alt={value}
                className='w-64 h-64 object-contain'
              />
              <p className={`${styles.tilesP} `} style={{ margin: 0 }}>
                {value}
              </p>
            </div>
          </motion.div>
        </Tilt>
     )} 
    </>
  );
};

const About = ({ activeMediaQuery }) => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('about.p')}</p>
        <h2 className={styles.sectionHeadText}>{t('about.h2')}</h2>
      </motion.div>
      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className={ `${styles.sectionP}`}
      >
        {t('about.subHeader')}
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 '>
        {t('about.tiltcards', { returnObjects: true }).map((value, index) => (
          <ServiceCard
            activeMediaQuery={activeMediaQuery}
            key={value.id}
            index={index}
            {...value}
          />
        ))}
      </div>
    </>
  );
};

// element type is invalid, expexted a string or class/function but received undefined - this is likely due to an export fault
export default SectionWrapper(About, 'about');
