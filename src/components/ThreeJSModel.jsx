import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Environment, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// Model component that loads and displays the GLB file
function Model({
  modelPath,
  bookColor,
  objectName = "Book",
  isVisible = true,
  autoPlayAnimations = true,
  animationSpeed = 1.0,
  ...props
}) {
  const { scene, animations } = useGLTF(modelPath);
  const modelRef = useRef();
  const mixerRef = useRef();

  // Store original materials on first load
  useEffect(() => {
    if (scene) {
      // Store original materials for potential future use
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          // Store original material reference
          child.userData.originalMaterial = child.material.clone();
        }
      });
    }
  }, [scene]);

  // Setup animations
  useEffect(() => {
    if (scene && animations && animations.length > 0 && autoPlayAnimations) {
      console.log(
        `Found ${animations.length} animations, starting playback...`
      );
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip, index) => {
        console.log(
          `Playing animation ${index + 1}: ${clip.name || "Unnamed"}`
        );
        const action = mixerRef.current.clipAction(clip);
        action.setEffectiveTimeScale(animationSpeed);
        action.play();
      });
    } else if (scene && animations && animations.length === 0) {
      console.log("No animations found in this model");
    }
  }, [scene, animations, autoPlayAnimations, animationSpeed]);

  // Change color of specific object
  useEffect(() => {
    if (scene && bookColor && objectName) {
      scene.traverse((child) => {
        if (child.isMesh && child.name === objectName) {
          if (child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial.clone();
          }
          child.material.color.set(bookColor);
        }
      });
    }
  }, [scene, bookColor, objectName]);

  // Animation loop
  useFrame((state, delta) => {
    if (modelRef.current && isVisible) {
      // Add a subtle floating motion (no rotation)
      modelRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 2) * 0.05; // Gentle floating
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }
    }
  });

  if (!scene) return null;

  return (
    <group ref={modelRef} {...props} scale={[4, 4, 4]}>
      <primitive object={scene} />
    </group>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading 3D Model...</p>
      </div>
    </div>
  );
}

// Main ThreeJSModel component
const ThreeJSModel = ({
  modelPath,
  className = "",
  bookColor = "#ffffff",
  objectName = "Book",
  isVisible = true,
  enableControls = true,
  enableEnvironment = true,
  cameraPosition = [0, 0, 2],
  cameraFov = 25,
  autoPlayAnimations = true,
  animationSpeed = 1.0,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  const handleError = (error) => {
    console.error("Error loading 3D model:", error);
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(error);
  };

  if (hasError) {
    return (
      <div
        className={`w-full h-full ${className} flex items-center justify-center`}
      >
        <div className="text-center text-red-500">
          <p>Failed to load 3D model</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        onCreated={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
          backgroundColor: "transparent",
          overflow: "visible",
          width: "100%",
          height: "100%",
        }}
        gl={{ alpha: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} />
          <pointLight position={[0, 0, 3]} intensity={0.5} />

          {/* Environment */}
          {enableEnvironment && <Environment preset="sunset" />}

          {/* Model */}
          <Center>
            <Model
              modelPath={modelPath}
              bookColor={bookColor}
              objectName={objectName}
              isVisible={isVisible}
              autoPlayAnimations={autoPlayAnimations}
              animationSpeed={animationSpeed}
              {...props}
            />
          </Center>

          {/* Controls */}
          {enableControls && (
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={1}
              maxDistance={20}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeJSModel;
