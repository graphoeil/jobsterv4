// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunkFn, showStatsThunkFn } from "./allJobsThunk";

// Initial state
const initialFiltersState = {
	search:'',
	searchStatus:'all',
	searchType:'all',
	sort:'latest',
	sortOptions:['latest','oldest','a-z','z-a']
};
const initialState = {
	isLoading:false,
	jobs:[],
	totalJobs:0,
	numOfPages:1,
	page:1,
	stats:{},
	monthlyApplications:[],
	...initialFiltersState
};

// Async methods
export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', getAllJobsThunkFn);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunkFn);

// Slice
const allJobsSlice = createSlice({
	name:'allJobs',
	initialState,
	reducers:{
		// Show and hide loading for deleteJob in jobSlice.js
		// because we use the isLoading in allJobsSlice 
		// to display <Loading/> in JobsContainer.js ;-)
		// Show loading
		showLoading:(state) => {
			state.isLoading = true;
		},
		// Hide loading
		hideLoading:(state) => {
			state.isLoading = false;
		},
		// Search, handle inputs change
		handleChange:(state, { payload:{ name, value } }) => {
			// We reset page to 1 because we change filters and if we are at page 2 
			// and there is only 7 jobs we'll show No jobs to display because 
			// there is no page number 2 ;-)
			state.page = 1;
			state[name] = value;
		},
		// Clear filters
		clearFilters:(state) => {
			return { ...state, ...initialFiltersState };
		},
		// Change page (JobsContainer.js)
		changePage:(state, { payload }) => {
			state.page = payload;
		},
		// Clear all state and filters
		clearAllJobsState:() => {
			return initialState;
		}
	},
	extraReducers:(builder) => {
		// Get all jobs
		builder.addCase(getAllJobs.pending, (state) => {
			state.isLoading = true;
		}).addCase(getAllJobs.fulfilled, (state, { payload:{ jobs, totalJobs, numOfPages } }) => {
			return { ...state, isLoading:false, jobs, totalJobs, numOfPages };
		}).addCase(getAllJobs.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
		// Show stats
		builder.addCase(showStats.pending, (state) => {
			state.isLoading = true;
		}).addCase(showStats.fulfilled, (state, { payload:{ defaultStats, monthlyApplications } }) => {
			return { ...state, isLoading:false, stats:defaultStats, monthlyApplications };
		}).addCase(showStats.rejected, (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		});
	}
});

// Actions export
export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

// Reducer export
export default allJobsSlice.reducer;