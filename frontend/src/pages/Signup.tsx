import ChooseRole from "@/components/ChooseRole";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/stores/useApp";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { signup, user } = useApp();
  const navigate = useNavigate();
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
    await signup(formData, navigate);
    setIsLoading(false);
  };

  useEffect(()=>{
    if(user){
      navigate("/find-task")
    }
  },[user])

  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4">
      {showform ? (
        <form
          className="border rounded-lg px-6 py-8 w-full max-w-lg flex flex-col gap-4 shadow-md"
          onSubmit={handleSignup}
        >
          <h2 className="text-2xl font-semibold text-center mb-5">
            Create Your Account
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="w-full flex flex-col gap-2">
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
            <div className="w-full  flex flex-col gap-2">
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
          <div className="w-full  flex flex-col gap-2">
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
          <div className="w-full flex flex-col gap-2">
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
          <Button disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Signing up...
              </>
            ) : (
              "Signup"
            )}
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link className="cursor-pointer underline text-blue-500" to="/login">
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
