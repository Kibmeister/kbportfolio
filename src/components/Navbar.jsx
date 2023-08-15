import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks, LANGUAGES } from '../constants';
import { logo, menu, close } from '../assets';
import CustomDropdown from './CustomDropdown';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink } from 'react-scroll';
import Menutoggle from './Menutoggle';

const Navbar = ({
  heroRef,
  animationClass,
  selectedLang,
  setSelectedLang,
  activeMediaQuery,
}) => {
  const [clickActive, setClickActive] = useState(null);
  const [activeLink, setActiveLink] = useState('');
  const [toggle, setToggle] = useState(false);
  const [observedElements, setObservedElements] = useState([]);
  const menuRef = useRef(null); // added line

  const { t, i18n } = useTranslation();

  //hook for fetching the section for the interactionobserver
  useEffect(() => {
    const elements = [
      heroRef.current,
      ...navLinks.map(({ id }) => document.querySelector(`#${id}`)),
    ];
    setObservedElements(elements);
    // console.log('Section elements', elements); // Debug: Check if the elements are correct
    // console.log('Navlink elements', navLinks);
  }, []);

  const entries = useIntersectionObserver(observedElements, {
    rootMargin: '-35% 0px',
    threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
  });
  //hook for handling the states of the active link
  useEffect(() => {
    if (clickActive !== null) return; // Skip if a navigation link was clicked
    // console.log('Entries from the useeffect hook:', entries);
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === heroRef.current) {
          setActiveLink(null);
        } else {
          // console.log('Entry is intersecting', entry.target.id);

          if (clickActive === null) {
            setActiveLink(entry.target.id);
          }
        }
      }
    });
  }, [entries, heroRef, clickActive]);

  const onChangeLang = (e) => {
    const languageCode = e;
    i18n.changeLanguage(languageCode);
  };

  // the animation object for the hamburgerbarmenu
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

  //hook for listening to page click events
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
          className={`${styles.paddingNavbar} ${animationClass} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
        >
          <div
            className={` px-6 mobile:px-0 sm:px-16 w-full sm:min-h-[28px] mobile:min-h-[28px] flex justify-between items-center max-w-7xl mx-auto`}
          >
            <ScrollLink
              to='hero'
              smooth={true}
              duration={200}
              className='flex flex-shrink-0 items-center gap-2'
              onClick={() => {
                setActiveLink('home');
                setClickActive('home');
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${styles.menubrandText}`}
              >
                KASPER BORGBJERG
              </motion.button>
            </ScrollLink>
            <ul className='list-none hidden md:flex flex-row gap-4 ml-4 lg:gap-6 xl:gap-10'>
              {t('navBar.links', { returnObjects: true }).map((link, index) => (
                <li
                  key={link.id}
                  className={`
    ${styles.menulinkText} 
    ${
      activeLink === link.id
        ? 'text-black border-b-2 border-secondary'
        : 'text-lightblack border-b-2 border-transparent hover:border-secondary'
    }`}
                >
                  <ScrollLink
                    className='whitespace-nowrap'
                    to={link.id}
                    smooth={true}
                    duration={200}
                    onClick={() => {
                      setActiveLink(link.id);
                      setClickActive(link.id);
                      setTimeout(() => {
                        setClickActive(null);
                      }, 1000);
                    }}
                  >
                    {link.value}
                  </ScrollLink>
                </li>
              ))}
            </ul>
            <div className='md:block hidden mx-4'>
              <CustomDropdown
                selectedLang={selectedLang}
                setSelectedLang={setSelectedLang}
                onChangeLang={onChangeLang}
                setToggle={setToggle}
              />
            </div>

            {/* hamburgermenu */}

            <div
              ref={menuRef}
              className='md:hidden flex justify-end items-center'
            >
              {/* Menu Toggle Animation */}
              <Menutoggle
                activeMediaQuery={activeMediaQuery}
                toggle={() => setToggle(!toggle)}
                isOpen={toggle}
              />
              {/* Dropdown Menu */}
              <motion.nav
                initial='closed'
                animate={toggle ? 'open' : 'closed'}
                variants={sidebar}
                className={`${
                  !toggle ? 'hidden' : 'flex'
                } p-6 bg-primary absolute top-16 right-0 my-2 min-w-[140px] z-10 shadow-dropdown`}
              >
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                  {t('navBar.links', { returnObjects: true }).map((link) => (
                    <li
                      key={link.id}
                      className={`${
                        activeLink === link.id
                          ? 'text-black border-b-2 border-secondary'
                          : 'text-lightblack border-b-2 border-transparent hover:border-secondary'
                      }`}
                    >
                      <ScrollLink
                        to={link.id}
                        smooth={true}
                        duration={200}
                        className='whitespace-nowrap'
                        onClick={() => {
                          setActiveLink(link.id);
                          setClickActive(link.id);
                          setToggle(false);
                          setTimeout(() => {
                            setClickActive(null);
                          }, 1000);
                        }}
                      >
                        {link.value}
                      </ScrollLink>
                    </li>
                  ))}
                  <li>
                    <CustomDropdown
                      selectedLang={selectedLang}
                      setSelectedLang={setSelectedLang}
                      onChangeLang={onChangeLang}
                      setToggle={setToggle}
                    />
                  </li>
                </ul>
              </motion.nav>
            </div>
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Navbar;
