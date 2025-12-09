"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/forms/AuthForm";
import { signupSchema } from "@/lib/validations/auth";
import { useAuth } from "@/hooks/use-auth";
import { UserPlus, Check, X } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading, error, isAuthenticated } = useAuth();
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (data: unknown) => {
    // حذف confirmPassword قبل الإرسال
    const { confirmPassword, ...payload } = data as Record<string, unknown>;

    const { name, email, password } = payload;
    await signup(name as string, email as string, password as string);

    router.push("/");
  };

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 px-3 py-4 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden sm:block absolute top-20 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow"></div>
        <div className="hidden sm:block absolute bottom-20 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow delay-700"></div>
        <div className="hidden md:block absolute top-1/2 right-1/3 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-glow delay-1000"></div>
      </div>

      <div className="w-full max-w-[20rem] sm:max-w-sm relative z-10 space-y-2">
        <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm p-2 sm:p-4 backdrop-blur-sm border border-white/10 sm:backdrop-blur-xl sm:border-white/20 animate-scale-in w-full box-border">
          <div className="text-center mb-2 sm:mb-3">
            <div className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mb-1 sm:mb-2">
              <UserPlus className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              Join us today
            </p>
          </div>

          <div className="animate-fade-in-up">
            <AuthForm
              schema={signupSchema}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              title=""
              subtitle=""
              submitButtonText="Sign Up"
              alternateLink={{
                text: "Sign in",
                href: "/login",
                label: "Already have an account?",
              }}
              fields={[
                {
                  name: "name",
                  label: "Full Name",
                  type: "text",
                  placeholder: "John Doe",
                },
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
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                  placeholder: "••••••••",
                },
              ]}
              onPasswordChange={(pwd) => setPassword(pwd)}
            />
          </div>
        </div>

        {/* Compact summary on extra-small screens */}
        <div className="w-full sm:hidden p-2 text-center text-xs text-amber-900 dark:text-amber-300">
          Min 8 chars, 1 uppercase, 1 lowercase, 1 number
        </div>

        <div className="hidden sm:block mt-2 w-full p-2 sm:p-3 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 animate-fade-in-up text-xs">
          <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
            Password Rules:
          </p>
          <ul className="space-y-1 text-xs">
            {[
              {
                key: "length",
                label: "At least 8 characters",
                met: passwordChecks.length,
              },
              {
                key: "uppercase",
                label: "One uppercase letter",
                met: passwordChecks.uppercase,
              },
              {
                key: "lowercase",
                label: "One lowercase letter",
                met: passwordChecks.lowercase,
              },
              {
                key: "number",
                label: "One number",
                met: passwordChecks.number,
              },
            ].map((req) => (
              <li
                key={req.key}
                className="flex items-center gap-2 text-xs transition-all duration-300"
              >
                {req.met ? (
                  <div className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-500 flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0">
                    <X className="h-3 w-3 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
                <span
                  className={
                    req.met
                      ? "text-green-700 dark:text-green-300 font-medium"
                      : "text-amber-700 dark:text-amber-300"
                  }
                >
                  {req.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 animate-fade-in-up">
          By creating an account, you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
}
