import { X, Download, FileText, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface GenerateAIAFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GenerateAIAFormModal({ isOpen, onClose }: GenerateAIAFormModalProps) {
  const [formData, setFormData] = useState({
    projectName: 'Westlands Office Tower',
    projectNumber: 'PRJ-001',
    applicationNumber: '5',
    periodTo: '2026-02-14',
    contractSum: '12500000',
    workCompletedPreviously: '6800000',
    workCompletedThisPeriod: '850000',
    retainagePercent: '10',
    ownerName: 'Westlands Properties Ltd',
    contractorName: 'BuildControl Pro Ltd',
    architectName: 'Nairobi Architecture Associates',
  });

  if (!isOpen) return null;

  const calculateValues = () => {
    const contractSum = parseFloat(formData.contractSum);
    const workPreviously = parseFloat(formData.workCompletedPreviously);
    const workThisPeriod = parseFloat(formData.workCompletedThisPeriod);
    const retainagePercent = parseFloat(formData.retainagePercent) / 100;

    const totalCompleted = workPreviously + workThisPeriod;
    const percentComplete = (totalCompleted / contractSum) * 100;
    const retainage = totalCompleted * retainagePercent;
    const totalEarned = totalCompleted - retainage;
    const previousPayments = workPreviously - (workPreviously * retainagePercent);
    const currentPaymentDue = totalEarned - previousPayments;

    return {
      contractSum,
      totalCompleted,
      percentComplete,
      retainage,
      totalEarned,
      previousPayments,
      currentPaymentDue,
    };
  };

  const values = calculateValues();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleGenerate = () => {
    toast.success('JBC IPC/Valuation Forms Generated!', {
      description: `Certificate #${formData.applicationNumber} - ${formatCurrency(values.currentPaymentDue)} ready for download`,
    });
    
    // Simulate file download
    setTimeout(() => {
      toast.info('PDF Generated', {
        description: 'G702-G703_Application_5_Westlands_Tower.pdf',
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Generate JBC IPC/Valuation</h2>
              <p className="text-sm text-slate-400">Interim Payment Certificate & Valuation of Work</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Project Information */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Project Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Project Name</label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Project Number</label>
                <input
                  type="text"
                  value={formData.projectNumber}
                  onChange={(e) => setFormData({ ...formData, projectNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Application Number</label>
                <input
                  type="text"
                  value={formData.applicationNumber}
                  onChange={(e) => setFormData({ ...formData, applicationNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Period Ending</label>
                <input
                  type="date"
                  value={formData.periodTo}
                  onChange={(e) => setFormData({ ...formData, periodTo: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Contract Parties */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Contract Parties
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Owner</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Contractor</label>
                <input
                  type="text"
                  value={formData.contractorName}
                  onChange={(e) => setFormData({ ...formData, contractorName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Architect</label>
                <input
                  type="text"
                  value={formData.architectName}
                  onChange={(e) => setFormData({ ...formData, architectName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Financial Data */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Financial Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Contract Sum (KES)</label>
                <input
                  type="number"
                  value={formData.contractSum}
                  onChange={(e) => setFormData({ ...formData, contractSum: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Retainage %</label>
                <input
                  type="number"
                  value={formData.retainagePercent}
                  onChange={(e) => setFormData({ ...formData, retainagePercent: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Work Completed Previously (KES)</label>
                <input
                  type="number"
                  value={formData.workCompletedPreviously}
                  onChange={(e) => setFormData({ ...formData, workCompletedPreviously: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Work Completed This Period (KES)</label>
                <input
                  type="number"
                  value={formData.workCompletedThisPeriod}
                  onChange={(e) => setFormData({ ...formData, workCompletedThisPeriod: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Calculated Summary */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 rounded-lg border border-cyan-600/30 p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              Payment Application Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Total Completed to Date</div>
                <div className="text-xl font-bold text-white">{formatCurrency(values.totalCompleted)}</div>
                <div className="text-xs text-cyan-400 mt-1">{values.percentComplete.toFixed(1)}% Complete</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Total Retainage</div>
                <div className="text-xl font-bold text-amber-400">{formatCurrency(values.retainage)}</div>
                <div className="text-xs text-slate-400 mt-1">{formData.retainagePercent}% held</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-1">Previous Payments</div>
                <div className="text-xl font-bold text-white">{formatCurrency(values.previousPayments)}</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 md:col-span-2 lg:col-span-3">
                <div className="text-slate-400 text-xs mb-1">Current Payment Due</div>
                <div className="text-3xl font-bold text-green-400">{formatCurrency(values.currentPaymentDue)}</div>
                <div className="text-xs text-slate-400 mt-1">Application #{formData.applicationNumber}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Generate PDF (IPC + Valuation)
            </button>
          </div>

          {/* Info Note */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <p className="text-xs text-slate-400">
              <strong className="text-cyan-400">Note:</strong> This will generate JBC Interim Payment Certificate (IPC) 
              and Valuation of Work with 16% VAT, 3% Withholding Tax, 5% Retention Money, BORAQS certification blocks, 
              and NCA compliance - formatted for Quantity Surveyor and Architect approval.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}