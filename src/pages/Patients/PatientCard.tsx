interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  phone: string;
  email: string;
  lastVisit: string;
  condition: string;
  status: "active" | "recovered" | "critical";
  avatar: string;
}

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "recovered":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {patient.avatar}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {patient.age} years • {patient.gender}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
            patient.status
          )}`}
        >
          {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm">🩸</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Blood Type: <span className="font-medium">{patient.bloodType}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm">📞</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {patient.phone}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 dark:text-gray-400 text-sm">📧</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {patient.email}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Last Visit:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date(patient.lastVisit).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Condition:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
            {patient.condition}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm rounded-lg transition-colors">
          View Details
        </button>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm rounded-lg transition-colors">
          Edit
        </button>
      </div>
    </div>
  );
}
