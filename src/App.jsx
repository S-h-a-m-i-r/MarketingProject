
import './App.css'
import LandingPage from './Pages/LandingPage'
import ModelViewer from "./components/ModelViewer";
import { useState } from "react";

function App() {
  const [showModelViewer, setShowModelViewer] = useState(false);

  return (
    <>
      {showModelViewer ? (
        <div>
          <button
            onClick={() => setShowModelViewer(false)}
            className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Main App
          </button>
          <ModelViewer />
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowModelViewer(true)}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test 3D Models
          </button>
          <LandingPage />
        </div>
      )}
    </>
  );
}

export default App
