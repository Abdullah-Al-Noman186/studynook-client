# StudyNook – Library Study Room Booking

A full-stack web application where students and library users can browse, book, and manage study rooms with real-time availability and zero conflicts.

## 🌐 Live Site
[https://studynook-client-64r9gbv0o-nabdullahal273-2593s-projects.vercel.app](https://studynook-client-64r9gbv0o-nabdullahal273-2593s-projects.vercel.app)

## ✨ Features

- 🔐 **Secure Authentication** – Email/password and Google OAuth login powered by Better Auth, with session management and protected private routes.
- 🏠 **Room Listings** – Browse all available study rooms with images, floor details, capacity, hourly rate, and amenities displayed as chips.
- 📅 **Smart Booking System** – Book rooms by selecting date and time slots with automatic conflict detection to prevent double-bookings.
- 💰 **Real-time Cost Calculator** – Total booking cost is automatically calculated based on selected start/end time and hourly rate.
- 📋 **My Bookings Dashboard** – View, manage, and cancel your bookings with live status badges (confirmed/cancelled).
- ✏️ **Room Management** – Room owners can add, edit, and delete their own listings with full CRUD functionality.
- 📊 **Booking Count Tracker** – Each room displays a live count of total bookings that increments with every new booking.
- 📱 **Fully Responsive** – Optimized layout for mobile, tablet, and desktop screens using Tailwind CSS.
- 🎨 **Smooth Animations** – Page transitions and UI interactions powered by Framer Motion for a polished experience.
- 🔔 **Toast Notifications** – Success and error messages displayed via animated toast notifications instead of browser alerts.

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS, DaisyUI, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Better Auth (Email + Google OAuth)
- **Deployment:** Vercel