// useIntersectionObserver.js
import { useEffect, useState } from 'react';

export const useIntersectionObserver = (elements, options) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Find the entry with the highest intersection ratio.
      const activeEntry = entries.reduce(
        (highest, entry) => {
          return entry.intersectionRatio > highest.intersectionRatio
            ? entry
            : highest;
        },
        { intersectionRatio: 0 }
      );

      setEntries([activeEntry]);
    }, options);

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [elements, options]);

  return entries;
};
