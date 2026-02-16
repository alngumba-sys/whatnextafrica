import { X, FileText, CheckCircle, XCircle, Clock, Edit, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { ChangeOrder } from '../data/mockData';

interface ViewChangeOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  changeOrder: ChangeOrder | null;
}

export function ViewChangeOrderModal({ isOpen, onClose, changeOrder }: ViewChangeOrderModalProps) {
  if (!isOpen || !changeOrder) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'submitted':
        return <Clock className="w-6 h-6 text-amber-400" />;
      default:
        return <Edit className="w-6 h-6 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-600 text-white';
      case 'rejected':
        return 'bg-red-600 text-white';
      case 'submitted':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const marginPercent = ((changeOrder.profitImpact / changeOrder.amount) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-lg border-2 border-cyan-500/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <FileText className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Change Order #{changeOrder.id}</h2>
              <p className="text-slate-400 text-sm mt-0.5">{changeOrder.project}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Key Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-2">Status</div>
              <div className="flex items-center gap-2">
                {getStatusIcon(changeOrder.status)}
                <span className={`px-3 py-1 rounded font-semibold text-sm ${getStatusColor(changeOrder.status)}`}>
                  {changeOrder.status.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-2">Submitted Date</div>
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold">{changeOrder.date}</span>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-2">Priority</div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-white font-semibold capitalize">{changeOrder.priority || 'Medium'}</span>
              </div>
            </div>
          </div>

          {/* Financial Impact */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-slate-800/50 rounded-lg p-6 border border-cyan-600/30">
            <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Impact
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-slate-400 text-xs mb-1">Change Order Value</div>
                <div className="text-3xl font-bold text-white">{formatCurrency(changeOrder.amount)}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Margin Impact</div>
                <div className="text-3xl font-bold text-green-400">{formatCurrency(changeOrder.profitImpact)}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Margin Percentage</div>
                <div className="text-3xl font-bold text-cyan-400">{marginPercent}%</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-800/30 rounded-lg p-5 border border-slate-700">
            <h3 className="text-cyan-400 font-bold mb-3">Description</h3>
            <p className="text-white leading-relaxed">{changeOrder.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Requested By</div>
              <div className="text-white font-semibold">{changeOrder.requestedBy || 'Client'}</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Type</div>
              <div className="text-white font-semibold capitalize">{changeOrder.type || 'Addition'}</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Reason</div>
              <div className="text-white font-semibold capitalize">{changeOrder.reason?.replace('-', ' ') || 'Client Request'}</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700">
              <div className="text-slate-400 text-xs mb-1">Schedule Impact</div>
              <div className="text-white font-semibold">{changeOrder.estimatedDays || 0} Days</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            {changeOrder.status === 'submitted' && (
              <>
                <button className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Approve Change Order
                </button>
                <button className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Reject Change Order
                </button>
              </>
            )}
            {changeOrder.status === 'approved' && (
              <button className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-colors">
                Send to Client for Approval
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
