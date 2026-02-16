import { useState } from 'react';
import { FileText, Printer, Download, Calendar, Building2, User } from 'lucide-react';
import { toast } from 'sonner';

interface IPCProps {
  projectData?: any;
}

export function InterimPaymentCertificate({ projectData }: IPCProps) {
  const [formData, setFormData] = useState({
    ipcNumber: 'IPC-003',
    projectName: 'Riverside Luxury Apartments',
    projectAddress: 'Riverside Drive, Nairobi',
    owner: 'Riverside Developers Ltd.',
    contractor: 'BuildControl Construction Ltd.',
    contractDate: '2025-06-15',
    contractSum: '520000000',
    ncaNumber: 'NCA/CR/001234',
    periodEndDate: '2026-02-14',
    
    // Work completed
    originalContractSum: '520000000',
    netChangeByChangeOrders: '12500000',
    contractSumToDate: '532500000',
    totalCompletedAndStored: '229000000',
    retentionMoney: '11450000', // 5% of completed work
    
    // Previous payments
    lessRetentionPreviously: '10200000',
    lessPreviousCertificates: '206000000',
    
    // Current payment
    currentDueAmount: '12800000',
    vat16Percent: '2048000',
    withholding3Percent: '384000',
    netAmountDue: '14464000',
    
    // QS Details
    qsName: 'Jane Mwangi, MBORAQS',
    qsRegistration: 'BORAQS/QS/2456',
    qsDate: '2026-02-14',
    
    // Architect Details
    architectName: 'David Omondi, MAAK',
    architectRegistration: 'BORAQS/ARCH/3421',
    architectDate: '2026-02-15',
    
    // Notes
    remarks: 'Payment for works executed in January 2026 as per attached valuation schedule.',
  });

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleDownload = () => {
    toast.success('IPC downloaded as PDF');
  };

  const calculateTotals = () => {
    const contractSumToDate = parseFloat(formData.originalContractSum) + parseFloat(formData.netChangeByChangeOrders);
    const totalCompleted = parseFloat(formData.totalCompletedAndStored);
    const retentionMoney = parseFloat(formData.retentionMoney);
    const previousCerts = parseFloat(formData.lessPreviousCertificates);
    const retentionPreviously = parseFloat(formData.lessRetentionPreviously);
    
    const currentDue = totalCompleted - retentionMoney - previousCerts;
    const vat = currentDue * 0.16;
    const grossWithVAT = currentDue + vat;
    const withholding = currentDue * 0.03;
    const netDue = grossWithVAT - withholding;
    
    return {
      contractSumToDate,
      currentDue,
      vat,
      grossWithVAT,
      withholding,
      netDue,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 p-8 max-w-6xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Interim Payment Certificate</h2>
            <p className="text-sm text-slate-400">JBC Standard Form - Kenya</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Certificate Content */}
      <div className="bg-white text-slate-900 p-8 rounded print:p-0 print:bg-white">
        {/* Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-2xl font-bold mb-1">INTERIM PAYMENT CERTIFICATE</h1>
          <p className="text-sm">Joint Building Council (JBC) Standard Form - Kenya</p>
          <p className="text-xs mt-1">In accordance with Standard Conditions of Contract</p>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm">
          <div className="flex">
            <span className="font-semibold w-48">Certificate Number:</span>
            <span>{formData.ipcNumber}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-48">Period Ending:</span>
            <span>{new Date(formData.periodEndDate).toLocaleDateString('en-GB')}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-48">NCA Number:</span>
            <span>{formData.ncaNumber}</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-48">Contract Date:</span>
            <span>{new Date(formData.contractDate).toLocaleDateString('en-GB')}</span>
          </div>
        </div>

        {/* Project Information */}
        <div className="border-2 border-slate-900 p-4 mb-6">
          <h3 className="font-bold mb-3 text-sm">PROJECT INFORMATION</h3>
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-semibold w-32">Project:</span>
              <span className="flex-1">{formData.projectName}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Location:</span>
              <span className="flex-1">{formData.projectAddress}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Employer:</span>
              <span className="flex-1">{formData.owner}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Contractor:</span>
              <span className="flex-1">{formData.contractor}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="mb-6">
          <h3 className="font-bold mb-3 text-sm border-b border-slate-900 pb-1">VALUATION SUMMARY</h3>
          
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">1.</td>
                <td className="py-2">Original Contract Sum</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">{parseFloat(formData.originalContractSum).toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">2.</td>
                <td className="py-2">Net Change by Change Orders</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">{parseFloat(formData.netChangeByChangeOrders).toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b-2 border-slate-900 bg-slate-100">
                <td className="py-2 font-semibold">3.</td>
                <td className="py-2 font-bold">Contract Sum to Date (1 + 2)</td>
                <td className="py-2 text-right font-mono font-bold">KSh</td>
                <td className="py-2 text-right font-mono font-bold">{totals.contractSumToDate.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">4.</td>
                <td className="py-2">Total Completed and Stored to Date</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">{parseFloat(formData.totalCompletedAndStored).toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">5.</td>
                <td className="py-2">Less: Retention Money (5% of Item 4)</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">({parseFloat(formData.retentionMoney).toLocaleString('en-KE', { minimumFractionDigits: 2 })})</td>
              </tr>
              
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">6.</td>
                <td className="py-2">Less: Previous Certificates</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">({parseFloat(formData.lessPreviousCertificates).toLocaleString('en-KE', { minimumFractionDigits: 2 })})</td>
              </tr>
              
              <tr className="border-b-2 border-slate-900 bg-yellow-50">
                <td className="py-3 font-semibold">7.</td>
                <td className="py-3 font-bold">Current Amount Due (4 - 5 - 6)</td>
                <td className="py-3 text-right font-mono font-bold">KSh</td>
                <td className="py-3 text-right font-mono font-bold">{totals.currentDue.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b border-slate-300">
                <td className="py-2 font-semibold">8.</td>
                <td className="py-2">Add: VAT @ 16%</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">{totals.vat.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b border-slate-300 bg-slate-50">
                <td className="py-2 font-semibold">9.</td>
                <td className="py-2 font-semibold">Gross Amount Including VAT (7 + 8)</td>
                <td className="py-2 text-right font-mono font-semibold">KSh</td>
                <td className="py-2 text-right font-mono font-semibold">{totals.grossWithVAT.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
              
              <tr className="border-b-2 border-slate-900">
                <td className="py-2 font-semibold">10.</td>
                <td className="py-2">Less: Withholding Tax @ 3%</td>
                <td className="py-2 text-right font-mono">KSh</td>
                <td className="py-2 text-right font-mono">({totals.withholding.toLocaleString('en-KE', { minimumFractionDigits: 2 })})</td>
              </tr>
              
              <tr className="bg-green-100 border-2 border-green-600">
                <td className="py-3 font-bold">11.</td>
                <td className="py-3 font-bold text-lg">NET AMOUNT PAYABLE</td>
                <td className="py-3 text-right font-mono font-bold text-lg">KSh</td>
                <td className="py-3 text-right font-mono font-bold text-lg">{totals.netDue.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Retention Money Summary */}
        <div className="border border-slate-900 p-3 mb-6 bg-slate-50">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Total Retention Money Held:</span>
              <span className="ml-2 font-mono">KSh {parseFloat(formData.retentionMoney).toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
            </div>
            <div>
              <span className="font-semibold">Retention Rate:</span>
              <span className="ml-2">5% of Certified Work</span>
            </div>
          </div>
        </div>

        {/* Remarks */}
        {formData.remarks && (
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-sm">REMARKS:</h3>
            <p className="text-sm border border-slate-300 p-3 bg-slate-50">{formData.remarks}</p>
          </div>
        )}

        {/* Signature Blocks */}
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t-2 border-slate-900">
          {/* Quantity Surveyor */}
          <div className="border-2 border-slate-900 p-4">
            <h4 className="font-bold text-sm mb-3 bg-slate-200 -m-4 p-2 mb-4">QUANTITY SURVEYOR CERTIFICATION</h4>
            <div className="space-y-3 text-sm">
              <p className="text-xs">
                I certify that I have valued the work executed and that the amount stated herein is fair and reasonable.
              </p>
              <div className="pt-8 border-b border-slate-900"></div>
              <div>
                <p className="font-semibold">{formData.qsName}</p>
                <p className="text-xs">Registered Quantity Surveyor</p>
              </div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold">BORAQS Reg:</span> {formData.qsRegistration}
                </div>
                <div>
                  <span className="font-semibold">Date:</span> {new Date(formData.qsDate).toLocaleDateString('en-GB')}
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-400 h-16 flex items-center justify-center text-xs text-slate-500">
                STAMP
              </div>
            </div>
          </div>

          {/* Architect/Engineer */}
          <div className="border-2 border-slate-900 p-4">
            <h4 className="font-bold text-sm mb-3 bg-slate-200 -m-4 p-2 mb-4">ARCHITECT/ENGINEER CERTIFICATION</h4>
            <div className="space-y-3 text-sm">
              <p className="text-xs">
                I certify that the works have been executed in accordance with the contract documents and recommend payment.
              </p>
              <div className="pt-8 border-b border-slate-900"></div>
              <div>
                <p className="font-semibold">{formData.architectName}</p>
                <p className="text-xs">Registered Architect</p>
              </div>
              <div className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold">BORAQS Reg:</span> {formData.architectRegistration}
                </div>
                <div>
                  <span className="font-semibold">Date:</span> {new Date(formData.architectDate).toLocaleDateString('en-GB')}
                </div>
              </div>
              <div className="border-2 border-dashed border-slate-400 h-16 flex items-center justify-center text-xs text-slate-500">
                STAMP
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-300 text-xs text-center text-slate-600">
          <p>This certificate is issued subject to the provisions of the Contract and the Conditions of Contract.</p>
          <p className="mt-1">National Construction Authority (NCA) Registered Project: {formData.ncaNumber}</p>
        </div>
      </div>
    </div>
  );
}
