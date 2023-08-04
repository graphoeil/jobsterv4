// Imports
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../store/features/user/userSlice";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";

// Initial state
const initialState = {
	name:'',
	email:'',
	password:'',
	isMember:true
};

// Component
const Register = () => {

	// Store
	const { isLoading, user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// State
	const [state, setState] = useState(initialState);
	const { name, email, password, isMember } = state;

	// Redirect to dashboard if already connected
	const navigate = useNavigate();
	useEffect(() => {
		if (user){
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
	}, [user, navigate]);

	// Autofocus on email input
	const nameRef = useRef();
	const emailRef = useRef();
	useEffect(() => {
		emailRef.current.focus();
	}, []);

	// Inputs change
	const handleChange = (e) => {
		setState((oldtate) => {
			return { ...oldtate, [e.target.name]:e.target.value };
		});
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		if (!email || !password || (!isMember && !name)){
			toast.error('Please fill out all fields', {
				autoClose:1777
			});
			return;
		}
		if (isMember){
			dispatch(loginUser({ email, password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};

	// Show demo
	const showDemo = () => {
		dispatch(loginUser({ email:'testUser@test.com', password:'secret' }));
	};

	// Toggle member
	const toggleMember = () => {
		setState((oldState) => {
			return { ...oldState, isMember:!isMember };
		});
		// Autofocus on the first visible input
		// We use setTimeout because changes in state are asynchronous ;-)
		setTimeout(() => {
			if (!isMember){
				emailRef.current.focus();
			} else {
				nameRef.current.focus();
			}
		}, 10);
	};

	// Return
	return(
		<Wrapper className="full-page">
			<form className="form" onSubmit={ submitForm }>
				
				{/* Header */}
				<Logo/>
				<h3>{ isMember ? 'Login' : 'Register' }</h3>
				{/* Header */}

				{/* Name */}
				{
					!isMember && <FormRow type="text" name="name" ref={ nameRef } handleChange={ handleChange } value={ name } />
				}
				{/* Name */}

				{/* Email */}
				<FormRow type="email" name="email" ref={ emailRef } handleChange={ handleChange } value={ email } />
				{/* Email */}

				{/* Password */}
				<FormRow type="password" name="password" handleChange={ handleChange } value={ password }/>
				{/* Password */}

				{/* Buttons */}
				{/* Disabled also if user, because of the timeout to redirect to dashboard, 
				which allows to click for one second after the login or register is fullfilled 
				which resets isLoading to false ,-) */}
				<button type="submit" className="btn btn-block" disabled={ isLoading || user }>
					{ isLoading || user ? 'Loading...' : 'Submit' }
				</button>
				{/* Demo button */}
				<button type="button" className="btn btn-block btn-hipster" 
					disabled={ isLoading || user } onClick={ showDemo }>
					Show demo
				</button>
				<p>
					{ isMember ? 'Not a member yet ?' : 'Already a member ?' }
					<button type="button" className="member-btn" onClick={ toggleMember }>
						{ isMember ? 'Register' : 'Login' }
					</button>
				</p>
				{/* Buttons */}

			</form>
		</Wrapper>
	);

};

// Export
export default Register;