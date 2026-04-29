# Quick Start Guide

## The Fastest Way to Get Running

### Prerequisites
- Node.js installed
- MongoDB running locally (or MongoDB Atlas connection string)

### Step 1: Install Backend Dependencies
```bash
cd doctor-appointment-backend
npm install
```

### Step 2: Seed Sample Doctors (One-time setup)
```bash
node scripts/seedDoctors.js
```

### Step 3: Start Backend Server
```bash
npm start
```
The backend will run on `http://localhost:5000`

### Step 4: In a New Terminal, Start Frontend
```bash
# From project root
npm install  # if not already done
npm run dev
```
The frontend will run on `http://localhost:3000`

### Step 5: Open in Browser
```
http://localhost:3000
```

## What You'll See

### Home Page (`/`)
- Overview of the system
- Setup instructions
- Quick links to Book Appointment or Doctor Portal
- Backend health check status

### Patient Features (`/doctors`)
- Browse all doctors
- Search by doctor name
- Filter by specialty
- View doctor details
- Book appointments with available time slots

### Doctor Portal (`/doctor-portal`)
- Select your doctor profile
- View all appointments
- Filter appointments by date
- Update appointment status (Pending → Confirmed → Completed)
- Cancel appointments
- See patient contact information

## Sample Doctors Available

After seeding, you'll have 6 doctors:
1. **Dr. Rajesh Kumar** - Cardiologist (15 years)
2. **Dr. Priya Sharma** - Dermatologist (10 years)
3. **Dr. Amit Patel** - Orthopedic (12 years)
4. **Dr. Neha Gupta** - Pediatrician (8 years)
5. **Dr. Vikram Singh** - Neurologist (16 years)
6. **Dr. Ananya Desai** - Ophthalmologist (11 years)

## API Endpoints Quick Reference

All endpoints start with: `http://localhost:5000/api`

### Doctors
- `GET /doctors` - List all doctors
- `GET /doctors?specialty=Cardiologist` - Filter by specialty
- `GET /doctors/:id` - Get single doctor with slots
- `GET /doctors/:id/appointments` - Get doctor's appointments

### Appointments
- `POST /appointments` - Create appointment
- `GET /appointments/doctor/:doctorId` - Get doctor's appointments
- `PUT /appointments/:appointmentId` - Update status

## Common Issues & Solutions

**"Backend is not running"**
- Make sure you ran `npm start` in the backend folder
- Check that port 5000 is not in use
- Verify MongoDB is running

**"No doctors found"**
- Run: `node doctor-appointment-backend/scripts/seedDoctors.js`
- Check MongoDB is running

**"Can't connect to backend"**
- Backend must be running before opening the app
- Check `http://localhost:5000/api/health` in browser

**"MongoDB connection error"**
- For local: Make sure MongoDB service is running
- For Atlas: Update MONGODB_URI in `doctor-appointment-backend/.env`

## File Structure

```
📦 Project
├── 📄 QUICKSTART.md              ← You are here
├── 📄 SETUP_GUIDE.md             ← Detailed setup
├── 📄 package.json
├── 📁 app/                       ← React pages
│   ├── 📄 page.jsx              ← Home
│   ├── 📁 doctors/
│   │   ├── 📄 page.jsx          ← List doctors
│   │   └── 📁 [id]/
│   │       └── 📄 page.jsx      ← Book appointment
│   └── 📁 doctor-portal/
│       └── 📄 page.jsx          ← Doctor dashboard
├── 📁 components/                ← React components
│   ├── 📄 DoctorCard.jsx
│   └── 📄 DoctorFilter.jsx
├── 📁 lib/
│   └── 📄 api.js                ← API client
└── 📁 doctor-appointment-backend/  ← Express backend
    ├── 📄 server.js
    ├── 📄 package.json
    ├── 📄 .env
    ├── 📁 config/
    ├── 📁 models/
    ├── 📁 controllers/
    ├── 📁 routes/
    └── 📁 scripts/
```

## Next Steps

Once everything is running:

1. **Book an Appointment**
   - Go to `/doctors`
   - Choose a doctor
   - Fill in your details
   - Select date and time
   - Confirm!

2. **Manage as Doctor**
   - Go to `/doctor-portal`
   - Select your doctor
   - View and update appointments

3. **Customize**
   - Modify doctor data in `seedDoctors.js`
   - Change colors in React components
   - Add more endpoints in the backend

## Enjoy! 🚀

Your doctor appointment booking system is ready to use!
