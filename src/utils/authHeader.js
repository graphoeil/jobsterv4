// Auth header (Bearer)
// See also axios.interceptors in Jobster which avoid to declare
// authHeader for each axios request ,-)
const authHeader = (thunkAPI) => {
	return {
		headers:{
			// Here with getState we access user store and then user in state ,-)
			authorization:`Bearer ${ thunkAPI.getState().user.user.token }`
		}
	};
};

// Export
export default authHeader;