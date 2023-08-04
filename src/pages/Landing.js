// Imports
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import jobHunt from "../assets/images/jobHunt.svg";

// Component
const Landing = () => {

	// Return
	return(
		<Wrapper>

			{/* Logo */}
			<nav>
				<Logo/>
			</nav>
			{/* Logo */}

			{/* Page */}
			<div className="container page">

				{/* Info */}
				<div className="info">
					<h1>Job <span>tracking</span> app</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere corrupti, totam obcaecati delectus suscipit necessitatibus ipsum sint, voluptates soluta ratione, unde doloremque minima.</p>
					<Link to="/register" className="btn btn-hero">
						Login / Register
					</Link>
				</div>
				{/* Info */}

				{/* Main image, it's a 2 column layout */}
				<img src={ jobHunt } alt="Job hunt" className="img main-img" />
				{/* Main image */}

			</div>
			{/* Page */}

		</Wrapper>
	);

};

// Export
export default Landing;