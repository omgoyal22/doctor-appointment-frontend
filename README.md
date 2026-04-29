# Doctor Appointment Booking System

A complete, production-ready full-stack application for managing doctor appointments.

## Features

### For Patients
- 🔍 Search doctors by name
- 🏥 Filter by specialty (Cardiologist, Dermatologist, etc.)
- 📅 View available appointment slots
- 📝 Book appointments with personal details
- ✅ Get appointment confirmations

### For Doctors
- 📋 View all patient appointments
- 📅 Filter appointments by date
- 👥 See patient contact information
- ✏️ Update appointment status (Pending → Confirmed → Completed/Canceled)
- 🔔 Manage appointment workflow

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Next.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **API** | RESTful API with 7 endpoints |

## Quick Start (5 minutes)

### Prerequisites
- Node.js v14+
- MongoDB running locally or MongoDB Atlas account

### Installation

**1. Start Backend (Terminal 1)**
```bash
cd doctor-appointment-backend
npm install
node scripts/seedDoctors.js
npm start
# Backend runs on http://localhost:5000
```

**2. Start Frontend (Terminal 2)**
```bash
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

**3. Open Browser**
```
http://localhost:3000
```

✅ **Done!** System is ready to use.

## Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Fast setup guide (read this first!)
- **[COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)** - Full features and usage
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed installation & troubleshooting
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Technical architecture

## Project Structure

```
doctor-appointment-system/
├── app/                               # React pages
│   ├── page.jsx                      # Home
│   ├── doctors/page.jsx              # Doctor listing
│   └── doctor-portal/page.jsx        # Doctor dashboard
├── components/                       # React components
├── lib/api.js                        # API client
├── doctor-appointment-backend/       # Express server
│   ├── server.js
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── scripts/seedDoctors.js
└── [docs and config files]
```

## API Endpoints

### Doctors
```
GET    /api/doctors              # List all doctors
GET    /api/doctors?specialty=X  # Filter by specialty
GET    /api/doctors/:id          # Get doctor details
GET    /api/doctors/:id/appointments  # Get doctor's appointments
```

### Appointments
```
POST   /api/appointments         # Create appointment
GET    /api/appointments/doctor/:id   # Get doctor's appointments
PUT    /api/appointments/:id     # Update appointment status
```

## Database

### Doctors Collection
- Doctor profile (name, specialty, experience, bio)
- Available time slots (date, start time, end time)
- Contact information (email, phone)

### Appointments Collection
- Patient details
- Appointment date and time
- Status tracking (pending, confirmed, completed, canceled)
- Patient notes

## Pages

| URL | Purpose | For |
|-----|---------|-----|
| `/` | Home page with navigation | Everyone |
| `/doctors` | Browse and search doctors | Patients |
| `/doctors/:id` | View doctor details & book appointment | Patients |
| `/doctor-portal` | Manage appointments | Doctors |

## Sample Doctors

After setup, you'll have 6 sample doctors:

1. **Dr. Rajesh Kumar** - Cardiologist (15 years)
2. **Dr. Priya Sharma** - Dermatologist (10 years)
3. **Dr. Amit Patel** - Orthopedic (12 years)
4. **Dr. Neha Gupta** - Pediatrician (8 years)
5. **Dr. Vikram Singh** - Neurologist (16 years)
6. **Dr. Ananya Desai** - Ophthalmologist (11 years)

## Key Features

✅ No authentication required (pre-created users)
✅ Appointment conflict prevention
✅ Real-time status updates
✅ Date-based filtering
✅ Responsive design
✅ Error handling and validation
✅ MongoDB persistence
✅ CORS-enabled API

## Troubleshooting

### Backend not starting?
```bash
# Check MongoDB is running
mongod --version

# Check port 5000 is free
lsof -i :5000

# Check .env file has MONGODB_URI
cat doctor-appointment-backend/.env
```

### No doctors showing?
```bash
# Re-seed doctors
node doctor-appointment-backend/scripts/seedDoctors.js
```

### Can't connect to backend?
```bash
# Verify backend is running
curl http://localhost:5000/api/health
# Should return: {"status":"Backend is running"}
```

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for more troubleshooting.

## File Navigation

- 📖 **New to this project?** → Read [QUICKSTART.md](./QUICKSTART.md)
- 🚀 **Want to get started?** → Read [QUICKSTART.md](./QUICKSTART.md) 
- 📚 **Need full details?** → Read [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md)
- 🔧 **Having issues?** → Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- 🏗️ **Want architecture details?** → Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## Next Steps

1. **Get it running** - Follow [QUICKSTART.md](./QUICKSTART.md) (5 min)
2. **Try features** - Test patient booking and doctor portal
3. **Customize** - Add your branding, more doctors, styling
4. **Deploy** - Share with others on the web

## Architecture

```
┌─────────────────────────────┐
│      React Frontend         │
│  (Patient & Doctor UI)      │
└──────────────┬──────────────┘
               │ HTTP Requests
┌──────────────▼──────────────┐
│   Express.js Backend        │
│   (API & Business Logic)    │
└──────────────┬──────────────┘
               │ Database Queries
┌──────────────▼──────────────┐
│       MongoDB               │
│   (Data Persistence)        │
└─────────────────────────────┘
```

## Environment Variables

### Backend (`doctor-appointment-backend/.env`)
```
MONGODB_URI=mongodb://localhost:27017/doctor_appointments
PORT=5000
NODE_ENV=development
```

### Frontend (Uses backend at `http://localhost:5000/api`)

## Package Structure

### Frontend Dependencies
- `next` - React framework
- `react` - UI library
- `tailwindcss` - Styling

### Backend Dependencies
- `express` - Web framework
- `mongodb` - Database driver
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

## Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
```

### Backend Development
```bash
npm start            # Start server
npm run dev          # Start with nodemon (auto-reload)
```

## Performance

- ✅ Optimized API responses
- ✅ Appointment conflict detection at insert time
- ✅ Indexed MongoDB queries
- ✅ Proper error handling
- ✅ Responsive UI

## Security

- ✅ Input validation on all endpoints
- ✅ CORS protection
- ✅ No SQL injection (using MongoDB native driver)
- ✅ Proper error messages (no sensitive data leaks)

## Scalability

The system can handle:
- Hundreds of doctors
- Thousands of appointments
- Multiple concurrent users
- Easy to add caching layer
- Easy to add authentication

## Future Enhancements

- 🔐 User authentication (signup/login)
- 📧 Email notifications
- 💳 Payment integration
- ⭐ Review & rating system
- 📱 SMS notifications
- 📹 Video consultation
- 🎯 Appointment reminders
- 📊 Analytics dashboard

## License

MIT - Feel free to use and modify

## Support

- Check documentation files for help
- Review browser console for errors (F12)
- Check backend terminal for server errors
- Make sure both services are running

---

**Ready to start?** → Open [QUICKSTART.md](./QUICKSTART.md) 🚀
