import { Link, useNavigate } from "react-router-dom";
import logo from "/hyrly_nobg.png";
import { Button } from "./ui/button";
import { useApp } from "@/stores/useApp";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bell, ChevronDown, ClipboardList, LogOut, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useApp();

  return (
    <div className="border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <Link className=" cursor-pointer" to="/">
          <img src={logo} className="w-24" />
        </Link>

        <nav>
          <ul className="flex items-center gap-4 text-md font-normal">
            {[
              { value: "Find task", link: "/find-task" },
              { value: "Saved tasks", link: "/saved-tasks" },
            ].map((li) => {
              const isActive = location.pathname === li.link;
              return (
                <Link
                  className={`relative cursor-pointer transition-all duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#18cb96] after:transition-all after:duration-300 hover:after:w-full ${isActive? "text-[#18cb96]": "text-white"}`}
                  to={li.link}
                >
                  {li.value}
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
      {user ? (
        <div className="flex items-center gap-5">
          {user.role === "client" ? <Button onClick={() => navigate('/post-task')}>Post a Task</Button> : ""}

          <Bell size={20} className="cursor-pointer" />
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
            <PopoverContent className="w-[150px] p-2 shadow-md rounded-md">
              <ul className="text-sm">
                <Link className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md hover:bg-secondary" to={'/profile'}>
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                {user?.role === "client" && <Link className="flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md hover:bg-secondary" to={'/posted-tasks'}>
                  <ClipboardList className="w-4 h-4" />
                  Posted Tasks
                </Link>}
                <li
                  className="flex items-center gap-2 px-3 py-2 border-t cursor-pointer hover:bg-secondary rounded-md"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant={"outline"} onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
