import React from 'react';
import ReactPlayer from 'react-player';
import { useTranslation } from 'react-i18next';

const Coffeecan = ({ feedback, onClose }) => {
   const { t, i18n } = useTranslation();
  return (
    <div class='fixed inset-0 z-30 mx:auto bg-white flex justify-center items-center h-screen w-screen overflow-y-auto'>
      <div class='bg-white w-full h-full relative flex flex-col justify-between p-8'>
        <div className='header'>
          <h1 class='garet-heavy text-4xl font-bold mb-2 pl-12 mobile:mt-5'>
            {t('portfolio.coffeecan.title')}
          </h1>
          <h3 class='garet-book text-1xl italic mb-14 pl-12'>
            {t('portfolio.coffeecan.caption')}
          </h3>
        </div>

        <div class='flex flex-wrap'>
          <button
            onClick={onClose}
            className='garet-book absolute top-4 right-4'
          >
            {t('portfolio.coffeecan.buttonclose')}
          </button>
          <div class='w-full md:w-1/3 px-12 mb-8 md:mb-0'>
            <h2 class='garet-book text-2xl mb-14'>
              {t('portfolio.coffeecan.feedbackdesignT')}
            </h2>
            <p class='garet-book mb-12'>
              {t('portfolio.coffeecan.feedbackdesignP')}
            </p>

            <img src={feedback} alt='Feedback Design' class='w-full mb-12' />
            <ul class='list-disc list-inside mb-12 space-y-4'>
              {t('portfolio.coffeecan.ul', { returnObjects: true }).map(
                (item, index) => (
                  <li className='garet-book' key={index}>
                    {' '}
                    {item.value}
                  </li>
                )
              )}
            </ul>
          </div>
          <div class='w-full md:w-2/3 px-12'>
            <h2 class='garet-book text-2xl mb-14'>
              {t('portfolio.coffeecan.storyT')}
            </h2>
            <p class='garet-book mb-12 max-w-[800px]'>
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
  );
};

export default Coffeecan;
