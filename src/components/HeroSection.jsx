import React, { useCallback, useState, useEffect, useRef } from "react";
import landingBackground from "../assets/images/without draw.png";
import clock from "../assets/images/11211.png";
import phone from "../assets/images/tel.png";
import inkPot from "../assets/images/inkPot2.png";
import sandVideo from "../assets/images/sanbox.mp4";
import camera from "../assets/images/cam.png";
import landScapeDrawer from "../assets/images/landscap draw.png";
import hoverFrame from "../assets/images/hoverFrame.png";
import seeraPng from "../assets/images/seera.png";
import whiteInkPng from "../assets/images/whiteInkImage.png";
import image10 from "../assets/images/images (10).png";
import image14 from "../assets/images/images (14).png";
import image15 from "../assets/images/images (15).png";
import image16 from "../assets/images/images (16) 2.png";
import phoneClickSound from "../assets/sounds/telephone-ring-313223.mp3";
import useScrollToSection from "../hooks/useScrollToSection";
import writingSound from "../assets/sounds/writing-on-paper-6988.mp3";
import ClientInfoTooltip from "../components/ClientInfoTooltip";
import invisibleBeautySound from "../assets/sounds/whiteInk.mp3";
import capturedFrame from '../assets/images/capturedFrame.png'
import "./HeroSection.css"; 

