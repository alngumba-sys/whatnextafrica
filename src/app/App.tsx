import { ProjectLifecycleWalkthrough } from './components/ProjectLifecycleWalkthrough';
import { DeleteProjectModal } from './components/DeleteProjectModal';
import { Login } from './components/Login';
import { AddProjectForm } from './components/AddProjectForm';
import { AddInvoiceForm } from './components/AddInvoiceForm';
import { AddPurchaseOrderForm } from './components/AddPurchaseOrderForm';
import { AddChangeOrderForm } from './components/AddChangeOrderForm';
import { AddDailyReportForm } from './components/AddDailyReportForm';
import { AddTeamMemberForm } from './components/AddTeamMemberForm';
import { AddSubmittalForm } from './components/AddSubmittalForm';
import { AddSubcontractorForm } from './components/AddSubcontractorForm';
import { AddRiskForm } from './components/AddRiskForm';
import { AddTaskForm } from './components/AddTaskForm';
import { AddDocumentForm } from './components/AddDocumentForm';
import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { NotificationBell } from './components/NotificationBell';
import { KPICards } from './components/KPICards';
import { ProjectCarousel } from './components/ProjectCarousel';
import { BudgetTracker } from './components/BudgetTracker';
import { ExpenseCaptureButton } from './components/ExpenseCaptureButton';
import { CashFlowDashboard } from './components/CashFlowDashboard';
import { ProcurementCenter } from './components/ProcurementCenter';
import { GanttScheduleView } from './components/GanttScheduleView';
import { FieldReportingView } from './components/FieldReportingView';
import { ChangeOrdersView } from './components/ChangeOrdersView';
import { MarginFadeAnalysis } from './components/MarginFadeAnalysis';
import { PaymentManagement } from './components/PaymentManagement';
import { PaymentCertificateView } from './components/PaymentCertificateView';
import { InventoryManagement } from './components/InventoryManagement';
import { TaskManagement } from './components/TaskManagement';
import { TeamManagementView } from './components/TeamManagementView';
import { DocumentManagement } from './components/DocumentManagement';
import { SubmittalsTracking } from './components/SubmittalsTracking';
import { SubcontractorManagement } from './components/SubcontractorManagement';
import { RiskRegister } from './components/RiskRegister';
import { QuickActions } from './components/QuickActions';
import { useWindowSize, getResponsiveColumns } from './hooks/useWindowSize';
import {
  portfolioKPIs,
  projects,
  purchaseOrders,
  vendorInvoices,
  upcomingPayments,
  cashFlowForecast,
  changeOrders,
  teamMembers,
} from './data/mockData';
import { toast, Toaster } from 'sonner';

