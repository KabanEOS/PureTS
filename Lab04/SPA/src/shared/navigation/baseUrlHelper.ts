/* eslint-disable max-len */
//basic url
export const BASE_URL = process.env.REACT_APP_API_URL;

const SCRUMS_FRAGMENT = '/scrums';
const PROJECTS_FRAGMENT = '/projects';

export const URL_SCRUMS = `${BASE_URL}${SCRUMS_FRAGMENT}`;
export const URL_PROJECTS = `${BASE_URL}${PROJECTS_FRAGMENT}`;

export const URL_SYSTEM_NOTIFICATIONS = (): string => BASE_URL + '/systemNotifications';
export const URL_SYSTEM_NOTIFICATIONS_COUNT = (): string => URL_SYSTEM_NOTIFICATIONS() + '/count';
export const URL_UPDATE_SYSTEM_NOTIFICATION = (notifId: string): string => URL_SYSTEM_NOTIFICATIONS() + '/' + notifId;
export const URL_DELETE_SYSTEM_NOTIFICATION = (notifId: string): string => URL_SYSTEM_NOTIFICATIONS() + '/' + notifId;


export const URL_UPDATE_MANY_SYSTEM_NOTIFICATIONS = (): string => URL_SYSTEM_NOTIFICATIONS() + '/update/many';
export const URL_DELETE_MANY_SYSTEM_NOTIFICATIONS = (): string => URL_SYSTEM_NOTIFICATIONS() + '/deleteMany';
