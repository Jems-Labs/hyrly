import React from "react";
import { UserRound, FilePen } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { signupType } from "@/lib/types";

interface ChooseRoleProps {
  formData: signupType;
  setFormData: React.Dispatch<React.SetStateAction<signupType>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function ChooseRole({ formData, setFormData, setShowForm }: ChooseRoleProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-semibold text-center">
        Join as Client or Talent
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div
          className={`flex flex-col items-center justify-center gap-3 border rounded-lg p-5 cursor-pointer transition-all ${
            formData.role === "client" ? "border-[#18cb96]" : "hover:border-[#18cb96]"
          }`}
          onClick={() => setFormData({ ...formData, role: "client" })}
        >
          <UserRound className="w-10 h-10" />
          <p className="text-lg font-medium text-center">I'm a Client, hiring top candidates</p>
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-3 border rounded-lg p-5 cursor-pointer transition-all ${
            formData.role === "talent" ? "border-[#18cb96]" : "hover:border-[#18cb96]"
          }`}
          onClick={() => setFormData({ ...formData, role: "talent" })}
        >
          <FilePen className="w-10 h-10" />
          <p className="text-lg font-medium text-center">I'm Talent, looking for work</p>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full md:w-1/2"
        onClick={() => setShowForm(true)}
      >
        Create Account
      </Button>
      <p className="text-center">
        Already have an account?{" "}
        <Link className="cursor-pointer underline text-blue-400" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default ChooseRole;
