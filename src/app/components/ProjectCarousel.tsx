import { Project } from '../data/mockData';
import { TrendingUp, TrendingDown, Calendar, Trash2 } from 'lucide-react';
import { useWindowSize, getProjectCardWidth } from '../hooks/useWindowSize';

interface ProjectCarouselProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onDeleteProject?: (projectId: string) => void;
}

export function ProjectCarousel({ projects, onSelectProject, onDeleteProject }: ProjectCarouselProps) {
  const { width } = useWindowSize();
  const cardWidth = getProjectCardWidth(width);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (project: Project) => {
    if (project.currentMarginPercent >= project.budgetedMarginPercent - 2) return 'bg-green-600';
    if (project.currentMarginPercent >= project.budgetedMarginPercent - 5) return 'bg-amber-600';
    return 'bg-red-600';
  };

  const getStatusBorder = (project: Project) => {
    if (project.currentMarginPercent >= project.budgetedMarginPercent - 2) return 'border-green-500';
    if (project.currentMarginPercent >= project.budgetedMarginPercent - 5) return 'border-amber-500';
    return 'border-red-500';
  };

  const handleDelete = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation(); // Prevent triggering onSelectProject
    if (onDeleteProject) {
      onDeleteProject(projectId);
    }
  };

  return (
    <div className="mb-6 md:mb-8 w-full">
      <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
        <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
        Active Projects
      </h2>
      <div className="flex flex-wrap gap-3 md:gap-4 w-full">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className={`flex-1 min-w-[280px] max-w-[400px] rounded-lg border-2 ${getStatusBorder(
              project
            )} bg-slate-800/70 p-5 cursor-pointer hover:bg-slate-800 transition-all`}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                <p className="text-sm text-slate-400">{project.location}</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Contract</div>
                  <div className="text-white font-bold">{formatCurrency(project.contractValue)}</div>
                </div>
                {onDeleteProject && (
                  <button
                    onClick={(e) => handleDelete(e, project.id)}
                    className="p-2 hover:bg-red-600/20 rounded-lg transition-colors group"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-red-400 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Progress Ring and Stats */}
            <div className="flex items-center gap-4 mb-4">
              {/* Progress Ring */}
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-slate-700"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 32}`}
                    strokeDashoffset={`${2 * Math.PI * 32 * (1 - project.percentComplete / 100)}`}
                    className="text-cyan-400"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{project.percentComplete}%</span>
                </div>
              </div>

              {/* Margin Stats */}
              <div className="flex-1">
                <div className="mb-2">
                  <div className="text-xs text-slate-400">Budgeted Margin</div>
                  <div className="text-white font-semibold">{project.budgetedMarginPercent}%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Current Margin</div>
                  <div
                    className={`text-lg font-bold ${
                      project.currentMarginPercent >= project.budgetedMarginPercent - 2
                        ? 'text-green-400'
                        : project.currentMarginPercent >= project.budgetedMarginPercent - 5
                        ? 'text-amber-400'
                        : 'text-red-400'
                    }`}
                  >
                    {project.currentMarginPercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Status */}
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400">Schedule:</span>
              <span
                className={`text-sm font-semibold ${
                  project.daysAheadBehind >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {project.daysAheadBehind >= 0 ? `${project.daysAheadBehind}d ahead` : `${Math.abs(project.daysAheadBehind)}d behind`}
              </span>
            </div>

            {/* Mini Sparkline */}
            <div className="h-12 flex items-end gap-0.5">
              {project.spendHistory.map((spend, idx) => {
                const maxSpend = Math.max(...project.spendHistory, ...project.plannedSpendHistory);
                const spendHeight = (spend / maxSpend) * 100;
                const plannedHeight = (project.plannedSpendHistory[idx] / maxSpend) * 100;
                return (
                  <div key={idx} className="flex-1 flex items-end gap-0.5">
                    <div
                      className="w-full bg-slate-600 rounded-sm opacity-30"
                      style={{ height: `${plannedHeight}%` }}
                    ></div>
                    <div
                      className={`w-full rounded-sm ${
                        spend > project.plannedSpendHistory[idx] ? 'bg-red-500' : 'bg-cyan-500'
                      }`}
                      style={{ height: `${spendHeight}%` }}
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Spend vs Plan</span>
              <span className="text-cyan-400">Last 8 weeks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}