import { Helmet } from 'react-helmet-async'
import { useLocation, Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Invoice = () => {
  const { state } = useLocation()

  if (!state) {
    return (
      <div className="text-center py-20 mt-16">
        <p className="text-gray-500 text-lg">No invoice data found.</p>
        <Link to="/" className="text-lime-500 underline mt-4 inline-block">Go Home</Link>
      </div>
    )
  }

  const { transactionId, items, totalAmount, buyerName, buyerEmail, date } = state
  const logo = 'https://i.ibb.co.com/LNtr7fC/Screenshot-2025-01-29-000715-removebg-preview.png'

  const handlePrint = () => {
    const doc = new jsPDF()

    doc.setFontSize(22)
    doc.setTextColor(76, 175, 80)
    doc.text('MediQuest', 14, 25)

    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('Invoice', 14, 32)

    doc.setFontSize(11)
    doc.setTextColor(0)
    doc.text(`Transaction ID: ${transactionId}`, 14, 45)
    doc.text(`Date: ${new Date(date).toLocaleDateString('en-GB')}`, 14, 52)
    doc.text(`Customer: ${buyerName}`, 14, 59)
    doc.text(`Email: ${buyerEmail}`, 14, 66)

    doc.autoTable({
      startY: 75,
      head: [['Medicine', 'Category', 'Qty', 'Unit Price', 'Subtotal']],
      body: items.map((item) => [
        item.name,
        item.category || 'N/A',
        item.quantity,
        `$${item.price.toFixed(2)}`,
        `$${(item.price * item.quantity).toFixed(2)}`,
      ]),
      foot: [['', '', '', 'Grand Total', `$${totalAmount.toFixed(2)}`]],
      theme: 'grid',
      headStyles: { fillColor: [132, 204, 22] },
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' },
    })

    doc.save(`MediQuest_Invoice_${transactionId}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Invoice | MediQuest</title>
      </Helmet>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <img src={logo} alt="MediQuest Logo" className="w-36" />
            <p className="text-sm text-gray-400 mt-1">Invoice</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p className="font-semibold">Transaction ID</p>
            <p className="text-xs break-all">{transactionId}</p>
            <p className="mt-2">{new Date(date).toLocaleDateString('en-GB')}</p>
          </div>
        </div>

        <hr className="mb-4" />

        <div className="mb-6 text-sm text-gray-700">
          <p><span className="font-semibold">Customer:</span> {buyerName}</p>
          <p><span className="font-semibold">Email:</span> {buyerEmail}</p>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-lime-50">
                <th className="px-4 py-2 text-left font-semibold">Medicine</th>
                <th className="px-4 py-2 text-left font-semibold">Category</th>
                <th className="px-4 py-2 text-right font-semibold">Qty</th>
                <th className="px-4 py-2 text-right font-semibold">Price</th>
                <th className="px-4 py-2 text-right font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.category || 'N/A'}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="4" className="px-4 py-3 text-right font-bold text-lg">Grand Total:</td>
                <td className="px-4 py-3 text-right font-bold text-lg text-lime-600">
                  ${totalAmount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-between">
          <Link to="/" className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            Back to Home
          </Link>
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition font-semibold"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice
