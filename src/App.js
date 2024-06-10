import "./App.css";
import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import AllUsers from "./components/AllUsers";

const ROLES = ["user", "admin"];

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Protect these routes */}
      <Route element={<ProtectedRoute allowedRole={ROLES[0]} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route element={<Layout />}>
          <Route path="/users" element={<AllUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
