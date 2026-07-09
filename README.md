# 📚 StudyNook — Library Study Room Booking Platform

A full-stack web application where students and library users can list study rooms they control and any registered user can browse, search, filter, and book those rooms for a specific date and time slot. Features automatic double-booking prevention through real-time time-conflict detection.

## 🔗 Live Demo
👉 [https://studynook-client-delta.vercel.app](https://studynook-client-delta.vercel.app)

## ✨ Core Features
- 🔒 JWT authentication stored in HTTP-only cookies (XSS-safe)
- 📅 Real-time booking conflict detection using `$gte`/`$lte` MongoDB operators
- 🏠 Room CRUD — authenticated users can list, edit, and delete their own rooms
- 🔍 Search rooms by name + filter by amenities
- 📊 My Bookings dashboard with live status badges (confirmed/cancelled)
- ❌ Cancel upcoming bookings with one click
- 👤 Room ownership verified server-side on every mutation
- 📱 Fully responsive across all devices
- 🔔 Toast notifications — no `alert()` anywhere

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | Custom JWT (HTTP-only cookies) |
| Notifications | React Hot Toast |
| Deployment | Vercel (client), Render (server) |

## 📦 Key Dependencies
```json
{
  "react": "latest",
  "react-router-dom": "latest",
  "axios": "latest",
  "tailwindcss": "latest",
  "framer-motion": "latest",
  "react-hot-toast": "latest",
  "react-hook-form": "latest"
}
```

## 🗂️ Pages
| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home with latest 6 rooms |
| `/rooms` | Public | All rooms with search + filter |
| `/rooms/:id` | Public | Room details (booking requires login) |
| `/login` | Public | Email/password + Google login |
| `/register` | Public | Registration with password validation |
| `/add-room` | 🔒 Private | Add a new study room listing |
| `/my-listings` | 🔒 Private | Manage your own rooms |
| `/my-bookings` | 🔒 Private | View and cancel your bookings |

## 🔐 How Booking Conflict Detection Works
```js
// Server checks if new time slot overlaps any existing confirmed booking
const conflict = await bookingsCollection.findOne({
  roomId: roomId,
  status: 'confirmed',
  $or: [
    { startTime: { $lt: newEndTime }, endTime: { $gt: newStartTime } }
  ]
});
if (conflict) return res.status(409).send({ message: 'Time slot already booked' });
```

## 🚀 Run Locally

**Client:**
```bash
git clone https://github.com/Abdullah-Al-Noman186/studynook-client.git
cd studynook-client
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_key
```

```bash
npm run dev
```

**Server:**
```bash
git clone https://github.com/Abdullah-Al-Noman186/studynook-server.git
cd studynook-server
npm install
```

Create `.env`:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

```bash
npm run dev
```

## 🔗 Resources
- [Live Site](https://studynook-client-delta.vercel.app)
- [Server Repo](https://github.com/Abdullah-Al-Noman186/studynook-server)
