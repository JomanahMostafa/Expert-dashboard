import { Suspense } from "react";
import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/ToDoList";
import { DataCard } from "@/components/DataCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import {
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
} from "lucide-react";

// Skeleton loading states
function CardSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 space-y-3 animate-pulse">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 space-y-4 animate-pulse">
      <Skeleton className="h-6 w-40" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

/**
 * Dashboard Homepage
 * Professional analytics dashboard with charts, metrics, and data visualization
 */
export default function Homepage() {
  const dashboardContent = (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section with Animation */}
      <div className="space-y-2 animate-fade-in-down">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome back! Here&apos;s an overview of your key metrics.
        </p>
      </div>

      {/* Key Metrics Row - Responsive Grid with Stagger Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            title: "Total Users",
            value: "1,234",
            icon: <Users className="h-5 w-5 text-blue-500" />,
            trend: { value: 12, direction: "up" as const },
            delay: "delay-[0ms]",
          },
          {
            title: "Total Revenue",
            value: "$45,231",
            icon: <CreditCard className="h-5 w-5 text-green-500" />,
            trend: { value: 8, direction: "up" as const },
            delay: "delay-[100ms]",
          },
          {
            title: "Active Sessions",
            value: "573",
            icon: <Activity className="h-5 w-5 text-purple-500" />,
            trend: { value: 5, direction: "down" as const },
            delay: "delay-[200ms]",
          },
          {
            title: "Growth Rate",
            value: "23.5%",
            icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
            trend: { value: 4, direction: "up" as const },
            delay: "delay-[300ms]",
          },
        ].map((card, index) => (
          <div key={index} className={`animate-fade-in-up ${card.delay}`}>
            <Suspense fallback={<CardSkeleton />}>
              <DataCard
                title={card.title}
                value={card.value}
                icon={card.icon}
                trend={card.trend}
              />
            </Suspense>
          </div>
        ))}
      </div>

      {/* Charts Grid - Responsive with Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bar Chart */}
        <Suspense fallback={<ChartSkeleton />}>
          <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold">
                Revenue by Month
              </h2>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
            <AppBarChart />
          </div>
        </Suspense>

        {/* Pie Chart */}
        <Suspense fallback={<ChartSkeleton />}>
          <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-right">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Market Share
            </h2>
            <AppPieChart />
          </div>
        </Suspense>
      </div>

      {/* Area Chart - Full Width */}
      <Suspense fallback={<ChartSkeleton />}>
        <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-up">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Trends Over Time
          </h2>
          <div className="w-full overflow-x-auto">
            <AppAreaChart />
          </div>
        </div>
      </Suspense>

      {/* Data Sections - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Latest Transactions */}
        <Suspense fallback={<ChartSkeleton />}>
          <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-left">
            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Latest Transactions
            </h2>
            <div className="overflow-x-auto">
              <CardList title="Latest Transactions" />
            </div>
          </div>
        </Suspense>

        {/* Todo List */}
        <Suspense fallback={<ChartSkeleton />}>
          <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-right">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Tasks</h2>
            <TodoList />
          </div>
        </Suspense>
      </div>

      {/* Popular Content - Full Width */}
      <Suspense fallback={<ChartSkeleton />}>
        <div className="bg-card rounded-lg p-4 sm:p-6 hover-lift animate-fade-in-up">
          <h2 className="text-base sm:text-lg font-semibold mb-4">
            Popular Content
          </h2>
          <div className="overflow-x-auto">
            <CardList title="Popular Content" />
          </div>
        </div>
      </Suspense>
    </div>
  );

  return <ProtectedLayout>{dashboardContent}</ProtectedLayout>;
}
