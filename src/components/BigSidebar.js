// // Imports
import React from "react";
import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import { NavLinks, Logo } from './';

// Component
const BigSidebar = () => {

	// Store
	const { isSidebarOpen } = useSelector((store) => { return store.user; });

	// Return
	return(
		<Wrapper>
			{/* We show big sidebar by default, then if isSidebarOpen is true we don't 
			add show-sidebar class, only if it's false, it's inversed ,-) */}
			<div className={ `sidebar-container ${ !isSidebarOpen ? 'show-sidebar' : '' }` }>
				<div className="content">
					<header>
						<Logo/>
					</header>
					<NavLinks/>
				</div>
			</div>
		</Wrapper>
	);

};

// Export
export default BigSidebar;