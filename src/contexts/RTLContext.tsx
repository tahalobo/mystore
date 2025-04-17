
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type RTLContextType = {
  isRTL: boolean;
  setRTL: (value: boolean) => void;
};

const RTLContext = createContext<RTLContextType | undefined>(undefined);

export const RTLProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isRTL, setRTL] = useState(true); // Default to true for Arabic

  useEffect(() => {
    // Apply RTL to document
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'en';
    
    // Add RTL class to body for global styling
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [isRTL]);

  return (
    <RTLContext.Provider value={{ isRTL, setRTL }}>
      {children}
    </RTLContext.Provider>
  );
};

export const useRTL = (): RTLContextType => {
  const context = useContext(RTLContext);
  if (context === undefined) {
    throw new Error('useRTL must be used within an RTLProvider');
  }
  return context;
};
