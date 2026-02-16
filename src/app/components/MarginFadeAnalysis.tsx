import { TrendingDown, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useWindowSize, getChartHeight } from '../hooks/useWindowSize';
import { Project } from '../data/mockData';

interface MarginFadeAnalysisProps {
  projects: Project[];
}

export function MarginFadeAnalysis({ projects }: MarginFadeAnalysisProps) {
  const { width } = useWindowSize();
  const chartHeight = getChartHeight(width) + 50; // Slightly taller for better visibility

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const marginData = projects.map((project) => ({
    name: project.name.split(' ').slice(0, 2).join(' '), // Shortened name
    fullName: project.name, // Keep full name for tooltip
    budgeted: project.budgetedMarginPercent,
    current: project.currentMarginPercent,
    fade: project.currentMarginPercent - project.budgetedMarginPercent,
    budgetedAmount: (project.contractValue * project.budgetedMarginPercent) / 100,
    currentAmount: (project.contractValue * project.currentMarginPercent) / 100,
  }));

  const totalBudgetedMargin = marginData.reduce((sum, p) => sum + p.budgetedAmount, 0);
  const totalCurrentMargin = marginData.reduce((sum, p) => sum + p.currentAmount, 0);
  const totalFade = totalCurrentMargin - totalBudgetedMargin;
  const avgFadePercent = marginData.reduce((sum, p) => sum + p.fade, 0) / marginData.length;

  // Custom label component for better spacing
  const renderCustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#94a3b8"
          fontSize="10px"
          transform="rotate(-45)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 sm:p-4 md:p-6 mt-4 md:mt-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
          Margin Fade Analysis
        </div>
        <span className="text-xs sm:text-sm text-slate-400 sm:ml-0">Budgeted vs. Current Forecast Margin</span>
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Budgeted Margin (Portfolio)</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(totalBudgetedMargin)}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Current Forecast Margin</div>
          <div className="text-2xl font-bold text-cyan-400">{formatCurrency(totalCurrentMargin)}</div>
        </div>
        <div className={`rounded-lg p-4 border ${totalFade < 0 ? 'bg-red-950/30 border-red-600/50' : 'bg-green-950/30 border-green-600/50'}`}>
          <div className={`text-sm mb-1 ${totalFade < 0 ? 'text-red-400' : 'text-green-400'}`}>Total Margin Fade</div>
          <div className={`text-2xl font-bold ${totalFade < 0 ? 'text-red-400' : 'text-green-400'} flex items-center gap-2`}>
            {formatCurrency(totalFade)}
            {totalFade < 0 ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-sm mb-1">Avg Margin Fade %</div>
          <div className={`text-2xl font-bold ${avgFadePercent < 0 ? 'text-red-400' : 'text-green-400'}`}>
            {avgFadePercent > 0 ? '+' : ''}{avgFadePercent.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6 w-full h-[420px]" style={{ minHeight: '420px' }}>
        <ResponsiveContainer width="100%" height={420} minHeight={420}>
          <BarChart data={marginData} margin={{ top: 10, right: 20, bottom: 80, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="name" 
              stroke="#94a3b8" 
              tick={renderCustomAxisTick}
              height={80}
              interval={0}
            />
            <YAxis stroke="#94a3b8" style={{ fontSize: '11px' }} label={{ value: 'Margin %', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: '11px' } }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                color: '#fff',
              }}
              formatter={(value: number, name: string) => {
                if (name === 'Budgeted Margin %') return `${value.toFixed(1)}%`;
                if (name === 'Current Margin %') return `${value.toFixed(1)}%`;
                return value;
              }}
              labelFormatter={(label: string) => {
                const project = marginData.find((p) => p.name === label);
                return project ? project.fullName : label;
              }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar dataKey="budgeted" fill="#475569" name="Budgeted Margin %" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current" name="Current Margin %" radius={[4, 4, 0, 0]}>
              {marginData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fade >= 0 ? '#10B981' : entry.fade > -3 ? '#F59E0B' : '#EF4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Project</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Contract Value</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Budgeted Margin %</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Budgeted Margin</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Current Margin %</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Current Margin</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Fade %</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Fade Amount</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => {
              const budgetedAmount = (project.contractValue * project.budgetedMarginPercent) / 100;
              const currentAmount = (project.contractValue * project.currentMarginPercent) / 100;
              const fade = project.currentMarginPercent - project.budgetedMarginPercent;
              const fadeAmount = currentAmount - budgetedAmount;

              return (
                <tr key={project.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                  <td className="py-3 px-3 text-white whitespace-nowrap">{project.name}</td>
                  <td className="text-right py-3 px-3 text-slate-300 whitespace-nowrap">{formatCurrency(project.contractValue)}</td>
                  <td className="text-right py-3 px-3 text-slate-300 whitespace-nowrap">{project.budgetedMarginPercent.toFixed(1)}%</td>
                  <td className="text-right py-3 px-3 text-slate-300 whitespace-nowrap">{formatCurrency(budgetedAmount)}</td>
                  <td className="text-right py-3 px-3 text-white font-semibold whitespace-nowrap">{project.currentMarginPercent.toFixed(1)}%</td>
                  <td className="text-right py-3 px-3 text-white font-semibold whitespace-nowrap">{formatCurrency(currentAmount)}</td>
                  <td className={`text-right py-3 px-3 font-semibold whitespace-nowrap ${fade >= 0 ? 'text-green-400' : fade > -3 ? 'text-amber-400' : 'text-red-400'}`}>
                    {fade > 0 ? '+' : ''}{fade.toFixed(1)}%
                  </td>
                  <td className={`text-right py-3 px-3 font-semibold whitespace-nowrap ${fadeAmount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(fadeAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-600 bg-slate-900/50">
              <td className="py-3 px-3 text-white font-bold whitespace-nowrap">Portfolio Total</td>
              <td className="text-right py-3 px-3 text-white font-bold whitespace-nowrap">
                {formatCurrency(projects.reduce((sum, p) => sum + p.contractValue, 0))}
              </td>
              <td className="text-right py-3 px-3"></td>
              <td className="text-right py-3 px-3 text-white font-bold whitespace-nowrap">{formatCurrency(totalBudgetedMargin)}</td>
              <td className="text-right py-3 px-3"></td>
              <td className="text-right py-3 px-3 text-white font-bold whitespace-nowrap">{formatCurrency(totalCurrentMargin)}</td>
              <td className={`text-right py-3 px-3 font-bold whitespace-nowrap ${avgFadePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {avgFadePercent > 0 ? '+' : ''}{avgFadePercent.toFixed(1)}%
              </td>
              <td className={`text-right py-3 px-3 font-bold whitespace-nowrap ${totalFade >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatCurrency(totalFade)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}