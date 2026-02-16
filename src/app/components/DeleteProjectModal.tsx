import { useState } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { Project } from '../data/mockData';

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  project: Project | null;
}

export function DeleteProjectModal({ isOpen, onClose, onConfirm, project }: DeleteProjectModalProps) {
  const [confirmText, setConfirmText] = useState('');
  
  if (!isOpen || !project) return null;

  const isConfirmValid = confirmText === project.name;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isConfirmValid) {
      onConfirm();
      setConfirmText('');
      onClose();
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border-2 border-red-600 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-red-900/20 border-b border-red-600 p-4 sm:p-6 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-600/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Delete Project</h2>
              <p className="text-sm text-red-400">This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-4 sm:p-6 space-y-6">
            {/* Project Summary */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-3">{project.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white ml-2">{project.location}</span>
                </div>
                <div>
                  <span className="text-slate-400">Contract Value:</span>
                  <span className="text-white ml-2 font-semibold">{formatCurrency(project.contractValue)}</span>
                </div>
                <div>
                  <span className="text-slate-400">Progress:</span>
                  <span className="text-white ml-2">{project.percentComplete}%</span>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>
                  <span className="text-white ml-2 capitalize">{project.status}</span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-4">
              <p className="text-red-400 font-semibold mb-3">
                ⚠️ The following data will be permanently deleted:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Project Details:</strong> All project information, budget data, and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Financial Records:</strong> All invoices, purchase orders, and payment certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Change Orders:</strong> All approved and pending change orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Daily Reports:</strong> All field reports and progress documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Documents:</strong> All project documents, drawings, and submittals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Schedule Data:</strong> All timeline, milestone, and Gantt chart information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Tasks & Team:</strong> All assigned tasks and team member assignments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Risk Register:</strong> All logged risks and mitigation plans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Inventory:</strong> All material tracking and inventory records</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span><strong>Subcontractors:</strong> All subcontractor assignments and agreements</span>
                </li>
              </ul>
            </div>

            {/* Confirmation Input */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Type the project name to confirm deletion:
              </label>
              <div className="mb-2">
                <code className="text-cyan-400 bg-slate-800 px-2 py-1 rounded text-sm">
                  {project.name}
                </code>
              </div>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Enter project name exactly as shown above"
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                autoComplete="off"
              />
              {confirmText && !isConfirmValid && (
                <p className="text-xs text-red-400 mt-2">
                  ⚠️ Project name doesn't match. Please type it exactly as shown.
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-4 sm:p-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isConfirmValid}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isConfirmValid
                  ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Delete Project Permanently
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
