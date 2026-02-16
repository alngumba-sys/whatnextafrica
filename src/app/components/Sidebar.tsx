import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, DollarSign, CreditCard, Calendar, FileText, Users, AlertTriangle, Settings, LogOut, Package, ClipboardList, UsersRound, FolderOpen, FileCheck, Receipt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  const menuItems = [
    // OVERVIEW & FINANCIAL
    { id: 'dashboard', label: 'Executive Portfolio', icon: LayoutDashboard, section: 'overview' },
    { id: 'cashflow', label: 'Cash Flow Forecast', icon: DollarSign, section: 'overview' },
    { id: 'payments', label: 'Payment Management', icon: CreditCard, section: 'overview' },
    { id: 'paymentcerts', label: 'Payment Certificates', icon: Receipt, section: 'overview' },
    
    // PROJECT EXECUTION
    { id: 'schedule', label: 'Gantt + Cost Schedule', icon: Calendar, section: 'execution' },
    { id: 'field', label: 'Field Daily Reports', icon: FileText, section: 'execution' },
    { id: 'changeorders', label: 'Change Orders', icon: FileText, section: 'execution' },
    { id: 'tasks', label: 'Tasks & Actions', icon: ClipboardList, section: 'execution' },
    
    // RESOURCES
    { id: 'inventory', label: 'Inventory Management', icon: Package, section: 'resources' },
    { id: 'subcontractors', label: 'Subcontractors', icon: Users, section: 'resources' },
    { id: 'team', label: 'Team Management', icon: UsersRound, section: 'resources' },
    
    // PROJECT CONTROLS
    { id: 'submittals', label: 'Submittals', icon: FileCheck, section: 'controls' },
    { id: 'documents', label: 'Documents', icon: FolderOpen, section: 'controls' },
    { id: 'risk', label: 'Risk Register', icon: AlertTriangle, section: 'controls' },
  ];

  const handleItemClick = (id: string) => {
    onViewChange(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-lg border border-slate-700 shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isLargeScreen ? 0 : (isOpen ? 0 : '-100%'),
          width: isLargeScreen ? (isExpanded ? 256 : 80) : 256
        }}
        onMouseEnter={() => isLargeScreen && setIsExpanded(true)}
        onMouseLeave={() => isLargeScreen && setIsExpanded(false)}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-700 z-40 flex flex-col overflow-hidden"
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">BC</span>
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
            transition={{ duration: 0.15 }}
            className={isLargeScreen && !isExpanded ? 'hidden' : ''}
          >
            <h1 className="text-xl font-bold text-white whitespace-nowrap">BuildControl</h1>
            <p className="text-cyan-400 text-xs font-semibold whitespace-nowrap">Pro</p>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {/* Overview & Financial Section */}
            <motion.div
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-2 text-xs font-bold text-cyan-400 uppercase tracking-wider ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Overview & Financial
            </motion.div>
            
            {menuItems.filter(item => item.section === 'overview').map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={!isExpanded && isLargeScreen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}

            {/* Project Execution Section */}
            <motion.div
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mt-4 ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Project Execution
            </motion.div>
            
            {menuItems.filter(item => item.section === 'execution').map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={!isExpanded && isLargeScreen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}

            {/* Resources Section */}
            <motion.div
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mt-4 ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Resources
            </motion.div>
            
            {menuItems.filter(item => item.section === 'resources').map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={!isExpanded && isLargeScreen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}

            {/* Project Controls Section */}
            <motion.div
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`px-3 py-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mt-4 ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Project Controls
            </motion.div>
            
            {menuItems.filter(item => item.section === 'controls').map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all relative group ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                  title={!isExpanded && isLargeScreen ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <motion.span
                    initial={false}
                    animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
                    transition={{ duration: 0.15 }}
                    className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700 space-y-1">
          <button 
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title={!isExpanded && isLargeScreen ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Settings
            </motion.span>
          </button>
          <button 
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title={!isExpanded && isLargeScreen ? 'Sign Out' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <motion.span
              initial={false}
              animate={{ opacity: isLargeScreen ? (isExpanded ? 1 : 0) : 1 }}
              transition={{ duration: 0.15 }}
              className={`text-sm font-medium whitespace-nowrap ${isLargeScreen && !isExpanded ? 'hidden' : ''}`}
            >
              Sign Out
            </motion.span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}