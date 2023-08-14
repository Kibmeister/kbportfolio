import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { globe } from '../assets';
import { styles } from '../styles';
import { LANGUAGES } from '../constants';

const CustomDropdown = ({ onChangeLang, selectedLang, setSelectedLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleLangChange = (event) => {
    const selectedValue = event.target.value;
    toggleOpen(); // Start the closing animation first
    setSelectedLang(selectedValue);
    onChangeLang(selectedValue);
  };

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        delay: 0.1,
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }),
    closed: {
      clipPath: 'circle(0px at 0px 0px)',
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  // hook for mouseclicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== 'dropdownDefaultButton'
      ) {
        setIsOpen(false); // Close the dropdown
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); //

  return (
    <div className='relative '>
      {/* dropdown button */}
      <div
        id='id_dropdowncontainer'
        className=' relative  flex flex-row justify-start items-center gap-3'
      >
        <button
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className={`${styles.customdropdownBt}`}
          type='button'
          onClick={toggleOpen}
          // initial={false}
          // animate={isOpen ? 'open' : 'closed'}
        >
          {LANGUAGES.find((lang) => lang.code === selectedLang)?.label}
          <svg
            className={`${styles.customdropdownSvg}`}
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect width='100%' height='100%' fill='#1E1E1D' stroke='#1E1E1D' />

            {isOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 15l-7 -7l-7 7'
              ></path>
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19 9l-7 7-7-7'
              ></path>
            )}
          </svg>
        </button>
        <div className='globe-icon-container'>
          <img
            src={globe}
            className={`${styles.customdropdownImg}`}
            alt='glob-icon'
          ></img>
        </div>
      </div>

      {/* dropdown */}
      <motion.div
        id='dropdown'
        ref={dropdownRef}
        variants={sidebar}
        initial='closed'
        animate={isOpen ? 'open' : 'closed'}
        className={`${styles.customdropdown}`}
      >
        <ul
          className={`${styles.customdropdownList}`}
          aria-labelledby='dropdownDefaultButton'
        >
          {LANGUAGES.map(({ code, label, icon }) => (
            <li
              key={code}
              className={`flex flex-row justify-center align-center hover:border-secondary relative ${
                code === selectedLang
                  ? 'text-black border-b-2 border-secondary'
                  : 'text-lightblack border-b-2 border-transparent'
              }`}
            >
              <button
                className='block px-4 py-2  w-full text-left'
                value={code}
                onClick={handleLangChange}
              >
                {label}
              </button>
              <img
                src={icon}
                width='32px'
                height='32x'
                alt='language-icon'
                className={`${styles.customdropdownListImg}`}
              ></img>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default CustomDropdown;
