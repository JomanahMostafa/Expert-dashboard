"use client";

import { ProtectedLayout } from "@/components/ProtectedLayout";
import {
  Search as SearchIcon,
  FileText,
  Users,
  CreditCard,
  Clock,
  Eye,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockSearchResults = {
  users: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "User" },
  ],
  documents: [
    {
      id: 1,
      title: "Q4 Report 2025",
      type: "PDF",
      size: "2.4 MB",
      modified: "2 days ago",
    },
    {
      id: 2,
      title: "Project Proposal",
      type: "DOCX",
      size: "1.2 MB",
      modified: "5 days ago",
    },
    {
      id: 3,
      title: "Meeting Notes",
      type: "TXT",
      size: "45 KB",
      modified: "1 week ago",
    },
  ],
  payments: [
    {
      id: 1,
      description: "Invoice #001",
      amount: "$1,250",
      date: "Dec 1",
      status: "Paid",
    },
    {
      id: 2,
      description: "Invoice #002",
      amount: "$2,500",
      date: "Dec 5",
      status: "Pending",
    },
    {
      id: 3,
      description: "Invoice #003",
      amount: "$875",
      date: "Dec 7",
      status: "Paid",
    },
  ],
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filterResults = (query: string) => {
    if (!query.trim()) return { users: [], documents: [], payments: [] };

    const lowerQuery = query.toLowerCase();
    return {
      users: mockSearchResults.users.filter(
        (u) =>
          u.name.toLowerCase().includes(lowerQuery) ||
          u.email.toLowerCase().includes(lowerQuery)
      ),
      documents: mockSearchResults.documents.filter((d) =>
        d.title.toLowerCase().includes(lowerQuery)
      ),
      payments: mockSearchResults.payments.filter((p) =>
        p.description.toLowerCase().includes(lowerQuery)
      ),
    };
  };

  const results = filterResults(searchQuery);
  const totalResults =
    results.users.length + results.documents.length + results.payments.length;

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-down space-y-4">
        <div className="flex items-center gap-2">
          <SearchIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Search
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Find users, documents, payments and more
        </p>
      </div>

      {/* Search Bar */}
      <div className="animate-fade-in-up relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users, documents, payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-base"
          />
        </div>
      </div>

      {/* Results */}
      {searchQuery.trim() && (
        <div className="animate-fade-in-up space-y-6">
          {/* Results Summary */}
          <div className="text-sm text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-foreground">
              {totalResults}
            </span>{" "}
            results for &quot;{searchQuery}&quot;
          </div>

          {/* Users Results */}
          {results.users.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Users ({results.users.length})
              </h2>
              <div className="space-y-2">
                {results.users.map((user) => (
                  <div
                    key={user.id}
                    className="bg-card border border-border rounded-lg p-4 hover-lift transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Results */}
          {results.documents.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Documents ({results.documents.length})
              </h2>
              <div className="space-y-2">
                {results.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-card border border-border rounded-lg p-4 hover-lift transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{doc.title}</h3>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {doc.modified}
                          </span>
                        </div>
                      </div>
                      <Eye className="h-5 w-5 text-primary cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payments Results */}
          {results.payments.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payments ({results.payments.length})
              </h2>
              <div className="space-y-2">
                {results.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="bg-card border border-border rounded-lg p-4 hover-lift transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{payment.description}</h3>
                        <p className="text-sm text-muted-foreground">
                          {payment.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{payment.amount}</p>
                        <p
                          className={`text-xs ${
                            payment.status === "Paid"
                              ? "text-green-600 dark:text-green-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No results found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}

      {!searchQuery.trim() && (
        <div className="text-center py-16">
          <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Start searching
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Enter a query above to search through users, documents, and payments
          </p>
        </div>
      )}
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
