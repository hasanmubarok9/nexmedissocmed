"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignin } from "@/hooks/auth";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: signIn } = useSignin();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      signIn(
        { email, password },
        {
          onSuccess: (response) => {
            setIsLoading(false);
            localStorage.setItem("token", response.accessToken);
            router.push("/");
          },
          onError: (error) => {
            setError(`Authentication failed: ${error.message}`);
            setIsLoading(false);
          },
        }
      );
    } catch (err) {
      setError("An error occurred during sign in");
      setIsLoading(false);
    }

    return;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="overflow-hidden w-xl rounded bg-white text-slate-500 shadow-md shadow-slate-200"
        onSubmit={handleSignIn}
      >
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">Login</h3>
          </header>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-500 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative my-4">
              <input
                id="id-b03"
                type="email"
                name="id-b03"
                placeholder="your email"
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-gray-900 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-900 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your email
              </label>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-4">
              <input
                id="id-b13"
                type={showPassword ? "text" : "password"}
                name="id-b13"
                placeholder="your password"
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-gray-900 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="id-b13"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-900 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Your password
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-2.5 right-4 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  {showPassword ? (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </>
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 pt-0 ">
          <button
            type="submit"
            disabled={email === "" || password === "" || isLoading}
            className="cursor-pointer inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-gray-900 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-gray-700 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
          >
            <span>{isLoading ? "Logging in..." : "Log in"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
