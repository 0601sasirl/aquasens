import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsData {
  demoMode: boolean;
  darkMode: boolean;
  animationsEnabled: boolean;
  temperatureUnit: 'celsius' | 'fahrenheit';
}

interface SettingsContextType {
  settings: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
}

const defaultSettings: SettingsData = {
  demoMode: true,
  darkMode: false,
  animationsEnabled: true,
  temperatureUnit: 'celsius',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('hydrotech-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        
        if (parsed.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<SettingsData>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('hydrotech-settings', JSON.stringify(updated));
      
      if ('darkMode' in newSettings) {
        if (newSettings.darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
