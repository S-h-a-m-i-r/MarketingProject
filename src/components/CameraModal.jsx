import React from "react";

const CameraModal = ({ 
  showCameraModal, 
  videoRef, 
  canvasRef, 
  startCamera, 
  capturePhoto, 
  closeModals, 
  handleUploadClick 
}) => {
  if (!showCameraModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Take a Photo</h3>
        <div className="mb-4">
          <video ref={videoRef} autoPlay playsInline className="w-full h-64 bg-gray-200 rounded" />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>
        <div className="flex gap-3">
          <button onClick={startCamera} className="flex-1 py-2 rounded bg-blue-600 text-white">Start Camera</button>
          <button onClick={capturePhoto} className="flex-1 py-2 rounded bg-green-600 text-white">Capture Photo</button>
          <button onClick={closeModals} className="flex-1 py-2 rounded bg-gray-500 text-white">Cancel</button>
        </div>
        <div className="mt-3">
          <button onClick={handleUploadClick} className="w-full py-2 rounded bg-purple-600 text-white">Or Upload File Instead</button>
        </div>
      </div>
    </div>
  );
};

export default CameraModal;

