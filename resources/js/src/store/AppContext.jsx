import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contextValue = useMemo(
    () => ({isAuthenticated, setIsAuthenticated }),
    [isAuthenticated, setIsAuthenticated]
  );

  return (
      <AppContext.Provider value={contextValue}>
          {children}
      </AppContext.Provider>
  );
};

export default function useAppContext() {
  return useContext(AppContext);
}
