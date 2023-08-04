// Imports
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearValues, createJob, editJob } from "../../store/features/job/jobSlice";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";

// Component
const AddJob = () => {

	// Store
	const { isLoading, position, company, jobLocation, 
		jobType, jobTypeOptions, status, statusOptions, 
		isEditing, editJobId } = useSelector((store) => { return store.job; });
	const { user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// Inputs change
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Submit form
	const navigate = useNavigate();
	const submitForm = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation){
			toast.error('Please fill out all fields !');
			return;
		}
		// Dispatch
		if (!isEditing){
			dispatch(createJob({ position, company, jobLocation, jobType, status }));
		} else {
			dispatch(editJob({ jobId:editJobId, job:{ position, company, jobLocation, jobType, status }}));
		}
		// Navigate to all jobs
		navigate('/all-jobs');
	};

	// Autofocus on position in add job mode
	// Get job location from user slice
	const positionRef = useRef();
	useEffect(() => {
		if (!isEditing){
			positionRef.current.focus();
			dispatch(handleChange({ name:'jobLocation', value:user.location }));
		}
	}, [isEditing, dispatch, user]);

	// Return
	return(
		<Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h3>{ isEditing ? 'Edit job' : 'Add job' }</h3>
				<div className="form-center">

					{/* Position */}
					<FormRow type="text" name="position" ref={ positionRef }
						value={ position } handleChange={ handleJobInput }/>
					{/* Position */}

					{/* Company */}
					<FormRow type="text" name="company" 
						value={ company } handleChange={ handleJobInput }/>
					{/* Company */}

					{/* Job location */}
					<FormRow type="text" name="jobLocation" labelText="Job location" 
						value={ jobLocation } handleChange={ handleJobInput }/>
					{/* Job location */}

					{/* Job status */}
					<FormRowSelect name="status" value={ status } labelText="Job status" 
						options={ statusOptions } handleChange={ handleJobInput }/>
					{/* Job status */}

					{/* Job type */}
					<FormRowSelect name="jobType" value={ jobType } labelText="Job type" 
						options={ jobTypeOptions } handleChange={ handleJobInput }/>
					{/* Job type */}

					{/* Buttons */}
					<div className="btn-container">
						<button type="button" className="btn btn-block clear-btn" onClick={ () => { dispatch(clearValues()); } }>
							Clear
						</button>
						<button type="submit" className="btn btn-block submit-btn" 
							disabled={ isLoading } onClick={ submitForm }>
							Submit
						</button>
					</div>
					{/* Buttons */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default AddJob;