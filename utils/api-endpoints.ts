const BASE_URL = "https://emberidge-backend.vercel.app";

export const API_RESOURCES = {
  // User & Auth
  USER: `${BASE_URL}/api/v1/users/me`,
  ADDRESSES: `${BASE_URL}/api/v1/users/me/addresses`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/update-password`,
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  UPDATE_PROFILE: `${BASE_URL}/auth/update-profile`,
};
