import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const SalesReport = () => {
  const axiosSecure = useAxiosSecure()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const { data: sales = [], isLoading } = useQuery({
    queryKey: ['sales-report', startDate, endDate],
    queryFn: async () => {
      let url = '/admin/sales-report'
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`
      }
      const { data } = await axiosSecure(url)
      return data
    },
  })

  const flatRows = sales.flatMap((payment) =>
    (payment.items || []).map((item) => ({
      medicineName: item.name,
      sellerEmail: item.sellerEmail,
      buyerEmail: payment.buyerEmail,
      totalPrice: (item.price * item.quantity).toFixed(2),
      quantity: item.quantity,
      date: new Date(payment.date).toLocaleDateString('en-GB'),
      status: payment.status,
    }))
  )

  const downloadPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('MediQuest Sales Report', 14, 22)
    doc.setFontSize(10)
    if (startDate && endDate) {
      doc.text(`Date Range: ${startDate} to ${endDate}`, 14, 30)
    }

    doc.autoTable({
      startY: 35,
      head: [['Medicine', 'Seller Email', 'Buyer Email', 'Total Price', 'Date', 'Status']],
      body: flatRows.map((r) => [
        r.medicineName,
        r.sellerEmail,
        r.buyerEmail,
        `$${r.totalPrice}`,
        r.date,
        r.status,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [132, 204, 22] },
    })

    doc.save('MediQuest_Sales_Report.pdf')
  }

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(flatRows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Report')
    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([buffer], { type: 'application/octet-stream' })
    saveAs(blob, 'MediQuest_Sales_Report.xlsx')
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Sales Report | Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Sales Report</h2>

          {/* Date Range Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-4 py-2 rounded-md focus:outline-lime-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border px-4 py-2 rounded-md focus:outline-lime-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadPDF}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Download PDF
              </button>
              <button
                onClick={downloadExcel}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                Download Excel
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Medicine</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Seller Email</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Buyer Email</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Total Price</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Date</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {flatRows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-5 border-b bg-white text-sm">{row.medicineName}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{row.sellerEmail}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{row.buyerEmail}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm font-semibold">${row.totalPrice}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{row.date}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {flatRows.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No sales data found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default SalesReport
