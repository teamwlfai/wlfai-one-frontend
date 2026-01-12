import { useState } from "react";
import AppointmentCard from "./AppointmentCard";
import AppointmentModal from "./AppointmentModal";

export default function AppointmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "today" | "upcoming" | "completed"
  >("all");

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientAvatar: "SJ",
      doctorName: "Dr. Smith",
      date: "2026-01-06",
      time: "09:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "confirmed",
      reason: "Regular Checkup",
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientAvatar: "MC",
      doctorName: "Dr. Johnson",
      date: "2026-01-06",
      time: "10:30 AM",
      duration: "45 min",
      type: "Follow-up",
      status: "confirmed",
      reason: "Diabetes Management",
    },
    {
      id: 3,
      patientName: "Emily Rodriguez",
      patientAvatar: "ER",
      doctorName: "Dr. Williams",
      date: "2026-01-06",
      time: "02:00 PM",
      duration: "30 min",
      type: "Lab Review",
      status: "pending",
      reason: "Test Results Discussion",
    },
    {
      id: 4,
      patientName: "James Wilson",
      patientAvatar: "JW",
      doctorName: "Dr. Smith",
      date: "2026-01-07",
      time: "11:00 AM",
      duration: "30 min",
      type: "Consultation",
      status: "confirmed",
      reason: "Blood Pressure Check",
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      patientAvatar: "LA",
      doctorName: "Dr. Brown",
      date: "2026-01-05",
      time: "03:00 PM",
      duration: "30 min",
      type: "Consultation",
      status: "completed",
      reason: "General Checkup",
    },
  ];

  const getFilteredAppointments = () => {
    const today = "2026-01-06"; // Current date for demo

    switch (filter) {
      case "today":
        return appointments.filter((apt) => apt.date === today);
      case "upcoming":
        return appointments.filter(
          (apt) => apt.date >= today && apt.status !== "completed"
        );
      case "completed":
        return appointments.filter((apt) => apt.status === "completed");
      default:
        return appointments;
    }
  };

  const filteredAppointments = getFilteredAppointments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and schedule patient appointments
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>New Appointment</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Today's Appointments
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {appointments.filter((a) => a.date === "2026-01-06").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Confirmed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {appointments.filter((a) => a.status === "confirmed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {appointments.filter((a) => a.status === "pending").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Completed
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {appointments.filter((a) => a.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">✔️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "all"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("today")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "today"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "upcoming"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === "completed"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Appointments List */}
      {/* <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div> */}

      {/* New Appointment Modal */}
      {isModalOpen && (
        <AppointmentModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
