# EduDash Pro - Educational Dashboard Platform

Advanced educational dashboard for students, teachers, and parents. Manage homework, track progress, and enhance learning experiences.

## 🚀 Project Overview

EduDash Pro is a comprehensive educational platform built with Next.js 15, featuring:

- **Multi-tenant Architecture**: Support for multiple schools and institutions
- **Role-based Access**: Different dashboards for SuperAdmins, School Admins, Teachers, Parents, and Students
- **Progressive Web App (PWA)**: Native app-like experience with offline support
- **AI-powered Features**: Homework generation, grading assistance, and analytics
- **Real-time Communication**: WebSocket-based messaging and notifications
- **Comprehensive Lesson Management**: Curated content library and assignment system

## 🏗️ Architecture

### Directory Structure

```
edudash-pro/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   ├── (public)/           # Public-facing pages
│   ├── (dashboard)/        # Protected dashboard routes
│   └── api/                # API routes
├── actions/                # Server Actions
├── components/             # Reusable UI components
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configs
└── public/                 # Static assets
```

### Key Features

- **🏫 Multi-tenancy**: Dynamic routing for school-specific dashboards
- **🔐 Authentication**: NextAuth.js integration with role-based access
- **📱 PWA Support**: Service workers and offline functionality
- **🤖 AI Integration**: OpenAI API for educational content generation
- **💳 Payment Processing**: PayFast integration for subscriptions
- **📊 Analytics**: Comprehensive progress tracking and reporting
- **🔔 Notifications**: Push notifications and real-time updates

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Headless UI
- **Database**: PostgreSQL (via Neon/Supabase)
- **Authentication**: NextAuth.js
- **State Management**: React Context + Server State
- **Real-time**: WebSocket + Server-Sent Events
- **PWA**: next-pwa plugin
- **AI**: OpenAI API
- **Payments**: PayFast integration
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (local or cloud)
- Environment variables (see `.env.example`)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/edudash-pro.git
cd edudash-pro
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Project Status

🚧 **Currently in Development** - Migration from Vite + React to Next.js 15

- ✅ Project structure and routing setup
- ✅ PWA configuration
- ✅ Basic TypeScript and Tailwind setup
- 🔄 Component migration in progress
- 🔄 Authentication system setup
- 🔄 Database schema and API routes
- 🔄 Multi-tenant architecture implementation

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [Documentation](docs/)
- [API Reference](docs/api/)
- [Deployment Guide](docs/deployment/)
- [Contributing Guide](CONTRIBUTING.md)
