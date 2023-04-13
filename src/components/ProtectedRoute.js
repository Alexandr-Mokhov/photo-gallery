import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
	console.log();
	return (
		props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up" replace />	
	)
}

export default ProtectedRouteElement;