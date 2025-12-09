"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FieldConfig {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface AuthFormProps {
  schema: ZodSchema;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  title: string;
  subtitle: string;
  submitButtonText: string;
  alternateLink: {
    text: string;
    href: string;
    label: string;
  };
  fields: FieldConfig[];
  onPasswordChange?: (password: string) => void;
}

export function AuthForm({
  schema,
  onSubmit,
  isLoading,
  error,
  title,
  subtitle,
  submitButtonText,
  alternateLink,
  fields,
  onPasswordChange,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(schema as never),
    mode: "onBlur",
    defaultValues,
  });

  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch {
      // Error is handled externally
    }
  });

  const passwordValue = form.watch("password");
  useEffect(() => {
    if (onPasswordChange && typeof passwordValue === "string") {
      onPasswordChange(passwordValue);
    }
  }, [passwordValue, onPasswordChange]);

  return (
    <div className="w-full max-w-[20rem] mx-auto px-2">
      <div className="w-full">
        <div className="mb-2 text-center">
          <h1 className="text-sm font-medium mb-1">{title}</h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-3">
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: fieldProps }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="text-xs">
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={
                            field.type === "password"
                              ? field.name === "confirmPassword"
                                ? showConfirmPassword
                                  ? "text"
                                  : "password"
                                : showPassword
                                ? "text"
                                : "password"
                              : field.type || "text"
                          }
                          placeholder={field.placeholder}
                          disabled={isLoading}
                          autoComplete={
                            field.type === "email"
                              ? "email"
                              : field.type === "password"
                              ? "current-password"
                              : "off"
                          }
                          {...fieldProps}
                        />
                        {field.type === "password" && (
                          <button
                            type="button"
                            onClick={() => {
                              if (field.name === "confirmPassword") {
                                setShowConfirmPassword(!showConfirmPassword);
                              } else {
                                setShowPassword(!showPassword);
                              }
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            tabIndex={-1}
                          >
                            {field.name === "confirmPassword" ? (
                              showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )
                            ) : showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3"
              size="sm"
            >
              {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              {submitButtonText}
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">{alternateLink.label} </span>
        <Link
          href={alternateLink.href}
          className="font-medium text-primary hover:underline"
        >
          {alternateLink.text}
        </Link>
      </div>
    </div>
  );
}
