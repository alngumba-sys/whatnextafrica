import { useState } from 'react';
import { X, FileEdit, AlertCircle } from 'lucide-react';

interface AddChangeOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (changeOrder: any) => void;
  projects: any[];
}

export function AddChangeOrderForm({ isOpen, onClose, onSubmit, projects }: AddChangeOrderFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    projectId: '',
    amount: '',
    type: 'addition',
    reason: '',
    description: '',
    requestedBy: '',
    priority: 'medium',
    estimatedDays: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find(p => p.id === formData.projectId);
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
      estimatedDays: parseInt(formData.estimatedDays) || 0,
      id: Date.now().toString(),
      status: 'pending',
      projectName: project?.name || '',
      submittedDate: new Date().toISOString().split('T')[0],
    });
    setFormData({
      title: '',
      projectId: '',
      amount: '',
      type: 'addition',
      reason: '',
      description: '',
      requestedBy: '',
      priority: 'medium',
      estimatedDays: '',
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
              <FileEdit className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Create Change Order</h2>
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
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Change Order Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Additional Electrical Work - 3rd Floor"
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
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="addition">Addition - Extra Work</option>
                <option value="deletion">Deletion - Reduced Scope</option>
                <option value="modification">Modification - Change Spec</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Cost Impact (KES) *
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
              <p className="text-xs text-slate-400 mt-1">
                Use negative value for cost reductions
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Schedule Impact (Days)
              </label>
              <input
                type="number"
                value={formData.estimatedDays}
                onChange={(e) => setFormData({ ...formData, estimatedDays: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="0"
              />
              <p className="text-xs text-slate-400 mt-1">
                Additional days needed (if any)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Requested By *
              </label>
              <input
                type="text"
                required
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Client, Architect, Site Manager"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Reason for Change *
              </label>
              <select
                required
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select reason...</option>
                <option value="client-request">Client Request</option>
                <option value="design-change">Design Change</option>
                <option value="site-conditions">Unforeseen Site Conditions</option>
                <option value="code-requirement">Code/Regulatory Requirement</option>
                <option value="error-omission">Error or Omission</option>
                <option value="value-engineering">Value Engineering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="Provide detailed description of the change, scope, justification..."
              />
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-amber-400 font-semibold mb-1">Change Order Workflow:</p>
              <p className="text-xs text-amber-300">
                <strong>Who Requests:</strong> Client, Architect, Site Superintendent, Project Manager, or Consultant<br/>
                <strong>Who Approves:</strong> You (Construction Company Owner) review cost/margin impact and approve or reject. Client must also approve before execution.<br/>
                Change orders may impact project timeline, budget, and margin. Ensure all impacts are accurately documented.
              </p>
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
              Submit Change Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}