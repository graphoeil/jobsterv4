// Manage user in localStorage
export const addUserToLocalStorage = (user) => {
	localStorage.setItem('jobsterUser', JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('jobsterUser');
};
export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem('jobsterUser');
	const user = result ? JSON.parse(result) : null;
	return user;
};