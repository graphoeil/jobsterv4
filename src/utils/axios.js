// Imports
import axios from "axios";
// import { getUserFromLocalStorage } from "./localStorage";

// Custom axios instance
const customFetch = axios.create({
	baseURL:'https://jobify-prod.herokuapp.com/api/v1/toolkit'
});

// Interceptors approach for headers
/* customFetch.interceptors.request.use((config) => {
	const user = getUserFromLocalStorage();
	if (user){
		config.headers['Authorization'] = `Bearer ${ user.token }`;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
}); */

// Export
export default customFetch;