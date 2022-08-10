import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });
  const [isLoading, setIsLoading] = useState(true)

  const logout = () => {
    localStorage.removeItem('loggedInUser')
    setLoggedInUser({ token: "", user: {} })
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser })
    }
    setIsLoading(false)

  }, []);

  return (
    <AuthContext.Provider value={{ isLoading,loggedInUser, setLoggedInUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };
