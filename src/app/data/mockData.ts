// Mock data for BuildControl Pro dashboard

export interface Project {
  id: string;
  name: string;
  location: string;
  type: 'commercial' | 'residential' | 'industrial' | 'infrastructure';
  contractValue: number;
  percentComplete: number;
  budgetedMarginPercent: number;
  currentMarginPercent: number;
  daysAheadBehind: number;
  status: 'profitable' | 'bleeding' | 'new' | 'near-complete';
  spendHistory: number[];
  plannedSpendHistory: number[];
  actualSpend: number;
  budgetedSpend: number;
  costCodes?: CostCode[];
  startDate?: string; // ISO format date (YYYY-MM-DD)
  endDate?: string; // ISO format date (YYYY-MM-DD)
  durationWeeks?: number; // Total project duration in weeks
}

export interface CostCode {
  id: string;
  code: string;
  division: string;
  description: string;
  budgeted: number;
  actual: number;
  committed: number;
  remaining: number;
  variance: number;
  variancePercent: number;
  forecastAtCompletion: number;
  forecastProfitLoss: number;
}

export interface PortfolioKPIs {
  profitability: number;
  profitabilityTrend: 'up' | 'down' | 'flat';
  cashInBank: number;
  pendingReceivables: number;
  cashFlowRunway: number;
  totalBudgetVariance: number;
  totalBudgetVariancePercent: number;
  avgOverBudget: number;
  overduePayables30: number;
  overduePayables60: number;
  overduePayables90: number;
}

export interface PurchaseOrder {
  id: string;
  vendor: string;
  project: string;
  amount: number;
  committed: number;
  billed: number;
  status: 'open' | 'partial' | 'closed';
  date: string;
}

export interface VendorInvoice {
  id: string;
  vendor: string;
  project: string;
  amount: number;
  invoiceDate: string;
  dueDate: string;
  aging: number;
  matchStatus: '2-way' | '3-way' | 'no-match';
  imageUrl?: string;
}

export interface Payment {
  id: string;
  vendor: string;
  project: string;
  amount: number;
  dueDate: string;
  lienWaiverStatus: 'not-received' | 'partial' | 'final';
  type: 'vendor' | 'subcontractor' | 'payroll' | 'equipment' | 'overhead';
}

export interface CashFlowItem {
  week: string;
  inflows: number;
  outflows: number;
  netCash: number;
  balance: number;
}

export interface ChangeOrder {
  id: string;
  project: string;
  description: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  profitImpact: number;
  date: string;
}

// Project Management Interfaces
export interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  assignedTo: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'blocked' | 'completed';
  dueDate: string;
  createdDate: string;
  category: 'coordination' | 'procurement' | 'inspection' | 'submittal' | 'rfi' | 'safety' | 'general';
  completedDate?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'superintendent' | 'pm' | 'ape' | 'foreman' | 'safety' | 'qc' | 'scheduler';
  email: string;
  phone: string;
  assignedProjects: string[];
  availability: 'available' | 'busy' | 'on-leave';
  certifications?: string[];
}

export interface Document {
  id: string;
  name: string;
  project: string;
  category: 'drawings' | 'specs' | 'submittals' | 'rfis' | 'contracts' | 'safety' | 'photos' | 'reports';
  version: string;
  uploadDate: string;
  uploadedBy: string;
  size: string;
  status: 'current' | 'superseded' | 'void';
  tags?: string[];
}

export interface Submittal {
  id: string;
  number: string;
  project: string;
  title: string;
  specSection: string;
  submittedBy: string;
  submittedDate: string;
  requiredDate: string;
  status: 'pending-review' | 'approved' | 'approved-as-noted' | 'revise-resubmit' | 'rejected';
  reviewedBy?: string;
  reviewDate?: string;
  daysOpen: number;
  priority: 'urgent' | 'normal' | 'low';
}

// Mock Portfolio KPIs
export const portfolioKPIs: PortfolioKPIs = {
  profitability: 18.4,
  profitabilityTrend: 'down',
  cashInBank: 487500,
  pendingReceivables: 823000,
  cashFlowRunway: 42,
  totalBudgetVariance: -127300,
  totalBudgetVariancePercent: -3.2,
  avgOverBudget: 4.7,
  overduePayables30: 45000,
  overduePayables60: 23000,
  overduePayables90: 8500,
};

