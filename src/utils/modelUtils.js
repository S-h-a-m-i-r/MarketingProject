import { useGLTF } from "@react-three/drei";

// Preload function for models
export const preloadModel = (modelPath) => {
  useGLTF.preload(modelPath);
};
