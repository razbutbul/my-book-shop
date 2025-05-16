export const isAdmin = (role) => role === "admin";

export const getRoleColor = (role) => (role === "admin" ? "admin" : "user");

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
  window.location.href = "/login";
};
