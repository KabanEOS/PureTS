const BASE_URL = process.env.REACT_APP_API_URL;

//users
export const URL_GET_CURRENT_USER = BASE_URL + '/users/current';
export const URL_UPDATE_LAST_LOGGED_IN = BASE_URL + '/users/current/loggedIn';
export const URL_USER_SETTINGS = BASE_URL + '/users/current/settings';