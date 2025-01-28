import PropTypes from "prop-types";
import { FaYinYang } from "react-icons/fa";
import { useState } from "react";

const AddMedForm = ({ handleSubmit, uploadButtonText, setUploadButtonText, loading }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop();
    const fileNameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'));
    const truncatedName = fileNameWithoutExtension.length > 15
      ? fileNameWithoutExtension.slice(0, 15) + '...'
      : fileNameWithoutExtension;

    const finalName = `${truncatedName}.${fileExtension}`;

    setUploadButtonText(finalName);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    setPreviewImage(null);
  }
};

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Medicine Name"
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
              >
                <option value="General">General</option>
                <option value="Infectious">Infectious</option>
                <option value="Prescribed">Prescribed</option>
                <option value="Veterinary">Veterinary</option>
                <option value="Ointment">Ointment</option>
                <option value="Suppliment">Suppliment</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write medicine description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                name="description"
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  required
                />
              </div>
              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  required
                />
              </div>
            </div>
            {/* Image */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={handleImageUpload}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {uploadButtonText}
                    </div>
                  </label>
                </div>
                {previewImage && (
                  <div className="mt-4">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-12 h-12 object-cover mx-auto rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            >
              {loading ? <FaYinYang className="animate-spin m-auto" /> : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddMedForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  uploadButtonText: PropTypes.string.isRequired,
  setUploadButtonText: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default AddMedForm;
