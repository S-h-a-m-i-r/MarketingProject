import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeJSModel = ({
  modelPath,
  bookColor,
  objectName,
  isVisible,
  enableControls = true,
  enableEnvironment = true,
  className = "",
}) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0.7); // Very close to the model

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    if (enableEnvironment) {
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.position.set(5, 10, 7.5);
      scene.add(dirLight);
    }

    // Controls
    let controls;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
    }

    // Load Model
    const loader = new GLTFLoader();
    let model;
    let mixer;
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        // Scale the model to make it more visible
        model.scale.set(3, 3, 3);

        // Setup animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.play();
          });
        }

        if (objectName) {
          const target = model.getObjectByName(objectName);
          if (target && target.material) {
            target.material = target.material.clone();
            target.material.color = new THREE.Color(bookColor);
          }
        }
        scene.add(model);
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    // Resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Update animation mixer
      if (mixer) {
        mixer.update(delta);
      }

      if (controls) controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [
    modelPath,
    bookColor,
    objectName,
    isVisible,
    enableControls,
    enableEnvironment,
  ]);

  return <div ref={containerRef} className={className}></div>;
};

export default ThreeJSModel;
