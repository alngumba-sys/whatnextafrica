import { useState } from 'react';
import { AlertTriangle, Plus, TrendingUp, Shield, DollarSign, Calendar, Target } from 'lucide-react';
import { AIInsightCard } from './AIInsightCard';

interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'cost' | 'schedule' | 'quality' | 'safety' | 'financial';
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  financialExposure: number;
  scheduleImpact: number; // days
  project: string;
  mitigation: string;
  owner: string;
  status: 'active' | 'monitoring' | 'mitigated' | 'occurred';
  dateIdentified: string;
  lastUpdated: string;
}

const mockRisks: Risk[] = [
  {
    id: 'r1',
    title: 'Weather Delays - Riverside Mall',
    description: 'Extended rainy season could delay outdoor concrete work and foundation completion',
    category: 'schedule',
    probability: 'high',
    impact: 'high',
    financialExposure: 125000,
    scheduleImpact: 14,
    project: 'Riverside Mall',
    mitigation: 'Deploy extended weather protection tents, adjust schedule to prioritize interior work during rainy periods, maintain 2-week buffer in critical path',
    owner: 'James Mwangi - PM',
    status: 'active',
    dateIdentified: '2026-01-15',
    lastUpdated: '2026-02-10',
  },
  {
    id: 'r2',
    title: 'Steel Price Escalation',
    description: 'Global steel prices trending upward 15-20% due to supply chain disruptions',
    category: 'cost',
    probability: 'medium',
    impact: 'high',
    financialExposure: 85000,
    scheduleImpact: 0,
    project: 'Westlands Office',
    mitigation: 'Lock in pricing with suppliers through forward contracts, explore alternative structural systems, increase contingency reserve',
    owner: 'Sarah Kimani - Procurement',
    status: 'monitoring',
    dateIdentified: '2026-01-20',
    lastUpdated: '2026-02-12',
  },
  {
    id: 'r3',
    title: 'Skilled Labor Shortage',
    description: 'Critical shortage of certified welders and electricians in Nairobi market',
    category: 'schedule',
    probability: 'high',
    impact: 'medium',
    financialExposure: 65000,
    scheduleImpact: 10,
    project: 'Industrial Park',
    mitigation: 'Pre-qualify multiple subcontractors, offer premium rates to secure crews, cross-train existing workforce',
    owner: 'Peter Omondi - Super',
    status: 'active',
    dateIdentified: '2026-01-10',
    lastUpdated: '2026-02-14',
  },
  {
    id: 'r4',
    title: 'Soil Contamination Discovery',
    description: 'Potential for encountering contaminated soil requiring remediation during excavation',
    category: 'cost',
    probability: 'low',
    impact: 'high',
    financialExposure: 180000,
    scheduleImpact: 21,
    project: 'Karen Residential',
    mitigation: 'Phase I Environmental Site Assessment completed, maintain emergency remediation contractor on standby, allocate contingency funds',
    owner: 'David Njoroge - PM',
    status: 'monitoring',
    dateIdentified: '2025-12-05',
    lastUpdated: '2026-02-01',
  },
  {
    id: 'r5',
    title: 'Client Payment Delay',
    description: 'Client experiencing cash flow issues, potential 30-60 day payment delays',
    category: 'financial',
    probability: 'medium',
    impact: 'medium',
    financialExposure: 95000,
    scheduleImpact: 0,
    project: 'Westlands Office',
    mitigation: 'Negotiate payment terms upfront, require deposits, maintain line of credit, reduce payment cycles to subcontractors',
    owner: 'Finance Team',
    status: 'active',
    dateIdentified: '2026-02-05',
    lastUpdated: '2026-02-13',
  },
  {
    id: 'r6',
    title: 'Defective Concrete Mix',
    description: 'Ready-mix supplier quality control issues detected on recent projects',
    category: 'quality',
    probability: 'low',
    impact: 'high',
    financialExposure: 145000,
    scheduleImpact: 18,
    project: 'Riverside Mall',
    mitigation: 'Implement third-party testing protocol, pre-qualify alternate suppliers, increase QC inspections',
    owner: 'Quality Manager',
    status: 'mitigated',
    dateIdentified: '2026-01-25',
    lastUpdated: '2026-02-08',
  },
];