const HeroSection = ({
  navigationItems,
  capturedImage,
  handleCameraClick,
  scrollToAbout,
  animationStates = {},
  onContactBookPositionChange,
  onAboutBookPositionChange,
  onBecauseBookPositionChange,
  onLoremBookPositionChange,
  onServicesBookPositionChange,
  onWhiteInkBookPositionChange,
  animationPhases = {},
}) => {
  // Array of images to cycle through
  const imageList = [whiteInkPng, image10, image14, image15, image16];
  const { mouseCLickRing } = useScrollToSection();
  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to store all book positions
  const [contactBookPosition, setContactBookPosition] = useState(null);
  const [aboutBookPosition, setAboutBookPosition] = useState(null);
  const [, setBecauseBookPosition] = useState(null);
  const [, setLoremBookPosition] = useState(null);
  const [, setServicesBookPosition] = useState(null);
  const [, setWhiteInkBookPosition] = useState(null);
  const currentAudioRef = useRef(null); // Track current playing audio
  // Music state for Seera box
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const [isVideoSpeedControlled, setIsVideoSpeedControlled] = useState(false);
  const sandboxVideoRef = useRef(null);

  // Drawer scaling state
  const [isDrawerScaling, setIsDrawerScaling] = useState(false);
  // Function to handle image click and cycle to next image

  const handlephoneClick = () => {
    playSound("phone");
    scrollToAbout();
  };

  const playSound = useCallback((soundType = "") => {
    const soundMap = {
      phone: phoneClickSound,
      writing: writingSound,
    };

    const soundFile = soundMap[soundType] || null;
    if (!soundFile) return;

    const audio = new Audio(soundFile);
    audio.volume = 0.5; // Set volume to 50%

    audio.play().catch((error) => {
      console.error(`Error playing ${soundType} sound:`, error);
    });

    // Stop the audio after 3 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset to beginning
    }, 3000);
  }, []);

   // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }
      // Cleanup music when component unmounts
      if (currentMusic) {
        currentMusic.pause();
        setCurrentMusic(null);
        setIsMusicPlaying(false);
      }
    };
  }, [currentMusic]);

  // Music control functions for Seera box
  const playMusic = useCallback(() => {
    if (currentMusic) {
      currentMusic.pause();
      setCurrentMusic(null);
      setIsMusicPlaying(false);
    }
    
    const audio = new Audio(invisibleBeautySound);
    audio.volume = 0.3; // Lower volume for background music
    audio.loop = true; // Loop the music
    
    setCurrentMusic(audio);
    setIsMusicPlaying(true);
    
    audio.play().catch((error) => {
      console.error("Error playing music:", error);
      setCurrentMusic(null);
      setIsMusicPlaying(false);
    });
  }, [currentMusic]);

  const stopMusic = useCallback(() => {
    if (currentMusic) {
      currentMusic.pause();
      currentMusic.currentTime = 0;
      setCurrentMusic(null);
      setIsMusicPlaying(false);
    }
  }, [currentMusic]);

  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      playMusic();
    }
  }, [isMusicPlaying, playMusic, stopMusic]);

  const handleImageClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to parent
    mouseCLickRing();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  // Handle drawer click with scaling animation (toggle behavior)
  const handleDrawerClick = () => {
    // if (isDrawerScaling) return; // Prevent multiple clicks during animation
    
    mouseCLickRing();
    
    // Toggle the drawer state
    setIsDrawerScaling(prev => !prev);
  };

  // Handle sanbox video click to open speed modal
  const handleSandboxVideoClick = () => {
    if (sandboxVideoRef.current) {
      // Get video duration
      // Check if duration is valid (not NaN or Infinity)
     
        // If duration is not available, wait for video to load
        const handleLoadedMetadata = () => {
          const newDuration = sandboxVideoRef.current.duration;
          if (newDuration && !isNaN(newDuration) && isFinite(newDuration)) {
            
            sandboxVideoRef.current.removeEventListener(
              "loadedmetadata",
              handleLoadedMetadata
            );
          }
        };

        sandboxVideoRef.current.addEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );

        // If video is already loaded, try to get duration immediately
        if (sandboxVideoRef.current.readyState >= 1) {
          handleLoadedMetadata();
        }
      
    }
  };

  // Reset video speed to normal
  const resetVideoSpeed = () => {
    if (sandboxVideoRef.current) {
      sandboxVideoRef.current.playbackRate = 1.0;
      setIsVideoSpeedControlled(false);
      console.log("Video speed reset to normal (1.0x)");
    }
  };

  // Function to calculate and store contact book position
  const calculateContactBookPosition = useCallback(() => {
    const contactBookElement = document.querySelector('[data-book="contact"]');
    if (contactBookElement) {
      const rect = contactBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("Contact Book Position:", position);
      setContactBookPosition(position);
      // Pass position to parent component
      if (onContactBookPositionChange) {
        onContactBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, [onContactBookPositionChange]);

  // Function to calculate and store about book position
  const calculateAboutBookPosition = useCallback(() => {
    const aboutBookElement = document.querySelector('[data-book="about"]');
    if (aboutBookElement) {
      const rect = aboutBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("About Book Position:", position);
      setAboutBookPosition(position);
      // Pass position to parent component
      if (onAboutBookPositionChange) {
        onAboutBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, [onAboutBookPositionChange]);

  // Function to calculate and store because book position
  const calculateBecauseBookPosition = useCallback(() => {
    const becauseBookElement = document.querySelector('[data-book="because"]');
    if (becauseBookElement) {
      const rect = becauseBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("Because Book Position:", position);
      setBecauseBookPosition(position);
      // Pass position to parent component
      if (onBecauseBookPositionChange) {
        onBecauseBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, []);

  // Function to calculate and store lorem book position
  const calculateLoremBookPosition = useCallback(() => {
    const loremBookElement = document.querySelector('[data-book="lorem"]');
    if (loremBookElement) {
      const rect = loremBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("Lorem Book Position:", position);
      setLoremBookPosition(position);
      // Pass position to parent component
      if (onLoremBookPositionChange) {
        onLoremBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, []);

  // Function to calculate and store services book position
  const calculateServicesBookPosition = useCallback(() => {
    const servicesBookElement = document.querySelector(
      '[data-book="services"]'
    );
    if (servicesBookElement) {
      const rect = servicesBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("Services Book Position:", position);
      setServicesBookPosition(position);
      // Pass position to parent component
      if (onServicesBookPositionChange) {
        onServicesBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, []);

  // Function to calculate and store white ink book position
  const calculateWhiteInkBookPosition = useCallback(() => {
    const whiteInkBookElement = document.querySelector(
      '[data-book="whiteink"]'
    );
    if (whiteInkBookElement) {
      const rect = whiteInkBookElement.getBoundingClientRect();
      const position = {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        viewportTop: rect.top,
        viewportLeft: rect.left,
        pageTop: rect.top + window.scrollY,
        pageLeft: rect.left + window.scrollX,
      };
      console.log("White Ink Book Position:", position);
      setWhiteInkBookPosition(position);
      // Pass position to parent component
      if (onWhiteInkBookPositionChange) {
        onWhiteInkBookPositionChange(position);
      }
      return position;
    }
    return null;
  }, []);

  // Calculate position when component mounts and on window resize
  useEffect(() => {
    const calculatePosition = () => {
      setTimeout(() => {
        calculateContactBookPosition();
        calculateAboutBookPosition();
        calculateBecauseBookPosition();
        calculateLoremBookPosition();
        calculateServicesBookPosition();
        calculateWhiteInkBookPosition();
      }, 100);
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, [
    calculateContactBookPosition,
    calculateAboutBookPosition,
    calculateBecauseBookPosition,
    calculateLoremBookPosition,
    calculateServicesBookPosition,
    calculateWhiteInkBookPosition,
  ]);

  // Expose the position to window for easy access in console
  useEffect(() => {
    if (contactBookPosition) {
      window.contactBookPosition = contactBookPosition;
    }
    if (aboutBookPosition) {
      window.aboutBookPosition = aboutBookPosition;
    }
  }, [contactBookPosition, aboutBookPosition]);

  return (
    <div className="w-full bg-amber-100">
      {/* Debug Panel for Book Positions */}

      <div className=" bg-amber-100 relative bg-no-repeat bg-fit flex flex-col max-sm:h-[100dvh]">
        <img
          src={landingBackground}
          alt="landingBackground"
          className="w-full max-sm:h-[100dvh] object-cover"
        />
        {/* interior */}
        <div className="firstShelf">
          <div className=" pl-10 pr-15 max-2xs:pr-40 2xl:pr-80 2xl:pl-80 flex items-center justify-between xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-1 md:pl-30">
            <ClientInfoTooltip placement="top">
              <img
                src={clock}
                alt="clock"
                className=" h-20 ml-1 w-15 cursor-pointer transition-all duration-200 ease-in-out hover:scale-y-105 clock-hover-glow
                sm:h-30 sm:w-20 md:h-35 md:w-30 lg:h-50 lg:w-35 xl:h-75 xl:w-50 2xl:h-80 2xl:w-60"
                onClick={calculateContactBookPosition}
              />
            </ClientInfoTooltip>
            <div className="flex items-center justify-between xl:pr-10 lg:pr-10 md:pr-30 sm:pr-2 sm:gap-1 sm:justify-center">
              {navigationItems.map((item, index) => {
                // Determine if this book should be hidden based on animation state
                const isHidden =
                  (item.text === "CONTACT" &&
                    animationStates.showContactAnimation) ||
                  (item.text === "BECAUSE" &&
                    animationStates.showBecauseAnimation) ||
                  (item.text === "Lorem" &&
                    animationStates.showLoremAnimation) ||
                  (item.text === "SERVICES" &&
                    animationStates.showServicesAnimation) ||
                  (item.text === "ABOUT" &&
                    animationStates.showAboutAnimation) ||
                  (item.text === "WHITE INK" &&
                    animationStates.showWhiteInkAnimation);

                // Determine if this book should be scaling
                const isScaling =
                  (item.text === "CONTACT" &&
                    animationPhases.contactAnimationPhase === "scaling") ||
                  (item.text === "BECAUSE" &&
                    animationPhases.becauseAnimationPhase === "scaling") ||
                  (item.text === "Lorem" &&
                    animationPhases.loremAnimationPhase === "scaling") ||
                  (item.text === "SERVICES" &&
                    animationPhases.servicesAnimationPhase === "scaling") ||
                  (item.text === "ABOUT" &&
                    animationPhases.aboutAnimationPhase === "scaling") ||
                  (item.text === "WHITE INK" &&
                    animationPhases.whiteInkAnimationPhase === "scaling");

                // Default rendering for other books
                return (
                  <div
                    key={index}
                    data-book={item.text.toLowerCase()}
                    className={`h-25 w-6 cursor-pointer bg-cover bg-center bg-no-repeat flex items-center justify-center relative group
                     transition-all duration-250 ease-in-out hover:scale-y-105
                     hover:shadow-[0_0_20px_5px_rgba(255,255,0,0.7)]
                     ${
                       isHidden
                         ? "opacity-0 pointer-events-none"
                         : "opacity-100"
                     }
                     ${isScaling ? "transform-gpu shadow-[0_0_40px_20px_rgba(0,0,0,0.3)]" : ""}
                     ${"2xl:h-90 2xl:w-20 xl:h-80 xl:w-18 lg:h-50 lg:w-10 md:h-35 md:w-8 sm:h-30 sm:w-8"}`}
                    style={{
                      ...item.style,
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      transform: "rotate(180deg)",
                      color: "#E9E4DC",
                      letterSpacing: "2px",
                      ...(isScaling && {
                        animation:
                          "bookScale 1s forwards",
                        zIndex: 1000,
                      }),
                    }}
                    onClick={item.onClick}
                  >
                    {item.text}
                    {/* Hover Frame */}
                    <img
  src={hoverFrame}
  alt="hover frame"
  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
  style={{
    transform: "rotate(180deg)",
  }}
/>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="secondShelf">
            <img
              src={phone}
              alt="phone"
              className=" h-15 ml-1 cursor-pointer transition-all duration-550 hover:ease-in-out hover:scale-y-103 phone-hover-glow
               2xl:h-75 2xl:ml-5 xl:h-65 xl:ml-4 lg:h-50 lg:ml-3 md:h-35 md:ml-2 sm:h-40 sm:ml-1"
              onClick={handlephoneClick}
            />
            <div className="flex flex-col items-center mt-[10px] 2xl:mt-[110px] xl:mt-[90px] lg:mt-[70px]  md:mt-[60px] sm:mt-[40px]">
              <img
                src={inkPot}
                alt="inkPot"
                className=" h-15 cursor-pointer transition-all duration-300 ease-in-out hover:scale-y-103 inkpot-hover-glow
                 2xl:h-55 xl:h-45 lg:h-40 md:h-26 sm:h-30"
                onClick={() => playSound("writing")}
              />
            </div>
            <div className="flex flex-col items-center cursor-pointer md:pr-15 lg:pr-10 relative">
              <video
                ref={sandboxVideoRef}
                src={sandVideo}
                className="h-10 object-cover rounded-lg mt-4
                 2xl:h-70 xl:h-60 lg:h-45 md:h-30 sm:h-35"
                muted
                loop
                playsInline
                onClick={handleSandboxVideoClick}
                onMouseEnter={(e) => {
                  // Only auto-play on hover if video is not speed controlled
                  if (!isVideoSpeedControlled) {
                    setTimeout(() => {
                      e.target.play();
                    }, 500);
                  }
                }}
                onMouseLeave={(e) => {
                  // Only pause on hover leave if video is not speed controlled
                  if (!isVideoSpeedControlled) {
                    setTimeout(() => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }, 500);
                  }
                }}
              />

              {/* Speed Control Indicator */}
              {isVideoSpeedControlled && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetVideoSpeed();
                    }}
                    className="text-yellow-400 hover:text-yellow-300 underline text-xs"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="thirdShelf">
            <div>
              <img
                src={camera}
                alt="camera"
                className=" thirdShelfCamera phone-hover-glow"
                onClick={handleCameraClick}
              />
            </div>
            <div className="flex relative flex-col items-center lg:pt-30 xl:pt-50 md:pt-25 max-sm:pt-12 max-sm:pb-5">
              <img
                src={imageList[currentImageIndex]}
                alt="inkPot"
                className="thirdShelfSeeraBoxInkPot"
                onClick={handleImageClick}
              />
              <div className="relative">
                <img
                  src={seeraPng}
                  alt="Seera Box"
                  className="thirdShelfSeeraBox cursor-pointer phone-hover-glow"
                  onClick={toggleMusic}
                />
                {/* Music control icon */}
                {isMusicPlaying && (
                <div className="music-control-icon">
                  
                    <svg
                      className="w-3 h-3 text-white cursor-pointer hover:text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      onClick={(e) => {
                        e.stopPropagation();
                        stopMusic();
                      }}
                    >
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                  )}

              </div>
            </div>
          </div>
          <div className="flex items-center pt-1 justify-between 2xl:pt-0 xl:pt-12 md:pt-0 sm:pt-0 relative">
            <div
              style={{
                backgroundImage: `url(${landScapeDrawer})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 10, // Base z-index always higher than captured image (zIndex: 5)
                ...(isDrawerScaling && {
                  animation: "drawerScaleUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                  zIndex: 1000, // Even higher when scaling
                }),
                ...(!isDrawerScaling && {
                  animation: "drawerScaleDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }),
              }}
              className={`ml-0 h-25 w-full relative cursor-pointer
                2xl:mr-45 2xl:ml-45 2xl:h-75
                xl:mr-30 xl:ml-30 xl:h-65
                lg:mr-20 lg:ml-20 lg:h-55
                md:mr-10 md:ml-10 md:h-45
                sm:mr-5 sm:ml-5 sm:h-35
                ${isDrawerScaling ? "t-5 transform-gpu" : ""}`}
              onClick={handleDrawerClick}
            >
              
            </div>
             {capturedImage && (
              <>

<img
                  src={capturedImage}
                  alt="Captured/Uploaded"
                  className="absolute px-5 py-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-2/5 object-fit rounded-lg max-w-2/5
                    2xl:h-60 2xl:w-3/5
                    xl:h-45 xl:w-2/5
                    lg:h-40 lg:w-2/5
                    md:h-35 md:w-1/2
                    sm:h-20 sm:w-3/5"
                  style={{ 
                    zIndex: 5,
                    animation: isDrawerScaling 
                      ? "imageSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                      : "imageSlideDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                  }}
                />
                <img
                  src={capturedFrame}
                  alt="Captured/Uploaded"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-13 w-2/5 object-fit rounded-lg max-w-2/5
                    2xl:h-60 2xl:w-3/5
                    xl:h-45 xl:w-2/5
                    lg:h-40 lg:w-2/5
                    md:h-35 md:w-1/2
                    sm:h-20 sm:w-3/5"
                  style={{ 
                    zIndex: 5,
                    animation: isDrawerScaling 
                      ? "imageSlideUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards"
                      : "imageSlideDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                  }}
                />
                </>
                
              )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
