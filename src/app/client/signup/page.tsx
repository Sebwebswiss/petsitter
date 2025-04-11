"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { auth, googleProvider } from "@/config/firebase"; // Ensure correct import path
import { signInWithPopup } from "firebase/auth";

interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const submitUserDataToMongoDB = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      });

      if (response.ok) {
        toast.success("Account created successfully");
        router.push("/client/login");
      } else {
        toast.error("Failed to create account");
      }
    } catch (error) {
      toast.error("Error creating account");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("🚀 ~ handleGoogleSignUp ~ user:", user)
      
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: user.displayName?.split(" ")[0] || "",
          image: user.photoURL,
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          password: user.uid, // No password required for Google sign-in
        }),
      });

      toast.success("Signed up successfully with Google");
      router.push("/client/login");
    } catch (error) {
      toast.error("Google Sign-Up failed");
    }
  };

  return (
    <div className="font-heading max-w-[90%] lg:max-w-7xl mx-auto flex justify-center items-center min-h-screen py-10">
    <div className="w-full lg:max-w-[400px] flex flex-col justify-center">
      <div className="w-full mx-auto flex flex-col items-center">
        <Link className="mb-3 inline-block" href="/">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Pet Sitter</h1>
        </Link>
  
        <h2 className="mb-4 text-lg sm:text-xl md:text-2xl font-bold font-heading text-white">
          Sign Up to Client Portal
        </h2>
  
        <form className="w-full" onSubmit={submitUserDataToMongoDB}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="mb-2.5 block text-sm sm:text-base  font-medium font-heading text-white">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={userDetails.firstName}
                required
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-sm sm:text-base  text-white outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div>
              <label className="mb-2.5 block text-sm sm:text-base  font-medium font-heading text-white">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={userDetails.lastName}
                required
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-sm sm:text-base  text-white outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
  
          <div className="mb-4">
            <label className="mb-2.5 block text-sm sm:text-base  font-medium font-heading text-white">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-sm sm:text-base  text-white outline-none focus:border-primary focus-visible:shadow-none"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="mb-2.5 block text-sm sm:text-base  font-medium font-heading text-white">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-sm sm:text-base  text-white outline-none focus:border-primary focus-visible:shadow-none"
              required
            />
          </div>
  
          <div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-3 text-sm sm:text-base  text-white transition hover:bg-opacity-90"
            >
              Create account
            </button>
          </div>
        </form>
  
        <button
          onClick={handleGoogleSignUp}
          className="w-full mt-4 flex items-center justify-center rounded-lg border py-3 text-sm sm:text-base  text-white transition hover:bg-opacity-90"
        >
          <img src="/icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>
  
        <p className="text-secondary font-body text-left text-sm sm:text-base  mt-2">
          Already have an account?{" "}
          <Link href={"/client/login"} className="font-bold hover:text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default SignupPage;
