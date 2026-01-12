import { useState } from "react";
import PatientCard from "./PatientCard";
import PatientModal from "./PatientModal";

export default function PatientsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 34,
      gender: "Female",
      bloodType: "A+",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@email.com",
      lastVisit: "2026-01-03",
      condition: "Regular Checkup",
      status: "active",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      age: 45,
      gender: "Male",
      bloodType: "O-",
      phone: "+1 (555) 234-5678",
      email: "michael.c@email.com",
      lastVisit: "2026-01-05",
      condition: "Diabetes Follow-up",
      status: "active",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      age: 28,
      gender: "Female",
      bloodType: "B+",
      phone: "+1 (555) 345-6789",
      email: "emily.r@email.com",
      lastVisit: "2025-12-28",
      condition: "Flu Treatment",
      status: "recovered",
      avatar: "ER",
    },
    {
      id: 4,
      name: "James Wilson",
      age: 52,
      gender: "Male",
      bloodType: "AB+",
      phone: "+1 (555) 456-7890",
      email: "james.w@email.com",
      lastVisit: "2026-01-02",
      condition: "Hypertension",
      status: "active",
      avatar: "JW",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Patients
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage patient records and information
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
        >
          <span className="text-xl">+</span>
          <span>Add Patient</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Patients
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {patients.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Cases
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {patients.filter((p) => p.status === "active").length}
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
                New This Month
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                12
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Critical
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                2
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search patients by name or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Patient Cards Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div> */}

      {/* Add Patient Modal */}
      {isModalOpen && <PatientModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
