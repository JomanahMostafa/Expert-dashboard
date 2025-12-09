"use client";

import { ProtectedLayout } from "@/components/ProtectedLayout";
import {
  Briefcase,
  Plus,
  MoreVertical,
  Users,
  Calendar,
  CheckCircle,
  Circle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete redesign of company website with modern UI/UX",
    status: "In Progress",
    progress: 65,
    team: ["John", "Jane", "Mike"],
    members: 3,
    dueDate: "Dec 25, 2025",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Mobile App Launch",
    description: "New mobile app for iOS and Android platforms",
    status: "Planning",
    progress: 25,
    team: ["Sarah", "Tom"],
    members: 2,
    dueDate: "Jan 15, 2026",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "API Integration",
    description: "Integrate third-party payment and analytics APIs",
    status: "Completed",
    progress: 100,
    team: ["Alex", "Jordan"],
    members: 2,
    dueDate: "Dec 10, 2025",
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Database Migration",
    description: "Migrate from MongoDB to PostgreSQL",
    status: "In Progress",
    progress: 45,
    team: ["Chris", "Pat"],
    members: 2,
    dueDate: "Jan 5, 2026",
    color: "bg-orange-500",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "In Progress":
      return <Circle className="h-4 w-4 text-blue-500" />;
    case "Planning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Circle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "In Progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Planning":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-down space-y-4">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Projects
            </h1>
          </div>
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage and track your projects
        </p>
      </div>

      {/* View Toggle */}
      <div className="animate-fade-in-up flex gap-2">
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          onClick={() => setViewMode("grid")}
          size="sm"
        >
          Grid View
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          onClick={() => setViewMode("list")}
          size="sm"
        >
          List View
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List/Grid */}
        <div
          className={`${
            viewMode === "grid" ? "lg:col-span-3" : "lg:col-span-2"
          }`}
        >
          <div
            className={`grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {mockProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`animate-fade-in-up cursor-pointer rounded-lg border border-border bg-card p-4 sm:p-6 transition-all duration-200 hover-lift ${
                  selectedProject.id === project.id
                    ? "ring-2 ring-primary shadow-lg"
                    : "hover:border-primary/50"
                }`}
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`h-3 w-3 rounded-full ${project.color}`}
                      />
                      <h3 className="font-semibold text-sm sm:text-base truncate">
                        {project.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-xs font-semibold">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-input rounded-full overflow-hidden">
                    <div
                      className={`h-full ${project.color} transition-all duration-300`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Status & Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      <Badge
                        variant="secondary"
                        className={getStatusColor(project.status)}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Team */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {project.members} team members
                    </span>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Due: {project.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details Panel */}
        {viewMode === "list" && selectedProject && (
          <div className="animate-fade-in-right lg:col-span-1 bg-card border border-border rounded-lg p-4 sm:p-6 space-y-6 h-fit sticky top-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`h-4 w-4 rounded-full ${selectedProject.color}`}
                />
                <h2 className="text-xl font-bold">{selectedProject.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedProject.description}
              </p>

              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                {getStatusIcon(selectedProject.status)}
                <Badge className={getStatusColor(selectedProject.status)}>
                  {selectedProject.status}
                </Badge>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-semibold">
                    {selectedProject.progress}%
                  </span>
                </div>
                <div className="h-2 bg-input rounded-full overflow-hidden">
                  <div
                    className={`h-full ${selectedProject.color}`}
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>
              </div>

              {/* Team Members */}
              <div className="mb-4">
                <h3 className="font-semibold text-sm mb-2">Team Members</h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.team.map((member) => (
                    <div
                      key={member}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center gap-2 text-sm mb-6">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Due: {selectedProject.dueDate}
                </span>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button size="sm" className="w-full">
                  Edit Project
                </Button>
                <Button size="sm" variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
