import React, { useState, useRef } from "react";
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
import ScrollToTopButton from "../components/ScrollToTopButton";
import HeroSection from "../components/HeroSection";
import CompanyIntroSection from "../components/CompanyIntroSection";
import CameraModal from "../components/CameraModal";
import UploadModal from "../components/UploadModal";
import FooterSection from "../components/FooterSection";
import SplineModel from "../components/SplineModel";

const LandingPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [_, setHasPlayedAboutVideo] = useState(false);
  const [showContactAnimation, setShowContactAnimation] = useState(false);
  const [contactAnimationPhase, setContactAnimationPhase] = useState("idle"); // 'idle', 'scaling', 'video', 'scrolling'
  const [showBecauseAnimation, setShowBecauseAnimation] = useState(false);
  const [becauseAnimationPhase, setBecauseAnimationPhase] = useState("idle"); // 'idle', 'scaling', 'video', 'scrolling'
  const [showLoremAnimation, setShowLoremAnimation] = useState(false);
  const [loremAnimationPhase, setLoremAnimationPhase] = useState("idle");
  const [showServicesAnimation, setShowServicesAnimation] = useState(false);
  const [servicesAnimationPhase, setServicesAnimationPhase] = useState("idle");
  const [showAboutAnimation, setShowAboutAnimation] = useState(false);
  const [aboutAnimationPhase, setAboutAnimationPhase] = useState("idle");
  const [showWhiteInkAnimation, setShowWhiteInkAnimation] = useState(false);
  const [whiteInkAnimationPhase, setWhiteInkAnimationPhase] = useState("idle");
  const [clickedBook, setClickedBook] = useState(null); // Track which book was clicked
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
  } = useScrollToSection();

  const handleContactClick = () => {
    setClickedBook("contact");
    setShowContactAnimation(true);
    setContactAnimationPhase("scaling");
    // Start scaling animation
    setTimeout(() => {
      setContactAnimationPhase("video");
      // Fallback timeout - if model doesn't load properly, proceed after 8 seconds
      setTimeout(() => {
        if (contactAnimationPhase === "video") {
          console.log("Model timeout - proceeding to contact");
          setContactAnimationPhase("scrolling");
          scrollToContact();
          setTimeout(() => {
            setShowContactAnimation(false);
            setContactAnimationPhase("idle");
          }, 1000);
        }
      }, 8000); // 8 second fallback
    }, 1000); // Scaling duration
  };

  const handleBecauseClick = () => {
    setClickedBook("because");
    setShowBecauseAnimation(true);
    setBecauseAnimationPhase("scaling");

    // Start scaling animation
    setTimeout(() => {
      setBecauseAnimationPhase("video");

      // Fallback timeout - if video doesn't end naturally, proceed after 10 seconds
      setTimeout(() => {
        if (becauseAnimationPhase === "video") {
          console.log("Video timeout - proceeding to because");
          setBecauseAnimationPhase("scrolling");
          scrollToBecauseForUs();
          setTimeout(() => {
            setShowBecauseAnimation(false);
            setBecauseAnimationPhase("idle");
          }, 1000);
        }
      }, 10000); // 10 second fallback
    }, 1000); // Scaling duration
  };

  const handleLoremClick = () => {
    setClickedBook("lorem");
    setShowLoremAnimation(true);
    setLoremAnimationPhase("scaling");

    setTimeout(() => {
      setLoremAnimationPhase("video");

      setTimeout(() => {
        if (loremAnimationPhase === "video") {
          console.log("Video timeout - proceeding to lorem");
          setLoremAnimationPhase("scrolling");
          scrollToSeera();
          setTimeout(() => {
            setShowLoremAnimation(false);
            setLoremAnimationPhase("idle");
          }, 1000);
        }
      }, 10000);
    }, 1000);
  };

  const handleServicesClick = () => {
    setClickedBook("services");
    setShowServicesAnimation(true);
    setServicesAnimationPhase("scaling");

    setTimeout(() => {
      setServicesAnimationPhase("video");

      setTimeout(() => {
        if (servicesAnimationPhase === "video") {
          console.log("Video timeout - proceeding to services");
          setServicesAnimationPhase("scrolling");
          scrollToWhiteInk();
          setTimeout(() => {
            setShowServicesAnimation(false);
            setServicesAnimationPhase("idle");
          }, 1000);
        }
      }, 10000);
    }, 1000);
  };

  const handleAboutClick = () => {
    setClickedBook("about");
    setShowAboutAnimation(true);
    setAboutAnimationPhase("scaling");

    setTimeout(() => {
      setAboutAnimationPhase("video");

      setTimeout(() => {
        if (aboutAnimationPhase === "video") {
          console.log("Video timeout - proceeding to about");
          setAboutAnimationPhase("scrolling");
          scrollToAbout();
          setTimeout(() => {
            setShowAboutAnimation(false);
            setAboutAnimationPhase("idle");
          }, 1000);
        }
      }, 10000);
    }, 1000);
  };

  const handleWhiteInkClick = () => {
    setClickedBook("whiteink");
    setShowWhiteInkAnimation(true);
    setWhiteInkAnimationPhase("scaling");

    setTimeout(() => {
      setWhiteInkAnimationPhase("video");

      setTimeout(() => {
        if (whiteInkAnimationPhase === "video") {
          console.log("Video timeout - proceeding to white ink");
          setWhiteInkAnimationPhase("scrolling");
          scrollToWhiteInk();
          setTimeout(() => {
            setShowWhiteInkAnimation(false);
            setWhiteInkAnimationPhase("idle");
          }, 1000);
        }
      }, 10000);
    }, 1000);
  };

  // Navigation items data structure
  const navigationItems = [
    {
      text: "CONTACT",
      onClick: handleContactClick,
      isContact: true,
      style: {
        backgroundImage: `url(${book5})`,
        fontSize: "clamp(12px, 1.2vw, 46px)",
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
  ];

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
      <HeroSection
        navigationItems={navigationItems}
        capturedImage={capturedImage}
        handleCameraClick={handleCameraClick}
        scrollToAbout={scrollToAbout}
      />

      {/* Contact Animation Overlay */}
      {showContactAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {/* 3D Model Animation */}
            {contactAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/Iarp6JXqMCd9zBPJ/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh] rounded-lg shadow-2xl"
                  // clickedBook
                  //   ? navigationItems.find(
                  //       (item) =>
                  //         (clickedBook === "contact" &&
                  //           item.text === "CONTACT") ||
                  //         (clickedBook === "because" &&
                  //           item.text === "BECAUSE") ||
                  //         (clickedBook === "lorem" &&
                  //           item.text === "Lorem") ||
                  //         (clickedBook === "services" &&
                  //           item.text === "SERVICES") ||
                  //         (clickedBook === "about" &&
                  //           item.text === "ABOUT") ||
                  //         (clickedBook === "whiteink" &&
                  //           item.text === "WHITE INK")
                  //     )?.color
                  //   : "#0000"
                  bookColor={"#000"}
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    // Auto-proceed after model loads
                    setTimeout(() => {
                      setContactAnimationPhase("scrolling");
                      scrollToContact();
                      setTimeout(() => {
                        setShowContactAnimation(false);
                        setContactAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000); // Show model for 3 seconds
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    // Skip model and go to contact after a short delay
                    setTimeout(() => {
                      setContactAnimationPhase("scrolling");
                      scrollToContact();
                      setTimeout(() => {
                        setShowContactAnimation(false);
                        setContactAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Because Animation Overlay */}
      {showBecauseAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {/* 3D Model Animation */}
            {becauseAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/4GWpSUZYplg2P30Z/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh] rounded-lg shadow-2xl"
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    setTimeout(() => {
                      setBecauseAnimationPhase("scrolling");
                      scrollToBecauseForUs();
                      setTimeout(() => {
                        setShowBecauseAnimation(false);
                        setBecauseAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000);
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    setTimeout(() => {
                      setBecauseAnimationPhase("scrolling");
                      scrollToBecauseForUs();
                      setTimeout(() => {
                        setShowBecauseAnimation(false);
                        setBecauseAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lorem Animation Overlay */}
      {showLoremAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {loremAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/0yLB649mVeXuvS8Y/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh] rounded-lg shadow-2xl"
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    setTimeout(() => {
                      setLoremAnimationPhase("scrolling");
                      scrollToSeera();
                      setTimeout(() => {
                        setShowLoremAnimation(false);
                        setLoremAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000);
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    setTimeout(() => {
                      setLoremAnimationPhase("scrolling");
                      scrollToSeera();
                      setTimeout(() => {
                        setShowLoremAnimation(false);
                        setLoremAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Services Animation Overlay */}
      {showServicesAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {servicesAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/yBnsN6cuP6WQiMdG/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh] rounded-lg shadow-2xl"
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    setTimeout(() => {
                      setServicesAnimationPhase("scrolling");
                      scrollToWhiteInk();
                      setTimeout(() => {
                        setShowServicesAnimation(false);
                        setServicesAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000);
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    setTimeout(() => {
                      setServicesAnimationPhase("scrolling");
                      scrollToWhiteInk();
                      setTimeout(() => {
                        setShowServicesAnimation(false);
                        setServicesAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* About Animation Overlay */}
      {showAboutAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {aboutAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/1UhDKguUwLtmfEky/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh] rounded-lg md:h-[10vh] md:w-[10vw] shadow-2xl"
                  bookColor={
                    clickedBook
                      ? navigationItems.find(
                          (item) =>
                            (clickedBook === "contact" &&
                              item.text === "CONTACT") ||
                            (clickedBook === "because" &&
                              item.text === "BECAUSE") ||
                            (clickedBook === "lorem" &&
                              item.text === "Lorem") ||
                            (clickedBook === "services" &&
                              item.text === "SERVICES") ||
                            (clickedBook === "about" &&
                              item.text === "ABOUT") ||
                            (clickedBook === "whiteink" &&
                              item.text === "WHITE INK")
                        )?.color
                      : "#064e3b"
                  }
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    setTimeout(() => {
                      setAboutAnimationPhase("scrolling");
                      scrollToAbout();
                      setTimeout(() => {
                        setShowAboutAnimation(false);
                        setAboutAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000);
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    setTimeout(() => {
                      setAboutAnimationPhase("scrolling");
                      scrollToAbout();
                      setTimeout(() => {
                        setShowAboutAnimation(false);
                        setAboutAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* White Ink Animation Overlay */}
      {showWhiteInkAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-90">
          <div className="relative">
            {whiteInkAnimationPhase === "video" && (
              <div className="relative">
                <SplineModel
                  sceneUrl="https://prod.spline.design/RW8B8ADwVqanNatQ/scene.splinecode"
                  className="w-full h-auto max-w-4xl max-h-[80vh]  rounded-lg shadow-2xl"
                  objectName="Book"
                  onLoad={() => {
                    console.log("3D model loaded successfully");
                    setTimeout(() => {
                      setWhiteInkAnimationPhase("scrolling");
                      scrollToWhiteInk();
                      setTimeout(() => {
                        setShowWhiteInkAnimation(false);
                        setWhiteInkAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 3000);
                  }}
                  onError={(e) => {
                    console.error("3D model error:", e);
                    setTimeout(() => {
                      setWhiteInkAnimationPhase("scrolling");
                      scrollToWhiteInk();
                      setTimeout(() => {
                        setShowWhiteInkAnimation(false);
                        setWhiteInkAnimationPhase("idle");
                        setClickedBook(null);
                      }, 1000);
                    }, 2000);
                  }}
                />
              </div>
            )}
          </div>
        </div>
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
