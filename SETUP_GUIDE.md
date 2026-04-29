# Doctor Appointment Booking System - Setup Guide

This is a full-stack application for booking doctor appointments with separate frontend (React) and backend (Node.js/Express) servers.

## Project Structure

```
project-root/
├── app/                           # Next.js/React Frontend
│   ├── page.jsx                  # Home page
│   ├── doctors/
│   │   ├── page.jsx              # Doctor listing & search
│   │   └── [id]/page.jsx         # Book appointment
│   └── doctor-portal/page.jsx     # Doctor dashboard
├── components/
│   ├── DoctorCard.jsx            # Doctor card component
│   └── DoctorFilter.jsx          # Filter & search component
├── lib/
│   └── api.js                    # API client functions
└── doctor-appointment-backend/   # Express Backend
    ├── server.js                 # Main server file
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── models/
    │   ├── Doctor.js
    │   ├── Appointment.js
    │   └── Patient.js
    ├── controllers/
    │   ├── doctorController.js
    │   └── appointmentController.js
    ├── routes/
    │   ├── doctors.js
    │   └── appointments.js
    ├── scripts/
    │   └── seedDoctors.js        # Seed sample data
    ├── package.json
    └── .env                      # Environment variables
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Setup Instructions

### 1. Setup Backend Server

#### Step 1: Navigate to backend directory
```bash
cd doctor-appointment-backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure MongoDB

Edit `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/doctor_appointments
PORT=5000
NODE_ENV=development
```

If using MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doctor_appointments
```

#### Step 4: Start MongoDB (if running locally)
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows (if installed as service)
# MongoDB should start automatically

# Or manually start:
mongod
```

#### Step 5: Seed Sample Doctors
```bash
node scripts/seedDoctors.js
```

You should see:
```
Connected to MongoDB
Cleared existing doctors
Inserted 6 doctors successfully!

Sample Doctors Created:
- Dr. Rajesh Kumar (Cardiologist)
- Dr. Priya Sharma (Dermatologist)
- Dr. Amit Patel (Orthopedic)
- Dr. Neha Gupta (Pediatrician)
- Dr. Vikram Singh (Neurologist)
- Dr. Ananya Desai (Ophthalmologist)
```

#### Step 6: Start the backend server
```bash
npm start
# or with nodemon for development:
npm run dev
```

Server should be running on: `http://localhost:5000`

### 2. Setup Frontend (React/Next.js)

#### Step 1: Install frontend dependencies (from project root)
```bash
npm install
# or
pnpm install
```

#### Step 2: Start the development server
```bash
npm run dev
# or
pnpm dev
```

Frontend will be running on: `http://localhost:3000`

## Using the Application

### For Patients

1. Go to `http://localhost:3000`
2. Click "Book Appointment"
3. Browse doctors by name or specialty
4. Click on a doctor to view details
5. Fill in your information and select a time slot
6. Confirm the appointment

### For Doctors

1. Go to `http://localhost:3000/doctor-portal`
2. Select your doctor profile from the left sidebar
3. View all your appointments
4. Filter by date using the date buttons
5. Update appointment status:
   - **Pending** - New appointment request
   - **Confirmed** - Appointment confirmed
   - **Completed** - Appointment completed
   - **Canceled** - Appointment cancelled

## API Endpoints

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors?specialty=Cardiologist` - Filter by specialty
- `GET /api/doctors/:id` - Get single doctor with available slots
- `GET /api/doctors/:id/appointments` - Get doctor's appointments

### Appointment Endpoints
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `PUT /api/appointments/:appointmentId` - Update appointment status

## Database Schema

### Doctors Collection
```javascript
{
  _id: ObjectId,
  name: string,
  specialty: string,
  experience: number,
  email: string,
  phone: string,
  bio: string,
  image: string (URL),
  availableSlots: [
    {
      date: Date,
      startTime: string (HH:MM),
      endTime: string (HH:MM),
      isBooked: boolean
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### Appointments Collection
```javascript
{
  _id: ObjectId,
  doctorId: ObjectId,
  doctorName: string,
  patientName: string,
  patientEmail: string,
  patientPhone: string,
  appointmentDate: Date,
  appointmentTime: string (HH:MM),
  status: string (pending/confirmed/canceled/completed),
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### Backend not running
- Check if MongoDB is running: `mongo` (for local) or check MongoDB Atlas connection
- Verify `.env` file has correct `MONGODB_URI`
- Check if port 5000 is available
- Look at console output for connection errors

### Frontend can't connect to backend
- Make sure backend is running on `http://localhost:5000`
- Check browser console for CORS errors
- Verify API_BASE_URL in `lib/api.js` matches backend URL

### No doctors showing up
- Run seed script: `node doctor-appointment-backend/scripts/seedDoctors.js`
- Check MongoDB database: `use doctor_appointments; db.doctors.find()`

### MongoDB not connecting
- For local: Start MongoDB service
- For Atlas: Copy connection string and update `.env`
- Test connection with: `node doctor-appointment-backend/config/db.js`

## Features Implemented

✓ Doctor listing and search
✓ Filter doctors by specialty
✓ View doctor details and available slots
✓ Book appointments with patient details
✓ Doctor portal to manage appointments
✓ Update appointment status (pending, confirmed, completed, canceled)
✓ Date-based appointment filtering
✓ Responsive design

## Future Enhancements

- User authentication for both patients and doctors
- Email notifications for appointments
- Payment integration for appointments
- Review and rating system
- Appointment reminders
- Doctor availability management UI
- Advanced scheduling with calendar view
- SMS notifications
- Video consultation support

## Support

For issues or questions, please check:
1. MongoDB connection is working
2. Both frontend and backend servers are running
3. API endpoints are accessible at `http://localhost:5000/api/health`
4. Browser console for client-side errors
5. Backend terminal for server-side errors

Enjoy using the Doctor Appointment Booking System!
