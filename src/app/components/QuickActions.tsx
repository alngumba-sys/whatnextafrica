import { Building2, FileText, ShoppingCart, FileEdit, ClipboardList, Plus, BookOpen } from 'lucide-react';
import { useWindowSize, getQuickActionColumns } from '../hooks/useWindowSize';

interface QuickActionsProps {
  onAddProject: () => void;
  onAddInvoice: () => void;
  onAddPurchaseOrder: () => void;
  onAddChangeOrder: () => void;
  onAddDailyReport: () => void;
  onStartWalkthrough?: () => void;
}

export function QuickActions({
  onAddProject,
  onAddInvoice,
  onAddPurchaseOrder,
  onAddChangeOrder,
  onAddDailyReport,
  onStartWalkthrough,
}: QuickActionsProps) {
  const { width } = useWindowSize();
  const columns = getQuickActionColumns(width);

  const actions = [
    {
      icon: Building2,
      label: 'New Project',
      description: 'Start a new construction project',
      color: 'cyan',
      onClick: onAddProject,
    },
    {
      icon: FileText,
      label: 'Add Invoice',
      description: 'Record vendor invoice',
      color: 'green',
      onClick: onAddInvoice,
    },
    {
      icon: ShoppingCart,
      label: 'Create PO',
      description: 'Issue purchase order',
      color: 'blue',
      onClick: onAddPurchaseOrder,
    },
    {
      icon: FileEdit,
      label: 'Change Order',
      description: 'Submit change request',
      color: 'amber',
      onClick: onAddChangeOrder,
    },
    {
      icon: ClipboardList,
      label: 'Daily Report',
      description: 'Log field activities',
      color: 'purple',
      onClick: onAddDailyReport,
    },
    {
      icon: BookOpen,
      label: 'Walkthrough',
      description: 'Learn project lifecycle',
      color: 'indigo',
      onClick: onStartWalkthrough || (() => {}),
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'bg-cyan-500/20 border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-400',
      green: 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-400',
      blue: 'bg-blue-500/20 border-blue-500/50 hover:bg-blue-500/30 text-blue-400',
      amber: 'bg-amber-500/20 border-amber-500/50 hover:bg-amber-500/30 text-amber-400',
      purple: 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30 text-purple-400',
      indigo: 'bg-indigo-500/20 border-indigo-500/50 hover:bg-indigo-500/30 text-indigo-400',
    };
    return colors[color as keyof typeof colors] || colors.cyan;
  };

  return (
    <div className="mb-4 md:mb-6 w-full">
      <div className="flex flex-wrap gap-3 w-full">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex-1 min-w-[160px] bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-lg p-5 flex flex-col items-center justify-center gap-1 transition-all group"
            >
              <IconComponent className="w-8 h-8 text-white mb-1" />
              <div className="text-sm font-semibold text-white">{action.label}</div>
              <div className="text-xs text-slate-400">{action.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}