// Mock Projects with detailed cost breakdown
export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Downtown Office Tower',
    location: 'San Francisco, CA',
    type: 'commercial',
    contractValue: 8500000,
    percentComplete: 67,
    budgetedMarginPercent: 17,
    currentMarginPercent: 14.6,
    daysAheadBehind: -8,
    status: 'profitable',
    spendHistory: [450000, 520000, 580000, 650000, 720000, 780000, 820000, 850000],
    plannedSpendHistory: [420000, 500000, 570000, 640000, 710000, 770000, 810000, 840000],
    actualSpend: 850000,
    budgetedSpend: 840000,
    costCodes: [
      {
        id: 'cc-001-01',
        code: '03-100',
        division: 'Concrete',
        description: 'Foundation & Structure',
        budgeted: 1200000,
        actual: 1150000,
        committed: 0,
        remaining: 50000,
        variance: 50000,
        variancePercent: 4.2,
        forecastAtCompletion: 1150000,
        forecastProfitLoss: 50000,
      },
      {
        id: 'cc-001-02',
        code: '05-100',
        division: 'Metals',
        description: 'Structural Steel',
        budgeted: 980000,
        actual: 1020000,
        committed: 0,
        remaining: -40000,
        variance: -40000,
        variancePercent: -4.1,
        forecastAtCompletion: 1020000,
        forecastProfitLoss: -40000,
      },
    ],
    startDate: '2024-11-01',
    endDate: '2025-10-31',
    durationWeeks: 52,
  },
  {
    id: 'proj-002',
    name: 'Riverside Luxury Apartments',
    location: 'Riverside, CA',
    type: 'residential',
    contractValue: 5200000,
    percentComplete: 43,
    budgetedMarginPercent: 18,
    currentMarginPercent: 11.2,
    daysAheadBehind: -15,
    status: 'bleeding',
    spendHistory: [320000, 380000, 450000, 520000, 580000, 620000, 640000, 660000],
    plannedSpendHistory: [300000, 350000, 400000, 450000, 500000, 550000, 580000, 600000],
    actualSpend: 660000,
    budgetedSpend: 600000,
    costCodes: [
      {
        id: 'cc-002-01',
        code: '01-100',
        division: 'Sitework',
        description: 'Site Preparation',
        budgeted: 85000,
        actual: 98000,
        committed: 0,
        remaining: -13000,
        variance: -13000,
        variancePercent: -15.3,
        forecastAtCompletion: 98000,
        forecastProfitLoss: -13000,
      },
      {
        id: 'cc-002-02',
        code: '03-100',
        division: 'Concrete',
        description: 'Foundations & Parking',
        budgeted: 620000,
        actual: 695000,
        committed: 0,
        remaining: -75000,
        variance: -75000,
        variancePercent: -12.1,
        forecastAtCompletion: 695000,
        forecastProfitLoss: -75000,
      },
      {
        id: 'cc-002-03',
        code: '06-100',
        division: 'Wood/Plastics',
        description: 'Wood Framing',
        budgeted: 480000,
        actual: 285000,
        committed: 180000,
        remaining: 15000,
        variance: 15000,
        variancePercent: 3.1,
        forecastAtCompletion: 465000,
        forecastProfitLoss: 15000,
      },
      {
        id: 'cc-002-04',
        code: '15-100',
        division: 'HVAC',
        description: 'HVAC Systems',
        budgeted: 420000,
        actual: 180000,
        committed: 265000,
        remaining: -25000,
        variance: -25000,
        variancePercent: -6.0,
        forecastAtCompletion: 445000,
        forecastProfitLoss: -25000,
      },
      {
        id: 'cc-002-05',
        code: '16-100',
        division: 'Electrical',
        description: 'Electrical Distribution',
        budgeted: 380000,
        actual: 145000,
        committed: 225000,
        remaining: 10000,
        variance: 10000,
        variancePercent: 2.6,
        forecastAtCompletion: 370000,
        forecastProfitLoss: 10000,
      },
    ],
    startDate: '2025-01-15',
    endDate: '2026-06-30',
    durationWeeks: 52,
  },
  {
    id: 'proj-003',
    name: 'Industrial Warehouse Expansion',
    location: 'San Francisco, CA',
    type: 'industrial',
    contractValue: 3650000,
    percentComplete: 78,
    budgetedMarginPercent: 16,
    currentMarginPercent: 8.4,
    daysAheadBehind: -22,
    status: 'bleeding',
    spendHistory: [280000, 320000, 385000, 420000, 460000, 495000, 510000, 525000],
    plannedSpendHistory: [250000, 300000, 350000, 390000, 430000, 470000, 495000, 515000],
    actualSpend: 525000,
    budgetedSpend: 515000,
    costCodes: [
      {
        id: 'cc-003-01',
        code: '03-100',
        division: 'Concrete',
        description: 'Slab on Grade',
        budgeted: 220000,
        actual: 265000,
        committed: 0,
        remaining: -45000,
        variance: -45000,
        variancePercent: -20.5,
        forecastAtCompletion: 265000,
        forecastProfitLoss: -45000,
      },
    ],
    startDate: '2025-03-01',
    endDate: '2025-12-31',
    durationWeeks: 48,
  },
  {
    id: 'proj-004',
    name: 'Medical Clinic Renovation',
    location: 'San Jose, CA',
    type: 'commercial',
    contractValue: 1850000,
    percentComplete: 34,
    budgetedMarginPercent: 20,
    currentMarginPercent: 14.8,
    daysAheadBehind: -5,
    status: 'profitable',
    spendHistory: [85000, 120000, 165000, 190000, 215000, 240000, 255000, 270000],
    plannedSpendHistory: [90000, 125000, 170000, 200000, 225000, 250000, 265000, 280000],
    actualSpend: 270000,
    budgetedSpend: 280000,
    costCodes: [
      {
        id: 'cc-004-01',
        code: '09-100',
        division: 'Finishes',
        description: 'Drywall & Paint',
        budgeted: 125000,
        actual: 85000,
        committed: 32000,
        remaining: 8000,
        variance: 8000,
        variancePercent: 6.4,
        forecastAtCompletion: 117000,
        forecastProfitLoss: 8000,
      },
    ],
    startDate: '2025-05-10',
    endDate: '2025-11-30',
    durationWeeks: 26,
  },
  {
    id: 'proj-005',
    name: 'Retail Strip Center',
    location: 'Oakland, CA',
    type: 'commercial',
    contractValue: 4200000,
    percentComplete: 22,
    budgetedMarginPercent: 19,
    currentMarginPercent: 19.2,
    daysAheadBehind: 3,
    status: 'profitable',
    spendHistory: [150000, 195000, 245000, 280000, 315000, 340000, 365000, 385000],
    plannedSpendHistory: [145000, 190000, 240000, 275000, 310000, 335000, 360000, 380000],
    actualSpend: 385000,
    budgetedSpend: 380000,
    costCodes: [
      {
        id: 'cc-005-01',
        code: '01-100',
        division: 'Sitework',
        description: 'Site Development',
        budgeted: 185000,
        actual: 172000,
        committed: 0,
        remaining: 13000,
        variance: 13000,
        variancePercent: 7.0,
        forecastAtCompletion: 172000,
        forecastProfitLoss: 13000,
      },
    ],
    startDate: '2025-06-01',
    endDate: '2026-01-31',
    durationWeeks: 30,
  },
];

