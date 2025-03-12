import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "/hyrly_nobg.png";
import { Button } from "./ui/button";
import { useApp } from "@/stores/useApp";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Bell,
  ChevronDown,
  ClipboardList,
  FileCheck,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, notifications } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/">
          <img src={logo} className="w-24" alt="Logo" />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-4 text-md font-normal">
            {["Find Task", "Leaderboard"].map((value, index) => {
              const link =
                value === "Find Task" ? "/find-task" : "/leaderboard";
              const isActive = location.pathname === link;
              return (
                <Link
                  key={index}
                  className={`relative cursor-pointer transition-all duration-300 hover:underline ${isActive ? "text-[#18cb96]" : ""
                    }`}
                  to={link}
                >
                  {value}
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {user ? (
          <>
            {user.role === "client" && (
              <Button
                onClick={() => navigate("/post-task")}
                className="hidden md:block"
              >
                Post a Task
              </Button>
            )}
            <Link to="/notifications" className="relative inline-block">
              <Bell size={23} className="cursor-pointer" />
              {notifications?.length > 0 && (
                <Badge className="absolute top-[-5px] right-[-5px] rounded-full h-5 w-5 text-xs flex items-center justify-center bg-red-500 text-white">
                  {notifications.length}
                </Badge>
              )}
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-1 cursor-pointer">
                  <Avatar className="cursor-pointer w-10 h-10">
                    <AvatarFallback>
                      {user?.firstName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown size={16} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 shadow-md rounded-md">
                <ul className="text-sm">
                  <Link
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-secondary"
                    to="/profile"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  {user?.role === "client" && (
                    <Link
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-secondary"
                      to="/posted-tasks"
                    >
                      <ClipboardList className="w-4 h-4" /> Posted Tasks
                    </Link>
                  )}
                  <Link
                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-secondary"
                    to="/my-submissions"
                  >
                    <FileCheck className="w-4 h-4" /> My Submissions
                  </Link>
                  <Button
                    onClick={logout}
                    variant={"outline"}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </Button>
                </ul>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>Signup</Button>
          </div>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <button className="md:hidden">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </PopoverTrigger>
          <PopoverContent className="md:hidden w-[200px] p-4 shadow-lg border rounded-md">
            <ul className="flex flex-col text-md font-normal">
              <Link to="/find-task" onClick={() => setMenuOpen(false)} className="border-b py-3">
                Find Task
              </Link>
              <Link to="/leaderboard" onClick={() => setMenuOpen(false)} className="border-b py-3">
                Leaderboard
              </Link>
              {user && user.role === "client" && (
                <Button
                  onClick={() => navigate("/post-task")}
                  className="w-full mb-2"
                >
                  Post a Task
                </Button>
              )}
              {!user ? (
                <div className="flex flex-col gap-4">
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/signup")}>Signup</Button>
                </div>
              ) : (
                <Button
                  onClick={logout}
                  variant={"outline"}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              )}
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Navbar;
