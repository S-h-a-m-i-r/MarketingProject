import React from "react";

const UploadModal = ({ 
  showUploadModal, 
  fileInputRef, 
  handleFileUpload, 
  closeModals, 
  handleCameraClick 
}) => {
  if (!showUploadModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Upload Photo</h3>
        <div className="mb-4">
          <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileUpload} className="w-full p-2 border rounded" />
          <p className="text-sm text-gray-600 mt-2">Only JPG, PNG, and JPEG files are allowed</p>
        </div>
        <div className="flex gap-3">
          <button onClick={closeModals} className="flex-1 py-2 rounded bg-gray-500 text-white">Cancel</button>
        </div>
        <div className="mt-3">
          <button onClick={handleCameraClick} className="w-full py-2 rounded bg-blue-600 text-white">Or Take Photo Instead</button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

