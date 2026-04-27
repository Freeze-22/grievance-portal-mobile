# Grievance Portal Mobile App

A React Native mobile application for managing workplace grievances. Built with Expo and TypeScript.

## Features

- User Authentication
- Dashboard with Analytics
- Multi-step Grievance Submission Flow
- Offline Draft Auto-save
- Timeline View and Comment Threads
- Profile and Settings Management

## Tech Stack

- React Native & Expo
- TypeScript
- Zustand & React Native MMKV (State & Persistence)
- TanStack React Query (Data Fetching)
- React Hook Form & Zod (Form Validation)
- NativeWind (Styling)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL=https://your-backend-api.com
   EXPO_PUBLIC_SENTRY_DSN=your-sentry-dsn
   ```
