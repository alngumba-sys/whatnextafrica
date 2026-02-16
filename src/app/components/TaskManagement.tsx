import { useState } from 'react';
import { tasks, Task } from '../data/mockData';
import { CheckSquare, Circle, Clock, AlertCircle, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface TaskManagementProps {
  onAddTask: () => void;
}

export function TaskManagement({ onAddTask }: TaskManagementProps) {
  const [filter, setFilter] = useState<'all' | Task['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Task['priority']>('all');

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-950/30 border-red-600/50 text-red-400';
      case 'high':
        return 'bg-amber-950/30 border-amber-600/50 text-amber-400';
      case 'medium':
        return 'bg-blue-950/30 border-blue-600/50 text-blue-400';
      case 'low':
        return 'bg-slate-700/30 border-slate-600/50 text-slate-400';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckSquare className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-cyan-400" />;
      case 'blocked':
        return <Circle className="w-4 h-4 text-red-400" />;
      case 'not-started':
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-950/30 text-green-400';
      case 'in-progress':
        return 'bg-cyan-950/30 text-cyan-400';
      case 'blocked':
        return 'bg-red-950/30 text-red-400';
      case 'not-started':
        return 'bg-slate-700/30 text-slate-400';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    const colors: Record<Task['category'], string> = {
      'submittal': 'bg-purple-600',
      'procurement': 'bg-blue-600',
      'inspection': 'bg-green-600',
      'rfi': 'bg-amber-600',
      'safety': 'bg-red-600',
      'coordination': 'bg-cyan-600',
      'general': 'bg-slate-600',
    };
    return colors[category];
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date('2026-02-14');
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter !== 'all' && task.status !== filter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  const taskStats = {
    total: tasks.length,
    critical: tasks.filter((t) => t.priority === 'critical' && t.status !== 'completed').length,
    overdue: tasks.filter((t) => getDaysUntilDue(t.dueDate) < 0 && t.status !== 'completed').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Tasks</div>
          <div className="text-2xl font-bold text-white">{taskStats.total}</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">Critical</div>
          <div className="text-2xl font-bold text-red-400">{taskStats.critical}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Overdue</div>
          <div className="text-2xl font-bold text-amber-400">{taskStats.overdue}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-400">{taskStats.completed}</div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-wrap gap-2 justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const daysUntil = getDaysUntilDue(task.dueDate);
          const isOverdue = daysUntil < 0 && task.status !== 'completed';

          return (
            <div
              key={task.id}
              className={`bg-slate-800/50 rounded-lg border p-4 hover:bg-slate-800/70 transition-colors ${
                task.status === 'completed' ? 'border-slate-700 opacity-60' : 'border-slate-700'
              } ${isOverdue ? 'border-l-4 border-l-red-500' : ''}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                {/* Task Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="mt-1">
                      {getStatusIcon(task.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className={`text-base font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {task.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{task.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                        <span>📍 {task.project}</span>
                        <span>•</span>
                        <span>👤 {task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Priority, Status, Due Date */}
                <div className="flex flex-wrap lg:flex-col gap-2 lg:items-end">
                  <div className={`px-2 py-1 rounded border text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className={`text-xs ${isOverdue ? 'text-red-400 font-bold' : daysUntil <= 2 ? 'text-amber-400' : 'text-slate-400'}`}>
                    {isOverdue ? `${Math.abs(daysUntil)}d overdue` : daysUntil === 0 ? 'Due today' : daysUntil === 1 ? 'Due tomorrow' : `Due in ${daysUntil}d`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tasks found matching the selected filters</p>
        </div>
      )}
    </div>
  );
}