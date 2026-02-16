import { FileText, Users, Wrench, AlertTriangle, Upload, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { ViewReportModal } from './ViewReportModal';
import { SubmitDailyReportForm } from './SubmitDailyReportForm';
import { NotificationSettingsModal } from './NotificationSettingsModal';

export function FieldReportingView() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [selectedReport, setSelectedReport] = useState<{
    project: string;
    date: string;
    superintendent: string;
    status: 'submitted' | 'pending';
  } | null>(null);

  const handleViewReport = (report: { project: string; date: string; superintendent: string; status: 'submitted' | 'pending' }) => {
    setSelectedReport(report);
    setShowReportModal(true);
  };
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-cyan-400 rounded"></div>
        Field Daily Reporting Hub
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Report Form */}
        <SubmitDailyReportForm />

        {/* Recent Reports */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Recent Reports</h3>
          
          <div className="space-y-3">
            {[
              { project: 'Downtown Office Tower', date: '2026-02-06', superintendent: 'Mike Johnson', status: 'submitted' },
              { project: 'Riverside Luxury Apartments', date: '2026-02-06', superintendent: 'Sarah Chen', status: 'submitted' },
              { project: 'Industrial Warehouse', date: '2026-02-06', superintendent: 'Tom Rivera', status: 'pending' },
              { project: 'Medical Clinic Renovation', date: '2026-02-05', superintendent: 'Lisa Martinez', status: 'submitted' },
            ].map((report, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-white font-semibold">{report.project}</h4>
                    <p className="text-sm text-slate-400">by {report.superintendent}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      report.status === 'submitted'
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">{report.date}</div>
                  <button 
                    className="text-cyan-400 text-sm hover:text-cyan-300"
                    onClick={() => handleViewReport(report)}
                  >
                    View Report →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Executive Summary */}
          <div className="mt-6 bg-cyan-950/30 border border-cyan-600/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Daily Executive Summary
            </h4>
            <p className="text-sm text-slate-300 mb-2">
              Automated email sent every morning at 6:00 AM with yesterday's highlights and red flags.
            </p>
            <button className="text-cyan-400 text-sm hover:text-cyan-300" onClick={() => setShowNotificationSettings(true)}>Configure Notifications →</button>
          </div>
        </div>
      </div>

      {/* View Report Modal */}
      <ViewReportModal 
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        report={selectedReport}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
    </div>
  );
}