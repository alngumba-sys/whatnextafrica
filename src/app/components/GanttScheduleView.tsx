import { useState } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { useWindowSize, getChartHeight } from '../hooks/useWindowSize';
import { projects } from '../data/mockData';
import { ChevronDown } from 'lucide-react';
import { AIInsightCard } from './AIInsightCard';

export function GanttScheduleView() {
  const { width } = useWindowSize();
  const chartHeight = getChartHeight(width);
  
  // State for selected project
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || 'proj-001');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // Generate date-based weeks from project start date
  const generateWeeksFromStartDate = (startDate: string, durationWeeks: number) => {
    const weeks = [];
    const start = new Date(startDate);
    
    for (let i = 0; i < Math.min(durationWeeks, 16); i++) {
      const weekStart = new Date(start);
      weekStart.setDate(start.getDate() + (i * 7));
      
      const month = weekStart.toLocaleDateString('en-US', { month: 'short' });
      const day = weekStart.getDate();
      
      weeks.push({
        label: `${month} ${day}`,
        weekNumber: i + 1,
        fullDate: weekStart.toISOString().split('T')[0]
      });
    }
    
    return weeks;
  };

  // Project-specific schedule data
  const getScheduleDataForProject = (projectId: string) => {
    const projectSchedules: Record<string, any[]> = {
      'proj-001': [
        { week: 'W1', planned: 850000, actual: 920000, cumPlanned: 850000, cumActual: 920000 },
        { week: 'W2', planned: 820000, actual: 850000, cumPlanned: 1670000, cumActual: 1770000 },
        { week: 'W3', planned: 780000, actual: 810000, cumPlanned: 2450000, cumActual: 2580000 },
        { week: 'W4', planned: 750000, actual: 790000, cumPlanned: 3200000, cumActual: 3370000 },
        { week: 'W5', planned: 720000, actual: 760000, cumPlanned: 3920000, cumActual: 4130000 },
        { week: 'W6', planned: 700000, actual: 0, cumPlanned: 4620000, cumActual: 4130000 },
        { week: 'W7', planned: 680000, actual: 0, cumPlanned: 5300000, cumActual: 4130000 },
        { week: 'W8', planned: 650000, actual: 0, cumPlanned: 5950000, cumActual: 4130000 },
      ],
      'proj-002': [
        { week: 'W1', planned: 650000, actual: 680000, cumPlanned: 650000, cumActual: 680000 },
        { week: 'W2', planned: 640000, actual: 720000, cumPlanned: 1290000, cumActual: 1400000 },
        { week: 'W3', planned: 620000, actual: 690000, cumPlanned: 1910000, cumActual: 2090000 },
        { week: 'W4', planned: 600000, actual: 680000, cumPlanned: 2510000, cumActual: 2770000 },
        { week: 'W5', planned: 580000, actual: 620000, cumPlanned: 3090000, cumActual: 3390000 },
        { week: 'W6', planned: 560000, actual: 0, cumPlanned: 3650000, cumActual: 3390000 },
        { week: 'W7', planned: 540000, actual: 0, cumPlanned: 4190000, cumActual: 3390000 },
        { week: 'W8', planned: 520000, actual: 0, cumPlanned: 4710000, cumActual: 3390000 },
      ],
      'proj-003': [
        { week: 'W1', planned: 420000, actual: 385000, cumPlanned: 420000, cumActual: 385000 },
        { week: 'W2', planned: 410000, actual: 390000, cumPlanned: 830000, cumActual: 775000 },
        { week: 'W3', planned: 390000, actual: 410000, cumPlanned: 1220000, cumActual: 1185000 },
        { week: 'W4', planned: 380000, actual: 400000, cumPlanned: 1600000, cumActual: 1585000 },
        { week: 'W5', planned: 370000, actual: 395000, cumPlanned: 1970000, cumActual: 1980000 },
        { week: 'W6', planned: 360000, actual: 0, cumPlanned: 2330000, cumActual: 1980000 },
        { week: 'W7', planned: 350000, actual: 0, cumPlanned: 2680000, cumActual: 1980000 },
        { week: 'W8', planned: 340000, actual: 0, cumPlanned: 3020000, cumActual: 1980000 },
      ],
      'proj-004': [
        { week: 'W1', planned: 280000, actual: 295000, cumPlanned: 280000, cumActual: 295000 },
        { week: 'W2', planned: 270000, actual: 285000, cumPlanned: 550000, cumActual: 580000 },
        { week: 'W3', planned: 260000, actual: 275000, cumPlanned: 810000, cumActual: 855000 },
        { week: 'W4', planned: 250000, actual: 265000, cumPlanned: 1060000, cumActual: 1120000 },
        { week: 'W5', planned: 240000, actual: 0, cumPlanned: 1300000, cumActual: 1120000 },
        { week: 'W6', planned: 230000, actual: 0, cumPlanned: 1530000, cumActual: 1120000 },
        { week: 'W7', planned: 220000, actual: 0, cumPlanned: 1750000, cumActual: 1120000 },
        { week: 'W8', planned: 210000, actual: 0, cumPlanned: 1960000, cumActual: 1120000 },
      ],
      'proj-005': [
        { week: 'W1', planned: 320000, actual: 315000, cumPlanned: 320000, cumActual: 315000 },
        { week: 'W2', planned: 310000, actual: 305000, cumPlanned: 630000, cumActual: 620000 },
        { week: 'W3', planned: 300000, actual: 295000, cumPlanned: 930000, cumActual: 915000 },
        { week: 'W4', planned: 290000, actual: 285000, cumPlanned: 1220000, cumActual: 1200000 },
        { week: 'W5', planned: 280000, actual: 275000, cumPlanned: 1500000, cumActual: 1475000 },
        { week: 'W6', planned: 270000, actual: 0, cumPlanned: 1770000, cumActual: 1475000 },
        { week: 'W7', planned: 260000, actual: 0, cumPlanned: 2030000, cumActual: 1475000 },
        { week: 'W8', planned: 250000, actual: 0, cumPlanned: 2280000, cumActual: 1475000 },
      ],
    };
    
    return projectSchedules[projectId] || projectSchedules['proj-001'];
  };

  // Project-specific activities
  const getActivitiesForProject = (projectId: string) => {
    const projectActivities: Record<string, any[]> = {
      'proj-001': [
        { id: 1, name: 'Foundation Work', start: 1, duration: 3, progress: 100, status: 'complete', critical: true, cost: 950000 },
        { id: 2, name: 'Steel Erection', start: 3, duration: 4, progress: 100, status: 'complete', critical: true, cost: 1200000 },
        { id: 3, name: 'Exterior Envelope', start: 5, duration: 5, progress: 60, status: 'active', critical: false, cost: 680000 },
        { id: 4, name: 'MEP Rough-In', start: 6, duration: 6, progress: 45, status: 'active', critical: true, cost: 1420000 },
        { id: 5, name: 'Interior Finishes', start: 9, duration: 4, progress: 0, status: 'upcoming', critical: false, cost: 820000 },
        { id: 6, name: 'Final Inspections', start: 13, duration: 2, progress: 0, status: 'upcoming', critical: true, cost: 120000 },
      ],
      'proj-002': [
        { id: 1, name: 'Site Preparation', start: 1, duration: 2, progress: 100, status: 'complete', critical: true, cost: 98000 },
        { id: 2, name: 'Foundations & Parking', start: 2, duration: 4, progress: 100, status: 'complete', critical: true, cost: 695000 },
        { id: 3, name: 'Wood Framing', start: 4, duration: 5, progress: 70, status: 'active', critical: true, cost: 480000 },
        { id: 4, name: 'Roofing & Waterproofing', start: 7, duration: 3, progress: 35, status: 'active', critical: false, cost: 325000 },
        { id: 5, name: 'Windows & Doors', start: 9, duration: 3, progress: 0, status: 'upcoming', critical: false, cost: 420000 },
        { id: 6, name: 'MEP Installation', start: 10, duration: 4, progress: 0, status: 'upcoming', critical: true, cost: 850000 },
        { id: 7, name: 'Interior Build-Out', start: 12, duration: 3, progress: 0, status: 'upcoming', critical: false, cost: 680000 },
      ],
      'proj-003': [
        { id: 1, name: 'Demolition', start: 1, duration: 2, progress: 100, status: 'complete', critical: true, cost: 180000 },
        { id: 2, name: 'Structural Steel', start: 2, duration: 4, progress: 100, status: 'complete', critical: true, cost: 820000 },
        { id: 3, name: 'Concrete Slab', start: 5, duration: 3, progress: 100, status: 'complete', critical: true, cost: 450000 },
        { id: 4, name: 'Metal Building Panels', start: 7, duration: 4, progress: 50, status: 'active', critical: true, cost: 620000 },
        { id: 5, name: 'Dock Equipment', start: 10, duration: 2, progress: 0, status: 'upcoming', critical: false, cost: 280000 },
        { id: 6, name: 'Site Utilities', start: 11, duration: 3, progress: 0, status: 'upcoming', critical: true, cost: 350000 },
      ],
      'proj-004': [
        { id: 1, name: 'Asbestos Abatement', start: 1, duration: 2, progress: 100, status: 'complete', critical: true, cost: 85000 },
        { id: 2, name: 'Demolition', start: 2, duration: 2, progress: 100, status: 'complete', critical: true, cost: 120000 },
        { id: 3, name: 'MEP Upgrades', start: 3, duration: 4, progress: 80, status: 'active', critical: true, cost: 380000 },
        { id: 4, name: 'Interior Framing', start: 5, duration: 3, progress: 40, status: 'active', critical: false, cost: 220000 },
        { id: 5, name: 'Finishes & Equipment', start: 7, duration: 4, progress: 0, status: 'upcoming', critical: false, cost: 420000 },
        { id: 6, name: 'Medical Equipment Install', start: 10, duration: 2, progress: 0, status: 'upcoming', critical: true, cost: 180000 },
      ],
      'proj-005': [
        { id: 1, name: 'Site Work', start: 1, duration: 3, progress: 100, status: 'complete', critical: true, cost: 195000 },
        { id: 2, name: 'Foundation & Slab', start: 3, duration: 3, progress: 100, status: 'complete', critical: true, cost: 420000 },
        { id: 3, name: 'Steel Frame', start: 5, duration: 4, progress: 75, status: 'active', critical: true, cost: 580000 },
        { id: 4, name: 'Exterior Walls', start: 8, duration: 3, progress: 25, status: 'active', critical: false, cost: 385000 },
        { id: 5, name: 'Storefront Glazing', start: 10, duration: 3, progress: 0, status: 'upcoming', critical: false, cost: 320000 },
        { id: 6, name: 'Tenant Improvements', start: 12, duration: 3, progress: 0, status: 'upcoming', critical: false, cost: 480000 },
      ],
    };
    
    return projectActivities[projectId] || projectActivities['proj-001'];
  };

  const scheduleData = getScheduleDataForProject(selectedProjectId);
  const activities = getActivitiesForProject(selectedProjectId);

  // Calculate dynamic values based on current project schedule data
  const latestActualWeek = scheduleData.findIndex(week => week.actual === 0) - 1;
  const currentWeekData = latestActualWeek >= 0 ? scheduleData[latestActualWeek] : scheduleData[scheduleData.length - 1];
  
  const plannedToDate = currentWeekData.cumPlanned;
  const actualToDate = currentWeekData.cumActual;
  const variance = actualToDate - plannedToDate;
  const percentComplete = (actualToDate / selectedProject.contractValue) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-600';
      case 'active':
        return 'bg-cyan-600';
      case 'behind':
        return 'bg-red-600';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Selector */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
            Gantt + Cost Schedule
          </h2>

          <div className="flex items-center gap-3">
            <div className="text-slate-400 text-sm">Active Project:</div>
            <div className="relative min-w-[280px]">
              <button
                className="w-full bg-slate-900 hover:bg-slate-800 rounded-lg px-4 py-2.5 border border-slate-600 hover:border-cyan-500 text-white flex items-center justify-between gap-3 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-semibold truncate">{selectedProject.name}</span>
                <ChevronDown className={`w-4 h-4 text-cyan-400 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-slate-900 rounded-lg border border-slate-600 shadow-2xl mt-1 z-10 max-h-64 overflow-y-auto">
                  {projects.map((project) => (
                    <button
                      key={project.id}
                      className={`w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-700 last:border-b-0 ${
                        project.id === selectedProjectId ? 'bg-slate-800/50 text-cyan-400' : 'text-slate-300'
                      }`}
                      onClick={() => {
                        setSelectedProjectId(project.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {project.percentComplete}% Complete • {formatCurrency(project.contractValue)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* S-Curve Chart */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-400 rounded"></div>
          Cost-Loaded Schedule S-Curve
        </h2>

        <div className="mb-6 w-full h-[400px]" style={{ minHeight: '400px' }}>
          <ResponsiveContainer width="100%" height={400} minHeight={400}>
            <ComposedChart data={scheduleData} margin={{ top: 5, right: 20, bottom: 40, left: 10 }}>
              <defs>
                <linearGradient id="cumPlanned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cumActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#94a3b8" style={{ fontSize: '11px' }} height={60} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '11px' }} tickFormatter={(value) => `KES ${(value / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Bar dataKey="planned" fill="#475569" name="Weekly Planned" />
              <Bar dataKey="actual" fill="#06B6D4" name="Weekly Actual" />
              <Line type="monotone" dataKey="cumPlanned" stroke="#06B6D4" strokeWidth={3} name="Cumulative Planned" dot={false} />
              <Line type="monotone" dataKey="cumActual" stroke="#10B981" strokeWidth={3} name="Cumulative Actual" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Planned to Date</div>
            <div className="text-lg font-bold text-white">{formatCurrency(plannedToDate)}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">Actual to Date</div>
            <div className="text-lg font-bold text-cyan-400">{formatCurrency(actualToDate)}</div>
          </div>
          <div className={`bg-${variance > 0 ? 'red-950/30' : 'green-950/30'} rounded-lg p-3 border border-${variance > 0 ? 'red-600/50' : 'green-600/50'}`}>
            <div className="text-red-400 text-xs mb-1">Variance</div>
            <div className="text-lg font-bold text-white">{formatCurrency(variance)}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
            <div className="text-slate-400 text-xs mb-1">% Complete</div>
            <div className="text-lg font-bold text-white">{percentComplete.toFixed(1)}%</div>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-cyan-400 rounded"></div>
          Schedule Activities
        </h2>

        {/* Activity Timeline */}
        <div className="bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-700 w-full overflow-hidden">
          <div className="w-full overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="flex mb-4">
                <div className="w-64 flex-shrink-0"></div>
                <div className="flex-1 grid grid-cols-15 gap-px">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div key={i} className="text-center text-xs text-slate-400 pb-2">
                      W{i + 1}
                    </div>
                  ))}
                </div>
                <div className="w-32 flex-shrink-0"></div>
              </div>

              {/* Activities */}
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center mb-3">
                  {/* Activity Name */}
                  <div className="w-64 flex-shrink-0 pr-4">
                    <div className="text-white font-medium text-sm">{activity.name}</div>
                    <div className="text-xs text-slate-400">{formatCurrency(activity.cost)}</div>
                    {activity.critical && (
                      <span className="inline-block text-xs bg-red-600 text-white px-2 py-0.5 rounded mt-1">
                        Critical
                      </span>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="flex-1 relative h-10">
                    <div className="absolute inset-0 grid grid-cols-15 gap-px">
                      {Array.from({ length: 15 }, (_, i) => (
                        <div key={i} className="bg-slate-700/20"></div>
                      ))}
                    </div>
                    <div
                      className={`absolute h-8 rounded flex items-center justify-between px-2 ${getStatusColor(
                        activity.status
                      )} ${activity.critical && activity.status === 'active' ? 'ring-2 ring-amber-500' : ''}`}
                      style={{
                        left: `${((activity.start - 1) / 15) * 100}%`,
                        width: `${(activity.duration / 15) * 100}%`,
                      }}
                    >
                      <span className="text-white text-xs font-semibold">{activity.progress}%</span>
                      {activity.progress > 0 && activity.progress < 100 && (
                        <div className="absolute inset-0 bg-slate-900/30 rounded" style={{ width: `${100 - activity.progress}%`, right: 0, left: 'auto' }}></div>
                      )}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="w-32 flex-shrink-0 pl-4">
                    <div className="text-white text-sm font-semibold">{activity.progress}%</div>
                    <div className={`text-xs ${activity.progress < 100 && activity.start + activity.duration < 6 ? 'text-red-400' : 'text-slate-400'}`}>
                      {activity.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span className="text-slate-300 text-sm">Complete</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-600 rounded"></div>
            <span className="text-slate-300 text-sm">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-600 rounded"></div>
            <span className="text-slate-300 text-sm">Upcoming</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-600 rounded ring-2 ring-amber-500"></div>
            <span className="text-slate-300 text-sm">Behind Schedule (Critical Path)</span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <AIInsightCard 
        insights={[
          {
            id: 'gantt1',
            title: 'Critical Path Delay Risk - MEP Rough-In',
            description: 'AI detected MEP Rough-In activity (critical path) is 45% complete in Week 6 but should be 58% complete per baseline. Current burn rate is KES 237K/week vs planned KES 285K/week, indicating resource shortage.',
            impact: 'high' as const,
            type: 'warning' as const,
            actionable: 'Add 2 additional electricians and 1 plumber to MEP crew immediately. Authorize Saturday overtime (time-and-half) for 3 weeks. This will cost extra KES 145K but prevent 12-day delay that would trigger KES 380K liquidated damages.',
            potentialSavings: 235000,
            timeframe: 'Action needed by Monday',
          },
          {
            id: 'gantt2',
            title: 'Fast-Track Opportunity - Parallel Activities',
            description: 'Exterior Envelope (Week 5-10) and Interior Finishes (Week 9-13) have a 4-week sequential gap. AI analysis shows you can safely overlap these by 2 weeks if you isolate zones, accelerating project completion.',
            impact: 'high' as const,
            type: 'opportunity' as const,
            actionable: 'Start Interior Finishes in completed building zones during Week 7 instead of Week 9. This will compress schedule by 14 days, allowing early handover and unlocking KES 420K retention payment 2 weeks early (KES 14K time-value benefit).',
            potentialSavings: 0,
            timeframe: 'Plan for Week 7 start',
          },
          {
            id: 'gantt3',
            title: 'Resource Leveling - Steel Crew Idle Time',
            description: 'Your steel erection crew finished Week 7 (100% complete) but next steel activity is Week 12 on another project. AI identified KES 85K/week in idle crew costs (5 weeks × KES 17K/person × 1 person).',
            impact: 'medium' as const,
            type: 'optimization' as const,
            actionable: 'Mobilize steel crew to Karen Residential for Weeks 8-10 to erect steel staircase (currently scheduled for subcontractor). This will save KES 68K in sub markup and keep crew productive. Remobilization cost: KES 12K.',
            potentialSavings: 56000,
            timeframe: 'Schedule for Week 8',
          },
        ]} 
        moduleTitle="Gantt + Cost Schedule" 
      />
    </div>
  );
}