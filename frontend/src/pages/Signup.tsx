import ChooseRole from "@/components/ChooseRole";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/stores/useApp";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const { signup } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [showform, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "talent",
  });

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signup(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      {showform ? (
        <form
          className="border rounded-md px-4 py-5 w-96 flex flex-col gap-4"
          onSubmit={handleSignup}
        >
          <h2 className="text-xl font-semibold text-center">
            Create Your Account
          </h2>
          <div className="flex gap-2">

         
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              placeholder="eg. John"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              placeholder="eg. Doe"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="eg. johndoe@email.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password (6 or more characters)"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                {" "}
                <Loader2 className="animate-spin" />
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="cursor-pointer underline text-blue-400"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      ) : (
        <ChooseRole
          formData={formData}
          setFormData={setFormData}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}

export default Signup;
