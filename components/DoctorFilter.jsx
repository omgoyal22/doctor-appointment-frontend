'use client';

import { useState } from 'react';

const specialties = [
  'Cardiologist',
  'Dermatologist',
  'Orthopedic',
  'Pediatrician',
  'Neurologist',
  'Ophthalmologist',
];

export default function DoctorFilter({ onFilterChange, onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setSelectedSpecialty(value);
    onFilterChange(value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedSpecialty('');
    onSearchChange('');
    onFilterChange('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Doctor Name
          </label>
          <input
            type="text"
            placeholder="Enter doctor name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Specialty
          </label>
          <select
            value={selectedSpecialty}
            onChange={handleSpecialtyChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(searchTerm || selectedSpecialty) && (
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md text-sm font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
