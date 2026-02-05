# NAVSPRO - AI-Powered Career Navigator

NAVSPRO is a modern career discovery platform helping students and professionals find their ideal career path through AI-driven assessments and personalized roadmaps.

![NAVSPRO Screenshot](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d)

## 🚀 Key Features

- **AI Career Assessment**: Comprehensive questionnaire to evaluate skills, interests, and personality.
- **Personalized Dashboard**: Visual progress tracking and roadmap visualization.
- **Smart Authentication**: Secure login/signup with Supabase, including email verification.
- **Dynamic Profiles**: User profile management with editable details.
- **Detailed Reports**: Insightful PDF reports generated based on assessment results.
- **Responsive Design**: Premium UI built with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Animations**: Framer Motion
- **Backend & Auth**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd navspro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The project uses Supabase with the following main tables:

- **`profiles`**: Stores user details (name, email, city, grade, etc.).
- **`assessments`**: Stores user assessment answers and completion status.

## 🧪 Testing Email Verification

NAVSPRO includes a robust email verification flow. When signing up:
1. User receives an email with a verification link.
2. Clicking the link verifies the account via Supabase.
3. User is automatically redirected to the Dashboard upon success.

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This will generate a `dist` folder ready for deployment to Vercel, Netlify, or similar platforms.

## 📄 License

© 2026 NAVSPRO. All rights reserved.
