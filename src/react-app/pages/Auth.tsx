import { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Droplets } from 'lucide-react';
import Logo from '../components/Logo';

interface AuthProps {
  onLogin: (email: string) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      localStorage.setItem('aquasens-user', JSON.stringify({ email, name: name || email.split('@')[0] }));
      onLogin(email);
      setIsLoading(false);
    }, 1500);
  };

  const handleDemoLogin = () => {
    const demoEmail = 'demo@aquasens.com';
    localStorage.setItem('aquasens-user', JSON.stringify({ email: demoEmail, name: 'Demo User' }));
    onLogin(demoEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? 'Sign in to access your water monitoring dashboard' : 'Start monitoring your water quality today'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <button type="button" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="mt-4 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Demo Account
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Real-time Monitoring</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <ArrowRight className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Cloud Sync</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Secure & Private</p>
          </div>
        </div>
      </div>
    </div>
  );
}