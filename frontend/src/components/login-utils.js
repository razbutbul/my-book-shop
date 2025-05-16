export const isAdmin = (role) => role === "admin";

export const getRoleColor = (role) => (role === "admin" ? "admin" : "user");

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
