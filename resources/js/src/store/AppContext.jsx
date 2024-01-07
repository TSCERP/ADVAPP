import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import Cookies from 'js-cookie';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const cookieAuth = Cookies.get('isAuthenticated');
  const [loading, setLoading] = useState(false);

  // Authentication
  const [user, setUser] = useState(userInfo && cookieAuth ? userInfo : null);
  const [isAuthenticated, setIsAuthenticated] = useState(userInfo && cookieAuth ? true : false);

  const contextValue = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated, user, setUser }),
    [ isAuthenticated, setIsAuthenticated, user, setUser ]
  );

  useEffect(() => {
    if (user || user?.access_token) {
        setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
      const token = Cookies.get('isAuthenticated');
      if (token) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
          localStorage.removeItem("userInfo");
      }
  }, []);

  return (
      <AppContext.Provider value={contextValue}>
          {children}
      </AppContext.Provider>
  );
};

export default function useAppContext() {
  return useContext(AppContext);
}
