// Imports
import React from "react";
import Wrapper from "../assets/wrappers/JobInfo";

// Component
const JobInfo = ({ icon, text }) => {

	// Return
	return(
		<Wrapper>
			<span className="icon">{ icon }</span>
			<span className="text">{ text }</span>
		</Wrapper>	
	);

};

// Export
export default JobInfo;