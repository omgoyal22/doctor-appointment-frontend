'use client';

import Link from 'next/link';

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex gap-4">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="w-24 h-24 rounded-lg object-cover bg-gray-200"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600 font-medium text-sm">{doctor.specialty}</p>
          <p className="text-gray-600 text-sm mt-1">Experience: {doctor.experience} years</p>
          <p className="text-gray-700 text-sm mt-2">{doctor.bio}</p>
          <div className="mt-4">
            <Link
              href={`/doctors/${doctor._id}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
