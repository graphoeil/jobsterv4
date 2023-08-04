// Imports
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Component
const BarCharComponent = ({ stats }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 450 }>
			<BarChart data={ stats } margin={ { top:50 } }>
				<CartesianGrid strokeDasharray="5 5"/>
				<XAxis dataKey="date"/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				<Bar type="monotone" dataKey="count" barSize={ 90 } fill="#3b82f6"/>
			</BarChart>
		</ResponsiveContainer>
	);

};

// Export
export default BarCharComponent;