// Mock Purchase Orders
export const purchaseOrders: PurchaseOrder[] = [
  {
    id: 'po-001',
    vendor: 'Steel Dynamics Inc',
    project: 'Downtown Office Tower',
    amount: 325000,
    committed: 325000,
    billed: 280000,
    status: 'partial',
    date: '2026-01-15',
  },
  {
    id: 'po-002',
    vendor: 'ABC Concrete Supply',
    project: 'Riverside Luxury Apartments',
    amount: 180000,
    committed: 180000,
    billed: 145000,
    status: 'partial',
    date: '2026-01-20',
  },
  {
    id: 'po-003',
    vendor: 'Elite HVAC Systems',
    project: 'Medical Clinic Renovation',
    amount: 195000,
    committed: 195000,
    billed: 0,
    status: 'open',
    date: '2026-02-01',
  },
];

// Mock Vendor Invoices
export const vendorInvoices: VendorInvoice[] = [
  {
    id: 'inv-001',
    vendor: 'Precision Electric Co',
    project: 'Downtown Office Tower',
    amount: 45000,
    invoiceDate: '2026-01-10',
    dueDate: '2026-02-09',
    aging: 0,
    matchStatus: '3-way',
  },
  {
    id: 'inv-002',
    vendor: 'Metro Plumbing',
    project: 'Riverside Luxury Apartments',
    amount: 32000,
    invoiceDate: '2025-12-28',
    dueDate: '2026-01-27',
    aging: 11,
    matchStatus: '3-way',
  },
  {
    id: 'inv-003',
    vendor: 'BuildRight Lumber',
    project: 'Industrial Warehouse',
    amount: 18500,
    invoiceDate: '2025-11-15',
    dueDate: '2025-12-15',
    aging: 54,
    matchStatus: '2-way',
  },
];

