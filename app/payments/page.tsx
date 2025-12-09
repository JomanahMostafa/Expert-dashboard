import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { CreditCard, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const getData = async (): Promise<Payment[]> => {
  return [
    {
      id: "728ed521",
      amount: 134,
      status: "pending",
      username: "John Doe",
      email: "johndoe@gmail.com",
    },
    {
      id: "728ed522",
      amount: 124,
      status: "success",
      username: "Jane Doe",
      email: "janedoe@gmail.com",
    },
    {
      id: "728ed523",
      amount: 167,
      status: "success",
      username: "Mike Galloway",
      email: "mikegalloway@gmail.com",
    },
    {
      id: "728ed524",
      amount: 156,
      status: "failed",
      username: "Minerva Robinson",
      email: "minerbarobinson@gmail.com",
    },
    {
      id: "728ed525",
      amount: 145,
      status: "success",
      username: "Mable Clayton",
      email: "mableclayton@gmail.com",
    },
    {
      id: "728ed526",
      amount: 189,
      status: "pending",
      username: "Nathan McDaniel",
      email: "nathanmcdaniel@gmail.com",
    },
    {
      id: "728ed527",
      amount: 178,
      status: "success",
      username: "Myrtie Lamb",
      email: "myrtielamb@gmail.com",
    },
    {
      id: "728ed528",
      amount: 190,
      status: "success",
      username: "Leona Bryant",
      email: "leonabryant@gmail.com",
    },
    {
      id: "728ed529",
      amount: 134,
      status: "failed",
      username: "Aaron Willis",
      email: "aaronwillis@gmail.com",
    },
    {
      id: "728ed52a",
      amount: 543,
      status: "success",
      username: "Joel Keller",
      email: "joelkeller@gmail.com",
    },
    {
      id: "728ed52b",
      amount: 234,
      status: "pending",
      username: "Daniel Ellis",
      email: "danielellis@gmail.com",
    },
    {
      id: "728ed52c",
      amount: 345,
      status: "success",
      username: "Gordon Kennedy",
      email: "gordonkennedy@gmail.com",
    },
    {
      id: "728ed52d",
      amount: 335,
      status: "failed",
      username: "Emily Hoffman",
      email: "emilyhoffman@gmail.com",
    },
    {
      id: "728ed52e",
      amount: 664,
      status: "pending",
      username: "Jeffery Garrett",
      email: "jefferygarrett@gmail.com",
    },
    {
      id: "728ed52f",
      amount: 332,
      status: "success",
      username: "Ralph Baker",
      email: "ralphbaker@gmail.com",
    },
    {
      id: "728ed52g",
      amount: 413,
      status: "failed",
      username: "Seth Fields",
      email: "sethfields@gmail.com",
    },
    {
      id: "728ed52h",
      amount: 345,
      status: "pending",
      username: "Julia Webb",
      email: "juliawebb@gmail.com",
    },
    {
      id: "728ed52i",
      amount: 754,
      status: "success",
      username: "Gary Banks",
      email: "garybanks@gmail.com",
    },
    {
      id: "728ed52j",
      amount: 643,
      status: "failed",
      username: "Flora Chambers",
      email: "florachambers@gmail.com",
    },
    {
      id: "728ed52k",
      amount: 543,
      status: "pending",
      username: "Steve Hanson",
      email: "stevehanson@gmail.com",
    },
  ];
};

function TableSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );
}

export default async function PaymentsPage() {
  const data = await getData();

  // Calculate statistics
  const totalAmount = data.reduce((sum, payment) => sum + payment.amount, 0);
  const successfulPayments = data.filter((p) => p.status === "success").length;
  const pendingPayments = data.filter((p) => p.status === "pending").length;
  const failedPayments = data.filter((p) => p.status === "failed").length;

  const pageContent = (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Animation */}
      <div className="animate-fade-in-down space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Payments
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage and track all payment transactions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto transition-all duration-300 hover-lift"
            >
              <Filter className="h-4 w-4 mr-2" />
              <span className="text-sm sm:text-base">Filter</span>
            </Button>
            <Button className="w-full sm:w-auto transition-all duration-300 hover-lift">
              <Download className="h-4 w-4 mr-2" />
              <span className="text-sm sm:text-base">Export</span>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-fade-in-up">
          <StatCard
            label="Total Amount"
            value={`$${totalAmount.toLocaleString()}`}
            change="+12.5%"
            color="bg-blue-50 dark:bg-blue-950/30"
            delay="delay-[0ms]"
          />
          <StatCard
            label="Successful"
            value={successfulPayments.toString()}
            change={`${Math.round((successfulPayments / data.length) * 100)}%`}
            color="bg-green-50 dark:bg-green-950/30"
            delay="delay-[100ms]"
          />
          <StatCard
            label="Pending"
            value={pendingPayments.toString()}
            change={`${Math.round((pendingPayments / data.length) * 100)}%`}
            color="bg-amber-50 dark:bg-amber-950/30"
            delay="delay-[200ms]"
          />
          <StatCard
            label="Failed"
            value={failedPayments.toString()}
            change={`${Math.round((failedPayments / data.length) * 100)}%`}
            color="bg-red-50 dark:bg-red-950/30"
            delay="delay-[300ms]"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="animate-fade-in-up">
        <Suspense fallback={<TableSkeleton />}>
          <DataTable columns={columns} data={data} />
        </Suspense>
      </div>
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}

function StatCard({
  label,
  value,
  change,
  color,
  delay,
}: {
  label: string;
  value: string;
  change: string;
  color: string;
  delay: string;
}) {
  return (
    <div className={`animate-fade-in-up ${delay}`}>
      <div
        className={`${color} rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover-lift`}
      >
        <p className="text-xs sm:text-sm text-muted-foreground mb-1">{label}</p>
        <div className="flex items-end justify-between gap-2">
          <p className="text-lg sm:text-2xl font-bold truncate">{value}</p>
          <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 whitespace-nowrap">
            {change}
          </p>
        </div>
      </div>
    </div>
  );
}
