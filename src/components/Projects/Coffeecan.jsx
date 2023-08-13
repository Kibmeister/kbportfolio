import React from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';
import { styles } from '../../styles';

const Coffeecan = ({ feedback, onClose }) => {
   const { t, i18n } = useTranslation();
  return (
    //
    <div className={`${styles.projectHigherordercomponent}`}>
      <div class={` ${styles.projectWrapper} `}>
        <div class={`${styles.projectContainer}`}>
          <div className='header'>
            <h1 class={`${styles.projectHeader}`}>
              {t('portfolio.coffeecan.title')}
            </h1>
            <h3 class={`${styles.projectSubHeader}`}>
              {t('portfolio.coffeecan.caption')}
            </h3>
          </div>

          <div class={`${styles.projectFlex}`}>
            <button onClick={onClose} className={`${styles.projectHeaderBtn}`}>
              {t('portfolio.coffeecan.buttonclose')}
            </button>
            <div class={`${styles.projectSection}`}>
              <h2 class={`${styles.projectSectionHeader}`}>
                {t('portfolio.coffeecan.feedbackdesignT')}
              </h2>
              <p class={`${styles.projectSectionText}`}>
                {t('portfolio.coffeecan.feedbackdesignP')}
              </p>

              <img src={feedback} alt='Feedback Design' class='w-full mb-12' />
              <ul class='list-disc list-inside mb-12 space-y-4'>
                {t('portfolio.coffeecan.ul', { returnObjects: true }).map(
                  (item, index) => (
                    <li className={`${styles.projectSectionList}`} key={index}>
                      {' '}
                      {item.value}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div class={`${styles.projectSection}`}>
              <h2 class={`${styles.projectSectionHeader}`}>
                {t('portfolio.coffeecan.storyT')}
              </h2>
              <p class={`${styles.projectSectionText} max-w-[700px]`}>
                {t('portfolio.coffeecan.storyP')}
              </p>
              <div class='flex flex-col content start aspect-w-16 aspect-h-9 items-start'>
                <ReactPlayer
                  className='react-player mobile:max-w-[200px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[600px] 2xl:w-full'
                  url='https://vimeo.com/498087574'
                  // width={400}
                  // height={400}
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coffeecan;
