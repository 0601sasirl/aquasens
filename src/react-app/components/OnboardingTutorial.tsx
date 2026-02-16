import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Droplets, TrendingUp, Shield, Settings as SettingsIcon, CheckCircle } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to AquaSens! 🌊',
    description: 'Your intelligent water quality monitoring companion. Monitor pH, TDS, turbidity, and temperature in real-time with professional-grade accuracy.',
    icon: <Droplets className="w-16 h-16" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Real-Time Dashboard 📊',
    description: 'See live water quality scores, sensor readings, and instant alerts when contamination is detected. Your water safety at a glance.',
    icon: <TrendingUp className="w-16 h-16" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Historical Analytics 📈',
    description: 'Track water quality trends over time with beautiful graphs. Export PDF reports for compliance and record-keeping.',
    icon: <TrendingUp className="w-16 h-16" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Enterprise Security 🔒',
    description: 'Bank-grade encryption, automatic backups, and detailed logging. Your data is safe, accessible, and always under your control.',
    icon: <Shield className="w-16 h-16" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Connect Your Sensors ⚙️',
    description: 'Ready to go live? Connect your ESP32 via Bluetooth or WiFi in Settings. For now, explore with Demo Mode to see how it works!',
    icon: <SettingsIcon className="w-16 h-16" />,
    color: 'from-indigo-500 to-blue-500'
  }
];

export default function OnboardingTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('aquasens-onboarding-complete');
    if (!hasSeenOnboarding) {
      setTimeout(() => setIsOpen(true), 500);
    }
  }, []);

  const handleComplete = () => {
    localStorage.setItem('aquasens-onboarding-complete', 'true');
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className={`bg-gradient-to-r ${step.color} p-8 text-white relative`}>
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 opacity-90">
              {step.icon}
            </div>
            <h2 className="text-3xl font-bold mb-3">{step.title}</h2>
            <p className="text-lg text-white/90 max-w-md">
              {step.description}
            </p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 py-6 bg-gray-50 dark:bg-gray-900/50">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentStep
                  ? 'w-8 h-3 bg-blue-600'
                  : index < currentStep
                  ? 'w-3 h-3 bg-green-600'
                  : 'w-3 h-3 bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-8">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Professional Monitoring</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track pH, TDS, turbidity & temperature</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Instant Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when water becomes unsafe</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Data Analytics</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View trends and export reports</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23EFF6FF' width='400' height='200'/%3E%3Ccircle cx='200' cy='100' r='60' fill='%233B82F6' opacity='0.2'/%3E%3Ctext x='200' y='110' font-family='Arial' font-size='48' font-weight='bold' fill='%233B82F6' text-anchor='middle'%3E85%3C/text%3E%3Ctext x='200' y='140' font-family='Arial' font-size='16' fill='%236B7280' text-anchor='middle'%3EQuality Score%3C/text%3E%3C/svg%3E"
                alt="Dashboard Preview" 
                className="w-full rounded-xl shadow-lg"
              />
              <p className="text-center text-gray-600 dark:text-gray-400">
                Your dashboard shows a color-coded quality score from 0-100, with detailed sensor readings below.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23F0F9FF' width='400' height='200'/%3E%3Cpolyline points='50,150 100,120 150,130 200,80 250,100 300,60 350,90' fill='none' stroke='%233B82F6' stroke-width='3'/%3E%3Ctext x='200' y='30' font-family='Arial' font-size='20' font-weight='bold' fill='%231F2937' text-anchor='middle'%3EWater Quality Trends%3C/text%3E%3C/svg%3E"
                alt="Analytics Preview" 
                className="w-full rounded-xl shadow-lg"
              />
              <p className="text-center text-gray-600 dark:text-gray-400">
                Track your water quality over 24 hours, 7 days, 30 days, or 90 days. Export professional PDF reports anytime.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Encrypted</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">AES-256 encryption</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Auto Backup</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hourly backups</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <SettingsIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Full Control</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Your data, your rules</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">99.9% Uptime</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Always available</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Ready to Connect?</h4>
                <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">1.</span>
                    <span>Go to Settings tab</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">2.</span>
                    <span>Click "Connect ESP32"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">3.</span>
                    <span>Choose Bluetooth or WiFi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">4.</span>
                    <span>Start monitoring real water!</span>
                  </li>
                </ol>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  💡 <strong>Tip:</strong> For now, Demo Mode is enabled so you can explore all features with simulated data!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
              currentStep === 0
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Skip Tutorial
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  Get Started
                  <CheckCircle className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}