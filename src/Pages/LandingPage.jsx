import React, { useState, useRef } from "react";
import landingBackground from "../assets/images/without draw.png";
import clock from "../assets/images/11211.png";
import book1 from "../assets/images/b1.png";
import book2 from "../assets/images/b2.png";
import book3 from "../assets/images/b3.png";
import book4 from "../assets/images/b4.png";
import book5 from "../assets/images/b5.png";
import phone from "../assets/images/tel.png";
import inkPot from "../assets/images/inkPot2.png";
import sandVideo from "../assets/images/sanbox.mp4";
import camera from "../assets/images/cam.png";
import landScapeDrawer from "../assets/images/landscap draw.png";
import aboutVideo from "../assets/images/1.mp4";
import strategyVedio from "../assets/images/marketing.mp4";
import VideoContentSection from "../components/VideoContentSection";
import brandAndRebrandingVideo from "../assets/images/brand&rebrand.mp4";
import advertisingVideo from "../assets/images/advertising.mp4";
import exhibitionVideo from "../assets/images/exhibition.mp4";
import digitalVideo from "../assets/images/digital.mp4";
import creativeVideo from "../assets/images/creative.mp4"
import outdoorVideo from "../assets/images/outdoor.mp4"
import seeraVideo from "../assets/images/seera.mp4"
import becauseForUsVideo from "../assets/images/becauseforus.mp4"
import whiteInkVideo from "../assets/images/whiteInk.mp4"
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import useScrollToSection from "../hooks/useScrollToSection";
import ScrollToTopButton from "../components/ScrollToTopButton";

const LandingPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [_, setHasPlayedAboutVideo] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Use the custom scroll hook
  const {
    aboutRef,
    contactRef,
    seeraRef,
    becauseForUsRef,
    whiteInkRef,
    scrollToAbout,
    scrollToContact,
    scrollToSeera,
    scrollToWhiteInk,
    scrollToBecauseForUs,
  } = useScrollToSection();

  // Navigation items data structure
  const navigationItems = [
    {
      text: "CONTACT",
      onClick: scrollToContact,
      isContact: true,
      style: {
        backgroundImage: `url(${book5})`,
        fontSize: "clamp(12px, 1.2vw, 46px)",
      }
    },
    {
      text: "BECAUSE",
      onClick: scrollToBecauseForUs,
      isContact: false,
      style: {
        backgroundImage: `url(${book4})`,
        fontSize: "clamp(10px, 1vw, 46px)",
      }
    },
    {
      text: "Lorem",
      onClick: scrollToSeera,
      isContact: false,
      style: {
        backgroundColor: "black",
        fontSize: "clamp(8px, 0.8vw, 46px)",
        fontFamily: "Brush Script MT, cursive, fantasy, serif",
      }
    },
    {
      text: "SERVICES",
      onClick: scrollToWhiteInk,
      isContact: false,
      style: {
        backgroundImage: `url(${book1})`,
        fontSize: "clamp(10px, 1vw, 46px)",
      }
    },
    {
      text: "ABOUT",
      onClick: scrollToAbout,
      isContact: false,
      style: {
        backgroundImage: `url(${book3})`,
        fontSize: "clamp(10px, 1vw, 46px)",
      }
    },
    {
      text: "WHITE INK",
      onClick: scrollToWhiteInk,
      isContact: false,
      style: {
        backgroundImage: `url(${book2})`,
        fontSize: "clamp(10px, 1vw, 46px)",
      }
    }
  ];

  const handleCameraClick = () => {
    setShowCameraModal(true);
    setShowUploadModal(false);
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
    setShowCameraModal(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      setShowCameraModal(false);

      // Stop camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCapturedImage(e.target.result);
          setShowUploadModal(false);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (JPG, PNG, or JPEG)");
      }
    }
  };

  const closeModals = () => {
    setShowCameraModal(false);
    setShowUploadModal(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };


  return (
    <>
     <div className="w-full bg-amber-100">
        <div
          className=" bg-amber-100 relative bg-no-repeat bg-fit flex flex-col min-h-screen"
        >
          <img 
            src={landingBackground} 
            alt="landingBackground" 
            className="w-full h-full object-cover min-h-screen" 
          />
         {/* interior */}
         <div
  className="
  absolute top-0 right-0 w-full h-full
  pt-37 px-10
  sm:pt-40 sm:px-10
  md:pt-62 md:px-20
  lg:pt-78 lg:px-24
  xl:pt-102 xl:px-30
  2xl:pt-112 2xl:px-20
"
>
          <div className=" pl-10 pr-15 max-2xs:pr-40 2xl:pr-80 2xl:pl-80 flex items-center justify-between xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-1 md:pl-30">
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
                  className={`h-25 w-6 cursor-pointer bg-cover bg-center bg-no-repeat flex items-center justify-center
                   transition-all duration-300 ease-in-out hover:scale-y-105
                   hover:shadow-[0_0_20px_5px_rgba(255,255,0,0.7)]
                   ${ '2xl:h-90 2xl:w-20 xl:h-80 xl:w-18 lg:h-50 lg:w-10 md:h-35 md:w-8 sm:h-30 sm:w-8'}`}
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
                </div>
              ))}
            </div>
          </div>
          <div className=" max-2xl:pr-20 pt-18 pr-10 pl-15 max-xs:pr-0 max-xs:pt-0 max-xs:pl-0 flex items-center justify-between xl:pt-40 lg:pt-20 2xl:pr-90 2xl:pl-80 xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pr-20 md:pl-30 md:pt-15 sm:pt-20 sm:pr-35 sm:pl-30">
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
          <div className=" max-2xl:pr-20 pr-0 pl-15 flex items-center justify-between pt-22 lg:pt-20 xl:pt-30 2xl:pr-90 2xl:pl-80 xl:pr-60 xl:pl-60 lg:pr-40 lg:pl-40 md:pt-20 md:pr-25 md:pl-30 sm:pr-10 sm:pl-10">
            <div >
              <img
                src={camera}
                alt="camera"
                className=" h-15 cursor-pointer transition-all duration-550 hover:ease-in-out hover:scale-y-103 phone-hover-glow
                 2xl:h-70 2xl:ml-5 xl:h-60 xl:ml-4 lg:h-40 lg:ml-3 md:h-30 md:ml-2 sm:h-35 sm:ml-1"
                onClick={handleCameraClick}
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                src={inkPot}
                alt="inkPot"
                className=" h-15 cursor-pointer transition-all duration-300 ease-in-out hover:scale-y-105 inkpot-hover-glow
                 2xl:h-85 xl:h-70 lg:h-60 md:h-40 sm:h-40"
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
              className="ml-0 h-25 w-full relative
                2xl:mr-45 2xl:ml-45 2xl:h-75
                xl:mr-30 xl:ml-30 xl:h-65
                lg:mr-20 lg:ml-20 lg:h-55
                md:mr-10 md:ml-10 md:h-45
                sm:mr-5 sm:ml-5 sm:h-35"
            >
              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Captured/Uploaded"
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-13 w-3/5 object-fit rounded-lg
                    2xl:h-40 2xl:w-3/5
                    xl:h-35 xl:w-2/5
                    lg:h-30 lg:w-2/5
                    md:h-25 md:w-1/2
                    sm:h-20 sm:w-3/5"
                  style={{ zIndex: 10 }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Camera Modal */}
        {showCameraModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Take a Photo</h3>
              <div className="mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-200 rounded"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startCamera}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Start Camera
                </button>
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Capture Photo
                </button>
                <button
                  onClick={closeModals}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleUploadClick}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                >
                  Or Upload File Instead
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Upload Photo</h3>
              <div className="mb-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Only JPG, PNG, and JPEG files are allowed
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeModals}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleCameraClick}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Or Take Photo Instead
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      <div className=" flex items-center justify-center bg-[#BE1E23] h-screen mt-1">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="max-w-1/4 w-full h-1/2 border-8 border-amber-100 flex items-center justify-center flex-col p-30">
            <h3 className="text-[15px] sm:text-[20px] md:text-[30px] lg:text-[40px] xl:text-[60px] text-amber-100 flex flex-col leading-[0.79]">
              <span className="xl:tracking-[28px] tracking-[10px]">WHITE</span>
              <span className=" text-[56px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[180px] font-bold text-amber-100">INK</span>
            </h3>
          </div>
          <h3 className="text-amber-100 text-[15px] sm:text-[20px] md:text-[20px] lg:text-[20px] xl:text-2xl  font-bold mt-8 tracking-[10px] xl:tracking-[17px]">
            COMPONY INTRO
          </h3>
        </div>
      </div>

       {/* about us */}
       <VideoContentSection
         ref={aboutRef}
         videoSrc={aboutVideo}
         title="ABOUT US"
         description="At White Ink,we don't just marketbrands. We give them a voice, a story, and a stage.With over 20 years of turning sparks of ideas into full-blown experiences, we craft work that doesn't just get noticed. It gets remembered"
         autoPlay={true}
         resetOnOutOfView={true}
         onVideoPlay={() => setHasPlayedAboutVideo(true)}
         titleLeading="leading-[0.90]"
         titleSpacing="pr-10"
       />

      {/* strategy */}
      <VideoContentSection
        id="strategy-section"
        videoSrc={strategyVedio}
        title="MARKETING STRATEGY"
        description="Insight-driven planswithimpact you can measure. Wedig into consumer behavior, market trends, and cultural shifts to design strategies that live in the real world. Every campaign is built to generate momentum, create meaningful connections, and deliver results you can see and track."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        gradientStyle="linear-gradient(to bottom, #140f0f 0%, #584da0 100%)"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[20px]"
        fontWeight="extrabold"
      />

      {/* Brand and Rebranding */}

      <VideoContentSection
        id="Brand-and-rebranding-section"
        videoSrc={brandAndRebrandingVideo}
        title="BRANDING& REBRANDING"
        description="Insight-driven planswithimpact you can measure. Wedig into consumer behavior, market trends, and cultural shifts to design strategies that live in the real world. Every campaign is built to generate momentum, create meaningful connections, and deliver results you can see and track."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        gradientStyle="linear-gradient(to bottom, black 0%, #282525 50%, black 100%)"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[15px]"
        fontWeight="extrabold"
        titleColor="text-[#a0bbd6]"
      />

      {/* advertising */}

      <VideoContentSection
        id="advertising-section"
        videoSrc={advertisingVideo}
        title="ADVERTISING ATL&BTL"
        description="Big ideasthat inspire,and activationsthat bring them to
