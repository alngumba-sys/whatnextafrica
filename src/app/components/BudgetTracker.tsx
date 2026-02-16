import { useState } from 'react';
import { Project, CostCode, csiDivisions } from '../data/mockData';
import { ChevronDown, ChevronRight, Search, Download, Filter } from 'lucide-react';
import { useWindowSize, isMobile } from '../hooks/useWindowSize';
import { toast } from 'sonner';

interface BudgetTrackerProps {
  projects: Project[];
  selectedProjectId: string | null;
}

export function BudgetTracker({ projects, selectedProjectId }: BudgetTrackerProps) {
  const { width } = useWindowSize();
  const mobile = isMobile(width);
  
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getVarianceColor = (variancePercent: number) => {
    if (variancePercent >= 5) return 'text-green-400 bg-green-950/30';
    if (variancePercent >= 0) return 'text-green-400 bg-green-950/20';
    if (variancePercent >= -10) return 'text-amber-400 bg-amber-950/30';
    return 'text-red-400 bg-red-950/30';
  };

  const getBarColor = (variancePercent: number) => {
    if (variancePercent >= 0) return 'bg-green-500';
    if (variancePercent >= -10) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const toggleDivision = (division: string) => {
    const newExpanded = new Set(expandedDivisions);
    if (newExpanded.has(division)) {
      newExpanded.delete(division);
    } else {
      newExpanded.add(division);
    }
    setExpandedDivisions(newExpanded);
  };

  // Get cost codes to display
  const getDisplayData = () => {
    if (selectedProjectId) {
      const project = projects.find((p) => p.id === selectedProjectId);
      return project?.costCodes || [];
    }

    // Portfolio view - aggregate all projects
    const allCostCodes: CostCode[] = [];
    projects.forEach((project) => {
      if (project.costCodes) {
        project.costCodes.forEach((cc) => {
          allCostCodes.push(cc);
        });
      }
    });
    return allCostCodes;
  };

  const costCodes = getDisplayData().filter((cc) =>
    searchTerm ? cc.description.toLowerCase().includes(searchTerm.toLowerCase()) || cc.code.includes(searchTerm) : true
  );

  // Group by division
  const groupedByDivision = costCodes.reduce((acc, cc) => {
    if (!acc[cc.division]) {
      acc[cc.division] = [];
    }
    acc[cc.division].push(cc);
    return acc;
  }, {} as Record<string, CostCode[]>);

  // Calculate division totals
  const getDivisionTotals = (codes: CostCode[]) => {
    return codes.reduce(
      (acc, cc) => ({
        budgeted: acc.budgeted + cc.budgeted,
        actual: acc.actual + cc.actual,
        committed: acc.committed + cc.committed,
        remaining: acc.remaining + cc.remaining,
        variance: acc.variance + cc.variance,
        forecastAtCompletion: acc.forecastAtCompletion + cc.forecastAtCompletion,
        forecastProfitLoss: acc.forecastProfitLoss + cc.forecastProfitLoss,
      }),
      {
        budgeted: 0,
        actual: 0,
        committed: 0,
        remaining: 0,
        variance: 0,
        forecastAtCompletion: 0,
        forecastProfitLoss: 0,
      }
    );
  };

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 sm:p-4 md:p-6 w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
          <span className="truncate">Budget vs. Actuals Master Tracker</span>
          {selectedProjectId && (
            <span className="text-cyan-400 ml-2 hidden lg:inline">
              — {projects.find((p) => p.id === selectedProjectId)?.name}
            </span>
          )}
        </h2>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cost codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>
          <button 
            className="px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center gap-2 text-sm"
            onClick={() => toast.info('Filter options would appear here', { description: 'Filter by division, variance threshold, or budget status' })}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button 
            className="px-3 sm:px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center gap-2 text-sm"
            onClick={() => toast.success('Budget report exported!', { description: 'Excel file downloaded successfully' })}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-slate-600">
              <th className="text-left text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Cost Code</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Description</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Budgeted</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Actual Spend</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Committed</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Remaining</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Variance KES</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Variance %</th>
              <th className="text-left text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">% Spent</th>
              <th className="text-right text-slate-300 font-semibold py-3 px-2 whitespace-nowrap">Forecast</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedByDivision)
              .sort()
              .flatMap((division) => {
                const codes = groupedByDivision[division];
                const totals = getDivisionTotals(codes);
                const isExpanded = expandedDivisions.has(division);
                const variancePercent = (totals.variance / totals.budgeted) * 100;
                const percentSpent = ((totals.actual + totals.committed) / totals.budgeted) * 100;

                const rows = [
                  // Division Header Row
                  <tr
                    key={`division-${division}`}
                    className="bg-slate-700/50 border-t border-slate-600 cursor-pointer hover:bg-slate-700"
                    onClick={() => toggleDivision(division)}
                  >
                    <td className="py-3 px-2 text-white font-bold" colSpan={2}>
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-cyan-400" />
                        )}
                        {division}
                        <span className="text-slate-400 text-xs ml-2">({codes.length} items)</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.budgeted)}
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.actual)}
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.committed)}
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.remaining)}
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.variance)}
                    </td>
                    <td className={`text-right py-3 px-2 font-semibold rounded ${getVarianceColor(variancePercent)}`}>
                      {variancePercent.toFixed(1)}%
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-900 h-4 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getBarColor(variancePercent)}`}
                            style={{ width: `${Math.min(percentSpent, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-xs">{percentSpent.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-2 text-white font-semibold">
                      {formatCurrency(totals.forecastAtCompletion)}
                    </td>
                  </tr>
                ];

                // Add individual cost code rows if expanded
                if (isExpanded) {
                  codes.forEach((cc) => {
                    const ccVariancePercent = cc.variancePercent;
                    const ccPercentSpent = ((cc.actual + cc.committed) / cc.budgeted) * 100;

                    rows.push(
                      <tr
                        key={cc.id}
                        className="border-t border-slate-700/50 hover:bg-slate-800/70 text-slate-300"
                      >
                        <td className="py-2 px-2 pl-10 text-cyan-400 font-mono text-xs">{cc.code}</td>
                        <td className="py-2 px-2 text-white">{cc.description}</td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.budgeted)}</td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.actual)}</td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.committed)}</td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.remaining)}</td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.variance)}</td>
                        <td className={`text-right py-2 px-2 rounded ${getVarianceColor(ccVariancePercent)}`}>
                          {ccVariancePercent.toFixed(1)}%
                        </td>
                        <td className="py-2 px-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-900 h-3 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getBarColor(ccVariancePercent)}`}
                                style={{ width: `${Math.min(ccPercentSpent, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs">{ccPercentSpent.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="text-right py-2 px-2">{formatCurrency(cc.forecastAtCompletion)}</td>
                      </tr>
                    );
                  });
                }

                return rows;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}