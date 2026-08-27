# HireMind AI

> **AI-powered career and hiring platform** designed to bring job discovery, resume optimization, interview preparation, and career intelligence into one modern application.

## 🌐 Live Project

**Application:** https://web-vani-d.vercel.app/

**Login:** https://web-vani-d.vercel.app/login

**Register:** https://web-vani-d.vercel.app/register

---

## 📌 About HireMind AI

HireMind AI is a full-stack web platform concept focused on making the hiring and career-development process faster, smarter, and more personalized.

The platform is designed around two sides of the hiring ecosystem:

- **Candidates** can create an account, manage their career profile, analyze and improve resumes, explore opportunities, practice interviews, and receive career guidance.
- **Recruiters** can use the platform as a foundation for managing hiring workflows and discovering suitable candidates.

The goal is to provide a single career workspace instead of forcing users to move between multiple disconnected tools.

## 🚀 Core Features

### 🔐 Authentication

- User registration
- User login
- Session-based authentication flow
- Candidate and recruiter account types
- Logout functionality
- Current-session user endpoint

### 📄 AI Resume Intelligence

- Resume upload workflow
- Resume analysis
- ATS-style scoring
- Skill extraction
- Resume strengths
- Improvement recommendations
- Career-focused resume feedback

### 💼 Job Discovery

- Job opportunity dashboard
- Job listings interface
- Job details
- Application workflow foundation
- Candidate-focused opportunity discovery

### 🎤 AI Interview Preparation

- Interview practice interface
- Interview questions
- Answer submission
- AI-style answer evaluation
- Interview scoring
- Feedback and improvement guidance

### 📈 Career Intelligence

- Career dashboard
- Career insights
- Skills and development direction
- Personalized career-planning foundation

### 📊 Unified Dashboard

The dashboard acts as the central workspace for the HireMind AI experience, connecting:

- Resume Intelligence
- Job Opportunities
- AI Interviews
- Career Intelligence
- Account/session controls

---

## 🛠️ Technology Stack

- **Next.js** — React-based application framework
- **React** — User interface
- **TypeScript** — Type-safe application development
- **Tailwind CSS** — Styling and responsive UI
- **Next.js Route Handlers** — Application APIs
- **Vercel** — Deployment platform
- **GitHub** — Source-code repository and version control

---

## 🗂️ Project Structure

```text
HireMind-AI/
├── web/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── interviews/
│   │   │   └── resume/
│   │   ├── dashboard/
│   │   │   ├── career/
│   │   │   ├── interviews/
│   │   │   ├── jobs/
│   │   │   └── resume/
│   │   ├── login/
│   │   ├── register/
│   │   └── page.tsx
│   ├── components/
│   ├── lib/
│   └── package.json
├── package.json
├── prepare.mjs
├── render.yaml
└── vercel.json
```

---

## 🔌 Main Application Routes

| Route | Purpose |
|---|---|
| `/` | HireMind AI landing/application page |
| `/login` | User login |
| `/register` | Account creation |
| `/dashboard` | Main user dashboard |
| `/dashboard/resume` | Resume Intelligence |
| `/dashboard/jobs` | Job discovery |
| `/dashboard/interviews` | AI interview preparation |
| `/dashboard/career` | Career Intelligence |

## 🔗 Main API Routes

| API | Purpose |
|---|---|
| `/api/auth/login` | Authenticate user session |
| `/api/auth/register` | Register user and establish session |
| `/api/auth/logout` | End the current session |
| `/api/auth/me` | Return current session information |
| `/api/auth/google` | Google authentication entry point |
| `/api/resume/analyze` | Analyze an uploaded resume |
| `/api/interviews/evaluate` | Evaluate an interview answer |
| `/api/health` | Application health check |

---

## ▶️ Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Vani-0703/HireMind-AI.git
cd HireMind-AI
```

### 2. Install dependencies

```bash
npm install
cd web
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will normally be available at `http://localhost:3000`.

---

## ☁️ Deployment

HireMind AI is configured for deployment with Vercel. The production application is available at:

**https://web-vani-d.vercel.app/**

The GitHub `main` branch is the source repository for the project.

---

## 🔄 Typical User Flow

```text
Landing Page
     ↓
Register / Login
     ↓
Dashboard
     ├── Resume Intelligence
     │      ↓
     │   Upload Resume → Analyze → Feedback
     │
     ├── Job Opportunities
     │      ↓
     │   Discover → Review → Apply
     │
     ├── AI Interviews
     │      ↓
     │   Question → Answer → Evaluation → Feedback
     │
     └── Career Intelligence
            ↓
         Career Insights & Development
```

---

## 🎯 Project Vision

HireMind AI aims to become an intelligent career operating system where users can continuously improve their professional profile, discover relevant opportunities, practice for interviews, and make better career decisions with AI assistance.

The long-term product direction is to connect **skills → resumes → jobs → interviews → applications → career growth** into one continuous intelligent workflow.

---

## 📍 Project Status

The project currently contains the core application experience, navigation, authentication flow, dashboard modules, and API foundations required for the HireMind AI platform.

Future production enhancements can include persistent database-backed accounts, secure password hashing, real AI model integrations, persistent resume storage, live job APIs, recruiter workflows, application tracking, notifications, analytics, and production-grade authorization.

---

## 👤 Repository

**GitHub:** https://github.com/Vani-0703/HireMind-AI

**Live Website:** https://web-vani-d.vercel.app/

---

## 📄 License

This project is maintained as the HireMind AI application repository.
