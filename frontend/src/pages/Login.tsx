import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/stores/useApp";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login, user } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await login(formData, navigate);
    setIsLoading(false);
  };
  useEffect(() => {
    if (user) {
      navigate("/find-task")
    }
  }, [user])
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        className="border rounded-md px-4 py-5 w-96 flex flex-col gap-4"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-semibold text-center">Login to Your Account</h2>

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
            placeholder="Enter your password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link className="cursor-pointer underline text-blue-400" to="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
