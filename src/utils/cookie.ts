import { cookies } from "next/headers";

export const getLoggedInCookie = () => {
  const isLoggedIn = JSON.parse(cookies().get("isLoggedIn")?.value || "{}");
  isLoggedIn.usingDefault = isLoggedIn.loginUsing ? false : true;
  if (!isLoggedIn.state) {
    isLoggedIn.state = false;
  }
  if (!isLoggedIn.loginUsing) {
    isLoggedIn.loginUsing = "email + password";
  }
  return isLoggedIn;
};
