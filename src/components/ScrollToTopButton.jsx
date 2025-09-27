import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = ({ 
  threshold = 300, // Show button after scrolling 300px
  className = "",
  iconSize = "text-2xl",
  buttonSize = "w-12 h-12",
  position = "fixed bottom-8 right-8",
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            ${position}
            ${buttonSize}
            ${className}
            bg-[#BE1E23] 
            hover:bg-[#a0171a] 
            text-white 
            rounded-full 
            shadow-lg 
            hover:shadow-xl 
            transition-all 
            duration-300 
            ease-in-out 
            hover:scale-110 
            z-50
            flex 
            items-center 
            justify-center
            group
          `}
          aria-label="Scroll to top"
          {...props}
        >
          <FaArrowUp 
            className={`${iconSize} transition-transform duration-300 group-hover:-translate-y-1`} 
          />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
