// useIntersectionObserver.js
import { useEffect, useState } from 'react';

export const useIntersectionObserver = (elements, options) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Create a function to set up the observer
    const setUpObserver = () => {
      const observer = new IntersectionObserver((entries) => {
        setEntries(entries);
      }, options);

      if (elements) {
        elements.forEach((element) => {
          if (element) observer.observe(element);
        });
      }

      return () => {
        if (elements) {
          elements.forEach((element) => {
            if (element) observer.unobserve(element);
          });
        }
      };
    };

    // Set a timeout to delay the setup of the observer
    const timeout = setTimeout(() => {
      setUpObserver();
    }, 100);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [elements, options]);


  return entries;
};
