# Drafton Frontend - Technical Architecture

## Project Overview
Drafton is a modern document drafting platform built with Next.js 16, focusing on performance, type safety, and developer experience. This frontend application provides a clean, minimalist interface for creating and managing documents.

## Core Technologies
- **Next.js 16.2.3** (App Router architecture)
- **React 19.2.4** with React Compiler
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4** (PostCSS-based)
- **Shadcn/ui** + **Radix UI** component system
- **Tanstack React Form** for form management
- **Zod** for validation schemas
- **Axios** for HTTP client
- **JWT** authentication

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages (login, signup, verify)
│   ├── dashboard/         # Main dashboard
│   ├── pricing/           # Pricing page
│   ├── proposal/          # Document proposal pages
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/ui components
│   ├── layout/            # Layout components (navbar, footer)
│   ├── buttons/           # Custom button components
│   └── providers/         # React providers (Auth, etc.)
├── lib/                   # Utilities and helpers
│   ├── utils.ts           # Class merging utilities
│   ├── api-client.ts      # Axios HTTP client with interceptors
│   ├── auth.ts            # Server-side auth utilities
│   ├── validations/       # Zod validation schemas
│   └── errors/            # Error handling utilities
├── services/              # API service layer
│   └── auth.service.ts    # Authentication API calls
├── types/                 # TypeScript type definitions
│   ├── api.types.ts       # API response types
│   └── auth.types.ts      # Authentication types
└── actions/               # Server actions
    └── auth.actions.ts    # Authentication server actions
```

## Key Architectural Patterns

### 1. **Modern Next.js Architecture**
- App Router with server/client component separation
- React Compiler for optimal performance
- Server actions for server-side logic
- Environment-based API configuration

### 2. **Type-Safe API Layer**
- Axios HTTP client with request/response interceptors
- Typed API responses with discrimination
- Centralized error handling
- Environment-based API URL configuration

### 3. **Authentication System**
- JWT-based authentication with cookie storage
- Client-side AuthProvider for session management
- Server-side getCurrentUser utility
- Form-based authentication with Zod validation
- Device ID tracking for security

### 4. **Form Management**
- Tanstack React Form for type-safe form handling
- Zod validation schemas
- Server actions for form submission
- Toast notifications for user feedback

### 5. **UI Component System**
- Shadcn/ui component library with Radix UI primitives
- Class Variance Authority (CVA) for component variants
- Tailwind CSS v4 with custom color system
- Dark/light theme support with CSS variables
- Lucide React for consistent iconography

### 6. **Styling Architecture**
- Tailwind CSS v4 with PostCSS
- OKLCH color system for consistency
- CSS variables for theme switching
- Custom design tokens for spacing, colors, typography
- Mobile-first responsive design

## Development Configuration
- ESLint 9 with Next.js configuration
- TypeScript strict mode
- Path aliases (`@/*` for `src/*`)
- Modern build tools with Next.js 16
- Development scripts for dev, build, and lint

## Key Features
- Minimalist design focused on document drafting
- Performance-focused with React Compiler
- Type-safe throughout the entire stack
- Modern React patterns with hooks and context
- Component-based architecture with reusable UI
- Server-side rendering for SEO and performance
- Client-side interactivity where needed

This architecture follows current best practices for React/Next.js development with proper separation of concerns, type safety, and modern tooling.