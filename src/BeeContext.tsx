import { createContext, useContext, useState, ReactNode } from 'react';

type BeeContextType = {
  hoveredTarget: { x: number; y: number } | null;
  setHoveredTarget: (target: { x: number; y: number } | null) => void;
};

const BeeContext = createContext<BeeContextType | undefined>(undefined);

export function BeeProvider({ children }: { children: ReactNode }) {
  const [hoveredTarget, setHoveredTarget] = useState<{ x: number; y: number } | null>(null);

  return (
    <BeeContext.Provider value={{ hoveredTarget, setHoveredTarget }}>
      {children}
    </BeeContext.Provider>
  );
}

export function useBee() {
  const context = useContext(BeeContext);
  if (context === undefined) {
    throw new Error('useBee must be used within a BeeProvider');
  }
  return context;
}
