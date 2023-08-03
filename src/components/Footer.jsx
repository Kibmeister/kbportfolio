import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const yourName = '© Kasper Borgbjerg';

  return (
    <div
      className='absolute bottom-0 left-0 right-0 w-full bg-black text-white flex justify-center items-center text-sm p-2'
      style={{ zIndex: '9999' }}
    >
      <p className='garet-book'>{yourName}</p>
      <p className='garet-book ml-2'>{currentYear}</p>
    </div>
  );
};

export default Footer;
