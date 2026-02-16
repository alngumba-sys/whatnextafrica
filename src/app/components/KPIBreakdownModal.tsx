import { X, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface KPIBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiType: string;
  kpiValue: string;
}

export function KPIBreakdownModal({ isOpen, onClose, kpiType, kpiValue }: KPIBreakdownModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Define breakdown data for each KPI type
  const breakdownData: Record<string, any> = {
    'Portfolio Margin': {
      title: 'Portfolio Margin Calculation',
      subtitle: 'Gross margin across all active projects',
      calculation: [
        { label: 'Total Contract Value', value: 48750000, type: 'revenue' },
        { label: 'Less: Total Direct Costs', value: -31200000, type: 'cost' },
        { label: 'Less: Total Indirect Costs', value: -7875000, type: 'cost' },
        { label: 'Gross Profit', value: 9675000, type: 'profit', isBold: true },
        { label: 'Portfolio Margin %', value: 18.4, type: 'percentage', isBold: true },
      ],
      projectBreakdown: [
        { project: 'Riverside Residential Complex', revenue: 18500000, costs: 14200000, margin: 23.2 },
        { project: 'Westlands Office Tower', revenue: 12300000, costs: 10450000, margin: 15.0 },
        { project: 'Karen Shopping Mall', revenue: 9800000, costs: 8100000, margin: 17.3 },
        { project: 'Industrial Park Phase 1', revenue: 5200000, costs: 4850000, margin: 6.7 },
        { project: 'Coastal Resort & Spa', revenue: 2950000, costs: 2475000, margin: 16.1 },
      ],
    },
    'Cash Position': {
      title: 'Cash Position Breakdown',
      subtitle: 'Available cash and near-term receivables',
      calculation: [
        { label: 'Bank Account - KCB (Operations)', value: 285000, type: 'cash' },
        { label: 'Bank Account - Equity (Payroll)', value: 142500, type: 'cash' },
        { label: 'Bank Account - Co-op (Project)', value: 60000, type: 'cash' },
        { label: 'Total Cash in Bank', value: 487500, type: 'cash', isBold: true },
        { label: '', value: 0, type: 'divider' },
        { label: 'Pending Client Payments (0-30 days)', value: 823000, type: 'receivable' },
        { label: 'Total Available + Receivables', value: 1310500, type: 'total', isBold: true },
      ],
      receivablesBreakdown: [
        { client: 'Riverside Residential - Progress Payment #3', amount: 450000, dueDate: '2025-02-18', status: 'due' },
        { client: 'Westlands Office - Retention Release', amount: 235000, dueDate: '2025-02-20', status: 'due' },
        { client: 'Karen Mall - Monthly Invoice', amount: 138000, dueDate: '2025-02-25', status: 'upcoming' },
      ],
    },
    'Cash Flow Runway': {
      title: 'Cash Flow Runway Analysis',
      subtitle: 'Days until cash position reaches zero',
      calculation: [
        { label: 'Current Cash Position', value: 487500, type: 'cash' },
        { label: 'Avg Weekly Cash Outflow', value: -82000, type: 'expense' },
        { label: 'Avg Weekly Cash Inflow', value: 70500, type: 'revenue' },
        { label: 'Net Weekly Burn Rate', value: -11500, type: 'burn', isBold: true },
        { label: '', value: 0, type: 'divider' },
        { label: 'Cash Runway (Days)', value: 42, type: 'days', isBold: true },
      ],
      weeklyProjection: [
        { week: 'Week 1 (Feb 15-21)', inflow: 450000, outflow: -385000, netCash: 552500, status: 'good' },
        { week: 'Week 2 (Feb 22-28)', inflow: 138000, outflow: -420000, netCash: 270500, status: 'good' },
        { week: 'Week 3 (Mar 1-7)', inflow: 85000, outflow: -195000, netCash: 160500, status: 'warning' },
        { week: 'Week 4 (Mar 8-14)', inflow: 65000, outflow: -178000, netCash: 47500, status: 'danger' },
        { week: 'Week 5 (Mar 15-21)', inflow: 45000, outflow: -125000, netCash: -32500, status: 'critical' },
      ],
    },
    'Total Budget Variance': {
      title: 'Total Budget Variance Breakdown',
      subtitle: 'Actual costs vs. budgeted costs across all projects',
      calculation: [
        { label: 'Total Project Budgets', value: 39075000, type: 'budget' },
        { label: 'Total Actual Costs to Date', value: 39202300, type: 'actual' },
        { label: 'Total Variance', value: -127300, type: 'variance', isBold: true },
        { label: 'Variance as % of Budget', value: -3.2, type: 'percentage', isBold: true },
      ],
      projectVariances: [
        { project: 'Riverside Residential Complex', budget: 14800000, actual: 14200000, variance: 600000, status: 'good' },
        { project: 'Westlands Office Tower', budget: 10100000, actual: 10450000, variance: -350000, status: 'warning' },
        { project: 'Karen Shopping Mall', budget: 8000000, actual: 8100000, variance: -100000, status: 'warning' },
        { project: 'Industrial Park Phase 1', budget: 4500000, actual: 4850000, variance: -350000, status: 'danger' },
        { project: 'Coastal Resort & Spa', budget: 1675000, actual: 1602300, variance: 72700, status: 'good' },
      ],
    },
    'Avg % Over Budget': {
      title: 'Average % Over Budget',
      subtitle: 'Average cost overrun percentage across active projects',
      calculation: [
        { label: 'Projects On Budget or Under', value: 2, type: 'count' },
        { label: 'Projects Over Budget', value: 3, type: 'count' },
        { label: 'Total Active Projects', value: 5, type: 'count', isBold: true },
        { label: '', value: 0, type: 'divider' },
        { label: 'Average % Over Budget', value: 4.7, type: 'percentage', isBold: true },
      ],
      projectPerformance: [
        { project: 'Riverside Residential Complex', budgetedCost: 14800000, actualCost: 14200000, variance: -4.1, status: 'excellent' },
        { project: 'Westlands Office Tower', budgetedCost: 10100000, actualCost: 10450000, variance: 3.5, status: 'warning' },
        { project: 'Karen Shopping Mall', budgetedCost: 8000000, actualCost: 8100000, variance: 1.3, status: 'acceptable' },
        { project: 'Industrial Park Phase 1', budgetedCost: 4500000, actualCost: 4850000, variance: 7.8, status: 'danger' },
        { project: 'Coastal Resort & Spa', budgetedCost: 1675000, actualCost: 1602300, variance: -4.3, status: 'excellent' },
      ],
    },
    'Overdue Payables': {
      title: 'Overdue Payables Breakdown',
      subtitle: 'Outstanding vendor and worker payments past due date',
      calculation: [
        { label: '30+ Days Overdue', value: 48000, type: 'overdue30' },
        { label: '60+ Days Overdue', value: 23000, type: 'overdue60' },
        { label: '90+ Days Overdue', value: 5500, type: 'overdue90' },
        { label: 'Total Overdue Payables', value: 76500, type: 'total', isBold: true },
      ],
      overdueItems: [
        { vendor: 'Bamburi Cement Ltd', project: 'Riverside Residential', amount: 28000, daysOverdue: 45, category: '30-60 days' },
        { vendor: 'East African Steel Co.', project: 'Westlands Office', amount: 20000, daysOverdue: 32, category: '30-60 days' },
        { vendor: 'Kenya Electricals Ltd', project: 'Karen Mall', amount: 15000, daysOverdue: 68, category: '60-90 days' },
        { vendor: 'Rift Valley Plumbing', project: 'Industrial Park', amount: 8000, daysOverdue: 72, category: '60-90 days' },
        { vendor: 'Total Energies Kenya', project: 'Multiple Projects', amount: 5500, daysOverdue: 95, category: '90+ days' },
      ],
    },
  };

  const data = breakdownData[kpiType];

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg border border-slate-600 w-full max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-4 sm:p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              {data.title}
              <span className="text-2xl font-bold text-cyan-400">{kpiValue}</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">{data.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Calculation Table */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Calculation</h3>
            <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {data.calculation.map((row: any, idx: number) => {
                    if (row.type === 'divider') {
                      return <tr key={idx}><td className="border-t-2 border-slate-600" colSpan={2}></td></tr>;
                    }

                    return (
                      <tr key={idx} className={`border-b border-slate-700/50 last:border-0 ${row.isBold ? 'bg-slate-800/50' : ''}`}>
                        <td className={`px-4 py-3 text-sm ${row.isBold ? 'font-bold text-white' : 'text-slate-300'}`}>
                          {row.label}
                        </td>
                        <td className={`px-4 py-3 text-sm text-right ${row.isBold ? 'font-bold' : ''} ${
                          row.type === 'cost' || row.type === 'expense' || row.type === 'burn' ? 'text-red-400' :
                          row.type === 'revenue' || row.type === 'cash' || row.type === 'profit' ? 'text-green-400' :
                          row.type === 'variance' ? (row.value < 0 ? 'text-red-400' : 'text-green-400') :
                          row.type === 'percentage' ? (row.value < 0 ? 'text-red-400' : 'text-cyan-400') :
                          row.type === 'days' ? 'text-amber-400' :
                          'text-white'
                        }`}>
                          {row.type === 'percentage' ? `${row.value.toFixed(1)}%` :
                           row.type === 'days' ? `${row.value} days` :
                           row.type === 'count' ? row.value :
                           row.value !== 0 ? formatCurrency(row.value) : ''}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Breakdown (if applicable) */}
          {data.projectBreakdown && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Project Breakdown</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Project</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Revenue</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Costs</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Margin %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.projectBreakdown.map((project: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-white">{project.project}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-400">{formatCurrency(project.revenue)}</td>
                        <td className="px-4 py-3 text-sm text-right text-red-400">{formatCurrency(project.costs)}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span className={`font-semibold ${
                            project.margin >= 20 ? 'text-green-400' :
                            project.margin >= 15 ? 'text-cyan-400' :
                            project.margin >= 10 ? 'text-amber-400' :
                            'text-red-400'
                          }`}>
                            {project.margin.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Receivables Breakdown */}
          {data.receivablesBreakdown && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Pending Receivables (0-30 Days)</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Client/Invoice</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Amount</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Due Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.receivablesBreakdown.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-white">{item.client}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-400 font-semibold">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 text-sm text-right text-slate-300">{item.dueDate}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            item.status === 'due' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {item.status === 'due' ? 'Due Soon' : 'Upcoming'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Weekly Projection */}
          {data.weeklyProjection && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">6-Week Cash Flow Projection</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Week</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Inflow</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Outflow</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Net Cash</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.weeklyProjection.map((week: any, idx: number) => (
                      <tr key={idx} className={`border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 ${
                        week.status === 'critical' ? 'bg-red-950/20' : ''
                      }`}>
                        <td className="px-4 py-3 text-sm text-white">{week.week}</td>
                        <td className="px-4 py-3 text-sm text-right text-green-400">{formatCurrency(week.inflow)}</td>
                        <td className="px-4 py-3 text-sm text-right text-red-400">{formatCurrency(week.outflow)}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold">
                          <span className={week.netCash < 0 ? 'text-red-400' : 'text-white'}>
                            {formatCurrency(week.netCash)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {week.status === 'good' && <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />}
                          {week.status === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 mx-auto" />}
                          {week.status === 'danger' && <AlertCircle className="w-5 h-5 text-red-400 mx-auto" />}
                          {week.status === 'critical' && <AlertCircle className="w-5 h-5 text-red-600 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Project Variances */}
          {data.projectVariances && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Project-by-Project Variances</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Project</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Budget</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Actual</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Variance</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.projectVariances.map((project: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-white">{project.project}</td>
                        <td className="px-4 py-3 text-sm text-right text-slate-300">{formatCurrency(project.budget)}</td>
                        <td className="px-4 py-3 text-sm text-right text-white font-semibold">{formatCurrency(project.actual)}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span className={`font-semibold ${project.variance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {formatCurrency(project.variance)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            project.status === 'good' ? 'bg-green-600 text-white' :
                            project.status === 'warning' ? 'bg-amber-600 text-white' :
                            'bg-red-600 text-white'
                          }`}>
                            {project.status === 'good' ? 'On Track' : project.status === 'warning' ? 'Watch' : 'Alert'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Project Performance */}
          {data.projectPerformance && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Project Performance</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Project</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Budgeted</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Actual</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">% Variance</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.projectPerformance.map((project: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-white">{project.project}</td>
                        <td className="px-4 py-3 text-sm text-right text-slate-300">{formatCurrency(project.budgetedCost)}</td>
                        <td className="px-4 py-3 text-sm text-right text-white font-semibold">{formatCurrency(project.actualCost)}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <span className={`font-semibold ${
                            project.variance < 0 ? 'text-green-400' :
                            project.variance <= 3 ? 'text-cyan-400' :
                            project.variance <= 5 ? 'text-amber-400' :
                            'text-red-400'
                          }`}>
                            {project.variance > 0 ? '+' : ''}{project.variance.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            project.status === 'excellent' ? 'bg-green-600 text-white' :
                            project.status === 'acceptable' ? 'bg-cyan-600 text-white' :
                            project.status === 'warning' ? 'bg-amber-600 text-white' :
                            'bg-red-600 text-white'
                          }`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Overdue Items */}
          {data.overdueItems && (
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide mb-3">Overdue Payments Detail</h3>
              <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Vendor</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase">Project</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase">Amount</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Days Overdue</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-slate-400 uppercase">Aging</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.overdueItems.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30">
                        <td className="px-4 py-3 text-sm text-white">{item.vendor}</td>
                        <td className="px-4 py-3 text-sm text-slate-300">{item.project}</td>
                        <td className="px-4 py-3 text-sm text-right text-red-400 font-semibold">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 text-sm text-center">
                          <span className={`font-semibold ${
                            item.daysOverdue >= 90 ? 'text-red-600' :
                            item.daysOverdue >= 60 ? 'text-red-400' :
                            'text-amber-400'
                          }`}>
                            {item.daysOverdue} days
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            item.category === '90+ days' ? 'bg-red-600 text-white' :
                            item.category === '60-90 days' ? 'bg-red-500 text-white' :
                            'bg-amber-600 text-white'
                          }`}>
                            {item.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
