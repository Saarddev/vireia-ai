
import { useEffect, useState, useRef } from 'react';

interface UseScrollObserverProps {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollObserver = ({ 
  threshold = 0.1, 
  rootMargin = '0px' 
}: UseScrollObserverProps = {}) => {
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Initialize IntersectionObserver
    observer.current = new IntersectionObserver(
      (observedEntries) => {
        setEntries(observedEntries);
      },
      {
        threshold,
        rootMargin,
      }
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      // Disconnect all previous observations
      currentObserver.disconnect();
      
      // Observe all elements
      elements.forEach((element) => currentObserver.observe(element));
    }
    
    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [elements]);

  // Add elements to be observed
  const observe = (element: Element) => {
    if (element && !elements.includes(element)) {
      setElements((prevElements) => [...prevElements, element]);
    }
  };

  // Remove element from observation
  const unobserve = (element: Element) => {
    if (element) {
      setElements((prevElements) => prevElements.filter((el) => el !== element));
    }
  };

  return {
    observe,
    unobserve,
    entries,
    isIntersecting: (element: Element) => 
      entries.find((entry) => entry.target === element)?.isIntersecting || false,
  };
};
