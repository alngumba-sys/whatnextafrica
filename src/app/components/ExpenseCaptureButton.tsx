import { useState } from 'react';
import { Plus, Camera, X, Check, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExpenseCaptureButtonProps {
  onExpenseCapture: (expense: any) => void;
}

export function ExpenseCaptureButton({ onExpenseCapture }: ExpenseCaptureButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [expenseData, setExpenseData] = useState({
    vendor: '',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    costCode: '',
    description: '',
    project: '',
  });

  const handleCameraCapture = () => {
    setShowCamera(true);
    // Simulate OCR capture after 2 seconds
    setTimeout(() => {
      setCapturedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5SZWNLAVSB7IEltYWdlPC90ZXh0Pjwvc3ZnPg==');
      setShowCamera(false);
      // Simulate AI OCR extraction
      setExpenseData({
        vendor: 'ABC Supply Co.',
        date: '2026-02-07',
        amount: '1,247.50',
        costCode: '03-100',
        description: 'Concrete materials delivery',
        project: 'proj-002',
      });
    }, 2000);
  };

  const handleSubmit = () => {
    onExpenseCapture(expenseData);
    setShowModal(false);
    setCapturedImage(null);
    setExpenseData({
      vendor: '',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      costCode: '',
      description: '',
      project: '',
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-2 border-cyan-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-800 rounded-lg border-2 border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Camera className="w-6 h-6 text-cyan-400" />
                  Capture Expense
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Camera Simulation */}
                {showCamera ? (
                  <div className="bg-slate-900 rounded-lg border-2 border-cyan-500 aspect-video flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-cyan-400 mx-auto mb-2 animate-pulse" />
                      <p className="text-white">Capturing & Processing...</p>
                      <p className="text-sm text-slate-400 mt-1">AI OCR in progress</p>
                    </div>
                  </div>
                ) : capturedImage ? (
                  <div className="mb-6">
                    <img src={capturedImage} alt="Captured" className="w-full rounded-lg border border-slate-700" />
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Receipt scanned successfully • AI extracted data below
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={handleCameraCapture}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg p-8 flex flex-col items-center gap-3"
                    >
                      <Camera className="w-12 h-12" />
                      <span className="font-semibold">Scan Receipt</span>
                      <span className="text-xs opacity-80">Camera + AI OCR</span>
                    </button>
                    <button className="bg-slate-700 hover:bg-slate-600 text-white rounded-lg p-8 flex flex-col items-center gap-3">
                      <Upload className="w-12 h-12" />
                      <span className="font-semibold">Upload File</span>
                      <span className="text-xs opacity-80">PDF, JPG, PNG</span>
                    </button>
                  </div>
                )}

                {/* Form Fields */}
                {capturedImage && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Vendor</label>
                        <input
                          type="text"
                          value={expenseData.vendor}
                          onChange={(e) => setExpenseData({ ...expenseData, vendor: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
                        <input
                          type="date"
                          value={expenseData.date}
                          onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
                        <input
                          type="text"
                          value={expenseData.amount}
                          onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                          Cost Code
                          <span className="text-green-400 text-xs ml-2">✓ AI Suggested</span>
                        </label>
                        <input
                          type="text"
                          value={expenseData.costCode}
                          onChange={(e) => setExpenseData({ ...expenseData, costCode: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-900 border border-green-600 rounded text-white focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Project</label>
                      <select
                        value={expenseData.project}
                        onChange={(e) => setExpenseData({ ...expenseData, project: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="">Select Project...</option>
                        <option value="proj-001">Downtown Office Tower</option>
                        <option value="proj-002">Riverside Luxury Apartments</option>
                        <option value="proj-003">Industrial Warehouse Expansion</option>
                        <option value="proj-004">Medical Clinic Renovation</option>
                        <option value="proj-005">Retail Strip Center</option>
                        <option value="proj-006">Municipal Fire Station</option>
                        <option value="proj-007">School Addition & Renovation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
                      <textarea
                        value={expenseData.description}
                        onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                        rows={3}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleSubmit}
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        Approve & Post
                      </button>
                      <button
                        onClick={() => {
                          setCapturedImage(null);
                          setExpenseData({
                            vendor: '',
                            date: new Date().toISOString().split('T')[0],
                            amount: '',
                            costCode: '',
                            description: '',
                            project: '',
                          });
                        }}
                        className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}

                {!capturedImage && !showCamera && (
                  <p className="text-center text-slate-400 text-sm">
                    Capture receipts, invoices, and timesheets instantly with AI-powered OCR
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
