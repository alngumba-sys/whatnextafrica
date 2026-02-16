import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PortfolioKPIs } from '../data/mockData';
import { useState } from 'react';
import { KPIBreakdownModal } from './KPIBreakdownModal';

interface KPICardsProps {
  kpis: PortfolioKPIs;
  columns: number;
}

export function KPICards({ kpis, columns }: KPICardsProps) {
  const [selectedKPI, setSelectedKPI] = useState<{ type: string; value: string } | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const kpiData = [
    {
      label: 'Portfolio Margin',
      value: `${kpis.profitability.toFixed(1)}%`,
      trend: kpis.profitabilityTrend,
      subtext: 'Gross margin across all jobs',
      color: 'cyan',
    },
    {
      label: 'Cash Position',
      value: formatCurrency(kpis.cashInBank),
      subtext: `+ ${formatCurrency(kpis.pendingReceivables)} receivables`,
    },
    {
      label: 'Cash Flow Runway',
      value: `${kpis.cashFlowRunway}`,
      unit: 'days',
      subtext: 'Until cash negative',
      status: kpis.cashFlowRunway < 30 ? 'danger' : kpis.cashFlowRunway < 45 ? 'warning' : 'good',
    },
    {
      label: 'Total Budget Variance',
      value: formatCurrency(kpis.totalBudgetVariance),
      subtext: `${kpis.totalBudgetVariancePercent.toFixed(1)}% of total budget`,
      status: kpis.totalBudgetVariancePercent < -5 ? 'danger' : kpis.totalBudgetVariancePercent < 0 ? 'warning' : 'good',
    },
    {
      label: 'Avg % Over Budget',
      value: `${kpis.avgOverBudget.toFixed(1)}%`,
      subtext: 'On active jobs',
      status: kpis.avgOverBudget > 8 ? 'danger' : kpis.avgOverBudget > 3 ? 'warning' : 'good',
    },
    {
      label: 'Overdue Payables',
      value: formatCurrency(kpis.overduePayables30 + kpis.overduePayables60 + kpis.overduePayables90),
      subtext: `30d: ${formatCurrency(kpis.overduePayables30)} | 60d: ${formatCurrency(kpis.overduePayables60)} | 90d: ${formatCurrency(kpis.overduePayables90)}`,
      status:
        kpis.overduePayables90 > 0 ? 'danger' : kpis.overduePayables60 > 20000 ? 'warning' : 'good',
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6 w-full">
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          onClick={() => setSelectedKPI({ type: kpi.label, value: kpi.value })}
          className="flex-1 min-w-[180px] bg-slate-800/50 rounded-lg border border-slate-700 p-4 md:p-5 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all cursor-pointer group"
        >
          <div className="text-slate-400 text-xs sm:text-sm font-medium mb-2 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-cyan-400 transition-colors">
            {kpi.label}
            <span className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">📊 Click for details</span>
          </div>
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <div className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap">{kpi.value}</div>
            {kpi.unit && <div className="text-base md:text-lg text-slate-300 whitespace-nowrap">{kpi.unit}</div>}
            {kpi.trend && (
              <div className="ml-auto">
                {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />}
                {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 md:w-5 md:h-5 text-red-400" />}
                {kpi.trend === 'flat' && <Minus className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
              </div>
            )}
          </div>
          <div className="text-xs text-slate-400 leading-snug line-clamp-2">{kpi.subtext}</div>
        </div>
      ))}
      
      {/* Breakdown Modal */}
      <KPIBreakdownModal
        isOpen={selectedKPI !== null}
        onClose={() => setSelectedKPI(null)}
        kpiType={selectedKPI?.type || ''}
        kpiValue={selectedKPI?.value || ''}
      />
    </div>
  );
}