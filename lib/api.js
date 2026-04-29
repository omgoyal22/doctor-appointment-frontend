const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Backend health check
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

// Doctor APIs
export const getDoctors = async (specialty = null) => {
  const url = specialty ? `/doctors?specialty=${specialty}` : '/doctors';
  return fetchAPI(url);
};

export const getDoctorById = async (doctorId) => {
  return fetchAPI(`/doctors/${doctorId}`);
};

export const getDoctorAppointments = async (doctorId) => {
  return fetchAPI(`/doctors/${doctorId}/appointments`);
};

// Appointment APIs
export const createAppointment = async (appointmentData) => {
  return fetchAPI('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};

export const getAppointmentsByDoctor = async (doctorId) => {
  return fetchAPI(`/appointments/doctor/${doctorId}`);
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  return fetchAPI(`/appointments/${appointmentId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};
