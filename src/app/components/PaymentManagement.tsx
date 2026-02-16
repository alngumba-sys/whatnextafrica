import { useState } from 'react';
import { 
  DollarSign, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Send, 
  Eye, 
  Download,
  Filter,
  Search,
  CreditCard,
  Building2,
  User,
  Calendar,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Users,
  FolderOpen
} from 'lucide-react';
import { AddPaymentForm } from './AddPaymentForm';

interface Payment {
  id: string;
  paymentNumber: string;
  vendorName: string;
  projectName: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'approved' | 'processing' | 'paid' | 'rejected' | 'overdue';
  category: string;
  approvedBy?: string;
  paidDate?: string;
  paymentMethod?: string;
  invoiceNumber: string;
  costCode?: string;
  paymentType?: 'vendor' | 'worker';
}

export function PaymentManagement() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'paid' | 'all'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [groupBy, setGroupBy] = useState<'none' | 'project' | 'category' | 'type'>('none');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [showActionConfirmation, setShowActionConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'approve' | 'reject' | 'view';
    payment: Payment | null;
  }>({ type: 'approve', payment: null });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddPayment = (payment: any) => {
    alert(
      `✓ Payment Created Successfully!\n\n` +
      `Payee: ${payment.payeeName}\n` +
      `Project: ${projects.find(p => p.id === payment.projectId)?.name}\n` +
      `Amount: ${formatCurrency(payment.amount)}\n` +
      `Category: ${payment.category}\n` +
      `Type: ${payment.paymentType === 'vendor' ? 'Vendor/Supplier' : 'Worker/Labor'}\n\n` +
      `Payment has been submitted for approval.`
    );
  };

  // Mock projects data
  const projects = [
    { id: 'PRJ-001', name: 'Riverside Residential Complex' },
    { id: 'PRJ-002', name: 'Green Valley Shopping Mall' },
    { id: 'PRJ-003', name: 'Coastal Resort & Spa' },
    { id: 'PRJ-004', name: 'Tech Campus Phase II' },
    { id: 'PRJ-005', name: 'Westlands Office Tower' },
  ];

  // Mock payment data - includes both vendor and worker payments
  const payments: Payment[] = [
    {
      id: 'PAY-001',
      paymentNumber: 'PM-2025-0247',
      vendorName: 'Bamburi Cement Ltd',
      projectName: 'Riverside Residential Complex',
      description: 'Cement supply - 500 bags Grade 42.5',
      amount: 2850000,
      dueDate: '2025-02-12',
      status: 'pending',
      category: 'Materials',
      invoiceNumber: 'INV-BCL-8847',
      costCode: '03-30-10',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-002',
      paymentNumber: 'PM-2025-0248',
      vendorName: 'Steel Masters Kenya',
      projectName: 'Green Valley Shopping Mall',
      description: 'Reinforcement steel bars - 20mm & 16mm',
      amount: 4200000,
      dueDate: '2025-02-10',
      status: 'overdue',
      category: 'Materials',
      invoiceNumber: 'INV-SMK-5521',
      costCode: '03-20-05',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-003',
      paymentNumber: 'PM-2025-0246',
      vendorName: 'Electro Solutions Ltd',
      projectName: 'Coastal Resort & Spa',
      description: 'Electrical installation - Phase 2',
      amount: 1850000,
      dueDate: '2025-02-15',
      status: 'approved',
      category: 'Subcontractor',
      approvedBy: 'David Kimani',
      invoiceNumber: 'INV-ESL-3398',
      costCode: '26-10-00',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-004',
      paymentNumber: 'PM-2025-0245',
      vendorName: 'Prime Plumbing Services',
      projectName: 'Riverside Residential Complex',
      description: 'Plumbing rough-in work - Building A',
      amount: 980000,
      dueDate: '2025-02-18',
      status: 'approved',
      category: 'Subcontractor',
      approvedBy: 'Sarah Mwangi',
      invoiceNumber: 'INV-PPS-7712',
      costCode: '22-10-00',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-005',
      paymentNumber: 'PM-2025-0243',
      vendorName: 'Nairobi Heavy Equipment Hire',
      projectName: 'Tech Campus Phase II',
      description: 'Excavator rental - January 2025',
      amount: 750000,
      dueDate: '2025-02-05',
      status: 'paid',
      category: 'Equipment',
      approvedBy: 'John Ochieng',
      paidDate: '2025-02-04',
      paymentMethod: 'M-Pesa Business',
      invoiceNumber: 'INV-NHEH-9901',
      costCode: '01-54-19',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-006',
      paymentNumber: 'PM-2025-0244',
      vendorName: 'Kenya Power & Lighting',
      projectName: 'Green Valley Shopping Mall',
      description: 'Temporary power connection - Jan 2025',
      amount: 125000,
      dueDate: '2025-02-08',
      status: 'paid',
      category: 'Utilities',
      approvedBy: 'David Kimani',
      paidDate: '2025-02-07',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'INV-KPLC-4423',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-007',
      paymentNumber: 'PM-2025-0249',
      vendorName: 'Site Security Services Ltd',
      projectName: 'Coastal Resort & Spa',
      description: 'Security services - February 2025',
      amount: 320000,
      dueDate: '2025-02-14',
      status: 'pending',
      category: 'Services',
      invoiceNumber: 'INV-SSS-2211',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-008',
      paymentNumber: 'PM-2025-0250',
      vendorName: 'Skyline Scaffolding Co.',
      projectName: 'Tech Campus Phase II',
      description: 'Scaffolding rental - 4 weeks',
      amount: 580000,
      dueDate: '2025-02-16',
      status: 'pending',
      category: 'Equipment',
      invoiceNumber: 'INV-SSC-7789',
      costCode: '01-54-23',
      paymentType: 'vendor',
    },
    {
      id: 'PAY-009',
      paymentNumber: 'PM-2025-0251',
      vendorName: 'James Kamau',
      projectName: 'Riverside Residential Complex',
      description: 'Masonry work - Week 1-2 February 2025',
      amount: 85000,
      dueDate: '2025-02-13',
      status: 'approved',
      category: 'Direct Labor',
      approvedBy: 'David Kimani',
      invoiceNumber: 'WKR-JK-2025-022',
      costCode: '04-20-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-010',
      paymentNumber: 'PM-2025-0252',
      vendorName: 'Mary Wanjiru',
      projectName: 'Green Valley Shopping Mall',
      description: 'Painting work - Interior walls Phase 1',
      amount: 62000,
      dueDate: '2025-02-11',
      status: 'approved',
      category: 'Direct Labor',
      approvedBy: 'Sarah Mwangi',
      invoiceNumber: 'WKR-MW-2025-018',
      costCode: '09-90-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-011',
      paymentNumber: 'PM-2025-0253',
      vendorName: 'Peter Omondi',
      projectName: 'Coastal Resort & Spa',
      description: 'Carpentry - Custom furniture installation',
      amount: 125000,
      dueDate: '2025-02-15',
      status: 'pending',
      category: 'Direct Labor',
      invoiceNumber: 'WKR-PO-2025-031',
      costCode: '06-10-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-012',
      paymentNumber: 'PM-2025-0254',
      vendorName: 'Grace Akinyi',
      projectName: 'Tech Campus Phase II',
      description: 'Site cleaning and waste management - Week 6',
      amount: 45000,
      dueDate: '2025-02-09',
      status: 'paid',
      category: 'Direct Labor',
      approvedBy: 'John Ochieng',
      paidDate: '2025-02-08',
      paymentMethod: 'M-Pesa',
      invoiceNumber: 'WKR-GA-2025-015',
      paymentType: 'worker',
    },
    {
      id: 'PAY-013',
      paymentNumber: 'PM-2025-0255',
      vendorName: 'Samuel Mwangi',
      projectName: 'Riverside Residential Complex',
      description: 'Electrical rough-in assistance - 2 weeks',
      amount: 78000,
      dueDate: '2025-02-14',
      status: 'pending',
      category: 'Direct Labor',
      invoiceNumber: 'WKR-SM-2025-024',
      costCode: '26-05-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-014',
      paymentNumber: 'PM-2025-0256',
      vendorName: 'Lucy Njeri',
      projectName: 'Green Valley Shopping Mall',
      description: 'Tile setting - Floors & bathrooms',
      amount: 98000,
      dueDate: '2025-02-17',
      status: 'approved',
      category: 'Direct Labor',
      approvedBy: 'Sarah Mwangi',
      invoiceNumber: 'WKR-LN-2025-027',
      costCode: '09-30-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-015',
      paymentNumber: 'PM-2025-0257',
      vendorName: 'David Otieno',
      projectName: 'Tech Campus Phase II',
      description: 'Steel fixing and rebar installation',
      amount: 142000,
      dueDate: '2025-02-12',
      status: 'paid',
      category: 'Direct Labor',
      approvedBy: 'John Ochieng',
      paidDate: '2025-02-11',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'WKR-DO-2025-019',
      costCode: '03-20-00',
      paymentType: 'worker',
    },
    {
      id: 'PAY-016',
      paymentNumber: 'PM-2025-0258',
      vendorName: 'Catherine Wambui',
      projectName: 'Coastal Resort & Spa',
      description: 'Landscaping and garden installation',
      amount: 55000,
      dueDate: '2025-02-19',
      status: 'pending',
      category: 'Direct Labor',
      invoiceNumber: 'WKR-CW-2025-033',
      costCode: '32-90-00',
      paymentType: 'worker',
    },
  ];

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-950/30 text-green-400 border-green-600/50';
      case 'approved':
        return 'bg-cyan-950/30 text-cyan-400 border-cyan-600/50';
      case 'processing':
        return 'bg-blue-950/30 text-blue-400 border-blue-600/50';
      case 'pending':
        return 'bg-amber-950/30 text-amber-400 border-amber-600/50';
      case 'overdue':
        return 'bg-red-950/30 text-red-400 border-red-600/50';
      case 'rejected':
        return 'bg-slate-800 text-slate-400 border-slate-600';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-600';
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4 animate-pulse" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      searchTerm === '' ||
      payment.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && (payment.status === 'pending' || payment.status === 'overdue')) ||
      (activeTab === 'approved' && payment.status === 'approved') ||
      (activeTab === 'paid' && payment.status === 'paid');

    return matchesSearch && matchesTab;
  });

  const summary = {
    pending: payments.filter((p) => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    approved: payments.filter((p) => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0),
    paid: payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    overdue: payments.filter((p) => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
  };

  const handleApprove = (payment: Payment) => {
    setPendingAction({ type: 'approve', payment });
    setShowActionConfirmation(true);
  };

  const handleReject = (payment: Payment) => {
    setPendingAction({ type: 'reject', payment });
    setShowActionConfirmation(true);
  };

  const handleViewDetails = (payment: Payment) => {
    setPendingAction({ type: 'view', payment });
    setShowActionConfirmation(true);
  };

  const executeAction = () => {
    if (!pendingAction.payment) return;

    const payment = pendingAction.payment;

    if (pendingAction.type === 'approve') {
      alert(
        `✓ Payment Approved Successfully!\n\n` +
        `Payment #: ${payment.paymentNumber}\n` +
        `Vendor: ${payment.vendorName}\n` +
        `Amount: ${formatCurrency(payment.amount)}\n` +
        `Project: ${payment.projectName}\n\n` +
        `Actions completed:\n` +
        `✓ Payment status updated to "Approved"\n` +
        `✓ Accounts team notified\n` +
        `✓ Vendor notification sent\n` +
        `✓ Ready for payment processing`
      );
    } else if (pendingAction.type === 'reject') {
      alert(
        `✗ Payment Rejected!\n\n` +
        `Payment #: ${payment.paymentNumber}\n` +
        `Vendor: ${payment.vendorName}\n` +
        `Amount: ${formatCurrency(payment.amount)}\n` +
        `Project: ${payment.projectName}\n\n` +
        `Actions completed:\n` +
        `✓ Payment status updated to "Rejected"\n` +
        `✓ Vendor notified of rejection\n` +
        `✓ Project manager alerted\n` +
        `✓ Invoice returned for review`
      );
    } else if (pendingAction.type === 'view') {
      alert(
        `Payment Details\n\n` +
        `Payment #: ${payment.paymentNumber}\n` +
        `Invoice #: ${payment.invoiceNumber}\n` +
        `Vendor: ${payment.vendorName}\n` +
        `Project: ${payment.projectName}\n` +
        `Description: ${payment.description}\n` +
        `Amount: ${formatCurrency(payment.amount)}\n` +
        `Category: ${payment.category}\n` +
        `Due Date: ${new Date(payment.dueDate).toLocaleDateString('en-KE')}\n` +
        `Status: ${payment.status.toUpperCase()}\n` +
        `${payment.costCode ? `Cost Code: ${payment.costCode}\n` : ''}` +
        `${payment.approvedBy ? `Approved By: ${payment.approvedBy}\n` : ''}` +
        `${payment.paidDate ? `Paid Date: ${new Date(payment.paidDate).toLocaleDateString('en-KE')}\n` : ''}` +
        `${payment.paymentMethod ? `Payment Method: ${payment.paymentMethod}` : ''}`
      );
    }

    // Close modal
    setShowActionConfirmation(false);
    setPendingAction({ type: 'approve', payment: null });
  };

  const handleProcessPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const executePayment = (method: string) => {
    if (!selectedPayment) return;
    
    // Show confirmation modal
    setSelectedPaymentMethod(method);
    setShowConfirmation(true);
  };

  const confirmPayment = () => {
    if (!selectedPayment || !selectedPaymentMethod) return;

    alert(
      `✓ Payment Completed Successfully!\n\n` +
      `Payment #: ${selectedPayment.paymentNumber}\n` +
      `Vendor: ${selectedPayment.vendorName}\n` +
      `Amount: ${formatCurrency(selectedPayment.amount)}\n` +
      `Method: ${selectedPaymentMethod}\n\n` +
      `The payment has been processed and the vendor will be notified.\n\n` +
      `Actions completed:\n` +
      `✓ Payment processed via ${selectedPaymentMethod}\n` +
      `✓ Project cost tracking updated\n` +
      `✓ Confirmation sent to vendor\n` +
      `✓ Payment receipt generated\n` +
      `✓ Cash flow forecasts updated`
    );
    
    // Close all modals
    setShowConfirmation(false);
    setShowPaymentModal(false);
    setSelectedPayment(null);
    setSelectedPaymentMethod('');
  };

  // Generate intelligent insights
  const generateInsights = () => {
    const insights = [];
    const today = new Date('2025-02-10');
    
    // Check for overdue payments
    const overduePayments = payments.filter(p => p.status === 'overdue');
    if (overduePayments.length > 0) {
      insights.push({
        type: 'critical',
        icon: AlertTriangle,
        title: 'Critical: Overdue Payments',
        message: `${overduePayments.length} payment(s) are overdue totaling ${formatCurrency(overduePayments.reduce((sum, p) => sum + p.amount, 0))}. This may damage vendor relationships and delay project delivery.`,
        action: 'Review Now',
        onClick: () => {
          setActiveTab('pending');
          setSearchTerm('');
        }
      });
    }

    // Check for upcoming payments in next 3 days
    const upcomingPayments = payments.filter(p => {
      const dueDate = new Date(p.dueDate);
      const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return (p.status === 'approved' || p.status === 'pending') && daysUntilDue >= 0 && daysUntilDue <= 3;
    });
    
    if (upcomingPayments.length > 0) {
      insights.push({
        type: 'warning',
        icon: Clock,
        title: 'Upcoming Payments (Next 3 Days)',
        message: `${upcomingPayments.length} payment(s) due within 3 days totaling ${formatCurrency(upcomingPayments.reduce((sum, p) => sum + p.amount, 0))}. Ensure sufficient cash flow.`,
        action: 'View Schedule',
        onClick: () => {
          setActiveTab('approved');
          setSearchTerm('');
        }
      });
    }

    // Check for vendor concentration risk
    const vendorTotals: { [key: string]: number } = {};
    payments.filter(p => p.paymentType === 'vendor').forEach(p => {
      vendorTotals[p.vendorName] = (vendorTotals[p.vendorName] || 0) + p.amount;
    });
    
    const totalVendorPayments = Object.values(vendorTotals).reduce((sum, amt) => sum + amt, 0);
    const concentratedVendors = Object.entries(vendorTotals).filter(([_, amt]) => (amt / totalVendorPayments) > 0.25);
    
    if (concentratedVendors.length > 0) {
      const topVendor = concentratedVendors[0];
      const percentage = ((topVendor[1] / totalVendorPayments) * 100).toFixed(0);
      insights.push({
        type: 'info',
        icon: TrendingUp,
        title: 'Vendor Concentration Alert',
        message: `${topVendor[0]} represents ${percentage}% of total vendor payments (${formatCurrency(topVendor[1])}). Consider diversifying suppliers to reduce risk.`,
        action: 'Analyze',
        onClick: () => {
          setGroupBy('type');
          setSearchTerm(topVendor[0]);
        }
      });
    }

    // Check for unusually high worker payments
    const workerPayments = payments.filter(p => p.paymentType === 'worker');
    const avgWorkerPayment = workerPayments.reduce((sum, p) => sum + p.amount, 0) / workerPayments.length;
    const highWorkerPayments = workerPayments.filter(p => p.amount > avgWorkerPayment * 1.5);
    
    if (highWorkerPayments.length > 0) {
      insights.push({
        type: 'info',
        icon: Users,
        title: 'Above-Average Labor Costs Detected',
        message: `${highWorkerPayments.length} worker payment(s) are 50% above average. Review: ${highWorkerPayments.map(p => p.vendorName).join(', ')}.`,
        action: 'Review Details',
        onClick: () => {
          setGroupBy('type');
          setActiveTab('all');
          setSearchTerm('');
        }
      });
    }

    // Check for similar payments (potential duplicates)
    const potentialDuplicates = [];
    for (let i = 0; i < payments.length; i++) {
      for (let j = i + 1; j < payments.length; j++) {
        if (
          payments[i].vendorName === payments[j].vendorName &&
          payments[i].amount === payments[j].amount &&
          payments[i].projectName === payments[j].projectName &&
          Math.abs(new Date(payments[i].dueDate).getTime() - new Date(payments[j].dueDate).getTime()) < 7 * 24 * 60 * 60 * 1000
        ) {
          potentialDuplicates.push([payments[i], payments[j]]);
        }
      }
    }
    
    if (potentialDuplicates.length > 0) {
      const dup = potentialDuplicates[0];
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Potential Duplicate Payment',
        message: `Found similar payments: ${dup[0].paymentNumber} and ${dup[1].paymentNumber} to ${dup[0].vendorName} for ${formatCurrency(dup[0].amount)}. Verify this is not a duplicate entry.`,
        action: 'Investigate',
        onClick: () => {
          setSearchTerm(dup[0].vendorName);
          setActiveTab('all');
        }
      });
    }

    // Check cash flow for project concentration
    const projectTotals: { [key: string]: number } = {};
    payments.filter(p => p.status === 'approved' || p.status === 'pending').forEach(p => {
      projectTotals[p.projectName] = (projectTotals[p.projectName] || 0) + p.amount;
    });
    
    const totalPendingByProject = Object.values(projectTotals).reduce((sum, amt) => sum + amt, 0);
    const concentratedProjects = Object.entries(projectTotals).filter(([_, amt]) => (amt / totalPendingByProject) > 0.35);
    
    if (concentratedProjects.length > 0) {
      const topProject = concentratedProjects[0];
      const percentage = ((topProject[1] / totalPendingByProject) * 100).toFixed(0);
      insights.push({
        type: 'info',
        icon: FolderOpen,
        title: 'Project Cash Concentration',
        message: `${topProject[0]} has ${percentage}% of pending payments (${formatCurrency(topProject[1])}). Ensure adequate funding allocation.`,
        action: 'Review Budget',
        onClick: () => {
          setGroupBy('project');
          setActiveTab('pending');
          setSearchTerm('');
        }
      });
    }

    // Add positive insight if everything is in good shape
    if (insights.length === 0) {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'Payment Health: Excellent',
        message: 'All payments are on track. No overdue items, vendor concentration is healthy, and cash flow appears balanced across projects.',
        action: null,
        onClick: null
      });
    }

    return insights;
  };

  const insights = generateInsights();

  // Grouping functionality
  const groupPayments = (payments: Payment[]) => {
    if (groupBy === 'none') return { 'All Payments': payments };

    const grouped: { [key: string]: Payment[] } = {};

    payments.forEach(payment => {
      let key = '';
      switch (groupBy) {
        case 'project':
          key = payment.projectName;
          break;
        case 'category':
          key = payment.category;
          break;
        case 'type':
          key = payment.paymentType === 'worker' ? 'Worker/Labor' : 'Vendor/Supplier';
          break;
        default:
          key = 'All Payments';
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(payment);
    });

    return grouped;
  };

  const groupedPayments = groupPayments(filteredPayments);

  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 bg-cyan-400 rounded"></div>
          Payment & Cost Management
        </h2>

        <div className="flex flex-wrap gap-2">
          <button className="px-3 sm:px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center gap-2 text-sm font-semibold" onClick={() => setShowAddPayment(true)}>
            <Send className="w-4 h-4" />
            <span>New Payment</span>
          </button>
          <button className="px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wide">AI Payment Insights</h3>
        </div>
        
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-2.5 border ${
              insight.type === 'critical'
                ? 'bg-red-950/30 border-red-600/50'
                : insight.type === 'warning'
                ? 'bg-amber-950/30 border-amber-600/50'
                : insight.type === 'success'
                ? 'bg-green-950/30 border-green-600/50'
                : 'bg-cyan-950/30 border-cyan-600/50'
            }`}
          >
            <div className="flex items-start gap-2">
              <insight.icon
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  insight.type === 'critical'
                    ? 'text-red-400'
                    : insight.type === 'warning'
                    ? 'text-amber-400'
                    : insight.type === 'success'
                    ? 'text-green-400'
                    : 'text-cyan-400'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`text-xs font-bold mb-0.5 ${
                    insight.type === 'critical'
                      ? 'text-red-400'
                      : insight.type === 'warning'
                      ? 'text-amber-400'
                      : insight.type === 'success'
                      ? 'text-green-400'
                      : 'text-cyan-400'
                  }`}
                >
                  {insight.title}
                </div>
                <div className="text-slate-300 leading-snug text-[13px]">{insight.message}</div>
              </div>
              {insight.action && (
                <button 
                  className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0" 
                  onClick={insight.onClick}
                >
                  {insight.action}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-amber-950/20 rounded-lg p-4 border border-amber-600/30">
          <div className="flex items-center gap-2 text-amber-400 text-xs sm:text-sm mb-2">
            <Clock className="w-4 h-4" />
            Pending Approval
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(summary.pending)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {payments.filter((p) => p.status === 'pending').length} payments
          </div>
        </div>

        <div className="bg-cyan-950/20 rounded-lg p-4 border border-cyan-600/30">
          <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm mb-2">
            <CheckCircle className="w-4 h-4" />
            Approved
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(summary.approved)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {payments.filter((p) => p.status === 'approved').length} ready to pay
          </div>
        </div>

        <div className="bg-green-950/20 rounded-lg p-4 border border-green-600/30">
          <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm mb-2">
            <CheckCircle className="w-4 h-4" />
            Paid This Month
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(summary.paid)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {payments.filter((p) => p.status === 'paid').length} transactions
          </div>
        </div>

        <div className="bg-red-950/20 rounded-lg p-4 border border-red-600/30">
          <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm mb-2">
            <AlertTriangle className="w-4 h-4" />
            Overdue
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(summary.overdue)}</div>
          <div className="text-xs text-slate-400 mt-1">
            {payments.filter((p) => p.status === 'overdue').length} urgent
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {(['all', 'pending', 'approved', 'paid'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vendors, projects, invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Group By Dropdown */}
        <div className="relative">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as any)}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm focus:outline-none focus:border-cyan-500 border border-slate-600 appearance-none pr-10"
          >
            <option value="none">No Grouping</option>
            <option value="project">Group by Project</option>
            <option value="category">Group by Category</option>
            <option value="type">Group by Type</option>
          </select>
          <FolderOpen className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto space-y-6">
        {Object.entries(groupedPayments).map(([groupName, groupPayments]) => (
          <div key={groupName}>
            {groupBy !== 'none' && (
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <div className="w-1 h-5 bg-cyan-400 rounded"></div>
                  {groupName}
                </h3>
                <div className="text-sm text-slate-400">
                  {groupPayments.length} payment{groupPayments.length !== 1 ? 's' : ''} · {formatCurrency(groupPayments.reduce((sum, p) => sum + p.amount, 0))}
                </div>
              </div>
            )}
            
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-slate-600">
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Payment #</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Vendor</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Project</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Description</th>
                  <th className="text-right text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Amount</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Due Date</th>
                  <th className="text-left text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Status</th>
                  <th className="text-center text-slate-300 font-semibold py-3 px-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupPayments.map((payment) => (
                  <tr key={payment.id} className="border-t border-slate-700 hover:bg-slate-800/50">
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-cyan-400 font-mono text-xs">{payment.paymentNumber}</div>
                      <div className="text-slate-400 text-xs">{payment.invoiceNumber}</div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-white font-medium">{payment.vendorName}</div>
                      <div className="text-slate-400 text-xs flex items-center gap-1">
                        {payment.paymentType === 'worker' ? (
                          <><User className="w-3 h-3" /> {payment.category}</>
                        ) : (
                          <><Building2 className="w-3 h-3" /> {payment.category}</>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 whitespace-nowrap">{payment.projectName}</td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs truncate">{payment.description}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="text-white font-semibold">{formatCurrency(payment.amount)}</div>
                      {payment.costCode && (
                        <div className="text-slate-400 text-xs font-mono">{payment.costCode}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="text-slate-300">{new Date(payment.dueDate).toLocaleDateString('en-KE')}</div>
                      {payment.status === 'overdue' && (
                        <div className="text-red-400 text-xs font-semibold">Overdue!</div>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        <span className="capitalize">{payment.status}</span>
                      </div>
                      {payment.approvedBy && (
                        <div className="text-slate-400 text-xs mt-1">by {payment.approvedBy}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        {payment.status === 'pending' || payment.status === 'overdue' ? (
                          <>
                            <button
                              onClick={() => handleApprove(payment)}
                              className="p-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(payment)}
                              className="p-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        ) : payment.status === 'approved' ? (
                          <button
                            onClick={() => handleProcessPayment(payment)}
                            className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded flex items-center gap-1 text-xs font-semibold"
                          >
                            <Send className="w-3 h-3" />
                            Pay Now
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleViewDetails(payment)}
                            className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors" 
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {groupPayments.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No payments in this group.</p>
              </div>
            )}
          </div>
        ))}

        {filteredPayments.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No payments found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowPaymentModal(false)}>
          <div className="bg-slate-800 rounded-lg border border-slate-600 p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              Process Payment
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Payment Number</div>
                    <div className="text-white font-mono text-sm">{selectedPayment.paymentNumber}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Invoice Number</div>
                    <div className="text-white font-mono text-sm">{selectedPayment.invoiceNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-400 mt-1" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs mb-1">Vendor</div>
                    <div className="text-white font-semibold">{selectedPayment.vendorName}</div>
                    <div className="text-slate-300 text-sm mt-1">{selectedPayment.description}</div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-950/20 rounded-lg p-4 border border-cyan-600/30">
                <div className="text-cyan-400 text-sm mb-1">Payment Amount</div>
                <div className="text-3xl font-bold text-white">{formatCurrency(selectedPayment.amount)}</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-3">Select Payment Method</div>
                <div className="space-y-2">
                  <button
                    onClick={() => executePayment('M-Pesa Business')}
                    className="w-full p-3 bg-green-700 hover:bg-green-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">M-Pesa Business</div>
                        <div className="text-xs opacity-80">Instant mobile payment</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => executePayment('Bank Transfer (EFT)')}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Bank Transfer (EFT)</div>
                        <div className="text-xs opacity-80">1-2 business days</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => executePayment('Check Payment')}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Check Payment</div>
                        <div className="text-xs opacity-80">Print and mail</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => executePayment('Cash Payment')}
                    className="w-full p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">Cash Payment</div>
                        <div className="text-xs opacity-80">Immediate payment</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && selectedPayment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirmation(false)}>
          <div className="bg-slate-800 rounded-lg border border-slate-600 p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              Confirm Payment
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Payment Number</div>
                    <div className="text-white font-mono text-sm">{selectedPayment.paymentNumber}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Invoice Number</div>
                    <div className="text-white font-mono text-sm">{selectedPayment.invoiceNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-400 mt-1" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs mb-1">Vendor</div>
                    <div className="text-white font-semibold">{selectedPayment.vendorName}</div>
                    <div className="text-slate-300 text-sm mt-1">{selectedPayment.description}</div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-950/20 rounded-lg p-4 border border-cyan-600/30">
                <div className="text-cyan-400 text-sm mb-1">Payment Amount</div>
                <div className="text-3xl font-bold text-white">{formatCurrency(selectedPayment.amount)}</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-3">Selected Payment Method</div>
                <div className="space-y-2">
                  <button
                    className="w-full p-3 bg-green-700 hover:bg-green-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{selectedPaymentMethod}</div>
                        <div className="text-xs opacity-80">Instant mobile payment</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => confirmPayment()}
                className="flex-1 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionConfirmation && pendingAction.payment && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowActionConfirmation(false)}>
          <div className="bg-slate-800 rounded-lg border border-slate-600 p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-cyan-400" />
              Confirm Action
            </h3>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Payment Number</div>
                    <div className="text-white font-mono text-sm">{pendingAction.payment.paymentNumber}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs mb-1">Invoice Number</div>
                    <div className="text-white font-mono text-sm">{pendingAction.payment.invoiceNumber}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-cyan-400 mt-1" />
                  <div className="flex-1">
                    <div className="text-slate-400 text-xs mb-1">Vendor</div>
                    <div className="text-white font-semibold">{pendingAction.payment.vendorName}</div>
                    <div className="text-slate-300 text-sm mt-1">{pendingAction.payment.description}</div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-950/20 rounded-lg p-4 border border-cyan-600/30">
                <div className="text-cyan-400 text-sm mb-1">Payment Amount</div>
                <div className="text-3xl font-bold text-white">{formatCurrency(pendingAction.payment.amount)}</div>
              </div>

              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <div className="text-slate-400 text-xs mb-3">Action Type</div>
                <div className="space-y-2">
                  <button
                    className="w-full p-3 bg-green-700 hover:bg-green-600 text-white rounded-lg flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-semibold">{pendingAction.type.charAt(0).toUpperCase() + pendingAction.type.slice(1)}</div>
                        <div className="text-xs opacity-80">Instant mobile payment</div>
                      </div>
                    </div>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => executeAction()}
                className="flex-1 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded transition-colors"
              >
                Confirm Action
              </button>
              <button
                onClick={() => setShowActionConfirmation(false)}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Form */}
      <AddPaymentForm 
        isOpen={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        onSubmit={handleAddPayment}
      />
    </div>
  );
}