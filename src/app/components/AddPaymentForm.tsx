import { useState } from 'react';
import { X, DollarSign, Building2, User, Calendar, FileText, Tag } from 'lucide-react';
import { projects } from '../data/mockData';
import { SearchableSelect } from './SearchableSelect';

interface AddPaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payment: any) => void;
}

export function AddPaymentForm({ isOpen, onClose, onSubmit }: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    paymentType: 'vendor', // vendor or worker
    vendorName: '',
    workerName: '',
    projectId: '',
    description: '',
    amount: '',
    dueDate: '',
    category: 'Materials',
    invoiceNumber: '',
    costCode: '',
    paymentMethod: 'M-Pesa Business',
  });

  // Mock workers data - in production, this would come from your database
  const mockWorkers = [
    { id: 'w-001', name: 'James Mwangi', role: 'Skilled Labor (Mason)', phone: '+254 712 111111', idNumber: '11111111', type: 'Casual' },
    { id: 'w-002', name: 'Peter Ochieng', role: 'Skilled Labor (Carpenter)', phone: '+254 722 222222', idNumber: '22222222', type: 'Casual' },
    { id: 'w-003', name: 'David Kimani', role: 'General Labor', phone: '+254 733 333333', idNumber: '33333333', type: 'Casual' },
    { id: 'w-004', name: 'John Otieno', role: 'General Labor', phone: '+254 744 444444', idNumber: '44444444', type: 'Casual' },
    { id: 'w-005', name: 'Francis Wanyama', role: 'Equipment Operator', phone: '+254 755 555555', idNumber: '55555555', type: 'Casual' },
    { id: 'w-006', name: 'Stephen Njoroge', role: 'Skilled Labor (Plumber)', phone: '+254 766 666666', idNumber: '66666666', type: 'Casual' },
    { id: 'w-007', name: 'Michael Karanja', role: 'Skilled Labor (Electrician)', phone: '+254 777 777777', idNumber: '77777777', type: 'Casual' },
    { id: 'w-008', name: 'Mike Chen', role: 'Superintendent', phone: '+254 722 456789', idNumber: '12345678', type: 'Full-Time' },
    { id: 'w-009', name: 'Sarah Johnson', role: 'Project Manager', phone: '+254 733 891234', idNumber: '23456789', type: 'Full-Time' },
    { id: 'w-010', name: 'Carlos Rodriguez', role: 'Superintendent', phone: '+254 712 567890', idNumber: '34567890', type: 'Full-Time' },
  ];

  // Mock vendors data - in production, this would come from your database
  const mockVendors = [
    { id: 'v-001', name: 'Bamburi Cement Ltd', type: 'Materials Supplier', phone: '+254 20 123456', idNumber: 'P051234567' },
    { id: 'v-002', name: 'East African Steel Co.', type: 'Materials Supplier', phone: '+254 20 234567', idNumber: 'P051234568' },
    { id: 'v-003', name: 'Nairobi Hardware Supplies', type: 'Hardware Vendor', phone: '+254 20 345678', idNumber: 'P051234569' },
    { id: 'v-004', name: 'Kenya Electricals Ltd', type: 'Electrical Supplier', phone: '+254 20 456789', idNumber: 'P051234570' },
    { id: 'v-005', name: 'Rift Valley Plumbing', type: 'Plumbing Supplier', phone: '+254 20 567890', idNumber: 'P051234571' },
    { id: 'v-006', name: 'Mombasa Timber Merchants', type: 'Timber Supplier', phone: '+254 41 123456', idNumber: 'P051234572' },
    { id: 'v-007', name: 'Kisumu Concrete Mix', type: 'Concrete Supplier', phone: '+254 57 234567', idNumber: 'P051234573' },
    { id: 'v-008', name: 'Total Energies Kenya', type: 'Fuel Supplier', phone: '+254 20 678901', idNumber: 'P051234574' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      payeeName: formData.paymentType === 'vendor' ? formData.vendorName : formData.workerName,
    });
    setFormData({
      paymentType: 'vendor',
      vendorName: '',
      workerName: '',
      projectId: '',
      description: '',
      amount: '',
      dueDate: '',
      category: 'Materials',
      invoiceNumber: '',
      costCode: '',
      paymentMethod: 'M-Pesa Business',
    });
    onClose();
  };

  if (!isOpen) return null;

  const categoryOptions = formData.paymentType === 'vendor' 
    ? ['Materials', 'Subcontractor', 'Equipment', 'Utilities', 'Services', 'Consulting']
    : ['Direct Labor', 'Overtime', 'Bonus', 'Site Allowance', 'Travel Allowance'];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg border border-slate-600 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 sm:p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-cyan-400" />
            Create New Payment
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Payment Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Payment Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentType: 'vendor', category: 'Materials' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.paymentType === 'vendor'
                    ? 'border-cyan-500 bg-cyan-950/30'
                    : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                }`}
              >
                <Building2 className={`w-6 h-6 mx-auto mb-2 ${formData.paymentType === 'vendor' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <div className={`text-sm font-semibold ${formData.paymentType === 'vendor' ? 'text-white' : 'text-slate-300'}`}>
                  Vendor/Supplier
                </div>
                <div className="text-xs text-slate-400 mt-1">Materials, services, equipment</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentType: 'worker', category: 'Direct Labor' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.paymentType === 'worker'
                    ? 'border-cyan-500 bg-cyan-950/30'
                    : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${formData.paymentType === 'worker' ? 'text-cyan-400' : 'text-slate-400'}`} />
                <div className={`text-sm font-semibold ${formData.paymentType === 'worker' ? 'text-white' : 'text-slate-300'}`}>
                  Worker/Labor
                </div>
                <div className="text-xs text-slate-400 mt-1">Direct labor, wages, bonuses</div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Vendor/Worker Name */}
            {formData.paymentType === 'vendor' ? (
              <SearchableSelect
                options={mockVendors}
                value={formData.vendorName}
                onChange={(value) => setFormData({ ...formData, vendorName: value })}
                placeholder="Search by name, phone, or ID..."
                label="Vendor/Supplier Name"
                required
                type="vendor"
              />
            ) : (
              <SearchableSelect
                options={mockWorkers}
                value={formData.workerName}
                onChange={(value) => setFormData({ ...formData, workerName: value })}
                placeholder="Search by name, phone, or ID..."
                label="Worker Name"
                required
                type="worker"
              />
            )}

            {/* Project */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Project *
              </label>
              <select
                required
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Description/Work Performed *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={formData.paymentType === 'vendor' ? "e.g., Cement supply - 500 bags Grade 42.5" : "e.g., Masonry work - Week 1-2 Feb 2025"}
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Amount (KES) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                {formData.paymentType === 'vendor' ? 'Due Date *' : 'Payment Date *'}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Invoice/Reference Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                {formData.paymentType === 'vendor' ? 'Invoice Number' : 'Reference Number'}
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.invoiceNumber}
                  onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                  placeholder={formData.paymentType === 'vendor' ? "INV-2025-001" : "PAY-001"}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cost Code */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Cost Code
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.costCode}
                  onChange={(e) => setFormData({ ...formData, costCode: e.target.value })}
                  placeholder="e.g., 03-30-10"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Payment Method *
              </label>
              <select
                required
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="M-Pesa Business">M-Pesa Business</option>
                <option value="Bank Transfer (EFT)">Bank Transfer (EFT)</option>
                <option value="Check Payment">Check Payment</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-cyan-950/20 border border-cyan-600/30 rounded-lg p-4">
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-white mb-1">Payment Workflow</p>
                <p className="text-xs text-slate-400">
                  {formData.paymentType === 'vendor' 
                    ? 'Vendor payments require approval before processing. You will be notified when approval is needed.'
                    : 'Worker payments are typically processed immediately via M-Pesa or cash. Ensure all timesheets are verified.'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
            >
              Create Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}