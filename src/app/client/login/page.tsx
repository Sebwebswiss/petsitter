"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RecaptchaVerifier, signInWithPhoneNumber } from "@/config/firebase";
import { auth, googleProvider } from "@/config/firebase"; // Ensure correct import path
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
// Extend the Window interface for our custom properties
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [captchaInitialized, setCaptchaInitialized] = useState(false);

  const router = useRouter();
  const recaptchaInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!recaptchaInitializedRef.current) {
      setupRecaptcha();
      recaptchaInitializedRef.current = true;
    }
  }, []);

  const setupRecaptcha = () => {
    if (typeof window !== "undefined") {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA verified", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );

      window.recaptchaVerifier
        .render()
        .then(() => {
          console.log("reCAPTCHA initialized");
          setCaptchaInitialized(true);
        })
        .catch((error: any) => {
          console.error("Error initializing reCAPTCHA:", error);
        });
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/client-login",
        JSON.stringify({ email, password }),
      );

      if (response.data.token) {
        localStorage.setItem("client_token", response.data.token);
        router.push("/client/dashboard");
        toast.success("Sign in successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to login");
      console.error("Failed to login:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await axios.post("/api/auth/client-login",
        JSON.stringify({ email: user.email, password: user.uid }),
      );


      if (response.data.token) {
        localStorage.setItem("client_token", response.data.token);
        router.push("/client/dashboard");
        toast.success("Sign in successfully");
      }

    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occured during sign in");
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
    <>
      <div id="recaptcha-container"></div>

      <div className="font-heading max-w-[90%] lg:max-w-7xl 2xl:max-w-7xl mx-auto flex justify-center items-center h-screen">
        <div className="w-full border-stroke lg:max-w-[400px] flex flex-col justify-center md:h-full">
          <div className="w-full mx-auto flex flex-col items-center">
            <Link className="mb-3 inline-block" href="/">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Pet Sitter</h1>
            </Link>

            <h2 className="mb-4 text-xl sm:text-2xl font-bold font-heading text-white">
              Sign In to Client Portal
            </h2>

            <form className="w-full h-full" onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block text-base sm:text-lg font-medium font-heading text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-base sm:text-lg text-white outline-none focus:border-primary focus-visible:shadow-none"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-base sm:text-lg font-medium font-heading text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-base sm:text-lg text-white outline-none focus:border-primary focus-visible:shadow-none"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary py-3 text-white text-base sm:text-lg transition hover:bg-opacity-90"
                />
              </div>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-4 flex items-center justify-center rounded-lg border py-3 text-white text-base sm:text-lg transition hover:bg-opacity-90"
            >
              <img src="/icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>

            <div className="flex justify-between items-center w-full mt-5 mb-2">
              <p className=" font-body text-left text-base sm:text-lg">
                Don&apos;t have an account?{" "}
                <Link href={"/client/signup"} className="font-bold text-red-500 hover:text-primary">
                  Sign Up
                </Link>
              </p>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="w-full mt-4 flex items-center justify-center rounded-lg border py-3 text-white text-base sm:text-lg transition hover:bg-opacity-90"
            >
              <img src="/icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default Page;
