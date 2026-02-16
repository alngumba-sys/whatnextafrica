import { useState } from 'react';
import { X, AlertTriangle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddRiskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (risk: any) => void;
  projects: Array<{ id: string; name: string }>;
}

export function AddRiskForm({ isOpen, onClose, onSubmit, projects }: AddRiskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    category: 'schedule' as 'schedule' | 'budget' | 'safety' | 'quality' | 'legal' | 'weather' | 'other',
    description: '',
    likelihood: 'medium' as 'low' | 'medium' | 'high',
    impact: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    potentialCost: '',
    potentialDays: '',
    mitigationPlan: '',
    owner: '',
    status: 'open' as 'open' | 'monitoring' | 'mitigated' | 'closed',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const getRiskScore = () => {
      const likelihoodScore = { low: 1, medium: 2, high: 3 }[formData.likelihood];
      const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[formData.impact];
      return likelihoodScore * impactScore;
    };

    const getRiskLevel = (score: number) => {
      if (score >= 8) return 'critical';
      if (score >= 5) return 'high';
      if (score >= 3) return 'medium';
      return 'low';
    };

    const score = getRiskScore();
    
    const risk = {
      id: `risk-${Date.now()}`,
      ...formData,
      potentialCost: parseFloat(formData.potentialCost) || 0,
      potentialDays: parseInt(formData.potentialDays) || 0,
      riskScore: score,
      riskLevel: getRiskLevel(score),
      identifiedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    
    onSubmit(risk);
    toast.success(`Risk "${formData.title}" added successfully!`);
    
    // Reset form
    setFormData({
      title: '',
      project: '',
      category: 'schedule',
      description: '',
      likelihood: 'medium',
      impact: 'medium',
      potentialCost: '',
      potentialDays: '',
      mitigationPlan: '',
      owner: '',
      status: 'open',
    });
    
    onClose();
  };

  if (!isOpen) return null;

  const getRiskScorePreview = () => {
    const likelihoodScore = { low: 1, medium: 2, high: 3 }[formData.likelihood];
    const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[formData.impact];
    const score = likelihoodScore * impactScore;
    
    if (score >= 8) return { level: 'Critical', color: 'text-red-400', bgColor: 'bg-red-900/30', borderColor: 'border-red-600/50' };
    if (score >= 5) return { level: 'High', color: 'text-orange-400', bgColor: 'bg-orange-900/30', borderColor: 'border-orange-600/50' };
    if (score >= 3) return { level: 'Medium', color: 'text-amber-400', bgColor: 'bg-amber-900/30', borderColor: 'border-amber-600/50' };
    return { level: 'Low', color: 'text-green-400', bgColor: 'bg-green-900/30', borderColor: 'border-green-600/50' };
  };

  const riskPreview = getRiskScorePreview();

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Project Risk</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Risk Identification</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Risk Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Potential concrete supplier shortage"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
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

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="schedule">Schedule / Timeline Risk</option>
                  <option value="budget">Budget / Cost Risk</option>
                  <option value="safety">Safety / Health Risk</option>
                  <option value="quality">Quality / Workmanship Risk</option>
                  <option value="legal">Legal / Compliance Risk</option>
                  <option value="weather">Weather / Environmental Risk</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Risk Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Describe the risk, what could go wrong, and potential triggers..."
                />
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Risk Assessment</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Likelihood *
                </label>
                <select
                  value={formData.likelihood}
                  onChange={(e) => setFormData({ ...formData, likelihood: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="low">Low - Unlikely to occur</option>
                  <option value="medium">Medium - May occur</option>
                  <option value="high">High - Likely to occur</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Impact *
                </label>
                <select
                  value={formData.impact}
                  onChange={(e) => setFormData({ ...formData, impact: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="low">Low - Minor impact</option>
                  <option value="medium">Medium - Moderate impact</option>
                  <option value="high">High - Significant impact</option>
                  <option value="critical">Critical - Severe impact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Potential Cost Impact (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.potentialCost}
                  onChange={(e) => setFormData({ ...formData, potentialCost: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Potential Schedule Impact (Days)
                </label>
                <input
                  type="number"
                  value={formData.potentialDays}
                  onChange={(e) => setFormData({ ...formData, potentialDays: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Risk Score Preview */}
            <div className={`${riskPreview.bgColor} border ${riskPreview.borderColor} rounded-lg p-4`}>
              <div className="flex items-center gap-3">
                <AlertTriangle className={`w-6 h-6 ${riskPreview.color}`} />
                <div>
                  <div className="text-xs text-slate-400">Calculated Risk Level</div>
                  <div className={`text-lg font-bold ${riskPreview.color}`}>
                    {riskPreview.level}
                  </div>
                </div>
                <div className="ml-auto text-xs text-slate-400">
                  Risk Score = Likelihood × Impact
                </div>
              </div>
            </div>
          </div>

          {/* Mitigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Mitigation Strategy</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Mitigation Plan *
                </label>
                <textarea
                  required
                  value={formData.mitigationPlan}
                  onChange={(e) => setFormData({ ...formData, mitigationPlan: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Describe actions to prevent or minimize this risk..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Risk Owner *
                </label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Project Manager, Site Superintendent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="open">Open - Newly Identified</option>
                  <option value="monitoring">Monitoring - Under Watch</option>
                  <option value="mitigated">Mitigated - Actions Taken</option>
                  <option value="closed">Closed - No Longer a Risk</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400">
              Proactive risk management prevents margin bleed. Regularly review and update risk status to maintain project control.
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
              Add Risk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
