export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Login URL logic removed as it was Manus-specific.
// If you implement your own auth, update this accordingly.
export const getLoginUrl = () => {
  return "/login"; 
};