export default function App() {
  const { width } = useWindowSize();
  const columns = getResponsiveColumns(width);
  
  // Authentication state - starts as false to show login page
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showAddPO, setShowAddPO] = useState(false);
  const [showAddChangeOrder, setShowAddChangeOrder] = useState(false);
  const [showAddDailyReport, setShowAddDailyReport] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [showAddSubmittal, setShowAddSubmittal] = useState(false);
  const [showAddSubcontractor, setShowAddSubcontractor] = useState(false);
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<typeof dynamicProjects[0] | null>(null);
  
  // Dynamic projects state - initialize with mock data and remove duplicates
  const [dynamicProjects, setDynamicProjects] = useState(() => {
    // Deduplicate projects by ID
    const uniqueProjects = projects.reduce((acc, project) => {
      if (!acc.find(p => p.id === project.id)) {
        acc.push(project);
      }
      return acc;
    }, [] as typeof projects);
    
    return uniqueProjects;
  });

  // Track all project-related data
  const [projectInvoices, setProjectInvoices] = useState<Record<string, any[]>>({});
  const [projectPurchaseOrders, setProjectPurchaseOrders] = useState<Record<string, any[]>>({});
  const [projectChangeOrders, setProjectChangeOrders] = useState<Record<string, any[]>>({});
  const [projectDailyReports, setProjectDailyReports] = useState<Record<string, any[]>>({});
  const [projectDocuments, setProjectDocuments] = useState<Record<string, any[]>>({});
  const [projectSubmittals, setProjectSubmittals] = useState<Record<string, any[]>>({});
  const [projectTasks, setProjectTasks] = useState<Record<string, any[]>>({});
  const [projectTeamMembers, setProjectTeamMembers] = useState<Record<string, any[]>>({});
  const [projectSubcontractors, setProjectSubcontractors] = useState<Record<string, any[]>>({});
  const [projectRisks, setProjectRisks] = useState<Record<string, any[]>>({});
  const [projectPaymentCertificates, setProjectPaymentCertificates] = useState<Record<string, any[]>>({});
  const [projectScheduleData, setProjectScheduleData] = useState<Record<string, any[]>>({});
  const [projectInventory, setProjectInventory] = useState<Record<string, any[]>>({});
  const [projectBudgetData, setProjectBudgetData] = useState<Record<string, any[]>>({});
  const [projectExpenses, setProjectExpenses] = useState<Record<string, any[]>>({});
  
  // Global team members state - initialized from mockData
  const [allTeamMembers, setAllTeamMembers] = useState(() => teamMembers);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    // Scroll to budget tracker
    setTimeout(() => {
      const element = document.getElementById('budget-tracker');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleExpenseCapture = (expense: any) => {
    toast.success('Expense captured successfully!', {
      description: `${expense.vendor} - KES ${expense.amount.toLocaleString()} posted to ${expense.costCode}`,
    });
  };

  const handleAddProject = (project: any) => {
    // Generate a unique ID by finding the highest existing project number
    const existingIds = dynamicProjects.map(p => {
      const match = p.id.match(/proj-(\d+)/);
      return match ? parseInt(match[1]) : 0;
    });
    const maxId = Math.max(...existingIds, 0);
    const newProjectId = `proj-${String(maxId + 1).padStart(3, '0')}`;
    
    // Create the complete project object with all required fields
    const newProject = {
      id: newProjectId,
      name: project.name,
      location: project.location || 'TBD',
      type: project.type || 'commercial',
      contractValue: parseFloat(project.contractValue) || 0,
      percentComplete: 0,
      budgetedMarginPercent: parseFloat(project.marginPercent) || 15,
      currentMarginPercent: parseFloat(project.marginPercent) || 15,
      daysAheadBehind: 0,
      status: 'new' as const,
      spendHistory: [0],
      plannedSpendHistory: [0],
      actualSpend: 0,
      budgetedSpend: parseFloat(project.contractValue) || 0,
      startDate: project.startDate,
      endDate: project.endDate,
      durationWeeks: project.durationWeeks ? parseInt(project.durationWeeks) : undefined,
      costCodes: [],
    };
    
    // Add to projects array
    setDynamicProjects([...dynamicProjects, newProject]);
    
    toast.success('Project created successfully!', {
      description: `${project.name} has been added to your portfolio`,
    });
    
    setShowAddProject(false);
  };

  const handleAddInvoice = (invoice: any) => {
    toast.success('Invoice recorded successfully!', {
      description: `${invoice.vendor} - KES ${invoice.amount.toLocaleString()}`,
    });
  };

  const handleAddPO = (po: any) => {
    toast.success('Purchase Order submitted!', {
      description: `${po.poNumber} - KES ${po.amount.toLocaleString()} pending approval`,
    });
  };

  const handleAddChangeOrder = (changeOrder: any) => {
    toast.success('Change Order submitted!', {
      description: `${changeOrder.title} - KES ${changeOrder.amount.toLocaleString()}`,
    });
  };

  const handleAddDailyReport = (report: any) => {
    toast.success('Daily Report submitted!', {
      description: `${report.projectName} - ${report.date}`,
    });
  };

  const handleAddTeamMember = (teamMember: any) => {
    // Add team member to state
    setAllTeamMembers([...allTeamMembers, teamMember]);
    
    toast.success('Team Member added successfully!', {
      description: `${teamMember.name} - ${teamMember.role}`,
    });
    
    setShowAddTeamMember(false);
  };

  const handleAddSubmittal = (submittal: any) => {
    toast.success('Submittal created successfully!', {
      description: `${submittal.number} - ${submittal.title}`,
    });
  };

  const handleAddSubcontractor = (subcontractor: any) => {
    toast.success('Subcontractor added successfully!', {
      description: `${subcontractor.companyName} - ${subcontractor.trade}`,
    });
  };

  const handleAddRisk = (risk: any) => {
    toast.success('Risk logged successfully!', {
      description: `${risk.title} - ${risk.riskLevel} risk`,
    });
  };

  const handleDeleteProject = (projectId: string) => {
    const project = dynamicProjects.find(p => p.id === projectId);
    if (!project) return;
    
    // Open the delete modal
    setProjectToDelete(project);
  };

  const confirmDeleteProject = () => {
    if (!projectToDelete) return;
    
    const projectId = projectToDelete.id;
    const projectName = projectToDelete.name;
    
    // Count items being deleted
    let deletedCount = 0;
    
    // Delete all project-related data
    if (projectInvoices[projectId]) {
      deletedCount += projectInvoices[projectId].length;
      const { [projectId]: removed, ...rest } = projectInvoices;
      setProjectInvoices(rest);
    }
    
    if (projectPurchaseOrders[projectId]) {
      deletedCount += projectPurchaseOrders[projectId].length;
      const { [projectId]: removed, ...rest } = projectPurchaseOrders;
      setProjectPurchaseOrders(rest);
    }
    
    if (projectChangeOrders[projectId]) {
      deletedCount += projectChangeOrders[projectId].length;
      const { [projectId]: removed, ...rest } = projectChangeOrders;
      setProjectChangeOrders(rest);
    }
    
    if (projectDailyReports[projectId]) {
      deletedCount += projectDailyReports[projectId].length;
      const { [projectId]: removed, ...rest } = projectDailyReports;
      setProjectDailyReports(rest);
    }
    
    if (projectDocuments[projectId]) {
      deletedCount += projectDocuments[projectId].length;
      const { [projectId]: removed, ...rest } = projectDocuments;
      setProjectDocuments(rest);
    }
    
    if (projectSubmittals[projectId]) {
      deletedCount += projectSubmittals[projectId].length;
      const { [projectId]: removed, ...rest } = projectSubmittals;
      setProjectSubmittals(rest);
    }
    
    if (projectTasks[projectId]) {
      deletedCount += projectTasks[projectId].length;
      const { [projectId]: removed, ...rest } = projectTasks;
      setProjectTasks(rest);
    }
    
    if (projectTeamMembers[projectId]) {
      deletedCount += projectTeamMembers[projectId].length;
      const { [projectId]: removed, ...rest } = projectTeamMembers;
      setProjectTeamMembers(rest);
    }
    
    if (projectSubcontractors[projectId]) {
      deletedCount += projectSubcontractors[projectId].length;
      const { [projectId]: removed, ...rest } = projectSubcontractors;
      setProjectSubcontractors(rest);
    }
    
    if (projectRisks[projectId]) {
      deletedCount += projectRisks[projectId].length;
      const { [projectId]: removed, ...rest } = projectRisks;
      setProjectRisks(rest);
    }
    
    if (projectPaymentCertificates[projectId]) {
      deletedCount += projectPaymentCertificates[projectId].length;
      const { [projectId]: removed, ...rest } = projectPaymentCertificates;
      setProjectPaymentCertificates(rest);
    }
    
    if (projectScheduleData[projectId]) {
      deletedCount += projectScheduleData[projectId].length;
      const { [projectId]: removed, ...rest } = projectScheduleData;
      setProjectScheduleData(rest);
    }
    
    if (projectInventory[projectId]) {
      deletedCount += projectInventory[projectId].length;
      const { [projectId]: removed, ...rest } = projectInventory;
      setProjectInventory(rest);
    }
    
    if (projectBudgetData[projectId]) {
      deletedCount += projectBudgetData[projectId].length;
      const { [projectId]: removed, ...rest } = projectBudgetData;
      setProjectBudgetData(rest);
    }
    
    if (projectExpenses[projectId]) {
      deletedCount += projectExpenses[projectId].length;
      const { [projectId]: removed, ...rest } = projectExpenses;
      setProjectExpenses(rest);
    }
    
    // Remove project from state
    setDynamicProjects(dynamicProjects.filter(p => p.id !== projectId));
    
    // Clear selection if this project was selected
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
    
    // Reset modal state
    setProjectToDelete(null);
    
    toast.success('Project deleted successfully!', {
      description: `${projectName} and ${deletedCount} associated records have been permanently removed`,
      duration: 5000,
    });
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Toaster theme="dark" position="top-right" />
        <Login onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  // Main dashboard view
  return (
    <div className="min-h-screen bg-slate-950 text-white w-full flex">
      <Toaster theme="dark" position="top-right" />
      
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col min-h-screen w-full lg:ml-20">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 p-4 sm:p-5 md:p-6 lg:pr-8 flex items-center justify-between sticky top-0 z-20 w-full">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <div className="lg:hidden w-12"></div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                {currentView === 'dashboard' && 'Executive Portfolio Overview'}
                {currentView === 'cashflow' && 'Cash Flow Forecast'}
                {currentView === 'payments' && 'Payment & Cost Management'}
                {currentView === 'paymentcerts' && 'Payment Certificates - JBC Standard Forms'}
                {currentView === 'inventory' && 'Inventory Management'}
                {currentView === 'schedule' && 'Gantt + Cost Schedule'}
                {currentView === 'field' && 'Field Daily Reports'}
                {currentView === 'changeorders' && 'Change Orders'}
                {currentView === 'tasks' && 'Tasks & Action Items'}
                {currentView === 'team' && 'Team Management'}
                {currentView === 'documents' && 'Document Control'}
                {currentView === 'submittals' && 'Submittals Tracking'}
                {currentView === 'subcontractors' && 'Subcontractor Management'}
                {currentView === 'risk' && 'Risk Register'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 hidden sm:block">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 mr-2 md:mr-0">
            <NotificationBell />
            <div className="hidden md:flex items-center gap-3 bg-slate-800 rounded-lg px-3 lg:px-4 py-2 border border-slate-700">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                JD
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-white">John Doe</div>
                <div className="text-xs text-slate-400">Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 w-full max-w-full overflow-x-hidden">
          {currentView === 'dashboard' && (
            <>
              {/* Welcome Banner */}
              <div className="mb-6 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-600/50 rounded-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Welcome to BuildControl Pro 🏗️</h2>
                    <p className="text-slate-300 text-sm">
                      Managing <span className="font-bold text-cyan-400">{dynamicProjects.length} active projects</span> worth <span className="font-bold text-green-400">KES {(dynamicProjects.reduce((sum, p) => sum + p.contractValue, 0) / 1000000).toFixed(1)}M</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      System Online
                    </div>
                    <div className="text-slate-400">
                      Last updated: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>

              <QuickActions
                onAddProject={() => setShowAddProject(true)}
                onAddInvoice={() => setShowAddInvoice(true)}
                onAddPurchaseOrder={() => setShowAddPO(true)}
                onAddChangeOrder={() => setShowAddChangeOrder(true)}
                onAddDailyReport={() => setShowAddDailyReport(true)}
                onStartWalkthrough={() => setShowWalkthrough(true)}
              />
              <KPICards kpis={portfolioKPIs} columns={columns} />
              <ProjectCarousel 
                projects={dynamicProjects} 
                onSelectProject={handleProjectSelect}
                onDeleteProject={handleDeleteProject}
              />
              <div id="budget-tracker">
                <BudgetTracker projects={dynamicProjects} selectedProjectId={selectedProjectId} />
              </div>
              <MarginFadeAnalysis projects={dynamicProjects} />
            </>
          )}

          {currentView === 'cashflow' && (
            <>
              <CashFlowDashboard cashFlowData={cashFlowForecast} />
              <ProcurementCenter
                purchaseOrders={purchaseOrders}
                vendorInvoices={vendorInvoices}
                upcomingPayments={upcomingPayments}
              />
            </>
          )}

          {currentView === 'payments' && <PaymentManagement />}

          {currentView === 'paymentcerts' && <PaymentCertificateView />}

          {currentView === 'inventory' && <InventoryManagement />}

          {currentView === 'schedule' && <GanttScheduleView />}

          {currentView === 'field' && <FieldReportingView />}

          {currentView === 'changeorders' && <ChangeOrdersView changeOrders={changeOrders} />}

          {currentView === 'tasks' && <TaskManagement onAddTask={() => setShowAddTask(true)} />}

          {currentView === 'team' && <TeamManagementView onAddTeamMember={() => setShowAddTeamMember(true)} teamMembers={allTeamMembers} />}

          {currentView === 'documents' && <DocumentManagement onAddDocument={() => setShowAddDocument(true)} />}

          {currentView === 'submittals' && <SubmittalsTracking onAddSubmittal={() => setShowAddSubmittal(true)} />}

          {currentView === 'subcontractors' && <SubcontractorManagement onAddSubcontractor={() => setShowAddSubcontractor(true)} />}

          {currentView === 'risk' && <RiskRegister onAddRisk={() => setShowAddRisk(true)} />}
        </main>
      </div>

      {/* Floating Expense Capture Button */}
      <ExpenseCaptureButton onExpenseCapture={handleExpenseCapture} />

      {/* Add Project Form */}
      <AddProjectForm
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
        onSubmit={handleAddProject}
      />

      {/* Add Invoice Form */}
      <AddInvoiceForm
        isOpen={showAddInvoice}
        onClose={() => setShowAddInvoice(false)}
        onSubmit={handleAddInvoice}
        projects={dynamicProjects}
      />

      {/* Add Purchase Order Form */}
      <AddPurchaseOrderForm
        isOpen={showAddPO}
        onClose={() => setShowAddPO(false)}
        onSubmit={handleAddPO}
        projects={dynamicProjects}
      />

      {/* Add Change Order Form */}
      <AddChangeOrderForm
        isOpen={showAddChangeOrder}
        onClose={() => setShowAddChangeOrder(false)}
        onSubmit={handleAddChangeOrder}
        projects={dynamicProjects}
      />

      {/* Add Daily Report Form */}
      <AddDailyReportForm
        isOpen={showAddDailyReport}
        onClose={() => setShowAddDailyReport(false)}
        onSubmit={handleAddDailyReport}
        projects={dynamicProjects}
      />

      {/* Add Team Member Form */}
      <AddTeamMemberForm
        isOpen={showAddTeamMember}
        onClose={() => setShowAddTeamMember(false)}
        onSubmit={handleAddTeamMember}
        projects={dynamicProjects}
      />

      {/* Add Submittal Form */}
      <AddSubmittalForm
        isOpen={showAddSubmittal}
        onClose={() => setShowAddSubmittal(false)}
        onSubmit={handleAddSubmittal}
        projects={dynamicProjects}
      />

      {/* Add Subcontractor Form */}
      <AddSubcontractorForm
        isOpen={showAddSubcontractor}
        onClose={() => setShowAddSubcontractor(false)}
        onSubmit={handleAddSubcontractor}
        projects={dynamicProjects}
      />

      {/* Add Risk Form */}
      <AddRiskForm
        isOpen={showAddRisk}
        onClose={() => setShowAddRisk(false)}
        onSubmit={handleAddRisk}
        projects={dynamicProjects}
      />

      {/* Add Task Form */}
      <AddTaskForm
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        projects={dynamicProjects}
      />

      {/* Add Document Form */}
      <AddDocumentForm
        isOpen={showAddDocument}
        onClose={() => setShowAddDocument(false)}
        projects={dynamicProjects}
      />

      {/* Project Lifecycle Walkthrough */}
      <ProjectLifecycleWalkthrough
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
      />

      {/* Delete Project Modal */}
      <DeleteProjectModal
        isOpen={projectToDelete !== null}
        onClose={() => setProjectToDelete(null)}
        onConfirm={confirmDeleteProject}
        project={projectToDelete}
      />
    </div>
  );
}