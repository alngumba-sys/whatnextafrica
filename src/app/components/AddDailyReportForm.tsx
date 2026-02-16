import { useState } from 'react';
import { X, ClipboardList, Users } from 'lucide-react';

interface AddDailyReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
  projects: any[];
}

export function AddDailyReportForm({ isOpen, onClose, onSubmit, projects }: AddDailyReportFormProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    date: new Date().toISOString().split('T')[0],
    superintendent: '',
    weather: 'clear',
    temperature: '',
    workPerformed: '',
    equipmentUsed: '',
    laborCount: '',
    visitorsOnSite: '',
    safetyIncidents: 'none',
    delaysIssues: '',
    materialsDelivered: '',
    inspections: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find(p => p.id === formData.projectId);
    onSubmit({
      ...formData,
      laborCount: parseInt(formData.laborCount) || 0,
      id: Date.now().toString(),
      status: 'submitted',
      projectName: project?.name || '',
    });
    setFormData({
      projectId: '',
      date: new Date().toISOString().split('T')[0],
      superintendent: '',
      weather: 'clear',
      temperature: '',
      workPerformed: '',
      equipmentUsed: '',
      laborCount: '',
      visitorsOnSite: '',
      safetyIncidents: 'none',
      delaysIssues: '',
      materialsDelivered: '',
      inspections: '',
      notes: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <ClipboardList className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Daily Field Report</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project & Date Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
              Project Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
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
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Superintendent / Reporter *
                </label>
                <input
                  type="text"
                  required
                  value={formData.superintendent}
                  onChange={(e) => setFormData({ ...formData, superintendent: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Your name"
                />
              </div>
            </div>
          </div>

          {/* Weather & Site Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
              Weather & Site Conditions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Weather *
                </label>
                <select
                  value={formData.weather}
                  onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="clear">Clear</option>
                  <option value="partly-cloudy">Partly Cloudy</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rain">Rain</option>
                  <option value="heavy-rain">Heavy Rain</option>
                  <option value="windy">Windy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Temperature (°C)
                </label>
                <input
                  type="text"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 28"
                />
              </div>
            </div>
          </div>

          {/* Work Performed */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
              Work Activities
            </h3>
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Work Performed Today *
              </label>
              <textarea
                required
                value={formData.workPerformed}
                onChange={(e) => setFormData({ ...formData, workPerformed: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="Describe all work activities, progress made, areas worked on..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Labor Count *
                </label>
                <input
                  type="number"
                  required
                  value={formData.laborCount}
                  onChange={(e) => setFormData({ ...formData, laborCount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Number of workers on site"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Equipment Used
                </label>
                <input
                  type="text"
                  value={formData.equipmentUsed}
                  onChange={(e) => setFormData({ ...formData, equipmentUsed: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Excavator, Crane, Mixer"
                />
              </div>
            </div>
          </div>

          {/* Materials & Deliveries */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
              Materials & Deliveries
            </h3>
            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Materials Delivered
              </label>
              <textarea
                value={formData.materialsDelivered}
                onChange={(e) => setFormData({ ...formData, materialsDelivered: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="List materials received, quantities, suppliers..."
              />
            </div>
          </div>

          {/* Safety & Issues */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white border-b border-slate-700 pb-2">
              Safety & Issues
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Safety Incidents *
                </label>
                <select
                  value={formData.safetyIncidents}
                  onChange={(e) => setFormData({ ...formData, safetyIncidents: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="none">No Incidents</option>
                  <option value="minor">Minor Incident</option>
                  <option value="major">Major Incident</option>
                  <option value="near-miss">Near Miss</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">
                  Visitors on Site
                </label>
                <input
                  type="text"
                  value={formData.visitorsOnSite}
                  onChange={(e) => setFormData({ ...formData, visitorsOnSite: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Client, Inspector, Architect"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Delays or Issues
              </label>
              <textarea
                value={formData.delaysIssues}
                onChange={(e) => setFormData({ ...formData, delaysIssues: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="Note any delays, issues, or concerns encountered..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-cyan-400 mb-2">
                Inspections Conducted
              </label>
              <input
                type="text"
                value={formData.inspections}
                onChange={(e) => setFormData({ ...formData, inspections: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., Foundation inspection passed"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-semibold text-cyan-400 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              placeholder="Any other relevant information..."
            />
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
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
