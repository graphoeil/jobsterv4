// Imports
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Component
const AreaChartComponent = ({ stats }) => {

	// Return
	return(
		<ResponsiveContainer width="100%" height={ 450 }>
			<AreaChart data={ stats } margin={ { top:50 } }>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="date"/>
				<YAxis allowDecimals={ false }/>
				<Tooltip/>
				<Area type="monotone" dataKey="count" barSize={ 90 } stroke="#1e3a8a" fill="#3b82f6"/>
			</AreaChart>
		</ResponsiveContainer>
	);

};

// Export
export default AreaChartComponent;