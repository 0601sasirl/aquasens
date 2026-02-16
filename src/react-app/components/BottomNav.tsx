import { NavLink } from 'react-router-dom';
import { Home, TrendingUp, Map, BookOpen, Shield, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/analytics', icon: TrendingUp, label: 'Analytics' },
  { path: '/map', icon: Map, label: 'Map' },
  { path: '/guide', icon: BookOpen, label: 'Guide' },
  { path: '/features', icon: Shield, label: 'Features' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-cyan-200 dark:border-cyan-800 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-2">
        <div className="grid grid-cols-6 gap-1 h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-1 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/50'
                    : 'text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}