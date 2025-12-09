"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/forms/AuthForm";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/use-auth";
import { Lock, Eye } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: unknown) => {
    const { email, password } = data as LoginInput;
    await login(email, password);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 px-3 py-4 overflow-x-hidden">
      {/* Animated background elements - hide on small screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute top-20 left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow"></div>
        <div className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow delay-700"></div>
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow delay-1000"></div>
      </div>

      <div className="w-full max-w-[20rem] sm:max-w-sm relative z-10 space-y-2">
        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm p-2 sm:p-4 backdrop-blur-sm border border-white/10 sm:backdrop-blur-xl sm:border-white/20 dark:border-slate-800 sm:animate-scale-in w-full box-border">
          {/* Icon and Title */}
          <div className="text-center mb-2 sm:mb-3">
            <div className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-1 sm:mb-2">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Sign in to continue
            </p>
          </div>

          {/* Form */}
          <div className="animate-fade-in-up">
            <AuthForm
              schema={loginSchema}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              title=""
              subtitle=""
              submitButtonText="Sign In"
              alternateLink={{
                text: "Sign up",
                href: "/signup",
                label: " have an account?",
              }}
              fields={[
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "your@email.com",
                },
                {
                  name: "password",
                  label: "Password",
                  type: "password",
                  placeholder: "••••••••",
                },
              ]}
            />
          </div>
        </div>

        {/* Demo Info Box */}
        <div className="hidden sm:block mt-2 w-full p-2 sm:p-3 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 animate-fade-in-up text-xs">
          <p className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
            Demo: demo@example.com / Demo@12345
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 animate-fade-in-up">
          By signing in, you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
}
