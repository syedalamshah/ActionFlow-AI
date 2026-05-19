import React, { createContext, useState, useContext } from 'react';

// Create the Context
const AppContext = createContext();

// Create the Provider Component
export const AppProvider = ({ children }) => {
  const [activePipelineData, setActivePipelineData] = useState({
    extraction: null,
    insights: null,
    impact: null,
    actions: null,
    simulation: null,
  });

  return (
    <AppContext.Provider value={{ activePipelineData, setActivePipelineData }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a Custom Hook to easily consume the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
