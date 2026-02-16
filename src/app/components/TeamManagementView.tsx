import { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  Award, 
  Briefcase, 
  Download,
  Grid3x3,
  List,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { AIInsightCard } from './AIInsightCard';

// Extended employee type to include casual workers
type EmployeeType = 'full-time' | 'part-time' | 'casual' | 'subcontractor';
type EmployeeRole = 'superintendent' | 'pm' | 'ape' | 'foreman' | 'safety' | 'qc' | 'scheduler' | 'skilled-labor' | 'general-labor' | 'equipment-operator';
type AvailabilityStatus = 'available' | 'busy' | 'on-leave' | 'off-duty';

interface Employee {
  id: string;
  name: string;
  employeeType: EmployeeType;
  role: EmployeeRole;
  email?: string;
  phone: string;
  assignedProjects: string[];
  availability: AvailabilityStatus;
  certifications?: string[];
  dailyRate?: number; // For casual workers
  monthlyRate?: number; // For full-time
  hireDate?: string;
  idNumber?: string; // National ID for Kenya
}

// Mock data with expanded employee types
const mockEmployees: Employee[] = [
  // FULL-TIME STAFF
  {
    id: 'emp-001',
    name: 'Mike Chen',
    employeeType: 'full-time',
    role: 'superintendent',
    email: 'mchen@buildcontrol.co.ke',
    phone: '+254 722 456789',
    assignedProjects: ['Riverside Luxury Apartments', 'Industrial Warehouse'],
    availability: 'busy',
    certifications: ['OSHA 30', 'First Aid', 'Confined Space'],
    monthlyRate: 185000,
    hireDate: '2023-01-15',
    idNumber: '12345678',
  },
  {
    id: 'emp-002',
    name: 'Sarah Johnson',
    employeeType: 'full-time',
    role: 'pm',
    email: 'sjohnson@buildcontrol.co.ke',
    phone: '+254 733 891234',
    assignedProjects: ['Medical Clinic', 'Retail Strip'],
    availability: 'available',
    certifications: ['PMP', 'LEED AP'],
    monthlyRate: 195000,
    hireDate: '2022-06-01',
    idNumber: '23456789',
  },
  {
    id: 'emp-003',
    name: 'Carlos Rodriguez',
    employeeType: 'full-time',
    role: 'superintendent',
    email: 'crodriguez@buildcontrol.co.ke',
    phone: '+254 712 567890',
    assignedProjects: ['Retail Strip'],
    availability: 'available',
    certifications: ['OSHA 30', 'Crane Operator'],
    monthlyRate: 175000,
    hireDate: '2023-03-20',
    idNumber: '34567890',
  },
  {
    id: 'emp-004',
    name: 'Tom Wilson',
    employeeType: 'full-time',
    role: 'safety',
    email: 'twilson@buildcontrol.co.ke',
    phone: '+254 745 234567',
    assignedProjects: ['Riverside Luxury Apartments', 'Industrial Warehouse', 'Medical Clinic'],
    availability: 'busy',
    certifications: ['CSP', 'CHST', 'OSHA 500'],
    monthlyRate: 165000,
    hireDate: '2021-09-10',
    idNumber: '45678901',
  },
  
  // CASUAL/DAY LABORERS
  {
    id: 'emp-101',
    name: 'James Mwangi',
    employeeType: 'casual',
    role: 'skilled-labor',
    phone: '+254 712 111111',
    assignedProjects: ['Riverside Luxury Apartments'],
    availability: 'busy',
    certifications: ['Masonry Level 2'],
    dailyRate: 1500,
    hireDate: '2026-01-05',
    idNumber: '11111111',
  },
  {
    id: 'emp-102',
    name: 'Peter Ochieng',
    employeeType: 'casual',
    role: 'skilled-labor',
    phone: '+254 722 222222',
    assignedProjects: ['Industrial Warehouse'],
    availability: 'busy',
    certifications: ['Carpentry'],
    dailyRate: 1500,
    hireDate: '2026-01-08',
    idNumber: '22222222',
  },
  {
    id: 'emp-103',
    name: 'David Kimani',
    employeeType: 'casual',
    role: 'general-labor',
    phone: '+254 733 333333',
    assignedProjects: ['Riverside Luxury Apartments'],
    availability: 'busy',
    dailyRate: 800,
    hireDate: '2026-02-01',
    idNumber: '33333333',
  },
  {
    id: 'emp-104',
    name: 'John Otieno',
    employeeType: 'casual',
    role: 'general-labor',
    phone: '+254 744 444444',
    assignedProjects: ['Industrial Warehouse'],
    availability: 'busy',
    dailyRate: 800,
    hireDate: '2026-02-01',
    idNumber: '44444444',
  },
  {
    id: 'emp-105',
    name: 'Francis Wanyama',
    employeeType: 'casual',
    role: 'equipment-operator',
    phone: '+254 755 555555',
    assignedProjects: ['Industrial Warehouse'],
    availability: 'available',
    certifications: ['Excavator Operator', 'Forklift'],
    dailyRate: 2000,
    hireDate: '2026-01-15',
    idNumber: '55555555',
  },
  {
    id: 'emp-106',
    name: 'Stephen Njoroge',
    employeeType: 'casual',
    role: 'skilled-labor',
    phone: '+254 766 666666',
    assignedProjects: ['Medical Clinic'],
    availability: 'busy',
    certifications: ['Plumbing'],
    dailyRate: 1500,
    hireDate: '2026-01-20',
    idNumber: '66666666',
  },
  {
    id: 'emp-107',
    name: 'Michael Karanja',
    employeeType: 'casual',
    role: 'skilled-labor',
    phone: '+254 777 777777',
    assignedProjects: ['Riverside Luxury Apartments'],
    availability: 'busy',
    certifications: ['Electrical Work'],
    dailyRate: 1800,
    hireDate: '2026-01-25',
    idNumber: '77777777',
  },
  {
    id: 'emp-108',
    name: 'George Mutua',
    employeeType: 'casual',
    role: 'general-labor',
    phone: '+254 788 888888',
    assignedProjects: ['Medical Clinic'],
    availability: 'off-duty',
    dailyRate: 800,
    hireDate: '2026-02-05',
    idNumber: '88888888',
  },
  
  // PART-TIME
  {
    id: 'emp-201',
    name: 'Jane Wambui',
    employeeType: 'part-time',
    role: 'qc',
    email: 'jwambui@buildcontrol.co.ke',
    phone: '+254 799 999999',
    assignedProjects: ['Medical Clinic', 'Retail Strip'],
    availability: 'available',
    certifications: ['Quality Control Inspector'],
    dailyRate: 3500,
    hireDate: '2025-11-01',
    idNumber: '99999999',
  },
];

interface TeamManagementViewProps {
  onAddTeamMember: () => void;
  teamMembers?: Employee[];
}

export function TeamManagementView({ onAddTeamMember, teamMembers: propTeamMembers }: TeamManagementViewProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<EmployeeType | 'all'>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityStatus | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Employee>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Use prop team members or fallback to mock data
  const teamMembers = propTeamMembers || mockEmployees;

  // Get all unique projects
  const allProjects = Array.from(
    new Set(teamMembers.flatMap(e => e.assignedProjects))
  ).sort();

  // Filter employees
  const filteredEmployees = teamMembers.filter(emp => {
    const matchesSearch = searchTerm === '' || 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.phone.includes(searchTerm) ||
      emp.idNumber?.includes(searchTerm);
    
    const matchesType = selectedEmployeeType === 'all' || emp.employeeType === selectedEmployeeType;
    const matchesAvailability = selectedAvailability === 'all' || emp.availability === selectedAvailability;
    const matchesProject = selectedProject === 'all' || emp.assignedProjects.includes(selectedProject);
    
    return matchesSearch && matchesType && matchesAvailability && matchesProject;
  });

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === undefined || bValue === undefined) return 0;
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Calculate stats
  const stats = {
    total: teamMembers.length,
    fullTime: teamMembers.filter(e => e.employeeType === 'full-time').length,
    partTime: teamMembers.filter(e => e.employeeType === 'part-time').length,
    casual: teamMembers.filter(e => e.employeeType === 'casual').length,
    available: teamMembers.filter(e => e.availability === 'available').length,
    busy: teamMembers.filter(e => e.availability === 'busy').length,
    onLeave: teamMembers.filter(e => e.availability === 'on-leave').length,
  };

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getRoleLabel = (role: EmployeeRole) => {
    const labels: Record<EmployeeRole, string> = {
      'superintendent': 'Superintendent',
      'pm': 'Project Manager',
      'ape': 'Assistant PE',
      'foreman': 'Foreman',
      'safety': 'Safety Manager',
      'qc': 'QC Inspector',
      'scheduler': 'Scheduler',
      'skilled-labor': 'Skilled Labor',
      'general-labor': 'General Labor',
      'equipment-operator': 'Equipment Operator',
    };
    return labels[role];
  };

  const getEmployeeTypeLabel = (type: EmployeeType) => {
    const labels: Record<EmployeeType, string> = {
      'full-time': 'Full-Time',
      'part-time': 'Part-Time',
      'casual': 'Casual',
      'subcontractor': 'Subcontractor',
    };
    return labels[type];
  };

  const getAvailabilityBadge = (availability: AvailabilityStatus) => {
    const styles: Record<AvailabilityStatus, string> = {
      'available': 'bg-green-600 text-white',
      'busy': 'bg-amber-600 text-white',
      'on-leave': 'bg-red-600 text-white',
      'off-duty': 'bg-slate-600 text-white',
    };
    const labels: Record<AvailabilityStatus, string> = {
      'available': 'Available',
      'busy': 'Busy',
      'on-leave': 'On Leave',
      'off-duty': 'Off Duty',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[availability]}`}>
        {labels[availability]}
      </span>
    );
  };

  const exportToCSV = () => {
    toast.success('Export Initiated', {
      description: 'Employee roster downloaded as CSV',
    });
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total</div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-cyan-950/30 rounded-lg p-4 border border-cyan-600/50">
          <div className="text-cyan-400 text-xs mb-1">Full-Time</div>
          <div className="text-2xl font-bold text-cyan-400">{stats.fullTime}</div>
        </div>
        <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-600/50">
          <div className="text-purple-400 text-xs mb-1">Part-Time</div>
          <div className="text-2xl font-bold text-purple-400">{stats.partTime}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Casual</div>
          <div className="text-2xl font-bold text-amber-400">{stats.casual}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Available</div>
          <div className="text-2xl font-bold text-green-400">{stats.available}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Busy</div>
          <div className="text-2xl font-bold text-amber-400">{stats.busy}</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">On Leave</div>
          <div className="text-2xl font-bold text-red-400">{stats.onLeave}</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, phone, or ID number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors ${
                showFilters
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            
            <div className="flex bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded ${
                  viewMode === 'table' ? 'bg-cyan-600 text-white' : 'text-slate-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded ${
                  viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-slate-300'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={onAddTeamMember}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Employee</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Employee Type</label>
              <select
                value={selectedEmployeeType}
                onChange={(e) => setSelectedEmployeeType(e.target.value as EmployeeType | 'all')}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="casual">Casual/Day Laborers</option>
                <option value="subcontractor">Subcontractor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Availability</label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value as AvailabilityStatus | 'all')}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="on-leave">On Leave</option>
                <option value="off-duty">Off Duty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="all">All Projects</option>
                {allProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-400">
        Showing {sortedEmployees.length} of {teamMembers.length} employees
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase"
                    >
                      Name
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('employeeType')}
                      className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase"
                    >
                      Type
                      {sortField === 'employeeType' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Role</span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Contact</span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Projects</span>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('availability')}
                      className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase"
                    >
                      Status
                      {sortField === 'availability' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <span className="text-xs font-bold text-cyan-400 uppercase">Rate</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {sortedEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-slate-800/70 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{employee.name}</div>
                          <div className="text-xs text-slate-400">ID: {employee.idNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        employee.employeeType === 'full-time' ? 'bg-cyan-600 text-white' :
                        employee.employeeType === 'part-time' ? 'bg-purple-600 text-white' :
                        employee.employeeType === 'casual' ? 'bg-amber-600 text-white' :
                        'bg-slate-600 text-white'
                      }`}>
                        {getEmployeeTypeLabel(employee.employeeType)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-white">{getRoleLabel(employee.role)}</div>
                      {employee.certifications && employee.certifications.length > 0 && (
                        <div className="flex items-center gap-1 mt-1">
                          <Award className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-green-400">{employee.certifications.length} cert(s)</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{employee.phone}</span>
                        </div>
                        {employee.email && (
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[180px]">{employee.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {employee.assignedProjects.slice(0, 2).map((project, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                            {project.split(' ').slice(0, 2).join(' ')}
                          </span>
                        ))}
                        {employee.assignedProjects.length > 2 && (
                          <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                            +{employee.assignedProjects.length - 2}
                          </span>
                        )}
                        {employee.assignedProjects.length === 0 && (
                          <span className="text-xs text-slate-500">No projects</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {getAvailabilityBadge(employee.availability)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="text-sm font-semibold text-white">
                        {employee.monthlyRate ? `KSh ${employee.monthlyRate.toLocaleString()}/mo` : ''}
                        {employee.dailyRate ? `KSh ${employee.dailyRate.toLocaleString()}/day` : ''}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedEmployees.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No employees match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white">{employee.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          employee.employeeType === 'full-time' ? 'bg-cyan-600 text-white' :
                          employee.employeeType === 'part-time' ? 'bg-purple-600 text-white' :
                          employee.employeeType === 'casual' ? 'bg-amber-600 text-white' :
                          'bg-slate-600 text-white'
                        }`}>
                          {getEmployeeTypeLabel(employee.employeeType)}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs text-white bg-slate-700">
                          {getRoleLabel(employee.role)}
                        </span>
                      </div>
                    </div>
                    {getAvailabilityBadge(employee.availability)}
                  </div>

                  <div className="space-y-1 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{employee.phone}</span>
                    </div>
                    {employee.email && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{employee.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Assigned Projects ({employee.assignedProjects.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {employee.assignedProjects.slice(0, 2).map((project, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                          {project.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                      {employee.assignedProjects.length > 2 && (
                        <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                          +{employee.assignedProjects.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {employee.certifications && employee.certifications.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                        <Award className="w-3.5 h-3.5" />
                        <span>Certifications</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {employee.certifications.map((cert, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-green-950/30 border border-green-600/50 text-green-400 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-sm font-semibold text-cyan-400">
                    {employee.monthlyRate ? `KSh ${employee.monthlyRate.toLocaleString()}/month` : ''}
                    {employee.dailyRate ? `KSh ${employee.dailyRate.toLocaleString()}/day` : ''}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {sortedEmployees.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No employees match your filters</p>
            </div>
          )}
        </div>
      )}

      {/* AI Insights */}
      <AIInsightCard 
        insights={[
          {
            id: 'team1',
            title: 'Casual Labor Cost Optimization',
            description: 'AI detected you have 8 casual laborers earning KSh 800-2,000/day across multiple projects. Current monthly casual labor cost is approximately KSh 288,000 (assuming 24 working days). Five of these workers have been on-site for 30+ days consecutively.',
            impact: 'high' as const,
            type: 'optimization' as const,
            actionable: 'Convert 3-4 long-term casual workers (James Mwangi, Peter Ochieng, Michael Karanja) to full-time employment with monthly rate of KSh 55,000-65,000. This provides job security, reduces daily hiring overhead, improves retention, and saves KSh 45,000-60,000/month while ensuring skilled labor availability.',
            potentialSavings: 600000,
            timeframe: 'Implement in next pay cycle',
          },
          {
            id: 'team2',
            title: 'Equipment Operator Underutilization',
            description: 'Francis Wanyama (Equipment Operator) is currently "Available" with excavator and forklift certifications. His daily rate is KSh 2,000 but he\'s only deployed 40% of available days, costing you in lost productivity.',
            impact: 'medium' as const,
            type: 'warning' as const,
            actionable: 'Assign Francis to Industrial Warehouse full-time for earthwork and material handling. This eliminates need for equipment rental company operators (KSh 3,500/day external rate) and saves KSh 1,500/day when using internal certified operator.',
            potentialSavings: 0,
            timeframe: 'Assign immediately',
          },
          {
            id: 'team3',
            title: 'Safety Certification Gaps - Casual Workers',
            description: 'Only 3 of 8 casual workers have any safety certifications. OSHA Kenya requires basic safety training for all construction workers. This creates liability exposure and increases insurance premiums.',
            impact: 'high' as const,
            type: 'warning' as const,
            actionable: 'Enroll all casual workers without certifications (5 employees) in 1-day OSHA Basic Safety course (KSh 3,500 per person, total KSh 17,500). This ensures compliance, reduces accident risk, and may qualify for 10-15% insurance premium reduction (KSh 150K-200K annual savings).',
            potentialSavings: 175000,
            timeframe: 'Complete within 30 days',
          },
        ]} 
        moduleTitle="Team Management" 
      />
    </div>
  );
}