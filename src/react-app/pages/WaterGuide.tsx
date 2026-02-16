import { useState } from 'react';
import { Card } from '@/react-app/components/ui/card';
import { BookOpen, Droplet, AlertCircle, CheckCircle, Info, Beaker, Activity, ChevronDown, ChevronUp, Phone, Mail } from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  content: string[];
  expanded?: boolean;
}

const guideSections: GuideSection[] = [
  {
    id: 'ph',
    title: 'pH Level',
    icon: Beaker,
    color: 'from-purple-400 to-pink-500',
    content: [
      'pH measures how acidic or alkaline water is on a scale of 0-14',
      'WHO Safe Range: 6.5 - 8.5 (neutral is 7.0)',
      'Below 6.5: Acidic water may corrode pipes and leach metals',
      'Above 8.5: Alkaline water may taste bitter and cause scaling',
      'Health Impact: Extreme pH can affect skin, digestion, and nutrient absorption',
      'Testing: Use pH strips or digital meters for accurate readings'
    ]
  },
  {
    id: 'tds',
    title: 'TDS (Total Dissolved Solids)',
    icon: Activity,
    color: 'from-blue-400 to-cyan-500',
    content: [
      'TDS measures total minerals, salts, and metals dissolved in water (ppm)',
      'Excellent: < 300 ppm - Great taste, ideal for drinking',
      'Good: 300 - 600 ppm - Acceptable quality',
      'Fair: 600 - 900 ppm - Not ideal for regular consumption',
      'Poor: > 900 ppm - Unpleasant taste, potential health concerns',
      'Health Impact: High TDS may indicate contamination or excessive minerals',
      'Note: Very low TDS water lacks beneficial minerals'
    ]
  },
  {
    id: 'turbidity',
    title: 'Turbidity',
    icon: Droplet,
    color: 'from-teal-400 to-emerald-500',
    content: [
      'Turbidity measures cloudiness or haziness in water (NTU)',
      'WHO Safe Range: < 5 NTU for drinking water',
      'Excellent: < 1 NTU - Crystal clear',
      'Acceptable: 1 - 5 NTU - Slightly cloudy',
      'Poor: > 5 NTU - Visibly cloudy or murky',
      'Causes: Suspended particles, clay, silt, algae, or microorganisms',
      'Health Impact: High turbidity can harbor bacteria and pathogens',
      'Treatment: Use filtration systems to reduce turbidity'
    ]
  },
  {
    id: 'temperature',
    title: 'Temperature',
    icon: AlertCircle,
    color: 'from-orange-400 to-red-500',
    content: [
      'Temperature affects water quality and bacterial growth (°C)',
      'Optimal Range: 15 - 30°C for drinking water',
      'Below 15°C: Too cold, may affect taste and feel uncomfortable',
      'Above 30°C: Warm water promotes bacterial growth',
      'Health Impact: Temperature affects chemical reactions and dissolved oxygen',
      'Storage: Store drinking water in cool, dark places (15-25°C)',
      'Note: Warm water can dissolve more contaminants from pipes'
    ]
  }
];

const whoGuidelines = [
  { parameter: 'pH', safeRange: '6.5 - 8.5', unit: '' },
  { parameter: 'TDS', safeRange: '< 500', unit: 'ppm' },
  { parameter: 'Turbidity', safeRange: '< 5', unit: 'NTU' },
  { parameter: 'Temperature', safeRange: '15 - 30', unit: '°C' },
];

const usageRecommendations = [
  {
    title: 'Safe to Drink (Score 80-100)',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-500',
    recommendations: [
      'Water is safe for drinking and cooking',
      'All parameters within WHO safe limits',
      'Use for all household purposes',
      'Regular testing recommended (monthly)',
      'Store in clean, covered containers'
    ]
  },
  {
    title: 'Washing Only (Score 50-79)',
    icon: Info,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-500',
    recommendations: [
      'Suitable for washing and cleaning only',
      'DO NOT use for drinking or cooking',
      'Use water filters before drinking',
      'Boil water for 5-10 minutes if needed',
      'Consider bottled water for consumption',
      'Check source and treat if possible'
    ]
  },
  {
    title: 'Unsafe (Score 0-49)',
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-500',
    recommendations: [
      'CRITICAL: Do not use for any purpose',
      'Multiple parameters outside safe limits',
      'Seek alternative water source immediately',
      'Contact local water authority',
      'Use bottled water for all needs',
      'Avoid skin contact if severely contaminated',
      'Professional treatment required'
    ]
  }
];

export default function WaterGuide() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['ph']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950 pb-24 overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Water Guide
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Learn about water quality</p>
          </div>
        </div>

        {/* WHO Guidelines Table */}
        <Card className="p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-cyan-200 dark:border-cyan-800 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">WHO Safety Guidelines</h2>
          </div>
          <div className="space-y-3">
            {whoGuidelines.map((guideline) => (
              <div
                key={guideline.parameter}
                className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
              >
                <div className="font-semibold text-gray-900 dark:text-white">{guideline.parameter}</div>
                <div className="text-sm">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{guideline.safeRange}</span>
                  {guideline.unit && <span className="text-gray-500 dark:text-gray-400 ml-1">{guideline.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Parameter Guides - Expandable */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Parameter Details</h2>
          <div className="space-y-3">
            {guideSections.map((section) => {
              const isExpanded = expandedSections.includes(section.id);
              return (
                <Card
                  key={section.id}
                  className="overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-cyan-200 dark:border-cyan-800 shadow-lg hover:shadow-xl transition-all"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-md`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-left">{section.title}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-2 animate-slide-down">
                      {section.content.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Usage Recommendations */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Usage Recommendations</h2>
          <div className="space-y-4">
            {usageRecommendations.map((rec) => (
              <Card
                key={rec.title}
                className={`p-5 ${rec.bgColor} backdrop-blur-md border-2 ${rec.borderColor} shadow-lg`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${rec.color.replace('text-', 'bg-')}/10`}>
                    <rec.icon className={`w-6 h-6 ${rec.color}`} />
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${rec.color}`}>{rec.title}</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {rec.recommendations.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${rec.color.replace('text-', 'bg-')} mt-1.5 flex-shrink-0`}></div>
                      <span className="text-gray-700 dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Helpline & Support */}
        <Card className="p-5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-blue-500/5 backdrop-blur-md border-2 border-cyan-300 dark:border-cyan-700">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
            <div>
              <div className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">Need Help?</div>
              <div className="text-sm text-cyan-800 dark:text-cyan-200 mb-3">
                Contact water quality authorities or support team
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Water Authority Helpline</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">1-800-WATER-HELP</div>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Email Support</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">support@aquasens.app</div>
              </div>
            </button>
          </div>
        </Card>

        {/* Pro Tips */}
        <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5 backdrop-blur-md border-2 border-purple-300 dark:border-purple-700">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div className="space-y-2">
              <div className="font-semibold text-purple-900 dark:text-purple-100">Pro Tips</div>
              <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                <li>• Test water regularly, especially after heavy rains</li>
                <li>• Keep testing equipment clean and calibrated</li>
                <li>• Store drinking water in cool, dark places</li>
                <li>• Check local water quality reports monthly</li>
                <li>• Replace water filters per manufacturer guidelines</li>
                <li>• Never mix old and new water in storage</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}