// Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

// Component
const ChartsContainer = () => {

	// Store
	const { monthlyApplications:data } = useSelector((store) => { return store.allJobs; });

	// Bar or area chart ?
	const [barChart, setBarChart] = useState(true);

	// Return
	return(
		<Wrapper>
			<h4>Monthly applications</h4>
			<button type="button" onClick={ () => { setBarChart(!barChart); } }>
				{ barChart ? 'Area chart' : 'Bar chart' }
			</button>
			{
				barChart ? <BarChart stats={ data }/> : <AreaChart stats={ data }/>
			}
		</Wrapper>
	);

};

// Export
export default ChartsContainer;