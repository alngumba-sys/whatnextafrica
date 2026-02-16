import { Sparkles, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface AIInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  type: 'opportunity' | 'warning' | 'optimization';
  actionable: string;
  potentialSavings?: number;
  timeframe?: string;
}

interface AIInsightCardProps {
  insights: AIInsight[];
  moduleTitle: string;
}

export function AIInsightCard({ insights, moduleTitle }: AIInsightCardProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-l-cyan-500 bg-cyan-950/20';
      case 'medium': return 'border-l-amber-500 bg-amber-950/20';
      case 'low': return 'border-l-green-500 bg-green-950/20';
      default: return 'border-l-slate-500 bg-slate-800/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-4 h-4 text-cyan-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'optimization': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'opportunity': return 'Opportunity';
      case 'warning': return 'Warning';
      case 'optimization': return 'Optimization';
      default: return 'Insight';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-cyan-600';
      case 'warning': return 'bg-amber-600';
      case 'optimization': return 'bg-green-600';
      default: return 'bg-slate-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-cyan-600/30 p-4 md:p-6 shadow-lg shadow-cyan-900/20">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-lg flex items-center justify-center animate-pulse">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">AI Insights</h3>
          <p className="text-xs text-slate-400">{moduleTitle}</p>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div
            key={insight.id}
            className={`border-l-4 rounded-lg p-4 ${getImpactColor(insight.impact)} hover:bg-opacity-80 transition-all`}
          >
            {/* Insight Header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-2 flex-1">
                <div className="mt-0.5">{getTypeIcon(insight.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`px-2 py-0.5 ${getTypeBadgeColor(insight.type)} text-white rounded text-xs font-semibold`}>
                      {getTypeLabel(insight.type)}
                    </span>
                    {insight.impact === 'high' && (
                      <span className="px-2 py-0.5 bg-red-600 text-white rounded text-xs font-semibold">
                        HIGH PRIORITY
                      </span>
                    )}
                  </div>
                  <h4 className="text-white font-semibold text-sm md:text-base">{insight.title}</h4>
                </div>
              </div>
              {insight.potentialSavings && (
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-slate-400">Potential Impact</div>
                  <div className="text-lg font-bold text-cyan-400">
                    KES {(insight.potentialSavings / 1000).toFixed(0)}K
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 mb-3">{insight.description}</p>

            {/* Actionable Item */}
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
              <div className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs text-cyan-400 font-semibold mb-1">RECOMMENDED ACTION</div>
                  <p className="text-sm text-white">{insight.actionable}</p>
                  {insight.timeframe && (
                    <div className="text-xs text-slate-400 mt-1">⏱️ Timeframe: {insight.timeframe}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-700">
        <p className="text-xs text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          AI-powered recommendations updated in real-time based on portfolio data
        </p>
      </div>
    </div>
  );
}
