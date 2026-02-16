interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' }
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={icon} 
        height={icon} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        <path
          d="M32 8C32 8 20 22 20 34C20 40.6274 25.3726 46 32 46C38.6274 46 44 40.6274 44 34C44 22 32 8 32 8Z"
          fill="url(#waterGradient)"
          className="drop-shadow-lg"
        />
        
        <ellipse
          cx="28"
          cy="28"
          rx="4"
          ry="6"
          fill="white"
          fillOpacity="0.3"
        />
        
        <path
          d="M26 36C28 34 30 34 32 36C34 38 36 38 38 36"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="url(#waterGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.2"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${text} bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent`}>
            AquaSens
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
            Smart Water Monitoring
          </span>
        </div>
      )}
    </div>
  );
}

export function WaterWaveIllustration() {
  return (
    <svg viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      <path d="M0 100 Q100 80 200 100 T400 100 V200 H0 Z" fill="url(#wave1)" className="animate-[wave_4s_ease-in-out_infinite]" />
      <path d="M0 110 Q100 90 200 110 T400 110 V200 H0 Z" fill="url(#wave2)" className="animate-[wave_6s_ease-in-out_infinite_reverse]" />
    </svg>
  );
}