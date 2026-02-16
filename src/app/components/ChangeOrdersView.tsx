import { useState } from 'react';
import { ChangeOrder } from '../data/mockData';
import { FileText, Clock, CheckCircle, XCircle, Edit } from 'lucide-react';
import { ViewChangeOrderModal } from './ViewChangeOrderModal';

interface ChangeOrdersViewProps {
  changeOrders: ChangeOrder[];
}

export function ChangeOrdersView({ changeOrders }: ChangeOrdersViewProps) {
  const [filter, setFilter] = useState<string>('all');
  const [selectedChangeOrder, setSelectedChangeOrder] = useState<ChangeOrder | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleViewChangeOrder = (changeOrder: ChangeOrder) => {
    setSelectedChangeOrder(changeOrder);
    setIsViewModalOpen(true);
  };

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
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'submitted':
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return <Edit className="w-5 h-5 text-slate-400" />;
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

  const filteredOrders = filter === 'all' ? changeOrders : changeOrders.filter(co => co.status === filter);

  const totalValue = filteredOrders.reduce((sum, co) => sum + co.amount, 0);
  const totalMarginImpact = filteredOrders.reduce((sum, co) => sum + co.profitImpact, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Total Change Orders</div>
          <div className="text-2xl font-bold text-white">{filteredOrders.length}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Total Value</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Total Margin Impact</div>
          <div className="text-2xl font-bold text-green-400">{formatCurrency(totalMarginImpact)}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Average Margin %</div>
          <div className="text-2xl font-bold text-cyan-400">
            {((totalMarginImpact / totalValue) * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Change Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left text-slate-300 font-semibold py-3 px-2">CO #</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2">Project</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2">Description</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2">Amount</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2">Margin Impact</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2">Date</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2">Status</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((co) => (
              <tr key={co.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                <td className="py-3 px-2 text-cyan-400 font-mono">{co.id}</td>
                <td className="py-3 px-2 text-white">{co.project}</td>
                <td className="py-3 px-2 text-slate-300">{co.description}</td>
                <td className="text-right py-3 px-2 text-white font-semibold">{formatCurrency(co.amount)}</td>
                <td className="text-right py-3 px-2 text-green-400 font-semibold">{formatCurrency(co.profitImpact)}</td>
                <td className="py-3 px-2 text-slate-300">{co.date}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(co.status)}
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(co.status)}`}>
                      {co.status}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <button
                    className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold"
                    onClick={() => handleViewChangeOrder(co)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Change Order Modal */}
      {isViewModalOpen && selectedChangeOrder && (
        <ViewChangeOrderModal
          isOpen={isViewModalOpen}
          changeOrder={selectedChangeOrder}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}
    </div>
  );
}