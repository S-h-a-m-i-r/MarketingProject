import React, { useRef, useEffect, useState, forwardRef } from "react";

const VideoContentSection = forwardRef(({
  videoSrc,
  title,
  description,
  gradientStyle = "linear-gradient(to bottom, black 0%, #064e3b 50%, black 100%)",
  titleColor = "text-white",
  descriptionColor = "text-white",
  videoHeight = "h-100",
  sectionHeight = "h-screen",
  contentHeight = "h-3/2",
  titleLeading = "leading-[0.80]",
  titleSpacing = "pl-10",
  letterSpacing = "",
  wordSpacing = "",
  autoPlay = false,
  resetOnOutOfView = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  className = "",
  id = "",
  onVideoPlay = null,
  onVideoPause = null,
  onVideoEnd = null,
  ...props
}, ref) => {
  const videoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  // Auto-play when video comes into view and reset when out of view
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        const isCompletelyOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;

        if (autoPlay) {
          if (isInView && !hasPlayed) {
            videoRef.current.play();
            setHasPlayed(true);
            if (onVideoPlay) onVideoPlay();
          }
        }

        if (resetOnOutOfView && isCompletelyOutOfView && hasPlayed) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
          setHasPlayed(false);
        }
      }
    };

    if (autoPlay || resetOnOutOfView) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [autoPlay, resetOnOutOfView, hasPlayed, onVideoPlay]);

  const handleVideoPlay = () => {
    if (onVideoPlay) onVideoPlay();
  };

  const handleVideoPause = () => {
    if (onVideoPause) onVideoPause();
  };

  const handleVideoEnd = () => {
    if (onVideoEnd) onVideoEnd();
  };

  // Split title based on spaces
  const splitTitle = (title) => {
    if (!title) return { firstPart: '', secondPart: '' };
    
    const words = title.trim().split(/\s+/);
    if (words.length <= 1) {
      return { firstPart: title, secondPart: '' };
    }
    
    // Find the middle point to split
    const middleIndex = Math.ceil(words.length / 2);
    const firstPart = words.slice(0, middleIndex).join(' ');
    const secondPart = words.slice(middleIndex).join(' ');
    
    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = splitTitle(title);

  return (
    <div 
      ref={ref}
      id={id} 
      className={`${sectionHeight} flex flex-col items-center justify-center ${className}`}
      {...props}
    >
      {/* Video Section */}
      <div className={`flex flex-col items-center justify-center bg-white rounded-lg ${contentHeight} w-full`}>
        <video
          ref={videoRef}
          src={videoSrc}
          className={`${videoHeight} object-cover rounded-lg`}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          loop={loop}
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
          onEnded={handleVideoEnd}
        />
      </div>

      {/* Content Section with Gradient Background */}
      <div
        className={`${contentHeight} rounded-lg flex items-center justify-around w-full`}
        style={{
          background: gradientStyle,
        }}
      >
        <div></div>
         <div >
           <h1 
             className={`${titleColor} font-semibold text-right ${titleSpacing} ${titleLeading} ${letterSpacing}
               text-[16px] xs:text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px] xl:text-[48px] 2xl:text-[60px]`}
             style={wordSpacing ? { wordSpacing: wordSpacing } : {}}
           >
             {firstPart}
             {secondPart && (
               <>
                 <br />
                 <span className="text-right">{secondPart}</span>
               </>
             )}
           </h1>
          <p className={`${descriptionColor} text-left pt-10 
            text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]
            w-full max-w-[300px] xs:max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px] 2xl:max-w-[600px]`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
});

VideoContentSection.displayName = 'VideoContentSection';

export default VideoContentSection;
