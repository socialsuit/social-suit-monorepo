"use client";

import { useEffect, useState } from "react";

interface AuthSplitScreenProps {
  onCloseAction: () => void;
}

export default function AuthSplitScreen({ onCloseAction }: AuthSplitScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseAction();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onCloseAction]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login or signup logic
    console.log(isSignUp ? "Sign Up" : "Sign In", email, password);
  };

  const handleWalletConnect = () => {
    // TODO: Integrate wallet connection logic (e.g. MetaMask, WalletConnect, etc.)
    console.log("Wallet Connect clicked");
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left Side - Welcome */}
      <div className="w-1/2 bg-gradient-to-br from-primary to-indigo-600 text-white flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Social Suit</h1>
        <p className="text-lg text-white/80 text-center max-w-md">
          The AI-powered social media manager built for Web2 & Web3 creators.
        </p>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-1/2 bg-white dark:bg-gray-900 flex flex-col justify-center items-center p-8 relative">
        <button
          onClick={onCloseAction}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </h2>

        {/* Email Form */}
        <form onSubmit={handleEmailSubmit} className="space-y-4 w-full max-w-xs">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full py-2 px-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white dark:text-black rounded-md hover:bg-primary/90 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-gray-500 dark:text-gray-400 text-sm">or</div>

        {/* Wallet / Google Auth */}
        <div className="space-y-3 w-full max-w-xs">
          <button
            onClick={handleWalletConnect}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Continue with Wallet
          </button>

          <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
            Continue with Google
          </button>
        </div>

        {/* Terms */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary underline">
            Privacy Policy
          </a>
          .
        </p>

        {/* Switch Sign In/Up */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignUp(false)}
                className="text-primary cursor-pointer underline"
              >
                Sign In
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsSignUp(true)}
                className="text-primary cursor-pointer underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
