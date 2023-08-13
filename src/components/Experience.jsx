import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { textVariant } from '../utils/motion';
import { useTranslation } from 'react-i18next';
import { imageMapExperience } from '../constants';

const ExperienceCard = ({ experience }) => {
  const iconSrc = imageMapExperience[experience.id];

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#FDFDFD',
        color: '#000000',
        boxShadow: '0px 8px 24px 0px rgba(0,0,0,0.15)',
        fontFamily: 'garet-book',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #FDFDFD' }}
      date={experience.date}
      iconStyle={{ background: 'rgb(255, 255, 255)', color: '#fff' }}
      icon={
        <div className='flex justify-center items-center w-full h-full shadown '>
          <img
            src={iconSrc}
            alt={experience.title}
            className='w-[60%] h-[60%] object-contain '
          />
        </div>
      }
    >
      <div>
        <h3 className={`${styles.tilesHeader}`}>{experience.title}</h3>
        <p
          className='garet-book text-black text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.profession}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.workdescription.map((workdesc, index) => (
          <li key={`experience-point-${index}`} className={`${styles.tilesP}`}>
            {workdesc.value}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('workexperience.p')}</p>
        <h2 className={styles.sectionHeadText}>{t('workexperience.h3')}</h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline lineColor={'#1d1d1e'}>
          {t('workexperience.experiences', { returnObjects: true }).map(
            (experience, index) => (
              <ExperienceCard
                key={experience.id}
                index={index}
                experience={experience} // pass the whole experience object as one prop
              />
            )
          )}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, 'work');
