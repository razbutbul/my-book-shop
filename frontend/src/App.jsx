import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import RedirectWithLogout from "./components/routing/RedirectWithLogout";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<HomePage />} />

        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/shop" element={<UserDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<RedirectWithLogout />} />
      </Routes>
    </Router>
  );
}

export default App;
