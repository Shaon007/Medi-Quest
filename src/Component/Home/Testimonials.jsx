const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    text: 'MediQuest has been a lifesaver. I can order all my prescriptions from home and they arrive on time every single time.',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    name: 'Dr Ahmed Khan',
    role: 'Healthcare Professional',
    text: 'I recommend MediQuest to my patients. The variety of medicines and the quality assurance give me confidence.',
    avatar: 'https://i.pravatar.cc/100?img=3',
  },
  {
    name: 'Emily Davis',
    role: 'Verified Buyer',
    text: 'The discount section is brilliant! I save so much on my monthly supplements. Fast delivery and great support too.',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
]

const Testimonials = () => {
  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Trusted by thousands of happy customers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm italic">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
