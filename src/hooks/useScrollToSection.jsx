import { useRef, useCallback } from 'react';
import telephoneRingSound from "../assets/sounds/mouse-click-153941.mp3";
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
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const mouseCLickRing = () => {
    const audio = new Audio(telephoneRingSound);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      console.error("Error playing telephone ring sound:", error);
    });

    // Stop the audio after 3 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset to beginning
    }, 3000);
  };

  const scrollToSectionWithSound = useCallback(
    (ref) => {
      if (ref?.current) {
        mouseCLickRing();
        scrollToSection(ref);
        ref;
      }
    },
    [scrollToSection]
  );
  const scrollToAbout = useCallback(
    () => scrollToSection(aboutRef),
    [scrollToSection]
  );
  const scrollToContact = useCallback(
    () => scrollToSectionWithSound(contactRef),
    [scrollToSectionWithSound]
  );
  const scrollToSeera = useCallback(
    () => scrollToSectionWithSound(seeraRef),
    [scrollToSectionWithSound]
  );
  const scrollToWhiteInk = useCallback(
    () => scrollToSectionWithSound(whiteInkRef),
    [scrollToSectionWithSound]
  );
  const scrollToStrategy = useCallback(
    () => scrollToSectionWithSound(strategyRef),
    [scrollToSectionWithSound]
  );
  const scrollToBranding = useCallback(
    () => scrollToSectionWithSound(brandingRef),
    [scrollToSectionWithSound]
  );
  const scrollToAdvertising = useCallback(
    () => scrollToSectionWithSound(advertisingRef),
    [scrollToSectionWithSound]
  );
  const scrollToExhibition = useCallback(
    () => scrollToSectionWithSound(exhibitionRef),
    [scrollToSectionWithSound]
  );
  const scrollToDigital = useCallback(
    () => scrollToSectionWithSound(digitalRef),
    [scrollToSectionWithSound]
  );
  const scrollToCreative = useCallback(
    () => scrollToSectionWithSound(creativeRef),
    [scrollToSectionWithSound]
  );
  const scrollToOutdoor = useCallback(
    () => scrollToSectionWithSound(outdoorRef),
    [scrollToSectionWithSound]
  );
  const scrollToBecauseForUs = useCallback(
    () => scrollToSectionWithSound(becauseForUsRef),
    [scrollToSectionWithSound]
  );
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

    // Sound function
    mouseCLickRing,
  };
};

export default useScrollToSection;