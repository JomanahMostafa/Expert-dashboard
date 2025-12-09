"use client";

import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Mail, Archive, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockInboxMessages = [
  {
    id: 1,
    from: "John Smith",
    email: "john@example.com",
    subject: "Project Update Required",
    preview: "Can you please review the latest project updates...",
    timestamp: "2 hours ago",
    read: false,
    starred: false,
  },
  {
    id: 2,
    from: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Meeting Tomorrow at 3 PM",
    preview:
      "Let's confirm the meeting tomorrow regarding the quarterly review...",
    timestamp: "5 hours ago",
    read: true,
    starred: true,
  },
  {
    id: 3,
    from: "Mike Davis",
    email: "mike@example.com",
    subject: "Design Review",
    preview: "I've completed the design mockups. Please take a look...",
    timestamp: "Yesterday",
    read: true,
    starred: false,
  },
  {
    id: 4,
    from: "Emily Brown",
    email: "emily@example.com",
    subject: "Budget Approval",
    preview: "The budget for Q1 has been approved. Here are the details...",
    timestamp: "2 days ago",
    read: true,
    starred: false,
  },
];

export default function InboxPage() {
  const [messages, setMessages] = useState(mockInboxMessages);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleStar = (id: number) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const markAsRead = (id: number) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const selectedMessage = messages.find((m) => m.id === selectedId);
  const unreadCount = messages.filter((m) => !m.read).length;

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-down space-y-2">
        <div className="flex items-center gap-2">
          <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Inbox
          </h1>
          {unreadCount > 0 && (
            <Badge variant="default" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your messages and communications
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-left">
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {messages.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No messages
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your inbox is empty
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    setSelectedId(message.id);
                    markAsRead(message.id);
                  }}
                  className={`p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                    selectedId === message.id ? "bg-muted/50" : ""
                  } ${
                    !message.read ? "bg-blue-50/50 dark:bg-blue-950/20" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(message.id);
                      }}
                      className="mt-1"
                    >
                      <Star
                        className={`h-4 w-4 transition-colors ${
                          message.starred
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className={`font-semibold truncate ${
                            !message.read ? "text-foreground font-bold" : ""
                          }`}
                        >
                          {message.from}
                        </h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {message.email}
                      </p>
                      <p
                        className={`text-sm mt-1 truncate ${
                          !message.read
                            ? "font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-1 animate-fade-in-right">
          {selectedMessage ? (
            <div className="bg-card rounded-lg border border-border p-4 sm:p-6 space-y-4 hover-lift">
              <div>
                <h2 className="text-xl font-bold break-words">
                  {selectedMessage.subject}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  From: {selectedMessage.from}
                </p>
                <p className="text-xs text-muted-foreground">
                  {selectedMessage.email}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm whitespace-pre-wrap">
                  {selectedMessage.preview}
                </p>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => toggleStar(selectedMessage.id)}
                >
                  <Star
                    className={`h-4 w-4 ${
                      selectedMessage.starred
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
                    }`}
                  />
                  {selectedMessage.starred ? "Remove Star" : "Add Star"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                  onClick={() => deleteMessage(selectedMessage.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <Mail className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">
                Select a message to read
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
