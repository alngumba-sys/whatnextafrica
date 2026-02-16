import { useState } from 'react';
import { X, FileCheck, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddSubmittalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submittal: any) => void;
  projects: Array<{ id: string; name: string }>;
}

export function AddSubmittalForm({ isOpen, onClose, onSubmit, projects }: AddSubmittalFormProps) {
  const [formData, setFormData] = useState({
    number: '',
    project: '',
    title: '',
    specSection: '',
    submittedBy: '',
    requiredDate: '',
    priority: 'normal' as 'urgent' | 'normal' | 'low',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submittal = {
      id: `sub-${Date.now()}`,
      number: formData.number,
      project: formData.project,
      title: formData.title,
      specSection: formData.specSection,
      submittedBy: formData.submittedBy,
      submittedDate: new Date().toISOString().split('T')[0],
      requiredDate: formData.requiredDate,
      status: 'pending-review' as const,
      daysOpen: 0,
      priority: formData.priority,
    };
    
    onSubmit(submittal);
    toast.success('Submittal created successfully!');
    
    // Reset form
    setFormData({
      number: '',
      project: '',
      title: '',
      specSection: '',
      submittedBy: '',
      requiredDate: '',
      priority: 'normal',
      description: '',
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <FileCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Create Submittal</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Submittal Number *
              </label>
              <input
                type="text"
                required
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., S-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Spec Section *
              </label>
              <input
                type="text"
                required
                value={formData.specSection}
                onChange={(e) => setFormData({ ...formData, specSection: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., 09 51 00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Project *
              </label>
              <select
                required
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.name}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Submittal Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Acoustic Ceiling Panels - Product Data"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Submitted By *
              </label>
              <input
                type="text"
                required
                value={formData.submittedBy}
                onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., ABC Contractors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Required Response Date *
              </label>
              <input
                type="date"
                required
                value={formData.requiredDate}
                onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="urgent">Urgent - Critical Path</option>
                <option value="normal">Normal - Standard Review</option>
                <option value="low">Low - Information Only</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Description / Notes
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="Additional details, specifications, or special requirements..."
              />
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400">
              Submittals require timely review to avoid schedule delays. Ensure all information is accurate and complete.
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
            >
              Create Submittal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
