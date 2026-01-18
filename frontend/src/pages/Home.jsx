import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      // Save user email to localStorage for user identification
      localStorage.setItem('userEmail', email);
      navigate("/dashboard");
    } else {
      alert("Please fill in both fields");
    }
  };

  const loginWithGoogle = () => {
    // For demo purposes, use a default email
    const demoEmail = `google_${Date.now()}@example.com`;
    localStorage.setItem('userEmail', demoEmail);
    navigate("/dashboard");
  };

  const loginWithFacebook = () => {
    // For demo purposes, use a default email
    const demoEmail = `facebook_${Date.now()}@example.com`;
    localStorage.setItem('userEmail', demoEmail);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mock Interview</h1>
          <p className="text-gray-600 text-sm">Sign in to start practicing</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11"
          />
        </div>

        <Button className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" onClick={handleLogin}>
          Sign In
        </Button>

        <div className="flex items-center justify-center gap-2 text-gray-500">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <Button
          variant="outline"
          className="w-full h-11 flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
          onClick={loginWithGoogle}
        >
          <img
            src="/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full h-11 flex items-center justify-center gap-2 border-2 hover:bg-gray-50"
          onClick={loginWithFacebook}
        >
          <img
            src="/facebook-icon.svg"
            alt="Facebook"
            width={20}
            height={20}
          />
          Continue with Facebook
        </Button>
      </div>
    </div>
  );
}
