// Imports
import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

// Component
const NavLinks = ({ closeSidebar }) => {

	// Return
	return(
		<div className="nav-links">
			{
				links.map((link) => {
					const { id, text, path, icon } = link;
					return <NavLink key={ id } to={ path } className={ ({ isActive }) => {
						return `nav-link ${ isActive ? 'active' : '' }`;
					} } onClick={ closeSidebar } end>
						<span className="icon">{ icon }</span>
						{ path === "/add-job" ? 'Add | Edit' : text }
					</NavLink>
				})
			}
		</div>
	);

};

// Export
export default NavLinks;