'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkBackendHealth } from '@/lib/api';

export default function HomePage() {
  const [backendHealthy, setBackendHealthy] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendHealthy(isHealthy);
    };
    checkHealth();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">HealthCare</h1>
          <div className="flex gap-4">
            <Link
              href="/doctors"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Book Appointment
            </Link>
            <Link
              href="/doctor-portal"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Doctor Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Welcome to HealthCare</h2>
          <p className="text-xl text-gray-700 mb-8">
            Book appointments with experienced doctors at your convenience
          </p>

          {/* Backend Status */}
          {backendHealthy !== null && (
            <div className={`inline-block px-6 py-3 rounded-lg font-semibold mb-8 ${
              backendHealthy 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {backendHealthy 
                ? '✓ Backend is running' 
                : '✗ Backend is not running - Please start the backend server'}
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Link
              href="/doctors"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
            >
              Find a Doctor
            </Link>
            <Link
              href="/doctor-portal"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-lg transition-colors"
            >
              Doctor Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">100+</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Doctors</h3>
            <p className="text-gray-600">Access a wide network of experienced healthcare professionals</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">24/7</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Available</h3>
            <p className="text-gray-600">Book appointments anytime, manage your health on your schedule</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl font-bold text-blue-600 mb-4">Easy</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking</h3>
            <p className="text-gray-600">Simple and fast appointment booking process in just a few clicks</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Patients</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="text-gray-700">Browse our list of qualified doctors</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="text-gray-700">View doctor profiles and specialties</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="text-gray-700">Select available date and time slots</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="text-gray-700">Confirm appointment - Done!</span>
                </li>
              </ol>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">For Doctors</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span className="text-gray-700">Select your profile from the doctor list</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span className="text-gray-700">View all upcoming appointments</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span className="text-gray-700">Confirm or manage appointment status</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span className="text-gray-700">Track patient information and notes</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        {/* <div className="mt-20 bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Setup Instructions</h3>
          <p className="text-gray-700 mb-4">To run this application properly, you need to start the backend server:</p>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="font-semibold">1.</span>
              <span>Open a terminal and navigate to <code className="bg-gray-200 px-2 py-1 rounded">doctor-appointment-backend</code> folder</span> */}
            {/* </li>
            <li className="flex gap-3">
              <span className="font-semibold">2.</span>
              <span>Install dependencies: <code className="bg-gray-200 px-2 py-1 rounded">npm install</code></span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">3.</span>
              <span>Make sure MongoDB is running on your machine</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">4.</span>
              <span>Seed sample doctors: <code className="bg-gray-200 px-2 py-1 rounded">node scripts/seedDoctors.js</code></span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold">5.</span>
              <span>Start the server: <code className="bg-gray-200 px-2 py-1 rounded">npm start</code> or <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></span>
            </li>
          </ol>
        </div> */}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white mt-20 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>2024 HealthCare. All rights reserved.</p>
        </div>
      </div>
    </main>
  );
}
