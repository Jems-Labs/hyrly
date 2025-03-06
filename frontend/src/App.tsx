import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/sonner";
import { useApp } from "./stores/useApp";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import ClientProtect from "./lib/ClientProtect";
import PostTask from "./pages/PostTask";

function App() {
  const { fetchUser } = useApp();

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/post-task"
          element={
            <ClientProtect>
              <PostTask />
            </ClientProtect>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
