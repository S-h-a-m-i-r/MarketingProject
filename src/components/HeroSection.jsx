import React, { useState, useEffect } from "react";
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

const HeroSection = ({
  navigationItems,
  capturedImage,
  handleCameraClick,
  scrollToAbout,
}) => {
  // Array of images to cycle through
  const imageList = [whiteInkPng, image10, image14, image15, image16];

  // State to track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State for drawer animation
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Function to handle image click and cycle to next image
  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageList.length);
  };

  // Effect to trigger animation when a new image is captured/uploaded
  useEffect(() => {
    if (capturedImage) {
      // Reset states
      setIsDrawerOpen(false);
      setImageLoaded(false);
      
      // Start animation sequence
      const timer = setTimeout(() => {
        setIsDrawerOpen(true);
        
        // After drawer opens, show the image
        const imageTimer = setTimeout(() => {
          setImageLoaded(true);
        }, 600);
        
        return () => clearTimeout(imageTimer);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [capturedImage]);

  return (
    <div className="w-full bg-amber-100">
      <div className=" bg-amber-100 relative bg-no-repeat bg-fit flex flex-col max-sm:h-[100dvh]">
        <img
          src={landingBackground}
          alt="landingBackground"
          className="w-full max-sm:h-[100dvh] object-cover"
        />
        {/* interior */}
        <div
          className="
          absolute top-0 right-0 w-full h-[100dvh]
            pt-37 px-10
          sm:pt-40 sm:px-10
          md:pt-62 md:px-20
          lg:pt-78 lg:px-24
          xl:pt-102 xl:px-30
          2xl:pt-112 2xl:px-20
        "
        >
         <div className="pl-10 pr-15 max-2xs:pr-40 2xl:pr-80 2xl:pl-80 flex items-center justify-between xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-1 md:pl-30 min-[390px]:translate-y-9 min-[430px]:translate-y-16 min-[428px]:translate-y-10  min-[375px]:-translate-y-6 lg:-mt-8 xl:-mt-28 min-[414px]:mt-4">
            <img
              src={clock}
              alt="clock"
              className=" h-20 ml-1 w-15 cursor-pointer transition-all duration-300 ease-in-out hover:scale-y-105 clock-hover-glow
                sm:h-30 sm:w-20 md:h-35 md:w-30 lg:h-50 lg:w-35 xl:h-75 xl:w-50 2xl:h-80 2xl:w-60"
            />
            <div className="flex items-center justify-between xl:pr-10 lg:pr-10 md:pr-30 sm:pr-2 sm:gap-1 sm:justify-center">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className={`h-25 w-6 cursor-pointer bg-cover bg-center bg-no-repeat flex items-center justify-center relative group
                   transition-all duration-300 ease-in-out hover:scale-y-105
                   hover:shadow-[0_0_20px_5px_rgba(255,255,0,0.7)]
                   ${"2xl:h-90 2xl:w-20 xl:h-80 xl:w-18 lg:h-50 lg:w-10 md:h-35 md:w-8 sm:h-30 sm:w-8"}`}
                  style={{
                    ...item.style,
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    color: "#E9E4DC",
                    letterSpacing: "2px",
                  }}
                  onClick={item.onClick}
                >
                  {item.text}
                  {/* Hover Frame */}
                  <img
                    src={hoverFrame}
                    alt="hover frame"
                    className="absolute w-full h-full  opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none"
                    style={{
                      transform: "rotate(180deg)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" max-2xl:pr-20 pt-18 pr-10 pl-15 max-xs:pr-0 max-xs:pt-0 max-xs:pl-0 flex items-center justify-between xl:pt-40 lg:pt-20 2xl:pr-90 2xl:pl-80 xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-20 md:pl-30 md:pt-15 sm:pt-20 sm:pr-35 sm:pl-30 min-[390px]:translate-y-15  min-[414px]:mt-4 min-[375px]:-translate-y-8 min-[430px]:translate-y-26 min-[428px]:translate-y-16 lg:-mt-8 xl:-mt-16">
            <img
              src={phone}
              alt="phone"
              className=" h-15 ml-1 cursor-pointer transition-all duration-550 hover:ease-in-out hover:scale-y-103 phone-hover-glow
               2xl:h-75 2xl:ml-5 xl:h-65 xl:ml-4 lg:h-50 lg:ml-3 md:h-35 md:ml-2 sm:h-40 sm:ml-1"
              onClick={scrollToAbout}
            />
            <div className="flex flex-col items-center mt-[10px] 2xl:mt-[110px] xl:mt-[90px] lg:mt-[70px]  md:mt-[60px] sm:mt-[40px]">
              <img
                src={inkPot}
                alt="inkPot"
                className=" h-15 cursor-pointer transition-all duration-300 ease-in-out hover:scale-y-103 inkpot-hover-glow
                 2xl:h-55 xl:h-45 lg:h-40 md:h-26 sm:h-30"
              />
            </div>
            <div className="flex flex-col items-center cursor-pointer md:pr-15 lg:pr-10 ">
              <video
                src={sandVideo}
                className="h-10 object-cover rounded-lg mt-4
                 2xl:h-70 xl:h-60 lg:h-45 md:h-30 sm:h-35"
                muted
                loop
                playsInline
                onMouseEnter={(e) => {
                  setTimeout(() => {
                    e.target.play();
                  }, 500);
                }}
                onMouseLeave={(e) => {
                  setTimeout(() => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }, 500);
                }}
              />
            </div>
          </div>

          <div className="max-2xl:pr-20 pr-0 pl-15 flex items-center justify-between pt-22 lg:pt-20 xl:pt-30 2xl:pr-90 2xl:pl-80 xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-25 md:pl-30 sm:pr-10 sm:pl-10 lg:mt-8 xl:mt-28 min-[375px]:-translate-y-92 min-[430px]:translate-y-6 min-[414px]:-mt-5 min-[390px]:translate-y-2">
  {/* Camera - Keep exactly as is */}
  <div>
    <img
      src={camera}
      alt="camera"
      className="h-15 cursor-pointer transition-all duration-550 hover:ease-in-out hover:scale-y-103 phone-hover-glow
        2xl:h-70 2xl:ml-5 xl:h-60 xl:ml-4 lg:h-40 lg:ml-3 md:h-30 md:ml-2 sm:h-35 sm:ml-1 min-[390px]:-mt-90"
      onClick={handleCameraClick}
    />
  </div>
  
  {/* Center container - Fix the positioning context */}
  <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen">
  {/* InkPot in first row */}
  <img
    src={imageList[currentImageIndex]}
    alt="inkPot"
    className="h-15 cursor-pointer row-start-1 
    2xl:h-60 xl:h-70 lg:h-60 md:h-40 sm:h-40 min-[390px]:-mt-165
    lg:-mt-100" /* Reduce negative margin for laptop */
    onClick={handleImageClick}
  />
  
  {/* Seera in second row */}
  <img
    src={seeraPng}
    alt="seera"
    className="h-15 row-start-2
    2xl:h-18 2xl:w-60 
    xl:h-70 
    lg:h-60 lg:transform lg:-translate-y-110
    md:h-40 
    sm:h-40
    hidden md:block"
  />
</div>
</div>


          
<div className="flex items-center pt-1 justify-between 2xl:pt-0 xl:pt-12 md:pt-0 sm:pt-0">
          <div
            style={{
              backgroundImage: `url(${landScapeDrawer})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
              className="ml-0 h-25 w-full relative overflow-hidden transition-all duration-500 ease-out
              2xl:mr-45 2xl:ml-45 2xl:h-75
              xl:mr-30 xl:ml-30 xl:h-65
              lg:mr-20 lg:ml-20 lg:h-55 lg:-mt-110
              sm:mr-5 sm:ml-5 sm:h-35
              min-[390px]:-mt-37
              min-[375px]:-mt-310
              hover:scale-105 hover:z-20
              min-[390px]:-mt-325
              min-[414px]:-mt-337
              min-[430px]:-mt-335"
>
    {capturedImage && (
      <img
      src={capturedImage}
      alt="Captured/Uploaded"
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 object-fit rounded-lg transition-all duration-1000 ease-out
        2xl:h-40 2xl:w-2/3    {/* 50% width */}
        xl:h-35 xl:w-2/5      {/* 40% width */}
        lg:h-30 lg:w-2/5      {/* 40% width */}
        md:h-25 md:w-2/5      {/* 40% width */}
        sm:h-20 sm:w-1/2      {/* 50% width */}
        min-[390px]:h-15 min-[390px]:w-2/3
        min-[375px]:h-12 min-[375px]:w-2/3
        ${imageLoaded 
          ? 'opacity-100 -translate-y-1/2 scale-100' 
          : 'opacity-0 -translate-y-1/4 scale-95'
        }`}
      style={{ zIndex: 10 }}
      onLoad={() => setImageLoaded(true)}
    />
    )}
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;