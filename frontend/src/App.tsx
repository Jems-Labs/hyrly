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
import PostedTasks from "./pages/PostedTasks";
import FindTask from "./pages/FindTask";
import Task from "./pages/Task";
import Submit from "./pages/Submit";
import Submissions from "./pages/Submissions";
import Notifications from "./pages/Notifications";
import MySubmissions from "./pages/MySubmissions";
import Leaderboard from "./pages/Leaderboard";
import PublicProfile from "./pages/PublicProfile";
import Footer from "./components/Footer";

function App() {
  const { fetchUser, fetchMyNotifications, user } = useApp();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMyNotifications();
    }
  }, [user]);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
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
          <Route
            path="/posted-tasks"
            element={
              <ClientProtect>
                <PostedTasks />
              </ClientProtect>
            }
          />
          <Route path="/find-task" element={<FindTask />} />
          <Route path="/task/:id" element={<Task />} />
          <Route path="/task/:id/submit" element={<Submit />} />
          <Route
            path="/task/:id/submissions"
            element={
              <ClientProtect>
                <Submissions />
              </ClientProtect>
            }
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-submissions" element={<MySubmissions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/user/:id" element={<PublicProfile />} />
        </Routes>
      </div>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
