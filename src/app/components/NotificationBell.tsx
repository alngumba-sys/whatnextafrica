import { useState } from 'react';
import { Bell, X, AlertTriangle, TrendingDown, FileText, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationBell() {
  const [showPanel, setShowPanel] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'critical',
      title: 'Budget Overrun Alert',
      message: 'Riverside Apartments - Concrete division over budget by 12.1% (-KES 75,000)',
      time: '5 min ago',
      read: false,
    },
    {
      id: 'n2',
      type: 'warning',
      title: 'Cash Balance Warning',
      message: 'Cash balance will drop below 30 days in Week 4 (KES 312,500)',
      time: '15 min ago',
      read: false,
    },
    {
      id: 'n3',
      type: 'critical',
      title: 'Schedule Delay',
      message: 'Industrial Warehouse - 22 days behind on critical path activities',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 'n4',
      type: 'warning',
      title: 'Unsigned Change Order',
      message: 'Medical Clinic - CO-003 draft for 10+ days (KES 85,000)',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 'n5',
      type: 'info',
      title: 'Lien Waiver Needed',
      message: 'ABC Concrete Supply - Payment due 2/12, waiver not received',
      time: '3 hours ago',
      read: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <TrendingDown className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-950/30 border-red-600/50';
      case 'warning':
        return 'bg-amber-950/30 border-amber-600/50';
      default:
        return 'bg-slate-800/50 border-slate-700';
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 text-slate-300 hover:text-white transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {showPanel && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setShowPanel(false)}></div>

            {/* Notification Panel */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed top-16 right-4 w-96 max-h-[calc(100vh-5rem)] bg-slate-800 rounded-lg border-2 border-slate-700 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={() => setShowPanel(false)} className="text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`mb-2 rounded-lg border p-3 cursor-pointer transition-all ${
                      notification.read ? 'opacity-60' : ''
                    } ${getBgColor(notification.type)} hover:opacity-100`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-white font-semibold text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed mb-2">{notification.message}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-slate-700">
                <button className="w-full py-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                  View All Notifications
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}