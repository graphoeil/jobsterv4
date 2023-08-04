// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { registerUserThunkFn, loginUserThunkFn, updateUserThunkFn, clearStoreThunkFn } from "./userThunk";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../../utils/localStorage";

// Initial state
const initialState = {
	isLoading:false,
	isSidebarOpen:false,
	user:getUserFromLocalStorage()
};

// Async methods
export const registerUser = createAsyncThunk('user/registerUser', registerUserThunkFn);
export const loginUser = createAsyncThunk('user/loginUser', loginUserThunkFn);
export const updateUser = createAsyncThunk('user/updateUser', updateUserThunkFn);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunkFn);

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Toggle sidebar
		toggleSidebar:(state) => {
			state.isSidebarOpen = !state.isSidebarOpen
		},
		// Logout
		logoutUser:(_, { payload }) => {
			removeUserFromLocalStorage();
			if (payload){
				toast.success(payload);
			}
			return { isLoading:false, isSidebarOpen:false, user:null };
		}
	},
	extraReducers:(builder) => {
		// Register user
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(registerUser.fulfilled, (state, { payload:{ user } }) => {
			toast.success(`Hello there ${ user.name }`);
			addUserToLocalStorage(user);
			return { ...state, isLoading:false, user };
		}).addCase(registerUser.rejected, (state, { payload }) => {
			toast.error(payload);
			return { ...state, isLoading:false };
		});
		// Login user
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(loginUser.fulfilled, (state, { payload:{ user } }) => {
			toast.success(`Welcome back ${ user.name }`);
			addUserToLocalStorage(user);
			return { ...state, isLoading:false, user };
		}).addCase(loginUser.rejected, (state, { payload }) => {
			toast.error(payload);
			state.isLoading = false;
		});
		// Update user
		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
		}).addCase(updateUser.fulfilled, (state, { payload:{ user } }) => {
			addUserToLocalStorage(user);
			toast.success('User updated !');
			return { ...state, isLoading:false, user };
		}).addCase(updateUser.rejected, (state, { payload }) => {
			console.log(payload);
			state.isLoading = false;
			toast.error(payload);
		});
		// Clear store
		builder.addCase(clearStore.rejected, () => {
			toast.error('There was an error...');
		});
	}
});

// Actions export
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;