// Mock Payments Schedule
export const upcomingPayments: Payment[] = [
  {
    id: 'pay-001',
    vendor: 'Steel Dynamics Inc',
    project: 'Downtown Office Tower',
    amount: 85000,
    dueDate: '2026-02-10',
    lienWaiverStatus: 'partial',
    type: 'vendor',
  },
  {
    id: 'pay-002',
    vendor: 'ABC Concrete Supply',
    project: 'Riverside Luxury Apartments',
    amount: 52000,
    dueDate: '2026-02-12',
    lienWaiverStatus: 'not-received',
    type: 'vendor',
  },
  {
    id: 'pay-003',
    vendor: 'Elite HVAC Systems',
    project: 'Medical Clinic Renovation',
    amount: 95000,
    dueDate: '2026-02-14',
    lienWaiverStatus: 'not-received',
    type: 'subcontractor',
  },
  {
    id: 'pay-004',
    vendor: 'Weekly Payroll',
    project: 'All Projects',
    amount: 125000,
    dueDate: '2026-02-14',
    lienWaiverStatus: 'final',
    type: 'payroll',
  },
  {
    id: 'pay-005',
    vendor: 'Equipment Rental Co',
    project: 'Industrial Warehouse',
    amount: 18000,
    dueDate: '2026-02-15',
    lienWaiverStatus: 'final',
    type: 'equipment',
  },
];

// Mock Cash Flow Forecast (12 weeks)
export const cashFlowForecast: CashFlowItem[] = [
  { week: 'Week 1', inflows: 425000, outflows: 385000, netCash: 40000, balance: 527500 },
  { week: 'Week 2', inflows: 380000, outflows: 420000, netCash: -40000, balance: 487500 },
  { week: 'Week 3', inflows: 520000, outflows: 465000, netCash: 55000, balance: 542500 },
  { week: 'Week 4', inflows: 280000, outflows: 510000, netCash: -230000, balance: 312500 },
  { week: 'Week 5', inflows: 620000, outflows: 485000, netCash: 135000, balance: 447500 },
  { week: 'Week 6', inflows: 450000, outflows: 520000, netCash: -70000, balance: 377500 },
  { week: 'Week 7', inflows: 580000, outflows: 495000, netCash: 85000, balance: 462500 },
  { week: 'Week 8', inflows: 320000, outflows: 540000, netCash: -220000, balance: 242500 },
  { week: 'Week 9', inflows: 720000, outflows: 510000, netCash: 210000, balance: 452500 },
  { week: 'Week 10', inflows: 480000, outflows: 525000, netCash: -45000, balance: 407500 },
  { week: 'Week 11', inflows: 550000, outflows: 495000, netCash: 55000, balance: 462500 },
  { week: 'Week 12', inflows: 620000, outflows: 510000, netCash: 110000, balance: 572500 },
];

// Mock Change Orders
export const changeOrders: ChangeOrder[] = [
  {
    id: 'co-001',
    project: 'Downtown Office Tower',
    description: 'Additional elevator lobby finishes',
    amount: 45000,
    status: 'approved',
    profitImpact: 9000,
    date: '2026-01-22',
  },
  {
    id: 'co-002',
    project: 'Riverside Luxury Apartments',
    description: 'Upgrade to premium flooring',
    amount: 32000,
    status: 'submitted',
    profitImpact: 6400,
    date: '2026-02-01',
  },
  {
    id: 'co-003',
    project: 'Medical Clinic Renovation',
    description: 'Additional exam rooms',
    amount: 85000,
    status: 'draft',
    profitImpact: 17000,
    date: '2026-02-05',
  },
];

// CSI Divisions for grouping
export const csiDivisions = [
  'Sitework',
  'Concrete',
  'Masonry',
  'Metals',
  'Wood/Plastics',
  'Thermal/Moisture',
  'Doors/Windows',
  'Finishes',
  'Specialties',
  'Equipment',
  'Furnishings',
  'Conveying',
  'Fire Suppression',
  'Plumbing',
  'HVAC',
  'Electrical',
  'Earthwork',
  'Utilities',
];

