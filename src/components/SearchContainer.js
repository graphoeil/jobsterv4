// Imports
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../store/features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "../components";

// Component
const SearchContainer = () => {

	// Stores
	const { isLoading, searchStatus, searchType, 
		sort, sortOptions } = useSelector((store) => { return store.allJobs; });
	const { statusOptions, jobTypeOptions } = useSelector((store) => { return store.job; });

	// Dispatch
	const dispatch = useDispatch();

	// Search with debouncing
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(handleChange({ name:'search', value:searchValue }));
		}, 250);
		return () => {
			clearTimeout(timer);
		}
	}, [searchValue, dispatch]);

	// Select change
	const handleSearch = (e) => {
		if (isLoading){ return; }
		dispatch(handleChange({ name:e.target.name, value:e.target.value }));
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		setSearchValue('');
		dispatch(clearFilters());
	};

	// Return
	return(
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">

					{/* Position */}
					<FormRow type="text" name="search" labelText="Position" 
						value={ searchValue } handleChange={ (e) => { setSearchValue(e.target.value); } }/>
					{/* Position */}

					{/* Status */}
					<FormRowSelect name="searchStatus" labelText="Job status" value={ searchStatus } 
						handleChange={ handleSearch } options={ ['all', ...statusOptions] }/>
					{/* Status */}

					{/* Type */}
					<FormRowSelect name="searchType" labelText="Job type" value={ searchType } 
						handleChange={ handleSearch } options={ ['all', ...jobTypeOptions] }/>
					{/* Type */}

					{/* Sort */}
					<FormRowSelect name="sort" labelText="Sort" value={ sort } 
						handleChange={ handleSearch } options={ sortOptions }/>
					{/* Sort */}

					{/* Clear btn */}
					<button type="submit" className="btn btn-block btn-danger" disabled={ isLoading } onClick={ submitForm }>
						Clear
					</button>
					{/* Clear btn */}

				</div>
			</form>
		</Wrapper>
	);

};

// Export
export default SearchContainer;