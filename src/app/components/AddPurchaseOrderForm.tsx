import { useState } from 'react';
import { X, ShoppingCart, Calendar } from 'lucide-react';

interface AddPurchaseOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (po: any) => void;
  projects: any[];
}

export function AddPurchaseOrderForm({ isOpen, onClose, onSubmit, projects }: AddPurchaseOrderFormProps) {
  const [formData, setFormData] = useState({
    vendor: '',
    poNumber: '',
    projectId: '',
    amount: '',
    deliveryDate: '',
    issueDate: '',
    description: '',
    category: 'materials',
    urgency: 'normal',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find(p => p.id === formData.projectId);
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      id: Date.now().toString(),
      status: 'pending',
      projectName: project?.name || '',
      approvalStatus: 'pending',
    });
    setFormData({
      vendor: '',
      poNumber: '',
      projectId: '',
      amount: '',
      deliveryDate: '',
      issueDate: '',
      description: '',
      category: 'materials',
      urgency: 'normal',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Create Purchase Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                PO Number *
              </label>
              <input
                type="text"
                required
                value={formData.poNumber}
                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., PO-2024-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Vendor Name *
              </label>
              <input
                type="text"
                required
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Steel & Metals Supplies"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Project *
              </label>
              <select
                required
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.client}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                PO Amount (KES) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="materials">Materials</option>
                <option value="equipment">Equipment</option>
                <option value="tools">Tools</option>
                <option value="rental">Equipment Rental</option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Issue Date *
              </label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Required Delivery Date *
              </label>
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Urgency Level *
              </label>
              <select
                value={formData.urgency}
                onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="low">Low - Standard</option>
                <option value="normal">Normal</option>
                <option value="high">High - Expedited</option>
                <option value="critical">Critical - Rush</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Item Description / Specifications *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="Enter detailed description of items, quantities, specifications..."
              />
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3">
            <p className="text-xs text-amber-400">
              <strong>Note:</strong> This PO will be submitted for approval. You'll be notified once approved.
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
            >
              Submit PO
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
