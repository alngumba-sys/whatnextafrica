import { X, Download, MapPin, Users, Clock, AlertTriangle, CheckCircle, Camera, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface ReportData {
  project: string;
  date: string;
  superintendent: string;
  status: 'submitted' | 'pending';
}

interface ViewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportData | null;
}

export function ViewReportModal({ isOpen, onClose, report }: ViewReportModalProps) {
  if (!isOpen || !report) return null;

  const handleDownloadPDF = () => {
    const filename = `${report.project.replace(/\s+/g, '_')}_Daily_Report_${report.date}.pdf`;
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating PDF report...',
        success: () => {
          return `Report downloaded: ${filename}`;
        },
        error: 'Failed to generate PDF',
      }
    );
  };

  const handleEmailReport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Sending email to stakeholders...',
        success: () => {
          return `Report emailed successfully!\n\nRecipients:\n• Project Manager: manager@buildcontrol.ke\n• Site Engineer: engineer@buildcontrol.ke\n• Safety Officer: safety@buildcontrol.ke\n• ${report.superintendent}`;
        },
        error: 'Failed to send email',
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Daily Field Report</h2>
              <p className="text-sm text-slate-400">{report.project}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Report Header */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-slate-400 text-xs mb-1">Project</div>
                <div className="text-white font-semibold">{report.project}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Report Date</div>
                <div className="text-white font-semibold">{report.date}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Superintendent</div>
                <div className="text-white font-semibold">{report.superintendent}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Status</div>
                <span
                  className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                    report.status === 'submitted'
                      ? 'bg-green-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Weather</div>
                <div className="text-white font-semibold">Partly Cloudy, 24°C</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs mb-1">Work Hours</div>
                <div className="text-white font-semibold">07:00 - 17:00</div>
              </div>
            </div>
          </div>

          {/* Crew & Equipment */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Crew & Equipment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <Users className="w-4 h-4" />
                  <div className="font-semibold">On-Site Labor</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Carpenters</span>
                    <span className="text-white font-semibold">8 workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Electricians</span>
                    <span className="text-white font-semibold">4 workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">General Labor</span>
                    <span className="text-white font-semibold">12 workers</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-700">
                    <span className="text-cyan-400 font-semibold">Total Crew</span>
                    <span className="text-cyan-400 font-semibold">24 workers</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <div className="font-semibold">Equipment On-Site</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Tower Crane</span>
                    <span className="text-white font-semibold">1 unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Concrete Mixer</span>
                    <span className="text-white font-semibold">2 units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Scaffolding</span>
                    <span className="text-white font-semibold">350 m²</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-700">
                    <span className="text-cyan-400 font-semibold">Utilization</span>
                    <span className="text-green-400 font-semibold">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Work Progress */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Work Progress
            </h3>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">Foundation Formwork - Level 3</span>
                    </div>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Completed all formwork installation for third floor foundation. Quality inspection passed.
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-white font-semibold">Rebar Installation - Grid A-D</span>
                    </div>
                    <span className="text-cyan-400 font-semibold">65%</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    In progress. Grid A and B complete, Grid C at 60%, Grid D starting tomorrow.
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div className="bg-cyan-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-semibold">MEP Rough-In - East Wing</span>
                    </div>
                    <span className="text-amber-400 font-semibold">30%</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Delayed - waiting for electrical conduit delivery. Expected tomorrow AM.
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Materials Received */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Materials Received
            </h3>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start pb-3 border-b border-slate-700">
                  <div>
                    <div className="text-white font-semibold">Concrete - Grade M30</div>
                    <div className="text-sm text-slate-400">Supplier: Bamburi Cement</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">45 m³</div>
                    <div className="text-xs text-green-400">Inspected ✓</div>
                  </div>
                </div>
                <div className="flex justify-between items-start pb-3 border-b border-slate-700">
                  <div>
                    <div className="text-white font-semibold">Reinforcement Steel - 20mm</div>
                    <div className="text-sm text-slate-400">Supplier: Steel Masters Kenya</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">8.5 tons</div>
                    <div className="text-xs text-green-400">Inspected ✓</div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white font-semibold">Electrical Conduit - PVC</div>
                    <div className="text-sm text-slate-400">Supplier: Electro Solutions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">250 meters</div>
                    <div className="text-xs text-green-400">Inspected ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safety & Issues */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-green-400 rounded"></div>
                Safety Report
              </h3>
              <div className="bg-green-950/30 rounded-lg border border-green-600/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">No Safety Incidents</span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div>✓ Morning toolbox talk completed</div>
                  <div>✓ All PPE compliance verified</div>
                  <div>✓ Fall protection inspected</div>
                  <div>✓ Fire extinguishers checked</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-amber-400 rounded"></div>
                Issues & Delays
              </h3>
              <div className="bg-amber-950/30 rounded-lg border border-amber-600/50 p-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">Material Delay</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Electrical conduit delivery postponed to tomorrow. Minor impact on MEP schedule.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-amber-700/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">Weather Watch</div>
                        <div className="text-xs text-slate-400 mt-1">
                          Rain forecast for Friday. Concrete pour may need to be rescheduled.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Site Photos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="bg-slate-800 rounded-lg border border-slate-700 aspect-square flex items-center justify-center relative group cursor-pointer hover:border-cyan-500 transition-colors">
                  <Camera className="w-8 h-8 text-slate-600" />
                  <div className="absolute inset-0 bg-cyan-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-cyan-400 text-xs font-semibold">Photo {idx}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-400 mt-2">4 photos attached</div>
          </div>

          {/* Superintendent Notes */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <div className="w-1 h-5 bg-cyan-400 rounded"></div>
              Superintendent Notes
            </h3>
            <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
              <div className="text-slate-300 leading-relaxed text-sm">
                Overall good progress today despite the minor electrical material delay. Crew morale is high and 
                productivity exceeded targets. Foundation work for Level 3 is now complete and ready for concrete 
                pour scheduled for Monday. Coordination with MEP trades is going smoothly. Weather looks favorable 
                for the next 3 days except for possible rain Friday - will monitor forecasts and adjust concrete 
                pour if needed. Safety compliance remains excellent with zero incidents this week.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download PDF
            </button>
            <button
              type="button"
              onClick={handleEmailReport}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Email Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}