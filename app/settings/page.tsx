"use client";

import { ProtectedLayout } from "@/components/ProtectedLayout";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Bell,
  Moon,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "account" | "security" | "notifications" | "appearance"
  >("account");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "demo@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Software Developer & Designer",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSaveAccount = () => {
    alert("Account settings saved!");
  };

  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-down space-y-4">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Settings
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="animate-fade-in-left space-y-2">
            <button
              onClick={() => setActiveTab("account")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "account"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Account
              </div>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "security"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Security
              </div>
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "notifications"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </div>
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === "appearance"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                Appearance
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="animate-fade-in-right bg-card border border-border rounded-lg p-6 space-y-6">
            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Account Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Full Name
                      </label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) =>
                          handleFormChange("fullName", e.target.value)
                        }
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleFormChange("email", e.target.value)
                        }
                        placeholder="Your email"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Phone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          handleFormChange("phone", e.target.value)
                        }
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) =>
                          handleFormChange("bio", e.target.value)
                        }
                        placeholder="Tell us about yourself"
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <Button
                  onClick={handleSaveAccount}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Change Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.currentPassword}
                          onChange={(e) =>
                            handleFormChange("currentPassword", e.target.value)
                          }
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        New Password
                      </label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={(e) =>
                          handleFormChange("newPassword", e.target.value)
                        }
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Confirm Password
                      </label>
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleFormChange("confirmPassword", e.target.value)
                        }
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                <Separator />
                <Button
                  onClick={handleChangePassword}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Update Password
                </Button>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: "emailNotifications",
                        label: "Email Notifications",
                        description: "Receive updates via email",
                      },
                      {
                        key: "pushNotifications",
                        label: "Push Notifications",
                        description:
                          "Receive push notifications on your device",
                      },
                      {
                        key: "smsNotifications",
                        label: "SMS Notifications",
                        description: "Receive important updates via SMS",
                      },
                      {
                        key: "marketingEmails",
                        label: "Marketing Emails",
                        description: "Receive marketing and promotional emails",
                      },
                    ].map((notif) => (
                      <div
                        key={notif.key}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{notif.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {notif.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleNotificationChange(
                              notif.key as keyof typeof notifications
                            )
                          }
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications[
                              notif.key as keyof typeof notifications
                            ]
                              ? "bg-primary"
                              : "bg-input"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications[
                                notif.key as keyof typeof notifications
                              ]
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <Button size="lg" className="w-full sm:w-auto">
                  Save Preferences
                </Button>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Theme
                      </label>
                      <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-4 bg-accent rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Current theme:{" "}
                        <span className="font-semibold capitalize text-foreground">
                          {theme}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <Button size="lg" className="w-full sm:w-auto">
                  Save Appearance
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
