import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import book1 from "../assets/images/b1.png";
import book2 from "../assets/images/b2.png";
import book3 from "../assets/images/b3.png";
import book4 from "../assets/images/b4.png";
import book5 from "../assets/images/b5.png";
import aboutVideo from "../assets/images/1.mp4";
import strategyVedio from "../assets/images/marketing.mp4";
import VideoContentSection from "../components/VideoContentSection";
import brandAndRebrandingVideo from "../assets/images/brand&rebrand.mp4";
import advertisingVideo from "../assets/images/advertising.mp4";
import exhibitionVideo from "../assets/images/exhibition.mp4";
import digitalVideo from "../assets/images/digital.mp4";
import creativeVideo from "../assets/images/creative.mp4";
import outdoorVideo from "../assets/images/outdoor.mp4";
import seeraVideo from "../assets/images/seera.mp4";
import becauseForUsVideo from "../assets/images/becauseforus.mp4";
import whiteInkVideo from "../assets/images/whiteInk.mp4";
import contactVideo from "../assets/images/contactUs.mp4";
import { IoMdMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import useScrollToSection from "../hooks/useScrollToSection";
import cameraClickSound from "../assets/sounds/iphone-camera-capture-6448.mp3";
import ScrollToTopButton from "../components/ScrollToTopButton";
import HeroSection from "../components/HeroSection";
import CompanyIntroSection from "../components/CompanyIntroSection";
import CameraModal from "../components/CameraModal";
import UploadModal from "../components/UploadModal";
import FooterSection from "../components/FooterSection";
import ClientInfoTooltip from "../components/ClientInfoTooltip";

import phone from "../assets/sounds/mouse-click-153941.mp3";






const LandingPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [_, setHasPlayedAboutVideo] = useState(false);
  const [showContactAnimation, setShowContactAnimation] = useState(false);
  const [contactAnimationPhase, setContactAnimationPhase] = useState("idle"); // 'idle', 'scaling', 'video', 'scrolling'
  const [showBecauseAnimation, setShowBecauseAnimation] = useState(false);
  const [contactBookPosition, setContactBookPosition] = useState(null);
  const [aboutBookPosition, setAboutBookPosition] = useState(null);
  const [becauseBookPosition, setBecauseBookPosition] = useState(null);
  const [loremBookPosition, setLoremBookPosition] = useState(null);
  const [servicesBookPosition, setServicesBookPosition] = useState(null);
  const [whiteInkBookPosition, setWhiteInkBookPosition] = useState(null);

  // Preload all models when component mounts

  
  const [becauseAnimationPhase, setBecauseAnimationPhase] = useState("idle"); // 'idle', 'scaling', 'video', 'scrolling'
  const [showLoremAnimation, setShowLoremAnimation] = useState(false);
  const [loremAnimationPhase, setLoremAnimationPhase] = useState("idle");
  const [showServicesAnimation, setShowServicesAnimation] = useState(false);
  const [servicesAnimationPhase, setServicesAnimationPhase] = useState("idle");
  const [showAboutAnimation, setShowAboutAnimation] = useState(false);
  const [aboutAnimationPhase, setAboutAnimationPhase] = useState("idle");
  const [showWhiteInkAnimation, setShowWhiteInkAnimation] = useState(false);
  const [whiteInkAnimationPhase, setWhiteInkAnimationPhase] = useState("idle");
  const [, setClickedBook] = useState(null); // Track which book was clicked
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  // Removed unused video refs - now using 3D models for all animations

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
    mouseCLickRing,
  } = useScrollToSection();

  const playClickSound = useCallback(() => {
    const audio = new Audio(phone);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      console.error("Error playing telephone ring sound:", error);
    });

    // Stop the audio after 3 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset to beginning
    }, 3000);
  }, []);

  // Function to play Invisible Beauty sound with queue management
  

  const handleContactClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showContactAnimation) return;
    playClickSound();

    setClickedBook("contact");
    setShowContactAnimation(true);
    setContactAnimationPhase("scaling");
    

    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      // setContactAnimationPhase("video");
      // Show model for 3 seconds then proceed
      setShowContactAnimation(false);
          setContactAnimationPhase("idle");
      scrollToContact();
          setClickedBook(null);
          setContactBookPosition(null);
      // setTimeout(() => {
      //   setContactAnimationPhase("scrolling");
      //   // scrollToContact();
      //   setTimeout(() => {
      //     setShowContactAnimation(false);
      //     setContactAnimationPhase("idle");
      //     setClickedBook(null);
      //     setContactBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
    }, 2000);
    
  }, [showContactAnimation]);

  const handleBecauseClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showBecauseAnimation) return;
    playClickSound();

    setClickedBook("because");
    setShowBecauseAnimation(true);
    setBecauseAnimationPhase("scaling");
    

    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      // setBecauseAnimationPhase("video");
      setShowBecauseAnimation(false);
      setBecauseAnimationPhase("idle");
      scrollToBecauseForUs();
      setClickedBook(null);
      setBecauseBookPosition(null);
      // Show model for 3 seconds then proceed
      // setTimeout(() => {
      //   setBecauseAnimationPhase("scrolling");
      //   scrollToBecauseForUs();
      //   setTimeout(() => {
      //     setShowBecauseAnimation(false);
      //     setBecauseAnimationPhase("idle");
      //     setClickedBook(null);
      //     setBecauseBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
    }, 2000);
  }, [showBecauseAnimation, playClickSound, scrollToBecauseForUs]);

  const handleLoremClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showLoremAnimation) return;
    playClickSound();

    setClickedBook("lorem");
    setShowLoremAnimation(true);
    setLoremAnimationPhase("scaling");
    

    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      // setLoremAnimationPhase("video");
      // Show model for 3 seconds then proceed
      // setTimeout(() => {
      //   setLoremAnimationPhase("scrolling");
      //   scrollToSeera();
      //   setTimeout(() => {
      //     setShowLoremAnimation(false);
      //     setLoremAnimationPhase("idle");
      //     setClickedBook(null);
      //     setLoremBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
      setShowLoremAnimation(false);
      setLoremAnimationPhase("idle");
      scrollToSeera();
      setClickedBook(null);
      setLoremBookPosition(null);
    }, 2000);
  }, [showLoremAnimation, playClickSound, scrollToSeera]);

  const handleServicesClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showServicesAnimation) return;
    playClickSound();

    setClickedBook("services");
    setShowServicesAnimation(true);
    setServicesAnimationPhase("scaling");
    

    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      setShowServicesAnimation(false);
          setServicesAnimationPhase("idle");
          scrollToWhiteInk();
          setClickedBook(null);
          setServicesBookPosition(null);
      // setServicesAnimationPhase("video");
      // Show model for 3 seconds then proceed
      // setTimeout(() => {
      //   setServicesAnimationPhase("scrolling");
      //   scrollToWhiteInk();
      //   setTimeout(() => {
      //     setShowServicesAnimation(false);
      //     setServicesAnimationPhase("idle");
      //     setClickedBook(null);
      //     setServicesBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
    }, 2000);
  }, [showServicesAnimation, playClickSound, scrollToWhiteInk]);

  const handleAboutClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showAboutAnimation) return;
    playClickSound();

    setClickedBook("about");
    setShowAboutAnimation(true);
    setAboutAnimationPhase("scaling");
    

    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      // setAboutAnimationPhase("video");
      // Show model for 3 seconds then proceed
      // setTimeout(() => {
      //   setAboutAnimationPhase("scrolling");
      //   scrollToAbout();
      //   setTimeout(() => {
      //     setShowAboutAnimation(false);
      //     setAboutAnimationPhase("idle");
      //     setClickedBook(null);
      //     setBecauseBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
      setShowAboutAnimation(false);
      setAboutAnimationPhase("idle");
      scrollToAbout();
      setClickedBook(null);
      setBecauseBookPosition(null);
    }, 2000);
  }, [showAboutAnimation, playClickSound, scrollToAbout]);

  const handleWhiteInkClick = useCallback(() => {
    // Prevent multiple clicks during animation
    if (showWhiteInkAnimation) return;
    playClickSound();

    // Play Invisible Beauty sound
    

    setClickedBook("whiteink");
    setShowWhiteInkAnimation(true);
    setWhiteInkAnimationPhase("scaling");
    
    // Scale animation for 3 seconds, then show model
    setTimeout(() => {
      // setWhiteInkAnimationPhase("video");
      // Show model for 3 seconds then proceed
      // setTimeout(() => {
      //   setWhiteInkAnimationPhase("scrolling");
      //   scrollToWhiteInk();
      //   setTimeout(() => {
      //     setShowWhiteInkAnimation(false);
      //     setWhiteInkAnimationPhase("idle");
      //     setClickedBook(null);
      //     setWhiteInkBookPosition(null);
      //     // Don't reset animationKey - let it keep incrementing
      //   }, 500);
      // }, 7000);
      setShowWhiteInkAnimation(false);
          setWhiteInkAnimationPhase("idle");
          scrollToWhiteInk();
          setClickedBook(null);
          setWhiteInkBookPosition(null);
    }, 2000);
  }, [
    showWhiteInkAnimation,
    playClickSound,
    scrollToWhiteInk,
  ]);

  // Callback to receive contact book position from HeroSection
  const handleContactBookPositionChange = useCallback((position) => {
    setContactBookPosition(position);
  }, []);

  // Callback to receive about book position from HeroSection
  const handleAboutBookPositionChange = useCallback((position) => {
    setAboutBookPosition(position);
  }, []);

  // Callback to receive because book position from HeroSection
  const handleBecauseBookPositionChange = useCallback((position) => {
    setBecauseBookPosition(position);
  }, []);

  // Callback to receive lorem book position from HeroSection
  const handleLoremBookPositionChange = useCallback((position) => {
    setLoremBookPosition(position);
  }, []);

  // Callback to receive services book position from HeroSection
  const handleServicesBookPositionChange = useCallback((position) => {
    setServicesBookPosition(position);
  }, []);

  // Callback to receive white ink book position from HeroSection
  const handleWhiteInkBookPositionChange = useCallback((position) => {
    setWhiteInkBookPosition(position);
  }, []);

  // Memoize animation states to prevent unnecessary re-renders
  const animationStates = useMemo(
    () => ({
      showContactAnimation,
      showBecauseAnimation,
      showLoremAnimation,
      showServicesAnimation,
      showAboutAnimation,
      showWhiteInkAnimation,
    }),
    [
      showContactAnimation,
      showBecauseAnimation,
      showLoremAnimation,
      showServicesAnimation,
      showAboutAnimation,
      showWhiteInkAnimation,
    ]
  );

  // Memoize animation phases to prevent unnecessary re-renders
  const animationPhases = useMemo(
    () => ({
      contactAnimationPhase,
      becauseAnimationPhase,
      loremAnimationPhase,
      servicesAnimationPhase,
      aboutAnimationPhase,
      whiteInkAnimationPhase,
    }),
    [
      contactAnimationPhase,
      becauseAnimationPhase,
      loremAnimationPhase,
      servicesAnimationPhase,
      aboutAnimationPhase,
      whiteInkAnimationPhase,
    ]
  );

  // Navigation items data structure - memoized to prevent re-creation
  const navigationItems = useMemo(
    () => [
      {
        text: "CONTACT",
        onClick: handleContactClick,
        isContact: true,
        style: {
          backgroundImage: `url(${book5})`,
          fontSize: "clamp(12px, 1.2vw, 46px)",
          overflow: "auto",
        },
        color: "black",
      },
      {
        text: "BECAUSE",
        onClick: handleBecauseClick,
        isContact: false,
        style: {
          backgroundImage: `url(${book4})`,
          fontSize: "clamp(10px, 1vw, 46px)",
        },
        color: "#5bada1", // Teal
      },
      {
        text: "Lorem",
        onClick: handleLoremClick,
        isContact: false,
        style: {
          backgroundColor: "black",
          fontSize: "clamp(8px, 0.8vw, 46px)",
          fontFamily: "Brush Script MT, cursive, fantasy, serif",
        },
        color: "#9e8c3d", // Gold
      },
      {
        text: "SERVICES",
        onClick: handleServicesClick,
        isContact: false,
        style: {
          backgroundImage: `url(${book1})`,
          fontSize: "clamp(10px, 1vw, 46px)",
        },
        color: "#584da0", // Purple
      },
      {
        text: "ABOUT",
        onClick: handleAboutClick,
        isContact: false,
        style: {
          backgroundImage: `url(${book3})`,
          fontSize: "clamp(10px, 1vw, 46px)",
        },
        color: "#064e3b", // Green
      },
      {
        text: "WHITE INK",
        onClick: handleWhiteInkClick,
        isContact: false,
        style: {
          backgroundImage: `url(${book2})`,
          fontSize: "clamp(10px, 1vw, 46px)",
        },
        color: "#9e8c3d", // Gold
      },
    ],
    [
      handleContactClick,
      handleBecauseClick,
      handleLoremClick,
      handleServicesClick,
      handleAboutClick,
      handleWhiteInkClick,
    ]
  );

  // Video content sections data structure
  const videoSections = [
    {
      id: "about-section",
      ref: aboutRef,
      videoSrc: aboutVideo,
      title: "ABOUT US",
      description:
        "At White Ink,we don't just marketbrands. We give them a voice, a story, and a stage.With over 20 years of turning sparks of ideas into full-blown experiences, we craft work that doesn't just get noticed. It gets remembered",
      autoPlay: true,
      resetOnOutOfView: true,
      onVideoPlay: () => setHasPlayedAboutVideo(true),
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
    },
    {
      id: "strategy-section",
      videoSrc: strategyVedio,
      title: "MARKETING STRATEGY",
      description:
        "Insight-driven planswithimpact you can measure. Wedig into consumer behavior, market trends, and cultural shifts to design strategies that live in the real world. Every campaign is built to generate momentum, create meaningful connections, and deliver results you can see and track.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      gradientStyle: "linear-gradient(to bottom, #140f0f 0%, #584da0 100%)",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[20px]",
      fontWeight: "extrabold",
    },
    {
      id: "Brand-and-rebranding-section",
      videoSrc: brandAndRebrandingVideo,
      title: "BRANDING& REBRANDING",
      description:
        "Insight-driven planswithimpact you can measure. Wedig into consumer behavior, market trends, and cultural shifts to design strategies that live in the real world. Every campaign is built to generate momentum, create meaningful connections, and deliver results you can see and track.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      gradientStyle:
        "linear-gradient(to bottom, black 0%, #282525 50%, black 100%)",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[15px]",
      fontWeight: "extrabold",
      titleColor: "text-[#a0bbd6]",
    },
    {
      id: "advertising-section",
      videoSrc: advertisingVideo,
      title: "ADVERTISING ATL&BTL",
      description:
        "Big ideasthat inspire,and activationsthat bring them to\nlife. From smart media placements to experiences\npeople talk about, we craft campaigns that make a\nstatement. Our approach blends creativity with strategy\nto deliver messages that capture attention, fuel\nconversations, and drive real engagement.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      gradientStyle: "linear-gradient(to bottom, black 0%, #5bada1 5%)",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[15px]",
      fontWeight: "extrabold",
    },
    {
      id: "exhibition-section",
      videoSrc: exhibitionVideo,
      title: "EXHIBITIONS &EVENTS",
      description:
        "Immersiveworldsbuilt from imagination.Whetherit's\na high-profile exhibition or an intimate brand\nshowcase, we design environments where\naudiences don't just attend—they belong. Every\ndetail is curated to tell your story and leave a lasting\nimpression long after the event ends.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      gradientStyle: "linear-gradient(to bottom, black 0%, #9e8c3d 5%)",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
    },
    {
      id: "digital-section",
      videoSrc: digitalVideo,
      title: "DIGITAL",
      description:
        "SEO,websites, apps,socials, and performance that\nmakes clicks count. We build digital ecosystems that\nconnect brands to people wherever they are. From\nsleek platforms and functional tools to content that\ngrabs attention, we create experiences that make your\nonline presence dynamic and effective.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      gradientStyle: "linear-gradient(to bottom, black 0%, #ad2b2b 5%)",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
    },
    {
      id: "creative-section",
      videoSrc: creativeVideo,
      title: "CREATIVE",
      description:
        "Design,film,photography,and content that ignite\nconnection. Our creative team turns concepts into\ncompelling visuals and narratives that stay with people.\nEach project is crafted with purpose and precision—\nmade to resonate, inspire, and keep your brand top of\nmind.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
    },
    {
      id: "outdoor-section",
      videoSrc: outdoorVideo,
      title: "PRINT& OUTDOOR",
      description:
        "From billboards to signage, we makemessages\nunmissable. In a crowded landscape, we create clarity.\nBold layouts, striking visuals, and sharp copy ensure\nyour brand stands tall on every street corner, magazine\npage, and surfacewhere people look.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
      gradientStyle: "linear-gradient(to bottom, #140f0f 0%, #584da0 40%)",
    },
    {
      id: "seera-section",
      ref: seeraRef,
      videoSrc: seeraVideo,
      title: "Seera",
      description:
        "Our premium brand for bespoke, beautifully designed\ngifts, custom-crafted to reflect your identity in a\nmemorable and lasting expression. Each piece is\ncarefully developed to carry meaning, transforming\ncorporate gifting into a personal gesture that lingers long\nafter it's given. With Seera, your brand is remembered\nthrough objects that tell a story of thought and care.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
      gradientStyle:
        "linear-gradient(to bottom, black 0%, #282525 50%, black 100%)",
      descriptionColor: "text-[#a0bbd6]",
    },
    {
      id: "because-for-us-section",
      ref: becauseForUsRef,
      videoSrc: becauseForUsVideo,
      title: "BECAUSE FORUS",
      description:
        "Because for us,inkismorethanamedium..it'sthestart\nof every great story.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
      gradientStyle: "linear-gradient(to bottom, black 0%, #5bada1 5%)",
      descriptionWidth: "w-[200px]",
    },
    {
      id: "white-ink-section",
      ref: whiteInkRef,
      videoSrc: whiteInkVideo,
      title: "WHITE INK",
      description: "Where Ideas Come Alive.",
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
      gradientStyle: "linear-gradient(to bottom, black 0%, #9e8c3d 5%)",
      descriptionWidth: "w-[200px]",
    },
    {
      id: "contact-section",
      ref: contactRef,
      videoSrc: contactVideo,
      title: "CONTACT US",
      description: (
        <div className="flex   justify-end flex-col items-end space-y-6">
          <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center gap-5 ">
          <p className="font-[Playfair_Display] text-[26px]">
              info@whiteinkae.com
              </p>
              <div
                className="bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={mouseCLickRing}
              >
                <IoMdMail className="text-[#ad2b2b]" />
              </div>
              </div>
            
          </div>
          <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center gap-5">
          <p className="font-[Arial_Helvetica_sans-serif] text-26px]"> +971 50 784 8788</p>
              <div
                className="bg-white p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                onClick={mouseCLickRing}
              >
                <MdLocalPhone className="text-[#ad2b2b] text-2xl" />
              </div>
              </div>
          </div>
        </div>
      ),
      autoPlay: true,
      resetOnOutOfView: true,
      titleLeading: "leading-[0.90]",
      titleSpacing: "pr-10",
      titleSize: "text-[60px]",
      wordSpacing: "word-spacing-[10px]",
      letterSpacing: "tracking-[8px]",
      fontWeight: "extrabold",
      gradientStyle: "linear-gradient(to bottom, black 0%, #ad2b2b 5%)",
      descriptionWidth: "w-[300px]",
    },
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

  const playSound = useCallback(() => {
    const audio = new Audio(cameraClickSound);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch((error) => {
      console.error("Error playing telephone ring sound:", error);
    });

    // Stop the audio after 3 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset to beginning
    }, 3000);
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const imageData = canvas.toDataURL("image/png");
      playSound();
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
      {/* Model is preloaded using useGLTF.preload() */}

      <HeroSection
        navigationItems={navigationItems}
        capturedImage={capturedImage}
        handleCameraClick={handleCameraClick}
        scrollToAbout={scrollToAbout}
        onContactBookPositionChange={handleContactBookPositionChange}
        onAboutBookPositionChange={handleAboutBookPositionChange}
        onBecauseBookPositionChange={handleBecauseBookPositionChange}
        onLoremBookPositionChange={handleLoremBookPositionChange}
        onServicesBookPositionChange={handleServicesBookPositionChange}
        onWhiteInkBookPositionChange={handleWhiteInkBookPositionChange}
        animationStates={animationStates}
        animationPhases={animationPhases}
      />

      {/* Contact Animation Overlay */}
      {
        showContactAnimation && (
          <>
            <div
              className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
                contactAnimationPhase === "video"
                  ? "bg-black bg-opacity-10"
                  : ""
              }`}
              style={{
                overflow: "visible",
                ...(contactBookPosition
                  ? {
                      position: "fixed",
                      top: contactBookPosition?.viewportTop
                        ? contactBookPosition.viewportTop / 2
                        : 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 999999,
                    }
                  : {}),
              }}
            >
              {/* <ThreeJSModel
                key={`contact-model-${animationKey}`}
                modelPath={contactModel}
                className="w-full h-full  rounded-lg transform-gpu transition-all duration-500 ease-out"
                style={{
                  overflow: "visible",
                  position: "fixed",
                  top: contactBookPosition?.viewportTop
                    ? contactBookPosition.viewportTop / 2
                    : 0,
                  left: contactBookPosition?.viewportLeft
                    ? contactBookPosition.viewportLeft * 10
                    : 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "1600px",
                  maxHeight: "1600px",
                }}
                bookColor={"#fff"}
                objectName="Book"
                isVisible={true}
                enableControls={false}
                enableEnvironment={false}
                cameraPosition={[0, 0, 2]}
                cameraFov={30}
                autoPlayAnimations={true}
                animationSpeed={1.0}
                animationDuration={2.5}
                animationStartOffset={0.8}
                onLoad={() => {
                  console.log("Contact 3D model loaded successfully");
                }}
                onError={(e) => {
                  console.error("Contact 3D model error:", e);
                  // Skip model and go to contact after a short delay
                  setTimeout(() => {
                    setContactAnimationPhase("scrolling");
                    scrollToContact();
                    setTimeout(() => {
                      setShowContactAnimation(false);
                      setContactAnimationPhase("idle");
                      setClickedBook(null);
                      setContactBookPosition(null);
                    }, 1000);
                  }, 2000);
                }}
              /> */}
            </div>
          </>
        )
      }

      {
        /* Because Animation Overlay */
      }
      {
        showBecauseAnimation && (
          <>
            <div
              className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
                becauseAnimationPhase === "video"
                  ? "bg-black bg-opacity-10"
                  : ""
              }`}
              style={{
                overflow: "visible",
                ...(becauseBookPosition
                  ? {
                      position: "fixed",
                      top: becauseBookPosition?.viewportTop
                        ? becauseBookPosition.viewportTop / 2
                        : 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 999999,
                    }
                  : {}),
              }}
            >
              {/* <ThreeJSModel
                key={`because-model-${animationKey}`}
                modelPath={becauseModel}
                className="w-full h-full rounded-lg transform-gpu transition-all duration-500 ease-out"
                style={{
                  overflow: "visible",
                  position: "fixed",
                  top: becauseBookPosition?.viewportTop
                    ? becauseBookPosition.viewportTop / 2
                    : 0,
                  left: becauseBookPosition?.viewportLeft
                    ? becauseBookPosition.viewportLeft * 10
                    : 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "1600px",
                  maxHeight: "1600px",
                }}
                bookColor={"#5bada1"}
                objectName="Book"
                isVisible={true}
                enableControls={false}
                enableEnvironment={false}
                cameraPosition={[0, 0, 2]}
                cameraFov={30}
                autoPlayAnimations={true}
                animationSpeed={1.0}
                animationDuration={2.5}
                animationStartOffset={0.8}
                onLoad={() => {
                  console.log("Because 3D model loaded successfully");
                }}
                onError={(e) => {
                  console.error("Because 3D model error:", e);
                  // Skip model and go to because section after a short delay
                  setTimeout(() => {
                    setBecauseAnimationPhase("scrolling");
                    scrollToBecauseForUs();
                    setTimeout(() => {
                      setShowBecauseAnimation(false);
                      setBecauseAnimationPhase("idle");
                      setClickedBook(null);
                      setAboutBookPosition(null);
                    }, 1000);
                  }, 2000);
                }}
              /> */}
            </div>
          </>
        )
      }

      {
        /* Lorem Animation Overlay */
      }
      {
        showLoremAnimation && (
          <>
            <div
              className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
                loremAnimationPhase === "video" ? "bg-black bg-opacity-10" : ""
              }`}
              style={{
                overflow: "visible",
                ...(loremBookPosition
                  ? {
                      position: "fixed",
                      top: loremBookPosition?.viewportTop
                        ? loremBookPosition.viewportTop / 2
                        : 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 999999,
                    }
                  : {}),
              }}
            >
              {/* <ThreeJSModel
                key={`lorem-model-${animationKey}`}
                modelPath={loremModel}
                className="w-full h-full rounded-lg transform-gpu transition-all duration-500 ease-out"
                style={{
                  overflow: "visible",
                  position: "fixed",
                  top: loremBookPosition?.viewportTop
                    ? loremBookPosition.viewportTop / 2
                    : 0,
                  left: loremBookPosition?.viewportLeft
                    ? loremBookPosition.viewportLeft * 10
                    : 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "1600px",
                  maxHeight: "1600px",
                }}
                bookColor={"#9e8c3d"}
                objectName="Book"
                isVisible={true}
                enableControls={false}
                enableEnvironment={false}
                cameraPosition={[0, 0, 2]}
                cameraFov={30}
                autoPlayAnimations={true}
                animationSpeed={1.0}
                animationDuration={2.5}
                animationStartOffset={0.8}
                onLoad={() => {
                  console.log("Lorem 3D model loaded successfully");
                }}
                onError={(e) => {
                  console.error("Lorem 3D model error:", e);
                  // Skip model and go to seera section after a short delay
                  setTimeout(() => {
                    setLoremAnimationPhase("scrolling");
                    scrollToSeera();
                    setTimeout(() => {
                      setShowLoremAnimation(false);
                      setLoremAnimationPhase("idle");
                      setClickedBook(null);
                      setAboutBookPosition(null);
                    }, 1000);
                  }, 2000);
                }}
              /> */}
            </div>
          </>
        )
      }

      {
        /* Services Animation Overlay */
      }
      {
        showServicesAnimation && (
          <>
            <div
              className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
                servicesAnimationPhase === "video"
                  ? "bg-black bg-opacity-10"
                  : ""
              }`}
              style={{
                overflow: "visible",
                ...(servicesBookPosition
                  ? {
                      position: "fixed",
                      top: servicesBookPosition?.viewportTop
                        ? servicesBookPosition.viewportTop / 2
                        : 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      zIndex: 999999,
                    }
                  : {}),
              }}
            >
              {/* <ThreeJSModel
                key={`services-model-${animationKey}`}
                modelPath={serviceModel}
                className="w-full h-full rounded-lg transform-gpu transition-all duration-500 ease-out"
                style={{
                  overflow: "visible",
                  position: "fixed",
                  top: servicesBookPosition?.viewportTop
                    ? servicesBookPosition.viewportTop / 2
                    : 0,
                  left: servicesBookPosition?.viewportLeft
                    ? servicesBookPosition.viewportLeft * 10
                    : 0,
                  width: "100%",
                  height: "100%",
                  maxWidth: "1600px",
                  maxHeight: "1600px",
                }}
                bookColor={"#584da0"}
                objectName="Book"
                isVisible={true}
                enableControls={false}
                enableEnvironment={false}
                cameraPosition={[0, 0, 2]}
                cameraFov={30}
                autoPlayAnimations={true}
                animationSpeed={1.0}
                animationDuration={2.5}
                animationStartOffset={0.8}
                onLoad={() => {
                  console.log("Services 3D model loaded successfully");
                }}
                onError={(e) => {
                  console.error("Services 3D model error:", e);
                  // Skip model and go to white ink section after a short delay
                  setTimeout(() => {
                    setServicesAnimationPhase("scrolling");
                    scrollToWhiteInk();
                    setTimeout(() => {
                      setShowServicesAnimation(false);
                      setServicesAnimationPhase("idle");
                      setClickedBook(null);
                      setAboutBookPosition(null);
                    }, 1000);
                  }, 2000);
                }}
              /> */}
            </div>
          </>
        )
      }

      {/* About Animation Overlay */}
      {showAboutAnimation && (
        <>
          <div
            className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
              aboutAnimationPhase === "video" ? "bg-black bg-opacity-10" : ""
            }`}
            style={{
              overflow: "visible",
              ...(aboutBookPosition
                ? {
                    position: "fixed",
                    top: aboutBookPosition?.viewportTop
                      ? aboutBookPosition.viewportTop / 2
                      : 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 999999,
                  }
                : {}),
            }}
          >
            {/* <ThreeJSModel
              key={`about-model-${animationKey}`}
              modelPath={aboutModel}
              className="w-full h-full rounded-lg transform-gpu transition-all duration-500 ease-out"
              style={{
                overflow: "visible",
                position: "fixed",
                top: aboutBookPosition?.viewportTop
                  ? aboutBookPosition.viewportTop / 2
                  : 0,
                left: aboutBookPosition?.viewportLeft
                  ? aboutBookPosition.viewportLeft * 10
                  : 0,
                width: "100%",
                height: "100%",
                maxWidth: "1600px",
                maxHeight: "1600px",
              }}
              bookColor={"#064e3b"}
              objectName="Book"
              isVisible={true}
              enableControls={false}
              enableEnvironment={false}
              cameraPosition={[0, 0, 2]}
              cameraFov={30}
              autoPlayAnimations={true}
              animationSpeed={1.0}
              animationDuration={2.5}
              animationStartOffset={0.8}
              onLoad={() => {
                console.log("About 3D model loaded successfully");
              }}
              onError={(e) => {
                console.error("About 3D model error:", e);
                // Skip model and go to about section after a short delay
                setTimeout(() => {
                  setAboutAnimationPhase("scrolling");
                  scrollToAbout();
                  setTimeout(() => {
                    setShowAboutAnimation(false);
                    setAboutAnimationPhase("idle");
                    setClickedBook(null);
                    setAboutBookPosition(null);
                  }, 1000);
                }, 2000);
              }}
            /> */}
          </div>
        </>
      )}

      {/* White Ink Animation Overlay */}
      {showWhiteInkAnimation && (
        <>
          <div
            className={`w-full h-full fixed inset-0 z-[999999] bg-transparent transition-all duration-500 ease-in-out ${
              whiteInkAnimationPhase === "video" ? "bg-black bg-opacity-10" : ""
            }`}
            style={{
              overflow: "visible",
              ...(whiteInkBookPosition
                ? {
                    position: "fixed",
                    top: whiteInkBookPosition?.viewportTop
                      ? whiteInkBookPosition.viewportTop / 2
                      : 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 999999,
                  }
                : {}),
            }}
          >
            {/* <ThreeJSModel
              key={`whiteink-model-${animationKey}`}
              modelPath={whiteInkModel}
              className="w-full h-full rounded-lg transform-gpu transition-all duration-500 ease-out"
              style={{
                overflow: "visible",
                position: "fixed",
                top: whiteInkBookPosition?.viewportTop
                  ? whiteInkBookPosition.viewportTop / 2
                  : 0,
                left: whiteInkBookPosition?.viewportLeft
                  ? whiteInkBookPosition.viewportLeft * 10
                  : 0,
                width: "100%",
                height: "100%",
                maxWidth: "1600px",
                maxHeight: "1600px",
              }}
              bookColor={"#9e8c3d"}
              objectName="Book"
              isVisible={true}
              enableControls={false}
              enableEnvironment={false}
              cameraPosition={[0, 0, 2]}
              cameraFov={30}
              autoPlayAnimations={true}
              animationSpeed={1.0}
              animationDuration={2.5}
              animationStartOffset={0.8}
              onLoad={() => {
                console.log("White Ink 3D model loaded successfully");
              }}
              onError={(e) => {
                console.error("White Ink 3D model error:", e);
                // Skip model and go to white ink section after a short delay
                setTimeout(() => {
                  setWhiteInkAnimationPhase("scrolling");
                  scrollToWhiteInk();
                  setTimeout(() => {
                    setShowWhiteInkAnimation(false);
                    setWhiteInkAnimationPhase("idle");
                    setClickedBook(null);
                    setAboutBookPosition(null);
                  }, 1000);
                }, 2000);
              }}
            /> */}
          </div>
        </>
      )}

      <CameraModal
        showCameraModal={showCameraModal}
        videoRef={videoRef}
        canvasRef={canvasRef}
        startCamera={startCamera}
        capturePhoto={capturePhoto}
        closeModals={closeModals}
        handleUploadClick={handleUploadClick}
      />

      <UploadModal
        showUploadModal={showUploadModal}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUpload}
        closeModals={closeModals}
        handleCameraClick={handleCameraClick}
      />
      <CompanyIntroSection />

      {/* Render all video sections using mapping */}
      {videoSections.map((section, index) => (
        <VideoContentSection key={section.id || index} {...section} />
      ))}

      <FooterSection />

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
