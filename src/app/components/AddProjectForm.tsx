import { useState } from 'react';
import { X, Building2, Calendar, DollarSign, User } from 'lucide-react';

interface AddProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: any) => void;
}

export function AddProjectForm({ isOpen, onClose, onSubmit }: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    projectManager: '',
    contractValue: '',
    startDate: '',
    location: '',
    type: 'commercial',
    budgetedMarginPercent: '15',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      contractValue: parseFloat(formData.contractValue),
      budgetedMarginPercent: parseFloat(formData.budgetedMarginPercent),
      id: Date.now().toString(),
      percentComplete: 0,
      actualSpend: 0,
      currentMarginPercent: parseFloat(formData.budgetedMarginPercent),
      daysAheadBehind: 0,
      status: 'active',
    });

    setFormData({
      name: '',
      client: '',
      contractValue: '',
      startDate: '',
      location: '',
      type: 'commercial',
      budgetedMarginPercent: '15',
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
              <Building2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Project</h2>
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
                Project Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Office Tower Phase 2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                required
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Acme Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Project Manager *
              </label>
              <input
                type="text"
                required
                value={formData.projectManager}
                onChange={(e) => setFormData({ ...formData, projectManager: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., John Kamau"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Contract Value (KES) *
              </label>
              <input
                type="number"
                required
                value={formData.contractValue}
                onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Nairobi CBD"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Project Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="renovation">Renovation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Target Profit Margin (%) *
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.budgetedMarginPercent}
                onChange={(e) => setFormData({ ...formData, budgetedMarginPercent: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="15"
              />
            </div>
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}