interface RiskRegisterProps {
  onAddRisk: () => void;
}

export function RiskRegister({ onAddRisk }: RiskRegisterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const getProbabilityColor = (prob: string) => {
    switch (prob) {
      case 'high': return 'text-red-400 bg-red-950/30 border-red-600/50';
      case 'medium': return 'text-amber-400 bg-amber-950/30 border-amber-600/50';
      case 'low': return 'text-green-400 bg-green-950/30 border-green-600/50';
      default: return 'text-slate-400 bg-slate-800 border-slate-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-950/30 border-red-600/50';
      case 'medium': return 'text-amber-400 bg-amber-950/30 border-amber-600/50';
      case 'low': return 'text-green-400 bg-green-950/30 border-green-600/50';
      default: return 'text-slate-400 bg-slate-800 border-slate-600';
    }
  };

  const getRiskScore = (prob: string, impact: string) => {
    const probValue = prob === 'high' ? 3 : prob === 'medium' ? 2 : 1;
    const impactValue = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1;
    return probValue * impactValue;
  };

  const filteredRisks = mockRisks.filter((risk) => {
    if (selectedCategory !== 'all' && risk.category !== selectedCategory) return false;
    const score = getRiskScore(risk.probability, risk.impact);
    if (selectedSeverity === 'critical' && score < 6) return false;
    if (selectedSeverity === 'high' && (score < 4 || score > 6)) return false;
    if (selectedSeverity === 'moderate' && score !== 2) return false;
    return true;
  });

  const stats = {
    totalRisks: mockRisks.length,
    criticalRisks: mockRisks.filter(r => getRiskScore(r.probability, r.impact) >= 6).length,
    totalExposure: mockRisks.reduce((sum, r) => sum + r.financialExposure, 0),
    activeRisks: mockRisks.filter(r => r.status === 'active').length,
    mitigatedRisks: mockRisks.filter(r => r.status === 'mitigated').length,
    avgScheduleImpact: (mockRisks.reduce((sum, r) => sum + r.scheduleImpact, 0) / mockRisks.length).toFixed(0),
  };

  return (
    <div className="space-y-4">
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Risks</div>
          <div className="text-2xl font-bold text-white">{stats.totalRisks}</div>
        </div>
        <div className="bg-red-950/30 rounded-lg p-4 border border-red-600/50">
          <div className="text-red-400 text-xs mb-1">Critical Risks</div>
          <div className="text-2xl font-bold text-red-400">{stats.criticalRisks}</div>
        </div>
        <div className="bg-amber-950/30 rounded-lg p-4 border border-amber-600/50">
          <div className="text-amber-400 text-xs mb-1">Active Risks</div>
          <div className="text-2xl font-bold text-amber-400">{stats.activeRisks}</div>
        </div>
        <div className="bg-green-950/30 rounded-lg p-4 border border-green-600/50">
          <div className="text-green-400 text-xs mb-1">Mitigated</div>
          <div className="text-2xl font-bold text-green-400">{stats.mitigatedRisks}</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Total Exposure</div>
          <div className="text-lg font-bold text-white">KES {(stats.totalExposure / 1000).toFixed(0)}K</div>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
          <div className="text-slate-400 text-xs mb-1">Avg Schedule Impact</div>
          <div className="text-2xl font-bold text-white">{stats.avgScheduleImpact} days</div>
        </div>
      </div>

      {/* Risk Matrix Heatmap */}
      <div className="bg-slate-900/50 rounded-lg border border-slate-700 p-4 md:p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-cyan-400" />
          Risk Probability vs Impact Matrix
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-4 gap-2">
              <div></div>
              <div className="text-center text-xs text-slate-400 font-semibold py-2">Low Impact</div>
              <div className="text-center text-xs text-slate-400 font-semibold py-2">Medium Impact</div>
              <div className="text-center text-xs text-slate-400 font-semibold py-2">High Impact</div>
              
              <div className="text-xs text-slate-400 font-semibold flex items-center justify-end pr-2">High Probability</div>
              <div className="bg-amber-950/30 border border-amber-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-amber-400">
                  {mockRisks.filter(r => r.probability === 'high' && r.impact === 'low').length}
                </div>
                <div className="text-xs text-slate-400">Moderate</div>
              </div>
              <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-red-400">
                  {mockRisks.filter(r => r.probability === 'high' && r.impact === 'medium').length}
                </div>
                <div className="text-xs text-slate-400">High</div>
              </div>
              <div className="bg-red-950/50 border-2 border-red-600 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-red-400">
                  {mockRisks.filter(r => r.probability === 'high' && r.impact === 'high').length}
                </div>
                <div className="text-xs text-red-300">CRITICAL</div>
              </div>

              <div className="text-xs text-slate-400 font-semibold flex items-center justify-end pr-2">Med Probability</div>
              <div className="bg-green-950/30 border border-green-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-green-400">
                  {mockRisks.filter(r => r.probability === 'medium' && r.impact === 'low').length}
                </div>
                <div className="text-xs text-slate-400">Low</div>
              </div>
              <div className="bg-amber-950/30 border border-amber-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-amber-400">
                  {mockRisks.filter(r => r.probability === 'medium' && r.impact === 'medium').length}
                </div>
                <div className="text-xs text-slate-400">Moderate</div>
              </div>
              <div className="bg-red-950/30 border border-red-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-red-400">
                  {mockRisks.filter(r => r.probability === 'medium' && r.impact === 'high').length}
                </div>
                <div className="text-xs text-slate-400">High</div>
              </div>

              <div className="text-xs text-slate-400 font-semibold flex items-center justify-end pr-2">Low Probability</div>
              <div className="bg-green-950/30 border border-green-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-green-400">
                  {mockRisks.filter(r => r.probability === 'low' && r.impact === 'low').length}
                </div>
                <div className="text-xs text-slate-400">Low</div>
              </div>
              <div className="bg-green-950/30 border border-green-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-green-400">
                  {mockRisks.filter(r => r.probability === 'low' && r.impact === 'medium').length}
                </div>
                <div className="text-xs text-slate-400">Low</div>
              </div>
              <div className="bg-amber-950/30 border border-amber-600/50 rounded-lg p-3 text-center">
                <div className="text-sm font-bold text-amber-400">
                  {mockRisks.filter(r => r.probability === 'low' && r.impact === 'high').length}
                </div>
                <div className="text-xs text-slate-400">Moderate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Categories</option>
            <option value="cost">Cost Risks</option>
            <option value="schedule">Schedule Risks</option>
            <option value="quality">Quality Risks</option>
            <option value="safety">Safety Risks</option>
            <option value="financial">Financial Risks</option>
          </select>
          
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical (9)</option>
            <option value="high">High (4-6)</option>
            <option value="moderate">Moderate (2-3)</option>
          </select>
        </div>

        <button
          onClick={onAddRisk}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors shadow-lg whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add Risk</span>
        </button>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const riskScore = getRiskScore(risk.probability, risk.impact);
          const severityLabel = riskScore >= 6 ? 'CRITICAL' : riskScore >= 4 ? 'HIGH' : 'MODERATE';
          const severityColor = riskScore >= 6 ? 'bg-red-600' : riskScore >= 4 ? 'bg-amber-600' : 'bg-green-600';

          return (
            <div key={risk.id} className="bg-slate-900/50 rounded-lg border border-slate-700 p-4 md:p-6 hover:border-cyan-600/50 transition-colors">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-12 h-12 ${severityColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1">{risk.title}</h3>
                      <p className="text-sm text-slate-300 mb-2">{risk.description}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-1 ${severityColor} text-white rounded text-xs font-semibold`}>
                          {severityLabel} RISK
                        </span>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs">
                          {risk.category.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 bg-cyan-950/30 border border-cyan-600/50 text-cyan-400 rounded text-xs">
                          {risk.project}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          risk.status === 'active' ? 'bg-red-600 text-white' :
                          risk.status === 'mitigated' ? 'bg-green-600 text-white' :
                          'bg-slate-700 text-slate-300'
                        }`}>
                          {risk.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Score */}
                <div className="bg-slate-800/50 rounded-lg p-3 text-center min-w-[100px]">
                  <div className="text-xs text-slate-400 mb-1">Risk Score</div>
                  <div className={`text-3xl font-bold ${riskScore >= 6 ? 'text-red-400' : riskScore >= 4 ? 'text-amber-400' : 'text-green-400'}`}>
                    {riskScore}
                  </div>
                  <div className="text-xs text-slate-400">out of 9</div>
                </div>
              </div>

              {/* Probability & Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-700">
                <div className={`rounded-lg p-3 border ${getProbabilityColor(risk.probability)}`}>
                  <div className="text-xs mb-1">Probability</div>
                  <div className="text-lg font-bold uppercase">{risk.probability}</div>
                </div>
                <div className={`rounded-lg p-3 border ${getImpactColor(risk.impact)}`}>
                  <div className="text-xs mb-1">Impact</div>
                  <div className="text-lg font-bold uppercase">{risk.impact}</div>
                </div>
              </div>

              {/* Financial & Schedule Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-950/20 rounded-lg p-4 border border-red-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-white">Financial Exposure</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    KES {risk.financialExposure.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Potential cost impact</div>
                </div>

                <div className="bg-amber-950/20 rounded-lg p-4 border border-amber-600/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-white">Schedule Impact</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-400">
                    {risk.scheduleImpact} days
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Potential delay</div>
                </div>
              </div>

              {/* Mitigation Plan */}
              <div className="bg-slate-800/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">Mitigation Strategy</span>
                </div>
                <p className="text-sm text-slate-300">{risk.mitigation}</p>
              </div>

              {/* Footer Info */}
              <div className="flex flex-col sm:flex-row gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">Owner:</span>
                  <span>{risk.owner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">Identified:</span>
                  <span>{new Date(risk.dateIdentified).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-300">Last Updated:</span>
                  <span>{new Date(risk.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRisks.length === 0 && (
        <div className="text-center py-12 bg-slate-900/50 rounded-lg border border-slate-700">
          <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">No risks found matching your filters</p>
        </div>
      )}

      {/* AI Insights */}
      <AIInsightCard 
        insights={[
          {
            id: 'risk1',
            title: 'Concentration Risk - Weather Dependencies',
            description: 'AI detected 3 critical risks (Weather Delays, Skilled Labor Shortage, Steel Price Escalation) all peak during March-April period creating correlated exposure. If all materialize simultaneously, combined impact is KES 275K + 24 days delay.',
            impact: 'high' as const,
            type: 'warning' as const,
            actionable: 'Implement portfolio-level diversification: (1) Accelerate indoor work on Westlands Tower to reduce weather exposure (2) Lock in steel pricing NOW before April (3) Pre-hire labor crews with 60-day commitments. This reduces correlated risk by 65%.',
            potentialSavings: 178000,
            timeframe: 'Act before March 1',
          },
          {
            id: 'risk2',
            title: 'Risk Transfer Opportunity - Payment Delays',
            description: 'Westlands Office client has Medium/Medium payment delay risk (KES 95K exposure). Your contract has no payment security provisions. Analysis shows this client paid 38 days late on previous project.',
            impact: 'high' as const,
            type: 'opportunity' as const,
            actionable: 'Amend contract to require: (1) Irrevocable standby letter of credit for 2 months of billings (2) Subordination of payment terms (you get paid before their other creditors) (3) 1.5% monthly interest on late payments. This transfers 80% of financial risk to client.',
            potentialSavings: 95000,
            timeframe: 'Amend contract this week',
          },
          {
            id: 'risk3',
            title: 'Redundant Risk Mitigation - Quality Controls',
            description: 'You\'re spending KES 28K/month on third-party concrete testing (Defective Concrete Mix risk mitigation) PLUS paying Mombasa Road Concrete KES 85/m³ premium for "certified quality mix." AI analysis shows you\'re double-paying for the same risk mitigation.',
            impact: 'medium' as const,
            type: 'optimization' as const,
            actionable: 'Renegotiate Mombasa Road Concrete contract to standard pricing (remove KES 85/m³ premium) since you\'re already doing independent testing. This saves KES 23K/month (KES 276K annually) while maintaining same risk mitigation effectiveness.',
            potentialSavings: 276000,
            timeframe: 'Renegotiate next month',
          },
        ]} 
        moduleTitle="Risk Register" 
      />
    </div>
  );
}