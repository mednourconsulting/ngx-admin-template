/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

export const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
export const NUMBERS_PATTERN = '^-?[0-9]+$';

/**
 * AppRouting Routes
 * */
export const authRoute= 'auth';
export const pagesRoute = 'pages';
/**
 * Auth Routes
 * */
export const loginRoute= 'login';
export const registerRoute= 'register';
export const logoutRoute= 'logout';
export const resetPasswordRoute= 'reset-password';
export const requestPasswordRoute= 'request-password';
/**
 * Pages Routes
 * */
export const dashboardRoute: string = 'dashboard';
export const iotDashboardRoute: string = 'iot-dashboard';
export const usersRoute: string = 'users';
export const layoutRoute: string = 'layout';
export const miscellaneousRoute: string = 'miscellaneous';
export const formsRoute: string = 'forms';
export const uiFeaturesRoute: string = 'ui-features';
export const modalOverlaysRoute: string = 'modal-overlays';
export const extraComponentsRoute: string = 'extra-components';
export const chartsRoute: string = 'charts';
export const editorsRoute: string = 'editors';
export const tablesRoute: string = 'tables';
export const mapsRoute: string = 'maps';
