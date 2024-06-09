import "./App.css";
import AuthForm from "./components/AuthForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

const ROLES = ["user", "admin"];

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Protect these routes */}
      <Route element={<ProtectedRoute allowedRole={ROLES[0]} />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
