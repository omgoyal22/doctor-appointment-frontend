'use client';

import { useEffect, useState } from 'react';
import DoctorCard from '@/components/DoctorCard';
import DoctorFilter from '@/components/DoctorFilter';
import { getDoctors } from '@/lib/api';

export default function DoctorListPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await getDoctors();
        setDoctors(response.data || []);
        setFilteredDoctors(response.data || []);
      } catch (err) {
        setError('Failed to load doctors. Make sure the backend is running on http://localhost:5000');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by specialty
    if (selectedSpecialty) {
      filtered = filtered.filter((doc) => doc.specialty === selectedSpecialty);
    }

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialty]);

  const handleFilterChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find a Doctor</h1>
        <p className="text-gray-600 mb-8">Browse and book appointments with our experienced medical professionals</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        <DoctorFilter onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No doctors found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
