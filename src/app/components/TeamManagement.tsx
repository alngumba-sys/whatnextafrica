import { TeamMember } from '../data/mockData';
import { Users, Mail, Phone, Award, Briefcase, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { AIInsightCard } from './AIInsightCard';

interface TeamManagementProps {
  onAddTeamMember: () => void;
  teamMembers: TeamMember[];
}

export function TeamManagement({ onAddTeamMember, teamMembers }: TeamManagementProps) {
  const getRoleLabel = (role: TeamMember['role']) => {
    const labels: Record<TeamMember['role'], string> = {
      'superintendent': 'Superintendent',
      'pm': 'Project Manager',
      'ape': 'Assistant Project Engineer',
      'foreman': 'Foreman',
      'safety': 'Safety Manager',
      'qc': 'QC Inspector',
      'scheduler': 'Scheduler',
    };
    return labels[role];
  };

  const getRoleColor = (role: TeamMember['role']) => {
    const colors: Record<TeamMember['role'], string> = {
      'superintendent': 'bg-cyan-600',
      'pm': 'bg-purple-600',
      'ape': 'bg-blue-600',
      'foreman': 'bg-green-600',
      'safety': 'bg-red-600',
      'qc': 'bg-amber-600',
      'scheduler': 'bg-indigo-600',
    };
    return colors[role];
  };

  const getAvailabilityColor = (availability: TeamMember['availability']) => {
    switch (availability) {
      case 'available':
        return 'bg-green-950/30 border-green-600/50 text-green-400';
      case 'busy':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400';
      case 'on-leave':
        return 'bg-red-950/30 border-red-600/50 text-red-400';
    }
  };

  const teamStats = {
    total: teamMembers.length,
    available: teamMembers.filter((m) => m.availability === 'available').length,
    busy: teamMembers.filter((m) => m.availability === 'busy').length,
    onLeave: teamMembers.filter((m) => m.availability === 'on-leave').length,
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Team</div>
          <div className="text-2xl font-bold text-white">{teamStats.total}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Available</div>
          <div className="text-2xl font-bold text-green-400">{teamStats.available}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Busy</div>
          <div className="text-2xl font-bold text-amber-400">{teamStats.busy}</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">On Leave</div>
          <div className="text-2xl font-bold text-red-400">{teamStats.onLeave}</div>
        </div>
      </div>

      {/* Add Team Member Button */}
      <div className="flex justify-end">
        <button
          onClick={onAddTeamMember}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 hover:bg-slate-800/70 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{member.name}</h3>
                    <div className={`inline-block px-2 py-0.5 rounded text-xs text-white ${getRoleColor(member.role)} mt-1`}>
                      {getRoleLabel(member.role)}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded border text-xs font-semibold whitespace-nowrap ${getAvailabilityColor(member.availability)}`}>
                    {member.availability.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-1 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <a href={`mailto:${member.email}`} className="hover:text-cyan-400 truncate">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <a href={`tel:${member.phone}`} className="hover:text-cyan-400">
                      {member.phone}
                    </a>
                  </div>
                </div>

                {/* Assigned Projects */}
                <div className="mb-3">
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Assigned Projects ({member.assignedProjects.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.assignedProjects.slice(0, 2).map((project, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                        {project.split(' ').slice(0, 2).join(' ')}
                      </span>
                    ))}
                    {member.assignedProjects.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">
                        +{member.assignedProjects.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.certifications.map((cert, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-green-950/30 border border-green-600/50 text-green-400 rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No team members found</p>
        </div>
      )}

      {/* AI Insights */}
      <AIInsightCard 
        insights={[
          {
            id: 'team1',
            title: 'Superintendent Overload - Peter Omondi',
            description: 'AI detected Peter Omondi (Superintendent) is assigned to 4 active projects simultaneously (Industrial Park, Karen Residence, Westlands Tower, Clinic Renovation). Industry best practice is 2-3 projects maximum for effective field oversight.',
            impact: 'high' as const,
            type: 'warning' as const,
            actionable: 'Hire an additional Superintendent immediately or promote John Kamau (APE, 8 years experience) to Superintendent role. Reassign Clinic Renovation and Karen Residence to new superintendent. Budget KES 185K/month for new hire.',
            potentialSavings: 0,
            timeframe: 'Hire within 2 weeks',
          },
          {
            id: 'team2',
            title: 'Cross-Training Opportunity - Safety Certifications',
            description: 'Only Maria Wanjiku holds First Aid/CPR certification. OSHA requires 1 certified person per 50 workers on-site. With 3 active sites (145 workers total), you need 3 certified staff. Current setup creates single-point-of-failure risk.',
            impact: 'medium' as const,
            type: 'opportunity' as const,
            actionable: 'Enroll Peter Omondi and John Kamau in 2-day First Aid/CPR certification course (KES 18K per person, total KES 36K). This ensures OSHA compliance and provides backup coverage during Maria\'s leave or emergency situations.',
            potentialSavings: 0,
            timeframe: 'Schedule training in next 30 days',
          },
          {
            id: 'team3',
            title: 'Resource Optimization - APE Utilization',
            description: 'John Kamau (APE) is only assigned to Westlands Tower project despite being available. Analysis shows his skills (AutoCAD, Procore, steel detailing) are needed on Industrial Park project where you\'re paying KES 45K/month for external drafting consultant.',
            impact: 'medium' as const,
            type: 'optimization' as const,
            actionable: 'Assign John Kamau to Industrial Park project for 40% time allocation (2 days/week) to handle steel shop drawing reviews and RFI responses. This eliminates need for external consultant, saving KES 45K/month (KES 540K annually) with no additional payroll cost.',
            potentialSavings: 540000,
            timeframe: 'Implement immediately',
          },
        ]} 
        moduleTitle="Team Management" 
      />
    </div>
  );
}