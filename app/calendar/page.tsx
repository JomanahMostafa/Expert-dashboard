"use client";

import { ProtectedLayout } from "@/components/ProtectedLayout";
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const mockEvents = [
  {
    id: 1,
    title: "Team Standup",
    date: "Dec 7, 2025",
    time: "10:00 AM - 10:30 AM",
    location: "Conference Room A",
    attendees: 8,
    type: "meeting",
    color: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    id: 2,
    title: "Project Review",
    date: "Dec 8, 2025",
    time: "2:00 PM - 3:00 PM",
    location: "Virtual - Zoom",
    attendees: 12,
    type: "meeting",
    color: "bg-purple-100 dark:bg-purple-950/30",
  },
  {
    id: 3,
    title: "Client Presentation",
    date: "Dec 10, 2025",
    time: "11:00 AM - 12:00 PM",
    location: "Client Office",
    attendees: 5,
    type: "presentation",
    color: "bg-green-100 dark:bg-green-950/30",
  },
  {
    id: 4,
    title: "Design Workshop",
    date: "Dec 12, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Creative Studio",
    attendees: 6,
    type: "workshop",
    color: "bg-orange-100 dark:bg-orange-950/30",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysInMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 7)); // Dec 7, 2025
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof mockEvents)[0] | null
  >(null);

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = daysInMonth(currentDate);

  const calendarDays = Array(firstDay)
    .fill(null)
    .concat(Array.from({ length: days }, (_, i) => i + 1));

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const pageContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-down space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Calendar
            </h1>
          </div>
          <Button className="transition-all duration-300 hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">New Event</span>
          </Button>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your schedule and events
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 space-y-4 animate-fade-in-left">
          <div className="bg-card rounded-lg border border-border p-4 sm:p-6 hover-lift">
            {/* Month Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  Next
                </Button>
              </div>
            </div>

            {/* Day Labels */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-sm p-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square p-2 rounded-lg text-center text-sm font-medium transition-all duration-200 ${
                    day
                      ? day === 7
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 hover:bg-muted cursor-pointer"
                      : "bg-transparent"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Events List */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-border">
              <h3 className="font-semibold">Upcoming Events</h3>
            </div>
            <div className="divide-y divide-border">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                    selectedEvent?.id === event.id ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1 h-16 rounded-full ${event.color}`} />
                    <div className="flex-1">
                      <h4 className="font-semibold">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.date}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-1 animate-fade-in-right">
          {selectedEvent ? (
            <div
              className={`${selectedEvent.color} rounded-lg border border-border p-4 sm:p-6 space-y-4 hover-lift`}
            >
              <div>
                <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
                <Badge className="mt-2">{selectedEvent.type}</Badge>
              </div>

              <div className="space-y-3 border-t border-border/50 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{selectedEvent.attendees} attendees</span>
                </div>
              </div>

              <div className="border-t border-border/50 pt-4 space-y-2">
                <Button className="w-full" variant="default">
                  Edit Event
                </Button>
                <Button className="w-full" variant="outline">
                  Send Reminder
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground">
                Select an event to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return <ProtectedLayout>{pageContent}</ProtectedLayout>;
}
