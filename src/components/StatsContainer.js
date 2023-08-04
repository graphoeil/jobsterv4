// Imports
import React from "react";
import { useSelector } from "react-redux";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

// Component
const StatsContainer = () => {

	// Store
	const { stats:{ pending, interview, declined } } = useSelector((store) => { return store.allJobs; });

	// Stats
	const defaultStats = [
		{ title:'Pending applications', count:pending || 0, icon:<FaSuitcaseRolling/>, color:'#e9b949', bcg:'#fcefc7' },
		{ title:'Interviews scheduled', count:interview || 0, icon:<FaCalendarCheck/>, color:'#647acb', bcg:'#e0e8f9' },
		{ title:'Jobs declined', count:declined || 0, icon:<FaBug/>, color:'#d66a6a', bcg:'#ffeeee' }
	];

	// Return
	return(
		<Wrapper>
			{
				defaultStats.map((statItem, index) => {
					return <StatItem key={ index } { ...statItem }/>
				})
			}
		</Wrapper>
	);

};

// Export
export default StatsContainer;