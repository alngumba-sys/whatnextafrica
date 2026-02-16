import { X, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface AddDocumentFormProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Array<{ id: string; name: string }>;
}

export function AddDocumentForm({ isOpen, onClose, projects }: AddDocumentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Drawings',
    projectId: projects[0]?.id || '',
    version: '1.0',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectName = projects.find(p => p.id === formData.projectId)?.name;
    toast.success('Document uploaded successfully!', {
      description: `${formData.name} - ${formData.category} - ${projectName}`,
    });
    setFormData({
      name: '',
      category: 'Drawings',
      projectId: projects[0]?.id || '',
      version: '1.0',
      description: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Upload Document</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* File Upload Simulation */}
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center bg-slate-800/30 hover:border-cyan-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-white font-semibold mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-slate-400">PDF, DWG, DXF, DOC, XLS (max 50MB)</p>
            <input type="file" className="hidden" />
          </div>

          {/* Document Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Document Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Structural Drawing - Foundation Plan"
            />
          </div>

          {/* Category & Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Drawings">Drawings</option>
                <option value="Specifications">Specifications</option>
                <option value="Contracts">Contracts</option>
                <option value="Reports">Reports</option>
                <option value="Photos">Photos</option>
                <option value="Permits">Permits</option>
                <option value="Shop Drawings">Shop Drawings</option>
                <option value="As-Builts">As-Builts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Project *</label>
              <select
                required
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Version */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Version *</label>
            <input
              type="text"
              required
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="1.0, Rev A, etc."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              placeholder="Document description or notes..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
            >
              Upload Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
