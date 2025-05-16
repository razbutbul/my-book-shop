import { useEffect } from "react";
import { Logout } from "../login-utils";

const RedirectWithLogout = () => {
  useEffect(() => {
    Logout();
  }, []);

  return null;
};

export default RedirectWithLogout;
