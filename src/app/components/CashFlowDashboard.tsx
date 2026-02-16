import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { CashFlowItem } from '../data/mockData';
import { useWindowSize, getChartWidth, getChartHeight } from '../hooks/useWindowSize';
import { AIInsightCard } from './AIInsightCard';
import { GenerateAIAFormModal } from './GenerateAIAFormModal';
import { useState } from 'react';

interface CashFlowDashboardProps {
  cashFlowData: CashFlowItem[];
}

const cashFlowInsights = [
  {
    id: 'cf1',
    title: 'Critical Cash Shortage in Week 8-9',
    description: 'AI detected balance will drop to KES 1.2M in Week 9 (March 15), creating a critical liquidity gap. This coincides with Industrial Park steel payment (KES 1.8M) and Westlands payroll (KES 450K).',
    impact: 'high' as const,
    type: 'warning' as const,
    actionable: 'Accelerate Riverside Mall progress payment (KES 850K due Week 7) or establish a KES 2M bridge line of credit before March 10. Consider delaying non-critical PO payments by 10 days.',
    potentialSavings: 45000,
    timeframe: 'Action needed by March 5',
  },
  {
    id: 'cf2',
    title: 'Payment Collection Pattern Optimization',
    description: 'Analysis shows Karen Residential client pays 8 days faster when invoices are submitted before the 20th of the month (vs. after 25th). Current practice submits invoices on 27th.',
    impact: 'medium' as const,
    type: 'opportunity' as const,
    actionable: 'Shift Karen Residential invoice submission schedule to 18th of each month. This will improve cash conversion cycle by 8 days and unlock KES 380K in Week 6 instead of Week 8.',
    potentialSavings: 0,
    timeframe: 'Implement next billing cycle',
  },
  {
    id: 'cf3',
    title: 'Subcontractor Payment Terms Mismatch',
    description: 'You are paying electrical subs Net-15 while receiving client payments Net-30. AI identified KES 620K in unnecessary cash outflows due to payment timing mismatch across 3 projects.',
    impact: 'medium' as const,
    type: 'optimization' as const,
    actionable: 'Renegotiate payment terms with Premier Electrical and Kariuki Plumbing to Net-25 to better match client payment cycles. This will reduce peak working capital requirement by 22%.',
    potentialSavings: 85000,
    timeframe: '2-3 weeks to renegotiate',
  },
];

export function CashFlowDashboard({ cashFlowData }: CashFlowDashboardProps) {
  const { width } = useWindowSize();
  const chartWidth = getChartWidth(width);
  const chartHeight = getChartHeight(width);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const lowestPoint = Math.min(...cashFlowData.map((d) => d.balance));
  const lowestWeek = cashFlowData.find((d) => d.balance === lowestPoint);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 sm:p-4 md:p-6 mb-4 md:mb-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
        <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
        Portfolio Cash Flow Forecast
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Current Balance</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(cashFlowData[1].balance)}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Lowest Point (Next 12 Weeks)</div>
          <div className="text-2xl font-bold text-amber-400">{formatCurrency(lowestPoint)}</div>
          <div className="text-xs text-slate-400 mt-1">{lowestWeek?.week}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">4-Week Forecast</div>
          <div className="text-2xl font-bold text-green-400">
            {formatCurrency(cashFlowData[4].balance - cashFlowData[1].balance)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Net change</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">This Week Cash Impact</div>
          <div className={`text-2xl font-bold ${cashFlowData[1].netCash >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {formatCurrency(cashFlowData[1].netCash)}
          </div>
          <div className="text-xs text-slate-400 mt-1">Inflows - Outflows</div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 w-full h-[400px]" style={{ minHeight: '400px' }}>
        <ResponsiveContainer width="100%" height={400} minHeight={400}>
          <AreaChart data={cashFlowData}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutflows" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} tickFormatter={(value) => `KES ${(value / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <ReferenceLine y={lowestPoint} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: 'Lowest Point', fill: '#F59E0B', fontSize: 12 }} />
            <Area type="monotone" dataKey="inflows" stroke="#10B981" fill="url(#colorInflows)" strokeWidth={2} />
            <Area type="monotone" dataKey="outflows" stroke="#EF4444" fill="url(#colorOutflows)" strokeWidth={2} />
            <Area type="monotone" dataKey="balance" stroke="#06B6D4" fill="url(#colorBalance)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 justify-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-500 rounded"></div>
          <span className="text-slate-300">Cash Balance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-slate-300">Inflows (Billings + Draws)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-slate-300">Outflows (Payroll + Vendors + Overhead)</span>
        </div>
      </div>

      {/* Draw Request Builder */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Draw Request Builder</h3>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold" onClick={() => setIsModalOpen(true)}>
            Generate JBC IPC/Valuation
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Work Completed This Period</div>
            <div className="text-xl font-bold text-white">KES 1,245,000</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Stored Materials</div>
            <div className="text-xl font-bold text-white">KES 187,500</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Total Current Draw</div>
            <div className="text-xl font-bold text-cyan-400">KES 1,432,500</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6">
        <AIInsightCard insights={cashFlowInsights} moduleTitle="Cash Flow Forecast" />
      </div>

      {/* Generate AIA Form Modal */}
      <GenerateAIAFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}