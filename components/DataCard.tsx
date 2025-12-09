"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface DataCardProps {
  title: string;
  description?: string;
  value?: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  isLoading?: boolean;
  error?: string;
}

/**
 * Reusable Data Card Component
 * Professional card for displaying metrics and statistics
 */
export const DataCard = React.memo<DataCardProps>(
  ({ title, description, value, icon, trend, isLoading, error }) => {
    if (isLoading) {
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            {description && <Skeleton className="h-4 w-48 mt-2" />}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-24" />
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              {description && (
                <CardDescription className="text-xs">
                  {description}
                </CardDescription>
              )}
            </div>
            {icon && <div className="text-2xl">{icon}</div>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{value}</span>
            {trend && (
              <Badge
                variant={trend.direction === "up" ? "default" : "destructive"}
              >
                {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

DataCard.displayName = "DataCard";
