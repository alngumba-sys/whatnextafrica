import { useState } from 'react';
import { submittals, Submittal } from '../data/mockData';
import { FileCheck, Clock, CheckCircle, AlertTriangle, XCircle, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface SubmittalsTrackingProps {
  onAddSubmittal: () => void;
}

export function SubmittalsTracking({ onAddSubmittal }: SubmittalsTrackingProps) {
  const [statusFilter, setStatusFilter] = useState<'all' | Submittal['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Submittal['priority']>('all');

  const getStatusIcon = (status: Submittal['status']) => {
    switch (status) {
      case 'pending-review':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'approved-as-noted':
        return <CheckCircle className="w-4 h-4 text-cyan-400" />;
      case 'revise-resubmit':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status: Submittal['status']) => {
    switch (status) {
      case 'pending-review':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400';
      case 'approved':
        return 'bg-green-950/30 border-green-600/50 text-green-400';
      case 'approved-as-noted':
        return 'bg-cyan-950/30 border-cyan-600/50 text-cyan-400';
      case 'revise-resubmit':
        return 'bg-orange-950/30 border-orange-600/50 text-orange-400';
      case 'rejected':
        return 'bg-red-950/30 border-red-600/50 text-red-400';
    }
  };

  const getPriorityColor = (priority: Submittal['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-950/30 border-red-600/50 text-red-400';
      case 'normal':
        return 'bg-blue-950/30 border-blue-600/50 text-blue-400';
      case 'low':
        return 'bg-slate-700/30 border-slate-600/50 text-slate-400';
    }
  };

  const filteredSubmittals = submittals.filter((sub) => {
    if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && sub.priority !== priorityFilter) return false;
    return true;
  });

  const submittalStats = {
    total: submittals.length,
    pending: submittals.filter((s) => s.status === 'pending-review').length,
    approved: submittals.filter((s) => s.status === 'approved' || s.status === 'approved-as-noted').length,
    needsAction: submittals.filter((s) => s.status === 'revise-resubmit' || s.status === 'rejected').length,
    urgent: submittals.filter((s) => s.priority === 'urgent' && s.status === 'pending-review').length,
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Submittals</div>
          <div className="text-2xl font-bold text-white">{submittalStats.total}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Pending Review</div>
          <div className="text-2xl font-bold text-amber-400">{submittalStats.pending}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-400">{submittalStats.approved}</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">Urgent</div>
          <div className="text-2xl font-bold text-red-400">{submittalStats.urgent}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="pending-review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="approved-as-noted">Approved as Noted</option>
            <option value="revise-resubmit">Revise & Resubmit</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Add Submittal Button */}
        <button
          onClick={onAddSubmittal}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Submittal</span>
        </button>
      </div>

      {/* Submittals Table */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Number</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Title</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Project</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Spec Section</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Submitted By</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Submit Date</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Required Date</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Days Open</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Priority</th>
                <th className="text-center text-slate-300 font-semibold py-3 px-4">Status</th>
                <th className="text-left text-slate-300 font-semibold py-3 px-4">Reviewed By</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubmittals.map((submittal) => {
                const isOverdue = submittal.daysOpen > 14 && submittal.status === 'pending-review';
                const isUrgentAndPending = submittal.priority === 'urgent' && submittal.status === 'pending-review';

                return (
                  <tr
                    key={submittal.id}
                    className={`border-t border-slate-700 hover:bg-slate-800/70 ${
                      isOverdue || isUrgentAndPending ? 'border-l-4 border-l-red-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(submittal.status)}
                        <span className="text-cyan-400 font-mono font-semibold">{submittal.number}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-white font-medium max-w-xs">{submittal.title}</td>
                    <td className="py-3 px-4 text-slate-300">{submittal.project}</td>
                    <td className="text-center py-3 px-4 text-slate-300 font-mono text-xs">{submittal.specSection}</td>
                    <td className="py-3 px-4 text-slate-300">{submittal.submittedBy}</td>
                    <td className="py-3 px-4 text-slate-300">{submittal.submittedDate}</td>
                    <td className="py-3 px-4">
                      <span className={`${isOverdue ? 'text-red-400 font-bold' : 'text-slate-300'}`}>
                        {submittal.requiredDate}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        submittal.daysOpen > 14 ? 'bg-red-950/30 text-red-400' : 
                        submittal.daysOpen > 7 ? 'bg-amber-950/30 text-amber-400' : 
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {submittal.daysOpen}d
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded border text-xs font-semibold ${getPriorityColor(submittal.priority)}`}>
                        {submittal.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded border text-xs font-semibold ${getStatusColor(submittal.status)}`}>
                        {submittal.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {submittal.reviewedBy ? (
                        <div>
                          <div>{submittal.reviewedBy}</div>
                          <div className="text-xs text-slate-400">{submittal.reviewDate}</div>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSubmittals.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <FileCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No submittals found matching the selected filters</p>
        </div>
      )}
    </div>
  );
}