import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Play } from 'lucide-react';
import { toast } from 'sonner';

interface WalkthroughStep {
  id: number;
  title: string;
  description: string;
  action: string;
  location: string;
  icon: string;
  tip?: string;
}

const walkthroughSteps: WalkthroughStep[] = [
  {
    id: 1,
    title: 'Create New Project',
    description: 'Start by creating a new project in your portfolio. Define the project name, client, contract value, and start date.',
    action: 'Open Quick Actions → Add Project',
    location: 'Dashboard → Quick Actions',
    icon: '📋',
    tip: 'Make sure to set a realistic contract value and margin target - this forms the baseline for all cost tracking.',
  },
  {
    id: 2,
    title: 'Set Up Project Budget',
    description: 'Break down your project budget by CSI divisions (Sitework, Concrete, Steel, etc.). This creates your cost control framework.',
    action: 'Navigate to Budget Tracker and add cost codes',
    location: 'Dashboard → Budget vs. Actuals Tracker',
    icon: '💰',
    tip: 'Use standard CSI MasterFormat codes. Typical divisions: 01-General, 03-Concrete, 05-Metals, 09-Finishes.',
  },
  {
    id: 3,
    title: 'Create Purchase Orders',
    description: 'Issue POs for major materials and subcontractor work. This commits funds and helps track future cash flow.',
    action: 'Click "Add Purchase Order" in Quick Actions',
    location: 'Cash Flow → Procurement Center',
    icon: '🛒',
    tip: 'Always get 3 bids for items over KES 100,000. Lock in critical material pricing early.',
  },
  {
    id: 4,
    title: 'Mobilize & Start Work',
    description: 'Project kicks off! Track daily activities, labor hours, equipment usage, and progress.',
    action: 'Submit Daily Field Report',
    location: 'Field Daily Reports',
    icon: '🚧',
    tip: 'Daily reports are your project diary - document everything including weather, delays, and safety incidents.',
  },
  {
    id: 5,
    title: 'Capture Job Costs',
    description: 'Use AI Expense Capture to scan receipts and invoices. Costs are automatically posted to the correct cost codes.',
    action: 'Use camera button to scan expense',
    location: 'Floating Camera Button (bottom-right)',
    icon: '📸',
    tip: 'Capture expenses in real-time on site. The AI reads vendor, amount, and suggests the right cost code.',
  },
  {
    id: 6,
    title: 'Process Vendor Invoices',
    description: 'Review and approve vendor invoices against your POs. Match quantities and pricing.',
    action: 'Navigate to Payment Management',
    location: 'Payment & Cost Management',
    icon: '📄',
    tip: 'Always verify invoice quantities against delivery tickets. Watch for pricing discrepancies.',
  },
  {
    id: 7,
    title: 'Pay Workers & Suppliers',
    description: 'Process weekly payroll and vendor payments. Track who gets paid when.',
    action: 'Record payments in Payment Management',
    location: 'Payment & Cost Management → New Payment',
    icon: '💳',
    tip: 'Maintain consistent payment schedules - builds trust with subs and prevents lien issues.',
  },
  {
    id: 8,
    title: 'Monitor Budget Variances',
    description: 'Check your Budget vs. Actuals regularly. The system alerts you when costs exceed budget by 5%.',
    action: 'Review variance alerts',
    location: 'Dashboard → Budget Tracker',
    icon: '⚠️',
    tip: 'Red flags mean immediate action needed. Investigate overruns before they get worse.',
  },
  {
    id: 9,
    title: 'Handle Change Orders',
    description: 'Client requests changes? Create a change order to track scope changes and get approval for extra costs.',
    action: 'Click "Add Change Order"',
    location: 'Change Orders',
    icon: '📝',
    tip: 'NEVER do extra work without an approved change order. Document everything with photos.',
  },
  {
    id: 10,
    title: 'Update Project Schedule',
    description: 'Track activities on the Gantt chart. Update % complete for each phase.',
    action: 'View Gantt + Cost Schedule',
    location: 'Gantt + Cost Schedule',
    icon: '📊',
    tip: 'Watch the critical path - delays here delay the entire project. Focus resources accordingly.',
  },
  {
    id: 11,
    title: 'Review Cash Flow Forecast',
    description: 'Check upcoming payments and receivables. Make sure you have cash to cover next week\'s payroll.',
    action: 'Open Cash Flow Forecast',
    location: 'Cash Flow',
    icon: '💸',
    tip: 'Cash is king! A profitable project can still fail if you run out of cash.',
  },
  {
    id: 12,
    title: 'Submit Progress Billing',
    description: 'Bill the client monthly based on % complete. This is how money flows back to you.',
    action: 'Calculate billing from % complete',
    location: 'Project Carousel → Click Project',
    icon: '📬',
    tip: 'Bill promptly on the schedule date. Include backup documentation for all change orders.',
  },
  {
    id: 13,
    title: 'Track Margin Fade',
    description: 'Monitor your margin throughout the project. The Margin Fade Analysis shows where margin is being lost.',
    action: 'Review Margin Fade Analysis',
    location: 'Dashboard → Margin Fade Analysis',
    icon: '📉',
    tip: 'Margin fade is the silent killer. Small overruns across multiple cost codes add up fast.',
  },
  {
    id: 14,
    title: 'Final Inspections',
    description: 'Complete punch list items. Schedule final inspections. Get sign-offs.',
    action: 'Update activities to 100% complete',
    location: 'Gantt + Cost Schedule',
    icon: '✅',
    tip: 'Start the punch list early. Don\'t let small items delay final payment.',
  },
  {
    id: 15,
    title: 'Project Closeout',
    description: 'Final payment received! Collect lien waivers, as-builts, warranties. Calculate final profit.',
    action: 'Review final project metrics',
    location: 'Dashboard → KPI Cards',
    icon: '🎉',
    tip: 'Document lessons learned. What went well? What would you do differently? Use this intel on the next project.',
  },
];

