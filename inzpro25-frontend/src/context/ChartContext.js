import React, { createContext, useState } from "react";

export const ChartContext = createContext();

export const ChartProvider = ({ children }) => {
  const [charts, setCharts] = useState(Array(6).fill(null)); 

  return (
    <ChartContext.Provider value={{ charts, setCharts }}>
      {children}
    </ChartContext.Provider>
  );
};