import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  
  if(authContext.isLoading) {
    return <p>Loading...</p>
  }

  if(!authContext.loggedInUser.user._id) {
    return (
      <Navigate
        to="/auth/login"
      />
    )
  }

  return children
}

export default PrivateRoute;
