import { useState } from 'react';
import { Users, Plus, AlertTriangle, Shield, FileCheck, TrendingUp, Phone, Mail, Calendar, DollarSign } from 'lucide-react';

interface Subcontractor {
  id: string;
  name: string;
  trade: string;
  contact: {
    phone: string;
    email: string;
    representative: string;
  };
  insurance: {
    liability: { expires: string; amount: number; status: 'active' | 'expiring' | 'expired' };
    workersComp: { expires: string; status: 'active' | 'expiring' | 'expired' };
  };
  bonding: {
    capacity: number;
    current: number;
  };
  performance: {
    rating: number;
    projectsCompleted: number;
    onTimeDelivery: number;
    qualityScore: number;
    safetyIncidents: number;
  };
  activeProjects: string[];
  totalContractValue: number;
  lienWaivers: {
    pending: number;
    received: number;
  };
}

const mockSubcontractors: Subcontractor[] = [
  {
    id: 'sub1',
    name: 'Premier Electrical Solutions',
    trade: 'Electrical',
    contact: {
      phone: '+254 712 345 678',
      email: 'info@premierelec.co.ke',
      representative: 'James Kimani',
    },
    insurance: {
      liability: { expires: '2026-03-15', amount: 5000000, status: 'active' },
      workersComp: { expires: '2026-03-15', status: 'active' },
    },
    bonding: {
      capacity: 15000000,
      current: 8500000,
    },
    performance: {
      rating: 4.5,
      projectsCompleted: 12,
      onTimeDelivery: 92,
      qualityScore: 4.6,
      safetyIncidents: 0,
    },
    activeProjects: ['Riverside Mall', 'Westlands Office'],
    totalContractValue: 4200000,
    lienWaivers: { pending: 1, received: 5 },
  },
  {
    id: 'sub2',
    name: 'Kariuki Plumbing & HVAC',
    trade: 'Plumbing/HVAC',
    contact: {
      phone: '+254 722 987 654',
      email: 'contact@kariukiplumbing.co.ke',
      representative: 'Peter Kariuki',
    },
    insurance: {
      liability: { expires: '2026-03-01', amount: 3000000, status: 'expiring' },
      workersComp: { expires: '2026-03-01', status: 'expiring' },
    },
    bonding: {
      capacity: 10000000,
      current: 6200000,
    },
    performance: {
      rating: 4.2,
      projectsCompleted: 8,
      onTimeDelivery: 88,
      qualityScore: 4.3,
      safetyIncidents: 1,
    },
    activeProjects: ['Karen Residential', 'Riverside Mall'],
    totalContractValue: 3100000,
    lienWaivers: { pending: 2, received: 3 },
  },
  {
    id: 'sub3',
    name: 'Nairobi Steel Fabricators',
    trade: 'Structural Steel',
    contact: {
      phone: '+254 733 456 789',
      email: 'info@nairobisteel.co.ke',
      representative: 'Sarah Mwangi',
    },
    insurance: {
      liability: { expires: '2026-08-20', amount: 8000000, status: 'active' },
      workersComp: { expires: '2026-08-20', status: 'active' },
    },
    bonding: {
      capacity: 25000000,
      current: 18000000,
    },
    performance: {
      rating: 4.8,
      projectsCompleted: 15,
      onTimeDelivery: 95,
      qualityScore: 4.9,
      safetyIncidents: 0,
    },
    activeProjects: ['Westlands Office', 'Industrial Park'],
    totalContractValue: 6800000,
    lienWaivers: { pending: 0, received: 8 },
  },
  {
    id: 'sub4',
    name: 'Mombasa Road Concrete',
    trade: 'Concrete',
    contact: {
      phone: '+254 745 123 456',
      email: 'info@mombasaconcrete.co.ke',
      representative: 'David Omondi',
    },
    insurance: {
      liability: { expires: '2026-02-28', amount: 4000000, status: 'expiring' },
      workersComp: { expires: '2026-02-28', status: 'expiring' },
    },
    bonding: {
      capacity: 12000000,
      current: 9500000,
    },
    performance: {
      rating: 3.9,
      projectsCompleted: 10,
      onTimeDelivery: 82,
      qualityScore: 4.0,
      safetyIncidents: 2,
    },
    activeProjects: ['Industrial Park'],
    totalContractValue: 2900000,
    lienWaivers: { pending: 3, received: 4 },
  },
];

