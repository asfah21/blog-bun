"use client";

import { useState } from "react";
import { Card, CardHeader, CardFooter } from "@heroui/react";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { Logo } from "@/components/icons";

export default function JoinPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950 p-4 sm:p-6 py-12 sm:py-24">
      <div className="text-center mb-10 max-w-md px-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Become a Listofont Member.
        </h1>
        <p className="text-sm sm:text-base text-default-600 leading-relaxed">
          <span className="underline decoration-primary decoration-2 underline-offset-4 font-semibold">
            100% Free
          </span>{" "}
          accounts that allow you to create font collections, keep track of your
          downloads, and more!
        </p>
      </div>

      <Card className="w-full max-w-md shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden border border-opacity-10 border-white dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-900/30">
        <CardHeader className="flex flex-col gap-3 p-3 sm:p-5 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success-300 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                <Logo />
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">LISTOFONT</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Create a new account to join our community
          </p>
        </CardHeader>

        <div className="bg-gradient-to-r from-blue-600 to-purple-800 h-1.5 w-full" />

        <div className="space-y-6 p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label
                className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  className="text-xs bg-gray-50 dark:bg-gray-900 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="fullName"
                  placeholder="John Doe"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSymbolIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  className="text-xs bg-gray-50 dark:bg-gray-900 block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                className="text-xs sm:text-xs font-medium text-gray-700 dark:text-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  required
                  className="text-xs bg-gray-50 dark:bg-gray-900 block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                className="text-blue-600 hover:underline font-medium"
                href="/login"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>

        <CardFooter className="mt-2 flex justify-center py-3 sm:py-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl sm:rounded-b-2xl">
          <p className="text-xs text-center text-gray-500">
            {new Date().getFullYear()} © Listofont
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
