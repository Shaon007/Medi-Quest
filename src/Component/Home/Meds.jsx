import { FaHeartbeat, FaShieldAlt, FaTruck, FaPhoneAlt } from 'react-icons/fa'

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaHeartbeat className="w-8 h-8 text-lime-500" />,
      title: 'Genuine Medicines',
      description: 'All our medicines are sourced from verified sellers and licensed distributors.',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-lime-500" />,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-standard encryption.',
    },
    {
      icon: <FaTruck className="w-8 h-8 text-lime-500" />,
      title: 'Fast Delivery',
      description: 'Get your medicines delivered right to your doorstep within hours.',
    },
    {
      icon: <FaPhoneAlt className="w-8 h-8 text-lime-500" />,
      title: '24/7 Support',
      description: 'Our customer support team is always ready to help you with any query.',
    },
  ]

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose MediQuest?
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Your trusted platform for all healthcare needs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
