"use client";

import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type StatusType = "success" | "error" | "warning" | "info";

export interface StatusAlertProps {
  status: StatusType;
  title?: string;
  message: string;
  onDismiss?: () => void;
}

/**
 * Professional Status Alert Component
 * Used for displaying status messages (success, error, warning, info)
 */
export const StatusAlert = React.memo<StatusAlertProps>(
  ({ status, title, message, onDismiss }) => {
    const variants: Record<StatusType, "default" | "destructive"> = {
      success: "default",
      error: "destructive",
      warning: "default",
      info: "default",
    };

    const icons: Record<StatusType, React.ReactNode> = {
      success: <CheckCircle className="h-4 w-4" />,
      error: <AlertCircle className="h-4 w-4" />,
      warning: <AlertTriangle className="h-4 w-4" />,
      info: <Info className="h-4 w-4" />,
    };

    return (
      <Alert variant={variants[status]} className="relative">
        <div className="flex gap-3 w-full">
          <div className="flex-shrink-0">{icons[status]}</div>
          <div className="flex-1">
            {title && <AlertTitle>{title}</AlertTitle>}
            <AlertDescription>{message}</AlertDescription>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Dismiss"
            >
              ✕
            </button>
          )}
        </div>
      </Alert>
    );
  }
);

StatusAlert.displayName = "StatusAlert";
