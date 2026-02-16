import { Shield, Lock, FileText, Zap, Database, Eye, CheckCircle, Server } from 'lucide-react';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Enterprise-Grade Features
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Reliability & Security
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional water monitoring with enterprise-level security, performance, and transparency
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Secure Payments */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Shield className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Payments That Don't Leak</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bank-grade encryption for all payment transactions. Your financial data never touches our servers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">PCI-DSS Compliant</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Industry-standard payment security</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">End-to-End Encryption</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AES-256 encryption for all transactions</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Zero Data Storage</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">We never store your card details</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Data That Doesn't Get Stolen</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Military-grade encryption and security protocols protect your water quality data 24/7.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">AES-256 Encryption</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Same security used by governments</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Encrypted in Transit & at Rest</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protected everywhere, always</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Regular Security Audits</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Third-party penetration testing</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Transparent Logs */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">Logs That Actually Help</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Crystal-clear error messages and detailed logs that tell you exactly what went wrong.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Human-Readable Errors</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No cryptic error codes - plain English</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Detailed Timestamps</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Know exactly when issues occurred</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Actionable Solutions</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Logs include fix suggestions</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Scalable APIs */}
          <div className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Zap className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold">APIs That Don't Melt</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Built to scale from 10 to 10 million users. Your sensors won't bring down our servers.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Auto-Scaling Infrastructure</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Handles traffic spikes automatically</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">99.9% Uptime SLA</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Guaranteed availability</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Global CDN</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fast response times worldwide</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Server className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            More Enterprise Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Real-Time Backups</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your data is backed up every hour to multiple locations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex-shrink-0">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Full Transparency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  See exactly what data we collect and how we use it
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">GDPR Compliant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full compliance with global data protection laws
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-3">Built on Trust</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            AquaSens is designed with security, reliability, and transparency at its core. 
            Your water quality data is safe, accessible, and always under your control.
          </p>
        </div>
      </div>
    </div>
  );
}