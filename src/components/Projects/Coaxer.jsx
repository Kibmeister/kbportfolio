import React from 'react';
import { useTranslation } from 'react-i18next';

const Coaxer = ({ onClose, coaxerBackground }) => {
  //retrieving the t object
  const { t, i18n } = useTranslation();

  return (
    <div className='fixed z-30 inset-0 flex justify-center items-center h-screen w-screen'>
      <div className=' bg-white w-full h-full relative flex flex-col justify-between'>
        <button onClick={onClose} className='absolute top-4 right-4'>
          {t('portfolio.coaxer.buttonclose')}
        </button>
        <div
          id='svg-container'
          className='flex-1'
          onClick={() => {
            window.open(
              'https://www.figma.com/proto/VV2pmxTkpHyAONnmwdfDUM/Coaxer?page-id=1%3A2&type=design&node-id=1-853&viewport=738%2C262%2C0.08&scaling=min-zoom&starting-point-node-id=1%3A853',
              '_blank'
            );
          }}
        >
          <img
            src={coaxerBackground}
            alt='projectimage'
            className='object-contain mx-auto my-auto w-full h-full max-h-full max-w-full cursor-pointer'
            style={{
              maxHeight: '100vh',
            }}
          />
        </div>
      </div>
    </div>
  );
};


export default Coaxer;
