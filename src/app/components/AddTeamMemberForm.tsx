import { useState } from 'react';
import { X, UserPlus } from 'lucide-react';

interface AddTeamMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teamMember: any) => void;
  projects: Array<{ id: string; name: string }>;
}

type EmployeeType = 'full-time' | 'part-time' | 'casual' | 'subcontractor';
type EmployeeRole = 'superintendent' | 'pm' | 'ape' | 'foreman' | 'safety' | 'qc' | 'scheduler' | 'skilled-labor' | 'general-labor' | 'equipment-operator';
type AvailabilityStatus = 'available' | 'busy' | 'on-leave' | 'off-duty';

export function AddTeamMemberForm({ isOpen, onClose, onSubmit, projects }: AddTeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    employeeType: 'full-time' as EmployeeType,
    role: 'superintendent' as EmployeeRole,
    email: '',
    phone: '',
    assignedProjects: [] as string[],
    availability: 'available' as AvailabilityStatus,
    certifications: [] as string[],
    certificationInput: '',
    dailyRate: '',
    monthlyRate: '',
    idNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const teamMember = {
      id: `emp-${Date.now()}`,
      name: formData.name,
      employeeType: formData.employeeType,
      role: formData.role,
      email: formData.email || undefined,
      phone: formData.phone,
      assignedProjects: formData.assignedProjects,
      availability: formData.availability,
      certifications: formData.certifications.length > 0 ? formData.certifications : undefined,
      dailyRate: formData.dailyRate ? parseFloat(formData.dailyRate) : undefined,
      monthlyRate: formData.monthlyRate ? parseFloat(formData.monthlyRate) : undefined,
      idNumber: formData.idNumber || undefined,
    };
    
    onSubmit(teamMember);
    
    // Reset form
    setFormData({
      name: '',
      employeeType: 'full-time',
      role: 'superintendent',
      email: '',
      phone: '',
      assignedProjects: [],
      availability: 'available',
      certifications: [],
      certificationInput: '',
      dailyRate: '',
      monthlyRate: '',
      idNumber: '',
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

  const handleAddCertification = () => {
    if (formData.certificationInput.trim() && !formData.certifications.includes(formData.certificationInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, prev.certificationInput.trim()],
        certificationInput: '',
      }));
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c !== cert),
    }));
  };

  // Update role options based on employee type
  const handleEmployeeTypeChange = (type: EmployeeType) => {
    let defaultRole: EmployeeRole = 'superintendent';
    
    if (type === 'casual') {
      defaultRole = 'general-labor';
    } else if (type === 'part-time') {
      defaultRole = 'qc';
    }
    
    setFormData({
      ...formData,
      employeeType: type,
      role: defaultRole,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Team Member</h2>
              <p className="text-sm text-slate-400">Create a new team member profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Employment Type <span className="text-red-400">*</span>
              </label>
              <select
                required
                value={formData.employeeType}
                onChange={(e) => handleEmployeeTypeChange(e.target.value as EmployeeType)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="full-time">Full-Time Employee</option>
                <option value="part-time">Part-Time Employee</option>
                <option value="casual">Casual / Day Laborer</option>
                <option value="subcontractor">Subcontractor</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Role / Position <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as EmployeeRole })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  {/* MANAGEMENT & SALARIED STAFF */}
                  <optgroup label="── MANAGEMENT & SALARIED ──" className="text-cyan-400">
                    <option value="superintendent">Superintendent</option>
                    <option value="pm">Project Manager</option>
                    <option value="ape">Assistant Project Engineer</option>
                    <option value="foreman">Foreman</option>
                    <option value="safety">Safety Manager</option>
                    <option value="qc">QC Inspector</option>
                    <option value="scheduler">Scheduler</option>
                  </optgroup>
                  
                  {/* SKILLED LABOR */}
                  <optgroup label="── SKILLED LABOR (CASUAL/DAILY) ──" className="text-amber-400">
                    <option value="skilled-labor">Skilled Labor (Mason/Carpenter/Plumber/Electrician)</option>
                    <option value="equipment-operator">Equipment Operator (Excavator/Forklift/Crane)</option>
                  </optgroup>
                  
                  {/* GENERAL LABOR */}
                  <optgroup label="── GENERAL LABOR (CASUAL/DAILY) ──" className="text-slate-400">
                    <option value="general-labor">General Labor (Unskilled Worker)</option>
                  </optgroup>
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  {formData.employeeType === 'full-time' && 'Full-time salaried position'}
                  {formData.employeeType === 'part-time' && 'Part-time / consultant position'}
                  {formData.employeeType === 'casual' && 'Day laborer / casual worker'}
                  {formData.employeeType === 'subcontractor' && 'External subcontractor'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Availability Status <span className="text-red-400">*</span>
                </label>
                <select
                  required
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value as AvailabilityStatus })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="available">✓ Available (Ready for assignment)</option>
                  <option value="busy">◉ Busy (Currently assigned)</option>
                  <option value="on-leave">✕ On Leave (Vacation/Sick/Personal)</option>
                  <option value="off-duty">○ Off Duty (Casual worker not scheduled)</option>
                </select>
                <p className="text-xs text-slate-400 mt-1">
                  {formData.availability === 'available' && 'Worker is ready for new assignments'}
                  {formData.availability === 'busy' && 'Worker is currently on active project(s)'}
                  {formData.availability === 'on-leave' && 'Worker is temporarily unavailable'}
                  {formData.availability === 'off-duty' && 'Casual worker not currently scheduled (call when needed)'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., +254 722 123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address {formData.employeeType === 'casual' ? '(Optional)' : <span className="text-red-400">*</span>}
              </label>
              <input
                type="email"
                required={formData.employeeType !== 'casual'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder={formData.employeeType === 'casual' ? 'Optional for casual workers' : 'e.g., john.smith@buildcontrol.co.ke'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                National ID Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., 12345678"
              />
              <p className="text-xs text-slate-400 mt-1">Required for NSSF/NHIF compliance</p>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Compensation</h3>
            
            {formData.employeeType === 'full-time' ? (
              // FULL-TIME: Monthly Salary
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Monthly Salary (KSh) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.monthlyRate}
                  onChange={(e) => setFormData({ ...formData, monthlyRate: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder="e.g., 185000"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Fixed monthly salary for full-time employee
                </p>
              </div>
            ) : (
              // PART-TIME / CASUAL / SUBCONTRACTOR: Daily Rate
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Daily Rate (KSh) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.dailyRate}
                  onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  placeholder={
                    formData.role === 'general-labor' ? 'e.g., 800' : 
                    formData.role === 'equipment-operator' ? 'e.g., 2000' : 
                    formData.role === 'skilled-labor' ? 'e.g., 1500' : 
                    'e.g., 3500'
                  }
                />
                <p className="text-xs text-slate-400 mt-1">
                  {formData.employeeType === 'casual' && (
                    <>Daily rate × days worked. Typical: General Labor (KSh 800-1,000), Skilled (KSh 1,500-1,800), Operator (KSh 2,000-2,500)</>
                  )}
                  {formData.employeeType === 'part-time' && (
                    <>Daily or hourly rate for part-time work. Typical: KSh 3,000-5,000/day for professionals</>
                  )}
                  {formData.employeeType === 'subcontractor' && (
                    <>Negotiated daily or project-based rate</>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* Project Assignments */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Project Assignments</h3>
            
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

          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">Certifications (Optional)</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.certificationInput}
                onChange={(e) => setFormData({ ...formData, certificationInput: e.target.value })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCertification();
                  }
                }}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                placeholder="e.g., OSHA 30, Masonry Level 2, Excavator Operator, First Aid"
              />
              <button
                type="button"
                onClick={handleAddCertification}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>

            {formData.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-950/30 border border-green-600/50 text-green-400 rounded-lg text-sm"
                  >
                    <span>{cert}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(cert)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
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
              className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-semibold"
            >
              Add Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}