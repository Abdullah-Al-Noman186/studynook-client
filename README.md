# 🎓 SkillSphere — Online Learning Platform

A modern, fully responsive online learning platform where users can explore courses, view detailed curriculums, and enroll in skill-based programs. Built with Next.js App Router and secured with BetterAuth, featuring protected dynamic routes with intelligent redirect-after-login flow.

## 🔗 Live Demo
👉 [https://skillsphere-eight-gamma.vercel.app](https://skillsphere-eight-gamma.vercel.app)

## ✨ Core Features
- 🔒 Protected course detail routes — unauthenticated users redirected to login and returned to their originally intended page after authentication
- 🔐 BetterAuth integration with email/password and Google OAuth
- 👤 Profile management — update name and avatar with live persistence
- 🔍 Real-time course search by title
- 🎠 Hero banner with rotating slides
- 📱 Fully responsive across mobile, tablet, and desktop
- 🎬 Smooth animations with Framer Motion
- 🔔 Toast notifications for all user actions

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS, DaisyUI |
| Auth | BetterAuth (email/password + Google OAuth) |
| Database | MongoDB |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| Deployment | Vercel |

## 📦 Key Dependencies
```json
{
  "next": "latest",
  "better-auth": "latest",
  "tailwindcss": "latest",
  "daisyui": "latest",
  "framer-motion": "latest",
  "react-hot-toast": "latest",
  "mongoose": "latest"
}
```

## 🗂️ Pages
| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home with hero, popular courses, trending, instructors |
| `/courses` | Public | All courses with live search |
| `/courses/[id]` | 🔒 Private | Full course details + curriculum |
| `/login` | Public | Email/password + Google OAuth |
| `/register` | Public | Registration with validation |
| `/my-profile` | 🔒 Private | View and update profile |

## 🚀 Run Locally

```bash
git clone https://github.com/Abdullah-Al-Noman186/skillsphere.git
cd skillsphere
npm install
```

Create `.env.local`:
```
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔗 Resources
- [Live Site](https://skillsphere-eight-gamma.vercel.app)
- [GitHub Repo](https://github.com/Abdullah-Al-Noman186/skillsphere)
