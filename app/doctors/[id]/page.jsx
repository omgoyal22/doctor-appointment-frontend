'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getDoctorById, createAppointment } from '@/lib/api';

export default function BookAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id;

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Tomorrow
    appointmentTime: '',
    notes: '',
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await getDoctorById(doctorId);
        setDoctor(response.data);
      } catch (err) {
        setError('Failed to load doctor details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientEmail || !formData.patientPhone || !formData.appointmentDate || !formData.appointmentTime) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const appointmentData = {
        doctorId,
        doctorName: doctor.name,
        patientName: formData.patientName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        notes: formData.notes,
      };

      const response = await createAppointment(appointmentData);

      if (response.success) {
        alert('Appointment booked successfully! We will contact you soon.');
        router.push('/doctors');
      } else {
        setError(response.message || 'Failed to book appointment');
      }
    } catch (err) {
      setError(err.message || 'Error booking appointment');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-center text-gray-600">Loading doctor details...</p>
        </div>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-center text-red-600">Doctor not found</p>
        </div>
      </main>
    );
  }

  // Get available time slots from doctor's availableSlots
  const availableSlots = doctor.availableSlots || [];
  const selectedDateSlots = formData.appointmentDate
    ? availableSlots.filter((slot) => {
        const slotDate = new Date(slot.date).toISOString().split('T')[0];
        return slotDate === formData.appointmentDate;
      })
    : [];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Doctor Info */}
          <div className="flex gap-6 mb-8 pb-8 border-b border-gray-200">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-32 h-32 rounded-lg object-cover bg-gray-200"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-blue-600 font-medium text-lg mt-1">{doctor.specialty}</p>
              <p className="text-gray-600 mt-2">Experience: {doctor.experience} years</p>
              <p className="text-gray-700 mt-4">{doctor.bio}</p>
              <p className="text-gray-600 text-sm mt-4">
                <span className="font-semibold">Email:</span> {doctor.email}
              </p>
              <p className="text-gray-600 text-sm mt-1">
                <span className="font-semibold">Phone:</span> {doctor.phone}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Patient Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Patient Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="patientPhone"
                value={formData.patientPhone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Appointment Time */}
            {selectedDateSlots.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a time slot</option>
                  {selectedDateSlots.map((slot, index) => (
                    <option key={index} value={slot.startTime}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formData.appointmentDate && selectedDateSlots.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
                <p className="text-sm">
                  <strong>No available slots for {formData.appointmentDate}.</strong>
                </p>
                <p className="text-xs mt-1">
                  Available dates: {[...new Set(availableSlots.map(slot => new Date(slot.date).toISOString().split('T')[0]))].join(', ')}
                </p>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any symptoms or concerns?"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-md transition-colors"
            >
              {submitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
