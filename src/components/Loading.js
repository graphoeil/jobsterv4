// Imports
import React from "react";

// Component
const Loading = ({ center }) => {

	// Return
	return <div className={ `loading ${ center ? 'loading-center' : '' }` }/>;

};

// Export
export default Loading;