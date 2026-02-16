import { useState } from 'react';
import { X, Bell, Mail, Clock, Users, DollarSign, AlertTriangle, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({ isOpen, onClose }: NotificationSettingsModalProps) {
  const [settings, setSettings] = useState({
    // Daily Summary
    dailySummaryEnabled: true,
    dailySummaryTime: '06:00',
    dailySummaryRecipients: 'owner@buildcontrol.co.ke, pm@buildcontrol.co.ke',
    
    // Budget Alerts
    budgetAlertsEnabled: true,
    budgetThreshold: '5',
    budgetRecipients: 'owner@buildcontrol.co.ke, finance@buildcontrol.co.ke',
    
    // Cash Flow Alerts
    cashFlowAlertsEnabled: true,
    cashFlowThreshold: '7',
    cashFlowRecipients: 'owner@buildcontrol.co.ke, finance@buildcontrol.co.ke',
    
    // Change Order Alerts
    changeOrderAlertsEnabled: true,
    changeOrderAmount: '500000',
    changeOrderRecipients: 'owner@buildcontrol.co.ke, pm@buildcontrol.co.ke',
    
    // Schedule Delays
    scheduleAlertsEnabled: true,
    scheduleDelayDays: '3',
    scheduleRecipients: 'owner@buildcontrol.co.ke, pm@buildcontrol.co.ke',
    
    // Safety Incidents
    safetyAlertsEnabled: true,
    safetyRecipients: 'owner@buildcontrol.co.ke, pm@buildcontrol.co.ke, safety@buildcontrol.co.ke',
    
    // Push Notifications
    pushNotificationsEnabled: true,
    smsAlertsEnabled: false,
    smsNumber: '+254712345678',
  });

  const handleSave = () => {
    toast.success('Notification Settings Saved!', {
      description: 'Your notification preferences have been updated successfully.',
    });
    onClose();
  };

  const handleTestEmail = () => {
    toast.success('Test Email Sent!', {
      description: 'Check your inbox for a test notification email.',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notification Settings</h2>
              <p className="text-sm text-slate-400">Configure alerts and automated reports</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Daily Executive Summary */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <Mail className="w-5 h-5 text-cyan-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Daily Executive Summary</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.dailySummaryEnabled}
                        onChange={(e) => setSettings({ ...settings, dailySummaryEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Automated email with project highlights, budget status, and critical issues
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Send Time
                      </label>
                      <input
                        type="time"
                        value={settings.dailySummaryTime}
                        onChange={(e) => setSettings({ ...settings, dailySummaryTime: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        Recipients (comma-separated emails)
                      </label>
                      <input
                        type="text"
                        value={settings.dailySummaryRecipients}
                        onChange={(e) => setSettings({ ...settings, dailySummaryRecipients: e.target.value })}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Variance Alerts */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-amber-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Budget Variance Alerts</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.budgetAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, budgetAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Get notified when any project exceeds budget threshold
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Threshold (% over budget)
                      </label>
                      <input
                        type="number"
                        value={settings.budgetThreshold}
                        onChange={(e) => setSettings({ ...settings, budgetThreshold: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Recipients
                      </label>
                      <input
                        type="text"
                        value={settings.budgetRecipients}
                        onChange={(e) => setSettings({ ...settings, budgetRecipients: e.target.value })}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Flow Alerts */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-red-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Cash Flow Warnings</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.cashFlowAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, cashFlowAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Alert when projected cash balance will be negative within threshold period
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Look-ahead (days)
                      </label>
                      <input
                        type="number"
                        value={settings.cashFlowThreshold}
                        onChange={(e) => setSettings({ ...settings, cashFlowThreshold: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Recipients
                      </label>
                      <input
                        type="text"
                        value={settings.cashFlowRecipients}
                        onChange={(e) => setSettings({ ...settings, cashFlowRecipients: e.target.value })}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Change Order Alerts */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Change Order Alerts</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.changeOrderAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, changeOrderAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Notify when change orders exceed threshold amount
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Threshold Amount (KSh)
                      </label>
                      <input
                        type="number"
                        value={settings.changeOrderAmount}
                        onChange={(e) => setSettings({ ...settings, changeOrderAmount: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Recipients
                      </label>
                      <input
                        type="text"
                        value={settings.changeOrderRecipients}
                        onChange={(e) => setSettings({ ...settings, changeOrderRecipients: e.target.value })}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Delay Alerts */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="w-5 h-5 text-red-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Schedule Delay Alerts</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.scheduleAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, scheduleAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Alert when tasks are delayed beyond threshold
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Delay Threshold (days)
                      </label>
                      <input
                        type="number"
                        value={settings.scheduleDelayDays}
                        onChange={(e) => setSettings({ ...settings, scheduleDelayDays: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Recipients
                      </label>
                      <input
                        type="text"
                        value={settings.scheduleRecipients}
                        onChange={(e) => setSettings({ ...settings, scheduleRecipients: e.target.value })}
                        placeholder="email1@example.com, email2@example.com"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Incident Alerts */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Safety Incident Alerts</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.safetyAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, safetyAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Immediate notification for all safety incidents (always high priority)
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Recipients
                    </label>
                    <input
                      type="text"
                      value={settings.safetyRecipients}
                      onChange={(e) => setSettings({ ...settings, safetyRecipients: e.target.value })}
                      placeholder="email1@example.com, email2@example.com"
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notification Methods */}
            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
              <h3 className="font-semibold text-white mb-4">Additional Notification Methods</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Push Notifications</p>
                    <p className="text-sm text-slate-400">Receive browser push notifications for critical alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.pushNotificationsEnabled}
                      onChange={(e) => setSettings({ ...settings, pushNotificationsEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>

                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-white">SMS Alerts (Critical Only)</p>
                      <p className="text-sm text-slate-400">Receive SMS for critical alerts (safety, major budget overruns)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsAlertsEnabled}
                        onChange={(e) => setSettings({ ...settings, smsAlertsEnabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  
                  {settings.smsAlertsEnabled && (
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        SMS Number (Kenyan format)
                      </label>
                      <input
                        type="tel"
                        value={settings.smsNumber}
                        onChange={(e) => setSettings({ ...settings, smsNumber: e.target.value })}
                        placeholder="+254712345678"
                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex gap-3">
          <button
            onClick={handleTestEmail}
            className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            Send Test Email
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
