import React from "react";

export default function DataDialog({ onClose, Title }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
        <p className="text-green-600 font-semibold mb-4">{Title}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
}
