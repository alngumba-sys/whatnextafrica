import { useState } from 'react';
import { PurchaseOrder, VendorInvoice, Payment } from '../data/mockData';
import { FileText, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { useWindowSize, isMobile } from '../hooks/useWindowSize';
import { toast } from 'sonner';

interface ProcurementCenterProps {
  purchaseOrders: PurchaseOrder[];
  vendorInvoices: VendorInvoice[];
  upcomingPayments: Payment[];
}

export function ProcurementCenter({ purchaseOrders, vendorInvoices, upcomingPayments }: ProcurementCenterProps) {
  const { width } = useWindowSize();
  const mobile = isMobile(width);
  
  const [activeTab, setActiveTab] = useState<'pos' | 'invoices' | 'payments'>('invoices');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getAgingColor = (aging: number) => {
    if (aging <= 15) return 'text-green-400';
    if (aging <= 30) return 'text-amber-400';
    return 'text-red-400';
  };

  const getLienWaiverColor = (status: string) => {
    if (status === 'final') return 'bg-green-600';
    if (status === 'partial') return 'bg-amber-600';
    return 'bg-red-600';
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
        <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
        <span className="truncate">Procurement & Payables Control Center</span>
      </h2>

      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 mb-4 md:mb-6 border-b border-slate-700 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        <button
          onClick={() => setActiveTab('pos')}
          className={`px-3 sm:px-4 py-2 font-semibold border-b-2 transition-colors text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'pos'
              ? 'text-cyan-400 border-cyan-400'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Open POs & Subcontracts</span>
          <span className="sm:hidden">POs</span>
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`px-3 sm:px-4 py-2 font-semibold border-b-2 transition-colors text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'invoices'
              ? 'text-cyan-400 border-cyan-400'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Invoices Awaiting Approval</span>
          <span className="sm:hidden">Invoices</span>
          <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{vendorInvoices.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3 sm:px-4 py-2 font-semibold border-b-2 transition-colors text-xs sm:text-sm whitespace-nowrap ${
            activeTab === 'payments'
              ? 'text-cyan-400 border-cyan-400'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span className="hidden sm:inline">Payment Scheduler</span>
          <span className="sm:hidden">Payments</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'pos' && (
        <div>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">PO #</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Vendor</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Project</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Total Amount</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Committed</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Billed</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Remaining</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-cyan-400 font-mono">{po.id}</td>
                    <td className="py-3 px-2 text-white">{po.vendor}</td>
                    <td className="py-3 px-2 text-slate-300">{po.project}</td>
                    <td className="text-right py-3 px-2 text-white">{formatCurrency(po.amount)}</td>
                    <td className="text-right py-3 px-2 text-white">{formatCurrency(po.committed)}</td>
                    <td className="text-right py-3 px-2 text-amber-400">{formatCurrency(po.billed)}</td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(po.committed - po.billed)}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          po.status === 'open'
                            ? 'bg-green-600 text-white'
                            : po.status === 'partial'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-600 text-white'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div>
          <div className="overflow-x-auto -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <table className="w-full text-xs sm:text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Invoice #</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Vendor</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Project</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Amount</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Invoice Date</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Due Date</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-2">Aging</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Match Status</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendorInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-2 text-cyan-400 font-mono">{invoice.id}</td>
                    <td className="py-3 px-2 text-white">{invoice.vendor}</td>
                    <td className="py-3 px-2 text-slate-300">{invoice.project}</td>
                    <td className="text-right py-3 px-2 text-white font-semibold">{formatCurrency(invoice.amount)}</td>
                    <td className="py-3 px-2 text-slate-300">{invoice.invoiceDate}</td>
                    <td className="py-3 px-2 text-slate-300">{invoice.dueDate}</td>
                    <td className={`text-right py-3 px-2 font-semibold ${getAgingColor(invoice.aging)}`}>
                      {invoice.aging} days
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          invoice.matchStatus === '3-way'
                            ? 'bg-green-600 text-white'
                            : invoice.matchStatus === '2-way'
                            ? 'bg-amber-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}
                      >
                        {invoice.matchStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <button 
                          className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded text-xs font-semibold"
                          onClick={() => toast.success('Invoice approved!', { description: `${invoice.vendor} - ${formatCurrency(invoice.amount)} approved for payment` })}
                        >
                          Approve
                        </button>
                        <button 
                          className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs"
                          onClick={() => toast.info('Invoice Details', { description: `Viewing ${invoice.id} from ${invoice.vendor}` })}
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Aging Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-950/30 border border-green-600/50 rounded-lg p-4">
              <div className="text-green-400 text-sm mb-1">Current (0-30 days)</div>
              <div className="text-2xl font-bold text-white">KES 45,000</div>
            </div>
            <div className="bg-amber-950/30 border border-amber-600/50 rounded-lg p-4">
              <div className="text-amber-400 text-sm mb-1">31-60 days</div>
              <div className="text-2xl font-bold text-white">KES 32,000</div>
            </div>
            <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-4">
              <div className="text-red-400 text-sm mb-1">60+ days</div>
              <div className="text-2xl font-bold text-white">KES 18,500</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payments' && (
        <div>
          <div className="mb-4 bg-slate-900/50 rounded-lg p-4 border border-cyan-600">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Cash Impact This Week</span>
            </div>
            <div className="text-3xl font-bold text-red-400">-KES 375,000</div>
            <div className="text-sm text-slate-400 mt-1">5 payments scheduled</div>
          </div>

          <div className="space-y-3">
            {upcomingPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-white font-semibold">{payment.vendor}</div>
                      <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded">{payment.type}</span>
                    </div>
                    <div className="text-sm text-slate-400 mb-2">{payment.project}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">Due: {payment.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Lien Waiver:</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getLienWaiverColor(
                            payment.lienWaiverStatus
                          )}`}
                        >
                          {payment.lienWaiverStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-white mb-2">{formatCurrency(payment.amount)}</div>
                    <button 
                      className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-semibold"
                      onClick={() => toast.success('Payment initiated!', { description: `${formatCurrency(payment.amount)} payment to ${payment.vendor} has been queued` })}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}