life. From smart media placements to experiences
people talk about, we craft campaigns that make a
statement. Our approach blends creativity with strategy
to deliver messages that capture attention, fuel
conversations, and drive real engagement."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        gradientStyle="linear-gradient(to bottom, black 0%, #5bada1 5%)"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[15px]"
        fontWeight="extrabold"
      />
      {/* exhibitions and events */}
      <VideoContentSection
        id="exhibition-section"
        videoSrc={exhibitionVideo}
        title="EXHIBITIONS &EVENTS"
        description="Immersiveworldsbuilt from imagination.Whetherit’s
a high-profile exhibition or an intimate brand
showcase, we design environments where
audiences don’t just attend—they belong. Every
detail is curated to tell your story and leave a lasting
impression long after the event ends."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        gradientStyle="linear-gradient(to bottom, black 0%, #9e8c3d 5%)"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
      />

      {/* Digital */}

      <VideoContentSection
        id="advertising-section"
        videoSrc={digitalVideo}
        title="DIGITAL"
        description="SEO,websites, apps,socials, and performance that
makes clicks count. We build digital ecosystems that
connect brands to people wherever they are. From
sleek platforms and functional tools to content that
grabs attention, we create experiences that make your
online presence dynamic and effective."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        gradientStyle="linear-gradient(to bottom, black 0%, #ad2b2b 5%)"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
      />

      {/* creative content */}

      <VideoContentSection
        id="creative-section"
        videoSrc={creativeVideo}
        title="CREATIVE"
        description="Design,film,photography,and content that ignite
connection. Our creative team turns concepts into
compelling visuals and narratives that stay with people.
Each project is crafted with purpose and precision—
made to resonate, inspire, and keep your brand top of
mind."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
      />

<VideoContentSection
        id="outdoor-section"
        videoSrc={outdoorVideo}
        title="PRINT& OUTDOOR"
        description="From billboards to signage, we makemessages
unmissable. In a crowded landscape, we create clarity.
Bold layouts, striking visuals, and sharp copy ensure
your brand stands tall on every street corner, magazine
page, and surfacewhere people look."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
        gradientStyle="linear-gradient(to bottom, #140f0f 0%, #584da0 40%)"
      />

      {/* Serra */}

       <VideoContentSection
         ref={seeraRef}
         videoSrc={seeraVideo}
         title="Seera"
        description="Our premium brand for bespoke, beautifully designed
gifts, custom-crafted to reflect your identity in a
memorable and lasting expression. Each piece is
carefully developed to carry meaning, transforming
corporate gifting into a personal gesture that lingers long
after it’s given. With Seera, your brand is remembered
through objects that tell a story of thought and care."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
        gradientStyle="linear-gradient(to bottom, black 0%, #282525 50%, black 100%)"
        descriptionColor="text-[#a0bbd6]"
      />



<VideoContentSection
        id="outdoor-section"
        ref={becauseForUsRef}
        videoSrc={becauseForUsVideo}
        title="BECAUSE FORUS"
        description="Because for us,inkismorethanamedium..it’sthestart
of every great story."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
        gradientStyle="linear-gradient(to bottom, black 0%, #5bada1 5%)"
descriptionWidth="w-[200px]"
/>


      {/* white ink section */}

       <VideoContentSection
         ref={whiteInkRef}
         videoSrc={whiteInkVideo}
         title="WHITE INK"
        description="Where Ideas Come Alive."
        autoPlay={true}
        resetOnOutOfView={true}
        titleLeading="leading-[0.90]"
        titleSpacing="pr-10"
        titleSize="text-[60px]"
        wordSpacing="word-spacing-[10px]"
        letterSpacing="tracking-[8px]"
        fontWeight="extrabold"
        gradientStyle="linear-gradient(to bottom, black 0%, #9e8c3d 5%)"
      descriptionWidth="w-[200px]"
      />


       {/* contact us */}

       <VideoContentSection
         ref={contactRef}
         videoSrc={whiteInkVideo}
         title="CONTACT US"
         description={
           <div className="flex   justify-end flex-col items-end space-y-6">
               <div className="flex flex-col items-center space-y-2">
                 <div className="bg-white p-2 rounded-lg">
                   <IoMdMail className="text-[#ad2b2b] text-2xl" />
                 </div>
        </div>
               <div className="flex flex-col items-center space-y-2">
                 <div className="bg-white p-2 rounded-lg">
                   <MdLocalPhone className="text-[#ad2b2b] text-2xl" />
          </div>
        </div>
      </div>
         }
         autoPlay={true}
         resetOnOutOfView={true}
         titleLeading="leading-[0.90]"
         titleSpacing="pr-10"
         titleSize="text-[60px]"
         wordSpacing="word-spacing-[10px]"
         letterSpacing="tracking-[8px]"
         fontWeight="extrabold"
         gradientStyle="linear-gradient(to bottom, black 0%, #ad2b2b 5%)"
         descriptionWidth="w-[300px]"
       />

<div className=" flex items-end pb-10 justify-center bg-[#BE1E23] h-screen mt-1">
        <div className="w-full flex flex-col items-center justify-end">
           <div className="max-w-1/5 w-full h-1/5 border-8 border-[#3d0a0a]/50 flex items-center justify-center flex-col p-20">
            <h3 className="text-[40px] text-center text-[#3d0a0a]/50 flex flex-col leading-[0.79]">
              <span className="tracking-[28px]">WHITE</span>
              <span className="text-[120px] font-bold text-[#3d0a0a tracking-[20px]">INK</span>
            </h3>
          </div>
          <h3 className="text-[#3d0a0a]/50 text-2xl font-bold mt-8 tracking-[1px]">
            WHERE IDEAS COME ALIVE
          </h3>
        </div>
      </div>

       {/* Scroll to Top Button */}
       <ScrollToTopButton 
         threshold={500}
         className="hover:shadow-2xl"
         iconSize="text-xl"
         buttonSize="w-14 h-14"
       />
       
    </>
  );
};

export default LandingPage;
