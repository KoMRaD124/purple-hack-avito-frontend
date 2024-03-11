import { transformUrl } from "src/shared/utils/transformUrl.ts";

export const AUTHENTICATE_ENDPOINT = transformUrl("/api/admin/account");
export const LOGIN_ENDPOINT = transformUrl("/api/admin/auth/login");
export const LOGOUT_ENDPOINT = transformUrl("/api/admin/auth/logout");
export const GET_ALL_MATRIX = transformUrl("/api/admin/matrices");
export const GET_ALL_LOCATION = transformUrl("/api/admin/locations");
export const GET_ALL_CATEGORY = transformUrl("/api/admin/categories");
export const GET_ALL_SEGMENTS = transformUrl("/api/admin/segments");


 