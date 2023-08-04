// Imports
import customFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";
import authHeader from "../../../utils/authHeader";

// Thunks
export const createJobThunkFn = async(job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		if (error.response.status === 401){
			// Logout and clear values
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const deleteJobThunkFn = async(jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${ jobId }`, authHeader(thunkAPI));
		// Get all jobs to refresh JobsContainer.js
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const editJobThunkFn = async({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${ jobId }`, job, authHeader(thunkAPI));
		// Get all jobs to refresh JobsContainer.js
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};