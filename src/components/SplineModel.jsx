import React, { useState } from "react";
import Spline from "@splinetool/react-spline";

const SplineModel = ({
  sceneUrl,
  className = "",
  onLoad = null,
  onError = null,
  bookColor = null,
  objectName = "Book", // Name of the object in Spline to change color
  isVisible = true, // Control visibility
  preload = false, // Preload the model
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [splineInstance, setSplineInstance] = useState(null);

  const handleLoad = (spline) => {
    setIsLoading(false);
    setHasError(false);
    setSplineInstance(spline);
    if (onLoad) onLoad(spline);
    spline.current?.setVariable("bookColor", "#fff");
  };

  const handleError = (error) => {
    console.error("Error loading Spline scene:", error);
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(error);
  };

  // Change book color when bookColor prop changes using Spline API
  React.useEffect(() => {
    if (splineInstance && bookColor) {
      try {
        // Find the book object in the scene
        const book = splineInstance.findObjectByName(objectName);
        if (book && book.material) {
          // Use direct assignment as per Spline API
          book.material.color = bookColor;
        }
      } catch (error) {
        console.warn("Could not change book color:", error);
      }
    }
  }, [splineInstance, bookColor, objectName]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div className="text-center text-gray-500">
          <p>Failed to load 3D model</p>
          <p className="text-sm">Please check the scene URL</p>
        </div>
      </div>
    );
  }

  // Don't render if not visible and not preloading
  if (!isVisible && !preload) {
    return null;
  }

  return (
    <>
      <Spline
        scene={sceneUrl}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 ${!isVisible ? "hidden" : ""}`}
        {...props}
      />
    </>
  );
};

export default SplineModel;
