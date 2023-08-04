// Imports
import React from "react";
import Wrapper from "../assets/wrappers/StatItem";

// Component
const StatItem = ({ title, count, icon, color, bcg }) => {

	// Return
	return(
		<Wrapper color={ color } bcg={ bcg }>
			<header>
				<span className="count">{ count }</span>
				<div className="icon">{ icon }</div>
			</header>
			<h5 className="title">{ title }</h5>
		</Wrapper>
	);

};

// Export
export default StatItem;