interface ProjectLifecycleWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectLifecycleWalkthrough({ isOpen, onClose }: ProjectLifecycleWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!isOpen) return null;

  const step = walkthroughSteps[currentStep];
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCompletedSteps([...completedSteps, step.id]);
      setCurrentStep(currentStep + 1);
      toast.success(`Step ${currentStep + 1} completed!`, {
        description: 'Moving to next step...',
      });
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    toast.success('🎉 Walkthrough completed!', {
      description: 'You now understand the complete project lifecycle in BuildControl Pro.',
      duration: 5000,
    });
    onClose();
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-slate-900 rounded-2xl border-2 border-cyan-500/50 shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 rounded-t-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Project Lifecycle Walkthrough
              </h2>
              <p className="text-cyan-100 text-sm">
                Master the complete journey from project creation to closeout
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-cyan-800/50 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-white text-sm mt-2 font-semibold">
            Step {currentStep + 1} of {walkthroughSteps.length}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl flex-shrink-0">{step.icon}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                {step.description}
              </p>
              
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Play className="w-5 h-5 text-cyan-400" />
                  <div className="text-cyan-400 font-semibold">Action Required:</div>
                </div>
                <div className="text-white font-medium text-lg">{step.action}</div>
                <div className="text-slate-400 text-sm mt-2">
                  📍 Location: <span className="text-cyan-400">{step.location}</span>
                </div>
              </div>

              {step.tip && (
                <div className="bg-amber-950/30 border border-amber-600/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <div className="text-amber-400 font-semibold mb-1">Pro Tip:</div>
                      <div className="text-amber-100 text-sm leading-relaxed">{step.tip}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-700">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="text-slate-400 text-sm">
              {completedSteps.length} of {walkthroughSteps.length} steps completed
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
            >
              {currentStep === walkthroughSteps.length - 1 ? (
                <>
                  Complete
                  <CheckCircle2 className="w-5 h-5" />
                </>
              ) : (
                <>
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Navigator */}
        <div className="bg-slate-800/50 p-4 md:p-6 rounded-b-2xl border-t border-slate-700">
          <div className="text-slate-400 text-sm font-semibold mb-3">Quick Jump:</div>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-15 gap-2">
            {walkthroughSteps.map((s, index) => (
              <button
                key={s.id}
                onClick={() => goToStep(index)}
                className={`w-full aspect-square rounded-lg font-bold text-xs transition-all ${
                  index === currentStep
                    ? 'bg-cyan-600 text-white ring-2 ring-cyan-400 scale-110'
                    : completedSteps.includes(s.id)
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
                title={s.title}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}