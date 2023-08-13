import { motion } from 'framer-motion';
import { styles } from '../styles.js';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';

import { useTranslation } from 'react-i18next';
import { imageMapTestimonals } from '../constants';

const FeedBackCard = ({ index, testimonial }) => {
  const imgSrc = imageMapTestimonals['one'];
  //TODO: fix the left marign of the header and subheader to fit in with the rest of the page
  return (
    <motion.div
      variants={fadeIn('', 'spring', index * 0.5, 0.75)}
      className='bg-white p-10  xs:w-[px] w-full shadow-card'
    >
      <div className='mt-1 text-black'>
        <p className={`${styles.tilesP}`}>{testimonial.text}</p>
        <div className='mt-7 flex justify-between items-center gap-1'>
          <div className='flex-1 flex flex-col'>
            <p className={ `${styles.tilesFeedbackName}`}>
              <span className='garet-book blue-text-gradient'>@</span>{' '}
              {testimonial.name}
            </p>
            <p className={ `${styles.tilesFeedbackCompany}`}>
              {testimonial.designation} of {testimonial.company}
            </p>
          </div>

          <img
            src={imgSrc}
            alt={`feedback-by${testimonial.company}`}
            className='w-10 h-10 rounded-full object-cover'
          />
        </div>
      </div>
    </motion.div>
  );
};

//the below class has some funky left and right horizontal margins
const Feedbacks = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('testimonals.p')}</p>
        <h2 className={styles.sectionHeadText}>{t('testimonals.h2')}</h2>
      </motion.div>
      <div className='w-full flex'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className={`${styles.sectionP}`}
        >
          {t('testimonals.subHeader')}
        </motion.p>
      </div>

      <div className={` mt-10 flex flex-wrap gap-7`}>
        {t('testimonals.entries', { returnObjects: true }).map(
          (testimonial, index) => (
            <FeedBackCard key={index} index={index} testimonial={testimonial} />
          )
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Feedbacks);
