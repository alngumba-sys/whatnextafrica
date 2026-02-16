import { useState } from 'react';
import { X, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AddSubcontractorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subcontractor: any) => void;
  projects: Array<{ id: string; name: string }>;
}

export function AddSubcontractorForm({ isOpen, onClose, onSubmit, projects }: AddSubcontractorFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    trade: '',
    contactPerson: '',
    email: '',
    phone: '',
    licenseNumber: '',
    insuranceExpiry: '',
    assignedProjects: [] as string[],
    contractAmount: '',
    paymentTerms: 'net-30' as 'net-15' | 'net-30' | 'net-45' | 'net-60',
    status: 'active' as 'active' | 'pending' | 'inactive',
    notes: '',
    // Insurance Coverage
    liabilityAmount: '',
    liabilityExpiry: '',
    workersCompAmount: '',
    workersCompExpiry: '',
    // Bonding Capacity
    bondingCapacityTotal: '',
    bondingCapacityUsed: '',
    // Performance Metrics
    performanceRating: '',
    onTimePercentage: '',
    qualityRating: '',
    safetyScore: '',
    // Lien Waivers
    lienWaiversTotal: '',
    lienWaiversPending: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subcontractor = {
      id: `subc-${Date.now()}`,
      ...formData,
      contractAmount: parseFloat(formData.contractAmount) || 0,
      addedDate: new Date().toISOString().split('T')[0],
    };
    
    onSubmit(subcontractor);
    toast.success(`Subcontractor "${formData.companyName}" added successfully!`);
    
    // Reset form
    setFormData({
      companyName: '',
      trade: '',
      contactPerson: '',
      email: '',
      phone: '',
      licenseNumber: '',
      insuranceExpiry: '',
      assignedProjects: [],
      contractAmount: '',
      paymentTerms: 'net-30',
      status: 'active',
      notes: '',
      // Insurance Coverage
      liabilityAmount: '',
      liabilityExpiry: '',
      workersCompAmount: '',
      workersCompExpiry: '',
      // Bonding Capacity
      bondingCapacityTotal: '',
      bondingCapacityUsed: '',
      // Performance Metrics
      performanceRating: '',
      onTimePercentage: '',
      qualityRating: '',
      safetyScore: '',
      // Lien Waivers
      lienWaiversTotal: '',
      lienWaiversPending: '',
    });
    
    onClose();
  };

  const handleProjectToggle = (projectName: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedProjects: prev.assignedProjects.includes(projectName)
        ? prev.assignedProjects.filter((p) => p !== projectName)
        : [...prev.assignedProjects, projectName],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Subcontractor</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Company Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., Elite HVAC Systems Ltd."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Trade / Specialty *
                </label>
                <select
                  required
                  value={formData.trade}
                  onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select trade...</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="HVAC">HVAC</option>
                  <option value="Concrete">Concrete</option>
                  <option value="Masonry">Masonry</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Drywall">Drywall</option>
                  <option value="Painting">Painting</option>
                  <option value="Roofing">Roofing</option>
                  <option value="Steel">Structural Steel</option>
                  <option value="Flooring">Flooring</option>
                  <option value="Landscaping">Landscaping</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., LIC-12345"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Contact Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., John Kamau"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., (254) 722-123456"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., contact@elitehvac.com"
                />
              </div>
            </div>
          </div>

          {/* Contract Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Contract Details</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Contract Amount (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.contractAmount}
                  onChange={(e) => setFormData({ ...formData, contractAmount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Payment Terms *
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="net-15">Net 15 Days</option>
                  <option value="net-30">Net 30 Days</option>
                  <option value="net-45">Net 45 Days</option>
                  <option value="net-60">Net 60 Days</option>
                </select>
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
                  <option value="active">Active</option>
                  <option value="pending">Pending Approval</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Insurance Coverage */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Insurance Coverage</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Liability Coverage (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.liabilityAmount}
                  onChange={(e) => setFormData({ ...formData, liabilityAmount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 5000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Liability Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.liabilityExpiry}
                  onChange={(e) => setFormData({ ...formData, liabilityExpiry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Workers Comp Coverage (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.workersCompAmount}
                  onChange={(e) => setFormData({ ...formData, workersCompAmount: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 3000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Workers Comp Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.workersCompExpiry}
                  onChange={(e) => setFormData({ ...formData, workersCompExpiry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Bonding Capacity */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Bonding Capacity</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Total Bonding Capacity (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.bondingCapacityTotal}
                  onChange={(e) => setFormData({ ...formData, bondingCapacityTotal: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 15000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Current Usage (KES)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.bondingCapacityUsed}
                  onChange={(e) => setFormData({ ...formData, bondingCapacityUsed: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 8500000"
                />
              </div>
            </div>
            {formData.bondingCapacityTotal && formData.bondingCapacityUsed && (
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Capacity Utilization</span>
                  <span className="text-cyan-400 font-semibold">
                    {((parseFloat(formData.bondingCapacityUsed) / parseFloat(formData.bondingCapacityTotal)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-cyan-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((parseFloat(formData.bondingCapacityUsed) / parseFloat(formData.bondingCapacityTotal)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Performance Metrics</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Overall Performance Rating (out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.performanceRating}
                  onChange={(e) => setFormData({ ...formData, performanceRating: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 4.5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  On-Time Delivery (%)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.onTimePercentage}
                  onChange={(e) => setFormData({ ...formData, onTimePercentage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 92"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Quality Rating (out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.qualityRating}
                  onChange={(e) => setFormData({ ...formData, qualityRating: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 4.6"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Safety Score (incidents)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.safetyScore}
                  onChange={(e) => setFormData({ ...formData, safetyScore: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 0 (lower is better)"
                />
              </div>
            </div>
          </div>

          {/* Lien Waivers */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Lien Waivers Tracking</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Total Lien Waivers Expected
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.lienWaiversTotal}
                  onChange={(e) => setFormData({ ...formData, lienWaiversTotal: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 6"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Pending Lien Waivers
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.lienWaiversPending}
                  onChange={(e) => setFormData({ ...formData, lienWaiversPending: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 1"
                />
              </div>
            </div>
            {formData.lienWaiversTotal && (
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3">
                <p className="text-xs text-slate-400">
                  Lien Waivers Status: <span className="text-cyan-400 font-semibold">
                    {(parseInt(formData.lienWaiversTotal) - parseInt(formData.lienWaiversPending || '0'))}/{formData.lienWaiversTotal} received
                  </span>
                  {formData.lienWaiversPending && parseInt(formData.lienWaiversPending) > 0 && (
                    <span className="text-amber-400 ml-2">({formData.lienWaiversPending} pending)</span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Project Assignment */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Assigned Projects</h3>
            
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 max-h-48 overflow-y-auto">
              {projects.length > 0 ? (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <label key={project.id} className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.assignedProjects.includes(project.name)}
                        onChange={() => handleProjectToggle(project.name)}
                        className="w-4 h-4 accent-cyan-500"
                      />
                      <span className="text-sm text-white">{project.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">No projects available</p>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Selected: {formData.assignedProjects.length} project(s)
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-cyan-500"
              placeholder="Additional notes, performance history, special requirements..."
            />
          </div>

          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3 flex gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-400">
              Ensure all license and insurance information is current. Verify credentials before contract execution.
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
              Add Subcontractor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}