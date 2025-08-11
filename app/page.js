"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Here you can add real authentication logic
    if (email && password) {
      console.log("Email:", email, "Password:", password);
      router.push("/dashboard"); // Redirect to dashboard
    } else {
      alert("Please fill in both fields");
    }
  };

  const loginWithGoogle = () => {
    console.log("Google Login");
    router.push("/dashboard");
  };

  const loginWithFacebook = () => {
    console.log("Facebook Login");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {/* Email */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={loginWithGoogle}
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>

        {/* Facebook Login */}
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={loginWithFacebook}
        >
          <Image
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