// Mock Project Management Data
export const tasks: Task[] = [
  {
    id: 'task-001',
    title: 'Submit plumbing shop drawings',
    description: 'Coordinate with MEP engineer and submit complete plumbing shop drawings for GC review',
    project: 'Riverside Luxury Apartments',
    assignedTo: 'Mike Chen',
    priority: 'critical',
    status: 'in-progress',
    dueDate: '2026-02-16',
    createdDate: '2026-02-01',
    category: 'submittal',
  },
  {
    id: 'task-002',
    title: 'Order long-lead HVAC equipment',
    description: 'Place PO for rooftop units - 16 week lead time',
    project: 'Medical Clinic Renovation',
    assignedTo: 'Sarah Johnson',
    priority: 'critical',
    status: 'not-started',
    dueDate: '2026-02-15',
    createdDate: '2026-02-10',
    category: 'procurement',
  },
  {
    id: 'task-003',
    title: 'Coordinate rebar inspection',
    description: 'Schedule city inspector for foundation rebar before pour',
    project: 'Retail Strip Center',
    assignedTo: 'Carlos Rodriguez',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-02-14',
    createdDate: '2026-02-08',
    category: 'inspection',
  },
  {
    id: 'task-004',
    title: 'Resolve RFI #12 - Wall assembly detail',
    description: 'Get clarification from architect on exterior wall assembly at parapet',
    project: 'Industrial Warehouse Expansion',
    assignedTo: 'Mike Chen',
    priority: 'high',
    status: 'blocked',
    dueDate: '2026-02-17',
    createdDate: '2026-02-05',
    category: 'rfi',
  },
  {
    id: 'task-005',
    title: 'Weekly toolbox safety meeting',
    description: 'Cover fall protection and PPE requirements',
    project: 'Riverside Luxury Apartments',
    assignedTo: 'Tom Wilson',
    priority: 'medium',
    status: 'completed',
    dueDate: '2026-02-12',
    createdDate: '2026-02-10',
    category: 'safety',
    completedDate: '2026-02-12',
  },
  {
    id: 'task-006',
    title: 'Update project schedule',
    description: 'Revise schedule based on concrete delays',
    project: 'Industrial Warehouse Expansion',
    assignedTo: 'Lisa Martinez',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2026-02-18',
    createdDate: '2026-02-11',
    category: 'coordination',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-001',
    name: 'Mike Chen',
    role: 'superintendent',
    email: 'mchen@buildcontrol.com',
    phone: '(254) 722-456789',
    assignedProjects: ['Riverside Luxury Apartments', 'Industrial Warehouse Expansion'],
    availability: 'busy',
    certifications: ['OSHA 30', 'First Aid', 'Confined Space'],
  },
  {
    id: 'tm-002',
    name: 'Sarah Johnson',
    role: 'pm',
    email: 'sjohnson@buildcontrol.com',
    phone: '(254) 733-891234',
    assignedProjects: ['Medical Clinic Renovation', 'Retail Strip Center'],
    availability: 'available',
    certifications: ['PMP', 'LEED AP'],
  },
  {
    id: 'tm-003',
    name: 'Carlos Rodriguez',
    role: 'superintendent',
    email: 'crodriguez@buildcontrol.com',
    phone: '(254) 712-567890',
    assignedProjects: ['Retail Strip Center'],
    availability: 'available',
    certifications: ['OSHA 30', 'Crane Operator'],
  },
  {
    id: 'tm-004',
    name: 'Tom Wilson',
    role: 'safety',
    email: 'twilson@buildcontrol.com',
    phone: '(254) 745-234567',
    assignedProjects: ['Riverside Luxury Apartments', 'Industrial Warehouse Expansion', 'Medical Clinic Renovation'],
    availability: 'busy',
    certifications: ['CSP', 'CHST', 'OSHA 500'],
  },
  {
    id: 'tm-005',
    name: 'Lisa Martinez',
    role: 'scheduler',
    email: 'lmartinez@buildcontrol.com',
    phone: '(254) 720-678912',
    assignedProjects: ['Industrial Warehouse Expansion', 'Retail Strip Center'],
    availability: 'available',
    certifications: ['PSP', 'Primavera P6'],
  },
  {
    id: 'tm-006',
    name: 'David Park',
    role: 'ape',
    email: 'dpark@buildcontrol.com',
    phone: '(254) 758-345678',
    assignedProjects: ['Medical Clinic Renovation'],
    availability: 'available',
    certifications: ['EIT', 'AutoCAD'],
  },
];

