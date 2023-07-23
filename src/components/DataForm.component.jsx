import React, { useState, useEffect } from "react";
import DataDialog from "./DataDialog.component";
import dataService from "../services/dataService";

const DataForm = ({ onCancel, isOpen, onClose, selectedData, mode }) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    userId: "",
    body: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    userId: "",
    body: "",
  });

  useEffect(() => {
    if (selectedData) {
      setFormData({
        title: selectedData.title,
        userId: selectedData.userId,
        body: selectedData.body,
      });
    }
  }, [selectedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.userId) {
      newErrors.userId = "userId is required";
    }

    if (!formData.body) {
      newErrors.body = "body is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        if (selectedData) {
          await dataService.updateData(selectedData.id, formData);
        } else {
          await dataService.createData(formData);
        }

        setFormData({
          title: "",
          userId: "",
          body: "",
        });

        setShowSuccessDialog(true);
      } catch (error) {
        console.error("Error creating data:", error);
      }
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <form onSubmit={handleSubmit}>
              {showSuccessDialog && (
                <DataDialog
                  onClose={() => {
                    setShowSuccessDialog(false);
                    onClose();
                  }}
                  Title={
                    selectedData
                      ? "Data updated successfully!"
                      : "Data saved successfully!"
                  }
                />
              )}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title ? "border-red-500" : ""
                  }`}
                  placeholder="Your title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs italic">{errors.title}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="userId"
                  className="block text-gray-700 font-bold mb-2"
                >
                  userId
                </label>
                <input
                  type="number"
                  id="userId"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.userId ? "border-red-500" : ""
                  }`}
                  placeholder="Your userId"
                />
                {errors.userId && (
                  <p className="text-red-500 text-xs italic">{errors.userId}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="body"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Body
                </label>
                <textarea
                  id="body"
                  name="body"
                  value={formData.body}
                  onChange={handleChange}
                  rows="4"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.body ? "border-red-500" : ""
                  }`}
                  placeholder="Your body"
                />
                {errors.body && (
                  <p className="text-red-500 text-xs italic">{errors.body}</p>
                )}
              </div>
              <div className="flex justify-end mt-4 mb-4">
                {mode !== "view" && (
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg mr-2"
                  >
                    Submit
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onCancel();
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* End of Dialog */}
    </div>
  );
};

export default DataForm;
