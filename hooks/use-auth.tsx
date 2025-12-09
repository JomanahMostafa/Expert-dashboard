"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { AuthResponse } from "@/lib/validations/auth";

// Key used for persisting authenticated user in localStorage
const STORAGE_KEY = "user";

/**
 * Authentication Context Type
 */
export interface AuthContextType {
  user: AuthResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

/**
 * Create Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load user from localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login handler
   * Sends credentials to the login API and persists the returned user
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Normalize/trim inputs client-side to avoid accidental whitespace/casing issues
      const payload = {
        email: email?.trim(),
        password: typeof password === "string" ? password.trim() : password,
      };

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          (data as any).error || `Login failed with status ${response.status}`
        );
      }

      const userData: AuthResponse = await response.json();
      setUser(userData);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      } catch (e) {
        // Failing to persist shouldn't block login
        console.warn("Failed to persist user to localStorage", e);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Signup handler
   * Creates a new account and persists the returned user
   */
  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        // Trim inputs to ensure backend receives normalized values
        const payload = {
          name: name?.trim(),
          email: email?.trim(),
          password: typeof password === "string" ? password.trim() : password,
        };

        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(
            (data as any).error ||
              `Signup failed with status ${response.status}`
          );
        }

        const userData: AuthResponse = await response.json();
        setUser(userData);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        } catch (e) {
          console.warn("Failed to persist user to localStorage", e);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred during signup";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout handler
   * Clears user from memory and persistent storage
   */
  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // Ignore storage errors on logout
      console.warn("Failed to remove user from localStorage", e);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use Auth Context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
