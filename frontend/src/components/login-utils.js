export const isAdmin = (role) => role === "admin";

export const getRoleColor = (role) => (role === "admin" ? "admin" : "user");
