// Imports
import customFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import { logoutUser } from "./userSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import authHeader from "../../../utils/authHeader";

// Thunk methods
export const registerUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/register', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const loginUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.post('/auth/login', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const updateUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customFetch.patch('/auth/updateUser', user, authHeader(thunkAPI));
		return response.data;
	} catch (error){
		if (error.response.status === 401){
			// Logout the user if rejected, because the user don't have valid
			// credendials and have nothing to do here !
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const clearStoreThunkFn = async(message, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearValues());
		thunkAPI.dispatch(clearAllJobsState());
		return Promise.resolve();
	} catch (error){
		return Promise.reject();
	}
};