'use client';

import { useEffect, useState } from 'react';
import { getAppointmentsByDoctor, getDoctorById, updateAppointmentStatus } from '@/lib/api';

export default function DoctorPortalPage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [loggedDoctor, setLoggedDoctor] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const DOCTOR_ACCOUNTS = [
    { _id: '1', email: 'rajesh.kumar@hospital.com', password: 'cardio123', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist' },
    { _id: '2', email: 'priya.sharma@hospital.com', password: 'derma123', name: 'Dr. Priya Sharma', specialty: 'Dermatologist' },
    { _id: '3', email: 'amit.patel@hospital.com', password: 'ortho123', name: 'Dr. Amit Patel', specialty: 'Orthopedic' },
    { _id: '4', email: 'neha.gupta@hospital.com', password: 'pedi123', name: 'Dr. Neha Gupta', specialty: 'Pediatrician' },
    { _id: '5', email: 'vikram.singh@hospital.com', password: 'neuro123', name: 'Dr. Vikram Singh', specialty: 'Neurologist' },
    { _id: '6', email: 'ananya.desai@hospital.com', password: 'ophtha123', name: 'Dr. Ananya Desai', specialty: 'Ophthalmologist' },
  ];

  useEffect(() => {
    if (loggedDoctor?.id) {
      handleDoctorSelect(loggedDoctor.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedDoctor]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    const doctor = DOCTOR_ACCOUNTS.find(
      (doc) => doc.email === loginForm.email.trim().toLowerCase() && doc.password === loginForm.password
    );

    if (!doctor) {
      setLoginError('Invalid email or password. Use the credentials listed below.');
      return;
    }

    setLoggedDoctor({ id: doctor._id, name: doctor.name, specialty: doctor.specialty, email: doctor.email });
    setSelectedDoctorId(doctor._id);
    setLoginForm({ email: '', password: '' });
  };

  const handleLogout = () => {
    setLoggedDoctor(null);
    setSelectedDoctorId('');
    setSelectedDoctor(null);
    setAppointments([]);
    setFilteredAppointments([]);
    setSelectedDate('');
    setError(null);
    setLoginError(null);
  };

  const handleDoctorSelect = async (doctorId) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedDoctorId(doctorId);
      setSelectedDate('');

      const doctorResponse = await getDoctorById(doctorId);
      setSelectedDoctor(doctorResponse.data);

      const appointmentsResponse = await getAppointmentsByDoctor(doctorId);
      setAppointments(appointmentsResponse.data || []);
      setFilteredAppointments(appointmentsResponse.data || []);
    } catch (err) {
      setError('Failed to load appointments. Make sure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    if (date) {
      const filtered = appointments.filter((apt) => {
        const aptDate = new Date(apt.appointmentDate).toISOString().split('T')[0];
        return aptDate === date;
      });
      setFilteredAppointments(filtered);
    } else {
      setFilteredAppointments(appointments);
    }
  };

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      setUpdatingId(appointmentId);
      await updateAppointmentStatus(appointmentId, newStatus);

      const updated = appointments.map((apt) =>
        apt._id === appointmentId ? { ...apt, status: newStatus } : apt
      );
      setAppointments(updated);
      handleDateFilter(selectedDate);
    } catch (err) {
      setError('Failed to update appointment status');
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || colors.pending;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Doctor Portal</h1>
        <p className="text-gray-600 mb-8">Login to view your appointments.</p>

        {!loggedDoctor ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Doctor Login</h2>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="doctor@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Use these doctor credentials</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                {DOCTOR_ACCOUNTS.map((doc) => (
                  <div key={doc._id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold">{doc.name}</p>
                    <p>ID: <span className="font-mono text-sm">{doc._id}</span></p>
                    <p>Email: <span className="font-mono text-sm">{doc.email}</span></p>
                    <p>Password: <span className="font-mono text-sm">{doc.password}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Welcome, {loggedDoctor.name}</h2>
                <p className="text-gray-600">{loggedDoctor.specialty}</p>
                <p className="text-gray-500 text-sm mt-1">Logged in as: {loggedDoctor.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium"
              >
                Logout
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
                <p className="font-semibold">Error</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            )}

            {selectedDoctor && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">My Profile</h3>
                <p className="text-gray-700 font-semibold">{selectedDoctor.name}</p>
                <p className="text-blue-600">{selectedDoctor.specialty}</p>
                <p className="text-gray-600 mt-2">Email: {selectedDoctor.email}</p>
                <p className="text-gray-600">Phone: {selectedDoctor.phone}</p>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Date</h3>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleDateFilter('')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDate === ''
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  All Dates
                </button>
                {appointments.length > 0 && [
                  ...new Set(appointments.map((apt) => new Date(apt.appointmentDate).toISOString().split('T')[0]))
                ]
                  .sort()
                  .map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateFilter(date)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedDate === date
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                    >
                      {new Date(date).toLocaleDateString()}
                    </button>
                  ))}
              </div>
            </div>

            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => (
                        <tr key={appointment._id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{appointment.patientName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{appointment.patientEmail}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{appointment.patientPhone}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{appointment.appointmentTime}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <select
                              value={appointment.status}
                              onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
                              disabled={updatingId === appointment._id}
                              className="px-2 py-1 border border-gray-300 rounded text-gray-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
