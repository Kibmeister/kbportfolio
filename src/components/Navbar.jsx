import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks, LANGUAGES } from '../constants';
import { logo, menu, close } from '../assets';
import CustomDropdown from './CustomDropdown';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import { useTranslation } from 'react-i18next';

const Navbar = ({ heroRef, animationClass, selectedLang, setSelectedLang }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [observedElements, setObservedElements] = useState([]);
  const [lastClicked, setLastClicked] = useState(null);
  const [heroInView, setHeroInView] = useState(true);

  // i18n hook
  const { t, i18n } = useTranslation();

  // use effect for intersectionObserver
  useEffect(() => {
    setObservedElements([
      heroRef.current,
      ...navLinks.map(({ id }) => document.querySelector(`#${id}`)),
    ]);
  }, []);

  const entries = useIntersectionObserver(observedElements, {
    rootMargin: '-35% 0px',
    threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), // Create an array of threshold values from 0 to 1 with 0.05 increments
  });

  //listener for which section is hovered
  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === heroRef.current) {
          setHeroInView(true);
          setActive('');
        } else {
          setHeroInView(false);
          if (!lastClicked) {
            setActive(entry.target.id);
          }
        }
      }
    });
  }, [entries, heroRef, lastClicked]);

  // function for listening after language change
  const onChangeLang = (e) => {
    console.log('Newly selected language: ');
    console.log(e);
    const languageCode = e;
    i18n.changeLanguage(languageCode);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <nav
          id='navbar'
          className={`${styles.paddingX} animationClass w-full flew items-center py-5 fixed top-0 z-20  bg-primary`}
        >
          <div
            className={`${styles.paddingX} w-full flex justify-between items-center max-w-7xl mx-auto`}
          >
            {/* The title and the logo of the navbar */}
            <Link
              id='navbar'
              to='/'
              className='flex flex-shrink-0 items-center gap-2'
              onClick={() => {
                setActive('');
                window.scrollTo(0, 0);
              }}
            >
              {/* <img
                src={logo}
                alt='logo'
                width='100'
                height='50'
                className='w-9 h-9 object-container'
              /> */}
              <p className='font-garet-heavy text-black-3 text-[12px] cursor-pointer flex'>
                &nbsp;
                <span>KASPER BORGBJERG</span>
                {/* {t('navBar.title')} */}
              </p>
            </Link>
            <ul className='list-none hidden md:flex flex-row gap-4 ml-4 lg:gap-6 xl:gap-10'>
              {t('navBar.links', { returnObjects: true }).map((link, index) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.id && !heroInView
                      ? 'text-black border-b-2 border-secondary'
                      : 'text-lightblack border-b-2 border-transparent hover:border-secondary'
                  } text-[18px] font-medium cursor-pointer`}
                  onClick={() => {
                    setActive(link.id);
                    setLastClicked(link.id);
                  }}
                >
                  <a data-target={`#${link.id}`} href={`#${link.id}`}>
                    {link.value}
                  </a>
                </li>
              ))}
            </ul>
            <div className='md:block hidden mx-4'>
              <CustomDropdown
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                onChangeLang={onChangeLang}
              />
            </div>

            {/* Hamburger menu containing the link elements when in mobile mode */}
            <div className='md:hidden flex jusstify-end items-center '>
              <img
                src={toggle ? close : menu}
                alt='menu'
                className='w-[28px]
            object-contain cursor-pointer '
                onClick={() => setToggle(!toggle)}
              />
              <div
                className={`${
                  !toggle ? 'hidden' : 'flex'
                } p-6 bg-white absolute top-16 right-0  my-2 min-w-[140px] z-10 shadow-dropdown`}
              >
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                  {t('navBar.links', { returnObjects: true }).map((link) => (
                    <li
                      key={link.id}
                      className={`${
                        active === link.id
                          ? 'text-black active-underline'
                          : 'text-secondary'
                      } hover:text-black- text-[18px] font-medium cursor-pointer hover-underline`}
                      onClick={() => {
                        setActive(link.id);
                        setLastClicked(link.id);

                        setToggle(!toggle);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.value}</a>
                    </li>
                  ))}
                  <li>
                    <CustomDropdown
                      selectedLang={selectedLang}
                      setSelectedLang={setSelectedLang}
                      onChangeLang={onChangeLang}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;
