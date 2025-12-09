"use client";

import { useAsync } from "@/hooks/api/use-async";
import { UserService } from "@/lib/services/user.service";
import { DataTable, TableColumn } from "@/components/DataTable";
import { StatusAlert } from "@/components/StatusAlert";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { User } from "@/lib/validations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/ui/use-form";
import { Plus, Edit2, Trash2, Users as UsersIcon, Search } from "lucide-react";
import { useState } from "react";

/**
 * Users List Page
 * Professional users management with table, filtering, and actions
 */
export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isCreateOpen,
    open: openCreate,
    close: closeCreate,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    open: openDelete,
    close: closeDelete,
  } = useModal();

  // Fetch users data
  const {
    data,
    loading,
    error,
    execute: refetch,
  } = useAsync<import("@/lib/validations").PaginatedResponse<User>>(
    () => UserService.getUsers(1, 10),
    true
  );

  // Filter users based on search term
  const filteredUsers =
    data?.data?.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      width: "25%",
      render: (value) => (
        <span className="font-medium truncate">{String(value)}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      width: "30%",
      render: (value) => (
        <span className="text-sm text-muted-foreground truncate">
          {String(value)}
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: "15%",
      render: (value) => (
        <Badge
          variant={value === "admin" ? "default" : "secondary"}
          className="transition-all duration-200"
        >
          {String(value)}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "15%",
      render: (value) => (
        <Badge
          variant={value === "active" ? "default" : "destructive"}
          className="transition-all duration-200"
        >
          {String(value)}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Actions",
      width: "15%",
      render: (value) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/users/${value}`)}
            className="transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-950"
          >
            <Edit2 className="h-4 w-4" />
            <span className="hidden sm:inline ml-2 text-xs">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={openDelete}
            className="transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-950"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline ml-2 text-xs">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  const pageContent = (
    <div className="space-y-4 sm:space-y-6">
      {/* Header with Animation */}
      <div className="animate-fade-in-down space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UsersIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Users
              </h1>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your application users
            </p>
          </div>
          <Button
            onClick={openCreate}
            className="w-full sm:w-auto transition-all duration-300 hover-lift"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">New User</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full animate-fade-in-up">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 text-sm rounded-lg border border-input bg-background transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Error Alert with Animation */}
      {error && (
        <div className="animate-slide-in-top">
          <StatusAlert status="error" title="Error" message={error.message} />
        </div>
      )}

      {/* Users Table */}
      <div className="animate-fade-in-up">
        <DataTable<User>
          columns={columns}
          data={filteredUsers}
          isLoading={loading}
          error={error?.message}
          onRowClick={(row) => router.push(`/users/${row.id}`)}
        />
      </div>

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && !error && (
        <div className="animate-fade-in-up">
          <div className="text-center py-12 sm:py-16">
            <UsersIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
              No users found
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Create your first user to get started"}
            </p>
            <Button
              onClick={openCreate}
              className="transition-all duration-300 hover-lift"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create User
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
