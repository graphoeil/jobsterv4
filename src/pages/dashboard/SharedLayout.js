// Imports
import React from "react";
import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";

// Component
const SharedLayout = () => {

	// Return
	return(
		<Wrapper>
			{/* Here it's a Grid layout, without grid we will set 
			SmallSidebar and BigSidebar as position fixed and for 
			BigSidebar caculate the width of the rest of the page, 
			like that => width:calc(100% - BigSidebar.width) */}
			<main className="dashboard">

				{/* Left */}
				{/* Styled CSS in SmallSideBar :
				... All styles (mobile-first)
				@media (min-width: 992px) {
					display: none;
				} */}
				<SmallSidebar/>
				{/* Styled CSS in BigSidebar :
				display: none;
				@media (min-width: 992px) {
					... All styles
				} */}
				<BigSidebar/>
				{/* Left */}

				{/* Right */}
				<div>
					<Navbar/>
					<div className="dashboard-page">
						{/* Outlet component render active nested route,
						for example if route is "/" then <Stats/> component
						will be rendered (because of index props in the nested 
						routes in App.js). */}
						<Outlet/>
					</div>
				</div>
				{/* Right */}

			</main>
		</Wrapper>
	);

};

// Export
export default SharedLayout;