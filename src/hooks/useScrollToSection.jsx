import { useRef, useCallback } from 'react';

const useScrollToSection = () => {
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const seeraRef = useRef(null);
  const whiteInkRef = useRef(null);
  const strategyRef = useRef(null);
  const brandingRef = useRef(null);
  const advertisingRef = useRef(null);
  const exhibitionRef = useRef(null);
  const digitalRef = useRef(null);
  const creativeRef = useRef(null);
  const outdoorRef = useRef(null);
  const becauseForUsRef = useRef(null);

  const scrollToSection = useCallback((ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  const scrollToAbout = useCallback(() => scrollToSection(aboutRef), [scrollToSection]);
  const scrollToContact = useCallback(() => scrollToSection(contactRef), [scrollToSection]);
  const scrollToSeera = useCallback(() => scrollToSection(seeraRef), [scrollToSection]);
  const scrollToWhiteInk = useCallback(() => scrollToSection(whiteInkRef), [scrollToSection]);
  const scrollToStrategy = useCallback(() => scrollToSection(strategyRef), [scrollToSection]);
  const scrollToBranding = useCallback(() => scrollToSection(brandingRef), [scrollToSection]);
  const scrollToAdvertising = useCallback(() => scrollToSection(advertisingRef), [scrollToSection]);
  const scrollToExhibition = useCallback(() => scrollToSection(exhibitionRef), [scrollToSection]);
  const scrollToDigital = useCallback(() => scrollToSection(digitalRef), [scrollToSection]);
  const scrollToCreative = useCallback(() => scrollToSection(creativeRef), [scrollToSection]);
  const scrollToOutdoor = useCallback(() => scrollToSection(outdoorRef), [scrollToSection]);
  const scrollToBecauseForUs = useCallback(() => scrollToSection(becauseForUsRef), [scrollToSection]);
  return {
    // Refs
    aboutRef,
    contactRef,
    seeraRef,
    whiteInkRef,
    strategyRef,
    brandingRef,
    advertisingRef,
    exhibitionRef,
    digitalRef,
    creativeRef,
    outdoorRef,
    becauseForUsRef,
    
    // Scroll functions
    scrollToAbout,
    scrollToContact,
    scrollToSeera,
    scrollToWhiteInk,
    scrollToStrategy,
    scrollToBranding,
    scrollToAdvertising,
    scrollToExhibition,
    scrollToDigital,
    scrollToCreative,
    scrollToOutdoor,
    scrollToBecauseForUs,
    
    // Generic scroll function
    scrollToSection,
  };
};

export default useScrollToSection;