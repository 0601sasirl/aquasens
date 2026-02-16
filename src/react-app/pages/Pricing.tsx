import { Check, Zap, Crown, Building2 } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for personal use',
    icon: Zap,
    color: 'from-gray-500 to-gray-600',
    features: [
      '1 sensor device',
      '7-day data history',
      'Basic analytics',
      'Email alerts',
      'Mobile app access',
      'Demo mode'
    ],
    limitations: [
      'No PDF exports',
      'No API access',
      'Community support only'
    ],
    cta: 'Current Plan',
    popular: false
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'For serious water monitoring',
    icon: Crown,
    color: 'from-blue-600 to-cyan-600',
    features: [
      'Unlimited sensors',
      '1-year data history',
      'Advanced analytics & graphs',
      'PDF report exports',
      'Real-time push notifications',
      'Priority email support',
      'Custom alert thresholds',
      'Data export (CSV/JSON)',
      'Dark mode',
      'Ad-free experience'
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For organizations & municipalities',
    icon: Building2,
    color: 'from-purple-600 to-pink-600',
    features: [
      'Everything in Pro, plus:',
      'Unlimited data retention',
      'REST API access',
      'Webhook integrations',
      'White-label options',
      'SSO / SAML support',
      'Dedicated account manager',
      '99.9% uptime SLA',
      'Custom integrations',
      'On-premise deployment option',
      'Advanced security features',
      'Compliance reporting'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you need more. All plans include core water monitoring features.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-900 dark:text-green-100">
              14-day money-back guarantee on all paid plans
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-2 text-sm font-semibold">
                  ⭐ Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 dark:text-gray-400">
                        / {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Features */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    What's included:
                  </p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                      Not included:
                    </p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-3 mb-2">
                        <span className="text-gray-400 dark:text-gray-600">×</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Can I change plans later?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! Upgrade or downgrade anytime. Changes take effect immediately, and we'll prorate your billing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Is my data safe?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Absolutely. All data is encrypted with AES-256, backed up hourly, and stored in secure data centers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer educational discounts?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Yes! Students and educators get 50% off Pro plans. Contact us with your .edu email for verification.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by water monitoring professionals worldwide
          </p>
          <div className="flex justify-center items-center gap-8 opacity-50">
            <div className="text-gray-400 dark:text-gray-600 font-semibold">256-bit SSL</div>
            <div className="text-gray-400 dark:text-gray-600 font-semibold">GDPR Compliant</div>
            <div className="text-gray-400 dark:text-gray-600 font-semibold">SOC 2 Type II</div>
          </div>
        </div>
      </div>
    </div>
  );
}