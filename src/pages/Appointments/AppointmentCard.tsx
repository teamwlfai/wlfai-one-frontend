interface Appointment {
  id: number;
  patientName: string;
  patientAvatar: string;
  doctorName: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  reason: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "consultation":
        return "👨‍⚕️";
      case "follow-up":
        return "🔄";
      case "lab review":
        return "🔬";
      case "emergency":
        return "🚨";
      default:
        return "📋";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {appointment.patientAvatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {appointment.patientName}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              with {appointment.doctorName}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
            appointment.status
          )}`}
        >
          {appointment.status.charAt(0).toUpperCase() +
            appointment.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">📅</span>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {new Date(appointment.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">🕒</span>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Time</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {appointment.time}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">⏱️</span>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Duration</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {appointment.duration}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400">
            {getTypeIcon(appointment.type)}
          </span>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Type</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {appointment.type}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Reason:</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {appointment.reason}
        </p>
      </div>

      <div className="flex space-x-2">
        {appointment.status === "pending" && (
          <>
            <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white text-sm rounded-lg transition-colors">
              Confirm
            </button>
            <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white text-sm rounded-lg transition-colors">
              Cancel
            </button>
          </>
        )}
        {appointment.status === "confirmed" && (
          <>
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
              Start Visit
            </button>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm rounded-lg transition-colors">
              Reschedule
            </button>
          </>
        )}
        {appointment.status === "completed" && (
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
            View Details
          </button>
        )}
      </div>
    </div>
  );
}