export const documents: Document[] = [
  {
    id: 'doc-001',
    name: 'A-101 Floor Plans Rev 3',
    project: 'Riverside Luxury Apartments',
    category: 'drawings',
    version: '3.0',
    uploadDate: '2026-02-10',
    uploadedBy: 'Sarah Johnson',
    size: '4.2 MB',
    status: 'current',
    tags: ['architectural', 'floor-plans'],
  },
  {
    id: 'doc-002',
    name: 'Division 15 HVAC Specifications',
    project: 'Medical Clinic Renovation',
    category: 'specs',
    version: '1.0',
    uploadDate: '2026-01-15',
    uploadedBy: 'David Park',
    size: '850 KB',
    status: 'current',
    tags: ['mechanical', 'specs'],
  },
  {
    id: 'doc-003',
    name: 'Concrete Pour Report - Foundation',
    project: 'Retail Strip Center',
    category: 'reports',
    version: '1.0',
    uploadDate: '2026-02-12',
    uploadedBy: 'Carlos Rodriguez',
    size: '1.1 MB',
    status: 'current',
    tags: ['concrete', 'inspection'],
  },
  {
    id: 'doc-004',
    name: 'Safety Plan 2026',
    project: 'Industrial Warehouse Expansion',
    category: 'safety',
    version: '2.0',
    uploadDate: '2026-01-05',
    uploadedBy: 'Tom Wilson',
    size: '3.5 MB',
    status: 'current',
    tags: ['safety', 'compliance'],
  },
  {
    id: 'doc-005',
    name: 'Site Photos - Week 6',
    project: 'Riverside Luxury Apartments',
    category: 'photos',
    version: '1.0',
    uploadDate: '2026-02-11',
    uploadedBy: 'Mike Chen',
    size: '12.8 MB',
    status: 'current',
    tags: ['progress', 'documentation'],
  },
];

export const submittals: Submittal[] = [
  {
    id: 'sub-001',
    number: 'S-0045',
    project: 'Riverside Luxury Apartments',
    title: 'Roofing System - TPO Membrane',
    specSection: '07 54 00',
    submittedBy: 'ABC Roofing Inc',
    submittedDate: '2026-01-28',
    requiredDate: '2026-02-18',
    status: 'pending-review',
    daysOpen: 17,
    priority: 'urgent',
  },
  {
    id: 'sub-002',
    number: 'S-0046',
    project: 'Medical Clinic Renovation',
    title: 'VAV Boxes and Controls',
    specSection: '23 36 00',
    submittedBy: 'Elite HVAC Systems',
    submittedDate: '2026-02-01',
    requiredDate: '2026-02-22',
    status: 'approved',
    reviewedBy: 'David Park',
    reviewDate: '2026-02-08',
    daysOpen: 13,
    priority: 'normal',
  },
  {
    id: 'sub-003',
    number: 'S-0047',
    project: 'Industrial Warehouse Expansion',
    title: 'Steel Joists Shop Drawings',
    specSection: '05 21 00',
    submittedBy: 'Steel Dynamics Inc',
    submittedDate: '2026-01-20',
    requiredDate: '2026-02-10',
    status: 'approved-as-noted',
    reviewedBy: 'Sarah Johnson',
    reviewDate: '2026-02-05',
    daysOpen: 25,
    priority: 'urgent',
  },
  {
    id: 'sub-004',
    number: 'S-0048',
    project: 'Retail Strip Center',
    title: 'Storefront and Entrance Doors',
    specSection: '08 41 00',
    submittedBy: 'Window World Supply',
    submittedDate: '2026-02-05',
    requiredDate: '2026-02-26',
    status: 'revise-resubmit',
    reviewedBy: 'Carlos Rodriguez',
    reviewDate: '2026-02-11',
    daysOpen: 9,
    priority: 'normal',
  },
  {
    id: 'sub-005',
    number: 'S-0049',
    project: 'Riverside Luxury Apartments',
    title: 'Elevator Equipment',
    specSection: '14 21 00',
    submittedBy: 'Otis Elevator Co',
    submittedDate: '2026-02-10',
    requiredDate: '2026-03-03',
    status: 'pending-review',
    daysOpen: 4,
    priority: 'normal',
  },
];