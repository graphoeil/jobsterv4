// Imports
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Component
const ProtectedRoute = ({ children }) => {

	// Store
	const { user } = useSelector((store) => { return store.user; });

	// Returns
	if (!user){
		return <Navigate to="/landing"/>;
	}
	return children;

};

// Export
export default ProtectedRoute;