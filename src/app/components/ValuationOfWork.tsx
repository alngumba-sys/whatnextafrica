import { useState } from 'react';
import { FileSpreadsheet, Printer, Download, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface WorkItem {
  id: string;
  itemNo: string;
  description: string;
  contractAmount: number;
  workCompleteThisPeriod: number;
  materialsStored: number;
  totalCompleteAndStored: number;
  percentComplete: number;
  balanceToFinish: number;
  retention: number;
}

export function ValuationOfWork() {
  const [workItems, setWorkItems] = useState<WorkItem[]>([
    {
      id: '1',
      itemNo: '1.0',
      description: 'PRELIMINARIES & GENERAL CONDITIONS',
      contractAmount: 26000000,
      workCompleteThisPeriod: 26000000,
      materialsStored: 0,
      totalCompleteAndStored: 26000000,
      percentComplete: 100,
      balanceToFinish: 0,
      retention: 1300000,
    },
    {
      id: '2',
      itemNo: '2.0',
      description: 'SUBSTRUCTURE - Excavation, Foundations & Ground Floor Slab',
      contractAmount: 78000000,
      workCompleteThisPeriod: 78000000,
      materialsStored: 0,
      totalCompleteAndStored: 78000000,
      percentComplete: 100,
      balanceToFinish: 0,
      retention: 3900000,
    },
    {
      id: '3',
      itemNo: '3.0',
      description: 'SUPERSTRUCTURE - Columns, Beams, Floors & Roof Structure',
      contractAmount: 156000000,
      workCompleteThisPeriod: 124800000,
      materialsStored: 0,
      totalCompleteAndStored: 124800000,
      percentComplete: 80,
      balanceToFinish: 31200000,
      retention: 6240000,
    },
    {
      id: '4',
      itemNo: '4.0',
      description: 'EXTERNAL WALLS - Masonry, Cladding & External Finishes',
      contractAmount: 52000000,
      workCompleteThisPeriod: 31200000,
      materialsStored: 2600000,
      totalCompleteAndStored: 33800000,
      percentComplete: 65,
      balanceToFinish: 18200000,
      retention: 1690000,
    },
    {
      id: '5',
      itemNo: '5.0',
      description: 'INTERNAL WALLS & PARTITIONS',
      contractAmount: 31200000,
      workCompleteThisPeriod: 18720000,
      materialsStored: 1560000,
      totalCompleteAndStored: 20280000,
      percentComplete: 65,
      balanceToFinish: 10920000,
      retention: 1014000,
    },
    {
      id: '6',
      itemNo: '6.0',
      description: 'FLOOR, WALL & CEILING FINISHES',
      contractAmount: 41600000,
      workCompleteThisPeriod: 12480000,
      materialsStored: 4160000,
      totalCompleteAndStored: 16640000,
      percentComplete: 40,
      balanceToFinish: 24960000,
      retention: 832000,
    },
    {
      id: '7',
      itemNo: '7.0',
      description: 'DOORS, WINDOWS & IRONMONGERY',
      contractAmount: 36400000,
      workCompleteThisPeriod: 0,
      materialsStored: 7280000,
      totalCompleteAndStored: 7280000,
      percentComplete: 20,
      balanceToFinish: 29120000,
      retention: 364000,
    },
    {
      id: '8',
      itemNo: '8.0',
      description: 'MECHANICAL SERVICES - HVAC Systems',
      contractAmount: 52000000,
      workCompleteThisPeriod: 15600000,
      materialsStored: 5200000,
      totalCompleteAndStored: 20800000,
      percentComplete: 40,
      balanceToFinish: 31200000,
      retention: 1040000,
    },
    {
      id: '9',
      itemNo: '9.0',
      description: 'ELECTRICAL SERVICES - Power & Lighting',
      contractAmount: 46800000,
      workCompleteThisPeriod: 14040000,
      materialsStored: 4680000,
      totalCompleteAndStored: 18720000,
      percentComplete: 40,
      balanceToFinish: 28080000,
      retention: 936000,
    },
    {
      id: '10',
      itemNo: '10.0',
      description: 'PLUMBING & DRAINAGE',
      contractAmount: 26000000,
      workCompleteThisPeriod: 7800000,
      materialsStored: 2600000,
      totalCompleteAndStored: 10400000,
      percentComplete: 40,
      balanceToFinish: 15600000,
      retention: 520000,
    },
    {
      id: '11',
      itemNo: '11.0',
      description: 'FIRE PROTECTION SYSTEMS',
      contractAmount: 20800000,
      workCompleteThisPeriod: 0,
      materialsStored: 0,
      totalCompleteAndStored: 0,
      percentComplete: 0,
      balanceToFinish: 20800000,
      retention: 0,
    },
    {
      id: '12',
      itemNo: '12.0',
      description: 'EXTERNAL WORKS - Landscaping, Paving & Drainage',
      contractAmount: 15600000,
      workCompleteThisPeriod: 0,
      materialsStored: 0,
      totalCompleteAndStored: 0,
      percentComplete: 0,
      balanceToFinish: 15600000,
      retention: 0,
    },
  ]);

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleDownload = () => {
    toast.success('Valuation downloaded as PDF');
  };

  const calculateTotals = () => {
    return workItems.reduce(
      (acc, item) => ({
        contractAmount: acc.contractAmount + item.contractAmount,
        workCompleteThisPeriod: acc.workCompleteThisPeriod + item.workCompleteThisPeriod,
        materialsStored: acc.materialsStored + item.materialsStored,
        totalCompleteAndStored: acc.totalCompleteAndStored + item.totalCompleteAndStored,
        balanceToFinish: acc.balanceToFinish + item.balanceToFinish,
        retention: acc.retention + item.retention,
      }),
      {
        contractAmount: 0,
        workCompleteThisPeriod: 0,
        materialsStored: 0,
        totalCompleteAndStored: 0,
        balanceToFinish: 0,
        retention: 0,
      }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 p-8 max-w-full mx-auto">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <FileSpreadsheet className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Valuation of Work</h2>
            <p className="text-sm text-slate-400">Schedule of Values - Interim Payment Certificate</p>
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
      <div className="bg-white text-slate-900 p-6 rounded print:p-0 print:bg-white overflow-x-auto">
        {/* Header */}
        <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
          <h1 className="text-xl font-bold mb-1">VALUATION OF WORK</h1>
          <p className="text-xs">Continuation Sheet - Schedule of Values</p>
          <p className="text-xs mt-1">Attached to Interim Payment Certificate IPC-003</p>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4 text-xs border border-slate-900 p-3 bg-slate-50">
          <div className="flex">
            <span className="font-semibold w-32">Project:</span>
            <span>Riverside Luxury Apartments</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Period Ending:</span>
            <span>14/02/2026</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Contractor:</span>
            <span>BuildControl Construction Ltd.</span>
          </div>
          <div className="flex">
            <span className="font-semibold w-32">Certificate No:</span>
            <span>IPC-003</span>
          </div>
        </div>

        {/* Valuation Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-2 border-slate-900">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="border border-slate-600 p-2 text-left w-12">Item No.</th>
                <th className="border border-slate-600 p-2 text-left">Description of Work</th>
                <th className="border border-slate-600 p-2 text-right w-32">Contract Amount (KSh)</th>
                <th className="border border-slate-600 p-2 text-right w-28">Work Complete This Period (KSh)</th>
                <th className="border border-slate-600 p-2 text-right w-28">Materials Stored (KSh)</th>
                <th className="border border-slate-600 p-2 text-right w-32">Total Complete & Stored (KSh)</th>
                <th className="border border-slate-600 p-2 text-right w-20">% Complete</th>
                <th className="border border-slate-600 p-2 text-right w-28">Balance to Finish (KSh)</th>
                <th className="border border-slate-600 p-2 text-right w-28">Retention 5% (KSh)</th>
              </tr>
            </thead>
            <tbody>
              {workItems.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border border-slate-300 p-2 font-semibold">{item.itemNo}</td>
                  <td className="border border-slate-300 p-2">{item.description}</td>
                  <td className="border border-slate-300 p-2 text-right font-mono">
                    {item.contractAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-mono">
                    {item.workCompleteThisPeriod.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-mono">
                    {item.materialsStored.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-mono font-semibold">
                    {item.totalCompleteAndStored.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-semibold">
                    {item.percentComplete}%
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-mono text-slate-600">
                    {item.balanceToFinish.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-300 p-2 text-right font-mono text-amber-700">
                    {item.retention.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
              
              {/* Totals Row */}
              <tr className="bg-slate-900 text-white font-bold">
                <td className="border border-slate-600 p-2" colSpan={2}>TOTAL</td>
                <td className="border border-slate-600 p-2 text-right font-mono">
                  {totals.contractAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-slate-600 p-2 text-right font-mono">
                  {totals.workCompleteThisPeriod.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-slate-600 p-2 text-right font-mono">
                  {totals.materialsStored.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-slate-600 p-2 text-right font-mono text-cyan-300">
                  {totals.totalCompleteAndStored.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-slate-600 p-2 text-right">
                  {Math.round((totals.totalCompleteAndStored / totals.contractAmount) * 100)}%
                </td>
                <td className="border border-slate-600 p-2 text-right font-mono">
                  {totals.balanceToFinish.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
                <td className="border border-slate-600 p-2 text-right font-mono text-amber-300">
                  {totals.retention.toLocaleString('en-KE', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Notes */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="border border-slate-900 p-3 bg-blue-50">
            <div className="font-bold mb-1">Contract Sum to Date:</div>
            <div className="font-mono text-lg">KSh {totals.contractAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="border border-slate-900 p-3 bg-green-50">
            <div className="font-bold mb-1">Total Work Certified:</div>
            <div className="font-mono text-lg">KSh {totals.totalCompleteAndStored.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
          <div className="border border-slate-900 p-3 bg-amber-50">
            <div className="font-bold mb-1">Total Retention Money:</div>
            <div className="font-mono text-lg">KSh {totals.retention.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4 border border-slate-900 p-3 text-xs">
          <h4 className="font-bold mb-2">NOTES:</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            <li>Retention Money calculated at 5% of Total Complete and Stored value</li>
            <li>Materials stored on site are included only when properly secured and insured</li>
            <li>All measurements subject to final remeasurement upon project completion</li>
            <li>Valuation prepared in accordance with JBC Standard Conditions of Contract</li>
          </ul>
        </div>

        {/* Signature Block */}
        <div className="mt-6 pt-4 border-t-2 border-slate-900">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs mb-1 font-semibold">Prepared by:</p>
              <div className="border-b border-slate-900 mt-8 mb-2"></div>
              <p className="text-xs font-semibold">Jane Mwangi, MBORAQS</p>
              <p className="text-xs text-slate-600">Registered Quantity Surveyor</p>
              <p className="text-xs text-slate-600">BORAQS Reg: BORAQS/QS/2456</p>
              <p className="text-xs text-slate-600 mt-1">Date: 14/02/2026</p>
            </div>
            <div>
              <p className="text-xs mb-1 font-semibold">Reviewed by:</p>
              <div className="border-b border-slate-900 mt-8 mb-2"></div>
              <p className="text-xs font-semibold">David Omondi, MAAK</p>
              <p className="text-xs text-slate-600">Registered Architect</p>
              <p className="text-xs text-slate-600">BORAQS Reg: BORAQS/ARCH/3421</p>
              <p className="text-xs text-slate-600 mt-1">Date: 15/02/2026</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-300 text-xs text-center text-slate-600">
          <p>This valuation forms an integral part of Interim Payment Certificate IPC-003</p>
          <p className="mt-1">Page 1 of 1</p>
        </div>
      </div>
    </div>
  );
}
