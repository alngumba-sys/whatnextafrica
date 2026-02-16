import { useState } from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { InterimPaymentCertificate } from './InterimPaymentCertificate';
import { ValuationOfWork } from './ValuationOfWork';

export function PaymentCertificateView() {
  const [activeTab, setActiveTab] = useState<'ipc' | 'valuation'>('ipc');

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-gradient-to-r from-cyan-900/40 to-slate-900/40 border border-cyan-500/30 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <FileText className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Payment Certification System</h2>
            <p className="text-slate-300">
              Kenyan JBC Standard Forms - Interim Payment Certificates & Valuation of Work
            </p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            <p className="font-semibold mb-1">About These Forms</p>
            <p className="text-blue-200">
              These forms include 16% VAT, 3% Withholding Tax, 5% Retention Money, and require certification from BORAQS-registered professionals. All amounts are in Kenya Shillings (KSh) and comply with National Construction Authority (NCA) requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-700">
        <button
          onClick={() => setActiveTab('ipc')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
            activeTab === 'ipc'
              ? 'text-cyan-400 bg-slate-800'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          Interim Payment Certificate
          {activeTab === 'ipc' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></div>
          )}
        </button>
        
        <button
          onClick={() => setActiveTab('valuation')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors relative ${
            activeTab === 'valuation'
              ? 'text-cyan-400 bg-slate-800'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          Valuation of Work Schedule
          {activeTab === 'valuation' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"></div>
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'ipc' && <InterimPaymentCertificate />}
        {activeTab === 'valuation' && <ValuationOfWork />}
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            Kenyan Tax Compliance
          </h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• 16% VAT automatically calculated</li>
            <li>• 3% Withholding Tax deducted</li>
            <li>• 5% Retention Money held</li>
            <li>• All amounts in KSh</li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            Professional Certification
          </h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• BORAQS-registered Quantity Surveyor</li>
            <li>• BORAQS-registered Architect</li>
            <li>• NCA project registration number</li>
            <li>• Official stamp blocks included</li>
          </ul>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            JBC Standards
          </h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Joint Building Council format</li>
            <li>• Standard Conditions of Contract</li>
            <li>• Detailed valuation breakdown</li>
            <li>• Materials stored on site tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}