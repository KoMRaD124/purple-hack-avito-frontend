import { transformUrl } from "src/shared/utils/transformUrl.ts";

export const AUTHENTICATE_ENDPOINT = transformUrl("/api/admin/account");
export const LOGIN_ENDPOINT = transformUrl("/api/admin/auth/login");
export const LOGOUT_ENDPOINT = transformUrl("/api/admin/auth/logout");
