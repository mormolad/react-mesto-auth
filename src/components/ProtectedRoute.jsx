import React from 'react';
import { Navigate } from 'react-router-dom';

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ element: Component, ...props }) => {
  console.log('logginIN в протектед', props.loggedIn);
  if (props.loggedIn) {
    console.log('logginIN в протектед в условии true', props.loggedIn);
    return <Component {...props} />;
  } else {
    console.log('logginIN в протектед в условии false', props.loggedIn);
    return <Navigate to="/sign-in" replace />;
  }
};
export default ProtectedRoute;
