const MedicineModal = ({ medicine, onClose }) => {
  if (!medicine) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{medicine.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              &times;
            </button>
          </div>

          <img
            src={medicine.image}
            alt={medicine.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="font-semibold text-gray-800">Category:</span> {medicine.category}</p>
            {medicine.genericName && (
              <p><span className="font-semibold text-gray-800">Generic Name:</span> {medicine.genericName}</p>
            )}
            {medicine.company && (
              <p><span className="font-semibold text-gray-800">Company:</span> {medicine.company}</p>
            )}
            {medicine.massUnit && (
              <p><span className="font-semibold text-gray-800">Mass Unit:</span> {medicine.massUnit}</p>
            )}
            <p><span className="font-semibold text-gray-800">Price:</span> ${medicine.price}</p>
            {medicine.discount > 0 && (
              <p><span className="font-semibold text-gray-800">Discount:</span> {medicine.discount}%</p>
            )}
            <p><span className="font-semibold text-gray-800">Available Quantity:</span> {medicine.quantity}</p>
            {medicine.description && (
              <p><span className="font-semibold text-gray-800">Description:</span> {medicine.description}</p>
            )}
            {medicine.seller && (
              <p><span className="font-semibold text-gray-800">Seller:</span> {medicine.seller.name} ({medicine.seller.email})</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-lime-500 text-white py-2 rounded-lg hover:bg-lime-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default MedicineModal
