// // Imports
import React, { useEffect, useState } from "react";
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, clearStore } from "../store/features/user/userSlice";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";

// Component
const Navbar = () => {

	// Store
	const { user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// Show / hide logout button with autoClose
	const [showLogout, setShowLogout] = useState(false);
	const showLogoutBtn = () => {
		setShowLogout(!showLogout);
	};
	useEffect(() => {
		let timer;
		if (showLogout){
			timer = setTimeout(() => {
				setShowLogout(false);
			}, 4000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [showLogout]);

	// Return
	return(
		<Wrapper>
			<div className="nav-center">
				<button className="toggle-btn" onClick={ () => { dispatch(toggleSidebar()); } }>
					<FaAlignLeft/>
				</button>
				<div>
					<Logo/>
					<h3 className="logo-text">Dashboard</h3>
				</div>
				<div className="btn-container">
					<button type="button" className="btn" onClick={ showLogoutBtn }>
						<FaUserCircle/>
						{ user ? user.name : 'John Doe' }
						{ showLogout ? <FaCaretUp/> : <FaCaretDown/> }
					</button>
					<div className={ `dropdown ${ showLogout ? 'show-dropdown' : '' }` }>
						<button className="dropdown-btn" type="button" onClick={ () => { dispatch(clearStore('Logging out...')); } }>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);

};

// Export
export default Navbar;