interface SubcontractorManagementProps {
  onAddSubcontractor: () => void;
}

export function SubcontractorManagement({ onAddSubcontractor }: SubcontractorManagementProps) {
  const [selectedTrade, setSelectedTrade] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const trades = ['all', 'Electrical', 'Plumbing/HVAC', 'Structural Steel', 'Concrete', 'Framing'];
  
  const filteredSubs = mockSubcontractors.filter((sub) => {
    if (selectedTrade !== 'all' && sub.trade !== selectedTrade) return false;
    if (selectedStatus === 'expiring' && sub.insurance.liability.status !== 'expiring') return false;
    if (selectedStatus === 'active' && sub.insurance.liability.status !== 'active') return false;
    return true;
  });

  const stats = {
    total: mockSubcontractors.length,
    active: mockSubcontractors.filter(s => s.activeProjects.length > 0).length,
    insuranceExpiring: mockSubcontractors.filter(s => s.insurance.liability.status === 'expiring').length,
    avgRating: (mockSubcontractors.reduce((sum, s) => sum + s.performance.rating, 0) / mockSubcontractors.length).toFixed(1),
    pendingLienWaivers: mockSubcontractors.reduce((sum, s) => sum + s.lienWaivers.pending, 0),
    totalValue: mockSubcontractors.reduce((sum, s) => sum + s.totalContractValue, 0),
  };

  return (
    <div className="space-y-4">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Subcontractors</div>
          <div className="text-2xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Active Projects</div>
          <div className="text-2xl font-bold text-green-400">{stats.active}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Insurance Expiring</div>
          <div className="text-2xl font-bold text-amber-400">{stats.insuranceExpiring}</div>
        </div>
        <div className="bg-cyan-950/30 rounded-lg p-4 border border-cyan-600/50">
          <div className="text-cyan-400 text-xs mb-1">Avg Rating</div>
          <div className="text-2xl font-bold text-cyan-400">{stats.avgRating}/5</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">Pending Waivers</div>
          <div className="text-2xl font-bold text-red-400">{stats.pendingLienWaivers}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Contract Value</div>
          <div className="text-lg font-bold text-white">KES {(stats.totalValue / 1000000).toFixed(1)}M</div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            {trades.map((trade) => (
              <option key={trade} value={trade}>
                {trade === 'all' ? 'All Trades' : trade}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Status</option>
            <option value="active">Insurance Active</option>
            <option value="expiring">Insurance Expiring</option>
          </select>
        </div>

        <button
          onClick={onAddSubcontractor}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subcontractor</span>
        </button>
      </div>

      {/* Subcontractors List */}
      <div className="space-y-3">
        {filteredSubs.map((sub) => (
          <div key={sub.id} className="bg-slate-900/50 rounded-lg border border-slate-700 p-3 hover:border-cyan-600/50 transition-colors">
            {/* Header - Compact Single Row */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white truncate">{sub.name}</h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="px-1.5 py-0.5 bg-slate-700 text-cyan-400 rounded text-xs font-semibold">
                      {sub.trade}
                    </span>
                    {sub.insurance.liability.status === 'expiring' && (
                      <span className="px-1.5 py-0.5 bg-amber-600 text-white rounded text-xs font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Insurance Expiring
                      </span>
                    )}
                    {sub.lienWaivers.pending > 0 && (
                      <span className="px-1.5 py-0.5 bg-red-600 text-white rounded text-xs font-semibold">
                        {sub.lienWaivers.pending} Lien Waiver(s) Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Performance Rating - Compact */}
              <div className="bg-slate-800/50 rounded-lg px-3 py-1.5 text-center">
                <div className="text-xs text-slate-400">Performance</div>
                <div className="text-xl font-bold text-cyan-400">{sub.performance.rating}<span className="text-sm text-slate-400">/5.0</span></div>
              </div>
            </div>

            {/* Contact Info - Single Line */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-2 pb-2 border-b border-slate-700">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{sub.contact.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{sub.contact.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-slate-400" />
                <span className="text-slate-300">{sub.contact.representative}</span>
              </div>
            </div>

            {/* Main Info Grid - Compact 2 Rows */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {/* Insurance - Inline */}
              <div className="bg-slate-800/30 rounded p-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">Insurance Coverage</span>
                </div>
                <div className="space-y-0.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Liability:</span>
                    <span className="text-white font-semibold">KES {(sub.insurance.liability.amount / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expires:</span>
                    <span className={sub.insurance.liability.status === 'expiring' ? 'text-amber-400' : 'text-green-400'}>
                      {new Date(sub.insurance.liability.expires).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Workers Comp:</span>
                    <span className={sub.insurance.workersComp.status === 'expiring' ? 'text-amber-400' : 'text-green-400'}>
                      Expires: {new Date(sub.insurance.workersComp.expires).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bonding - Inline */}
              <div className="bg-slate-800/30 rounded p-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3 h-3 text-cyan-400" />
                  <span className="text-xs font-semibold text-white">Bonding Capacity</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Total Capacity:</span>
                    <span className="text-white font-semibold">KES {(sub.bonding.capacity / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Current Usage:</span>
                    <span className="text-white font-semibold">KES {(sub.bonding.current / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-cyan-500 h-1.5 rounded-full"
                      style={{ width: `${(sub.bonding.current / sub.bonding.capacity) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 text-right">
                    {((sub.bonding.current / sub.bonding.capacity) * 100).toFixed(0)}% utilized
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics + Projects - Single Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Performance Pills */}
              <div className="flex items-center gap-2 flex-1">
                <div className="bg-slate-800/30 rounded px-2 py-1">
                  <span className="text-xs text-slate-400">Projects:</span>
                  <span className="text-xs font-bold text-white ml-1">{sub.performance.projectsCompleted}</span>
                </div>
                <div className="bg-slate-800/30 rounded px-2 py-1">
                  <span className="text-xs text-slate-400">On-Time:</span>
                  <span className="text-xs font-bold text-green-400 ml-1">{sub.performance.onTimeDelivery}%</span>
                </div>
                <div className="bg-slate-800/30 rounded px-2 py-1">
                  <span className="text-xs text-slate-400">Quality:</span>
                  <span className="text-xs font-bold text-cyan-400 ml-1">{sub.performance.qualityScore}/5</span>
                </div>
                <div className="bg-slate-800/30 rounded px-2 py-1">
                  <span className="text-xs text-slate-400">Safety:</span>
                  <span className={`text-xs font-bold ml-1 ${sub.performance.safetyIncidents === 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {sub.performance.safetyIncidents}
                  </span>
                </div>
              </div>

              {/* Active Projects */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Active:</span>
                <div className="flex gap-1.5">
                  {sub.activeProjects.map((project, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-cyan-950/30 border border-cyan-600/50 text-cyan-400 rounded text-xs">
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contract Value */}
              <div className="bg-slate-800/50 rounded px-2 py-1">
                <span className="text-xs text-slate-400">Contract Value</span>
                <span className="text-sm font-bold text-white ml-2">KES {(sub.totalContractValue / 1000000).toFixed(2)}M</span>
              </div>

              {/* Lien Waivers */}
              <div className="bg-slate-800/50 rounded px-2 py-1">
                <span className="text-xs text-slate-400">Lien Waivers</span>
                <span className="text-sm font-bold text-white ml-2">{sub.lienWaivers.received}/{sub.lienWaivers.pending + sub.lienWaivers.received}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubs.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-700">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No subcontractors found matching your filters</p>
        </div>
      )}
    </div>
  );
}