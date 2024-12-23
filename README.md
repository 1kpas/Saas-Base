# SaaS Base Project Documentation

## Project Overview
A Next.js-based SaaS starter template with authentication, dashboard layout, and theme switching capabilities.

## Tech Stack
- Next.js 15.1.2
- TypeScript
- Supabase (Authentication)
- Tailwind CSS
- shadcn/ui Components
- Framer Motion

## Project Structure

### Core Directories
```
/app                 # Next.js app directory (pages and layouts)
/components         # Reusable React components
/lib                # Utility functions and shared code
/public            # Static assets
/hooks             # Custom React hooks
```

### Key Features

#### Authentication System
- Located in `/app/auth/page.tsx`
- Handles login, registration, and password recovery
- Uses Supabase authentication
- Features animated transitions between auth modes
- Responsive design with dark/light theme support

#### Dashboard Layout
- Base layout: `/app/dashboard/layout.tsx`
- Sidebar navigation with active state indicators
- User profile display
- Theme toggle functionality
- Logout capabilities

#### Middleware
- Location: `/middleware.ts`
- Handles Supabase session management
- Protects routes requiring authentication
- Manages cookie-based authentication state

#### Theme System
- Dark/light mode support
- Custom color variables in `globals.css`
- Theme provider component for context management
- Persistent theme preferences

### Key Components

#### Sidebar (`/components/sidebar.tsx`)
- Navigation menu with active state
- User profile display
- Theme toggle
- Logout functionality
- Tooltip-enhanced navigation items

#### Authentication Components
- Responsive login/register forms
- Password recovery flow
- Error handling with toast notifications
- Animated transitions between states

#### Theme Components
- Theme provider for context management
- Theme toggle button with animations
- CSS variables for consistent theming

### Configuration Files

#### Environment Variables
Required variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_BASE_URL=
```

#### Tailwind Configuration
- Custom color scheme
- Extended theme configuration
- Animation utilities
- Responsive design utilities

### Utility Functions

#### Authentication (`/lib/auth.ts`)
```typescript
fazerLogin(email: string, senha: string)
fazerRegistro(email: string, senha: string)
fazerLogout()
recuperarSenha(email: string)
```

#### Theme Utilities (`/lib/utils.ts`)
- Class name merging functionality
- Tailwind class utilities

### Setup Instructions

1. Clone repository
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables
4. Run development server:
```bash
npm run dev
```

### Development Guidelines

1. Component Structure
   - Use TypeScript for type safety
   - Implement components as functional components
   - Follow shadcn/ui component patterns

2. Styling
   - Use Tailwind CSS utilities
   - Follow design token system in `globals.css`
   - Maintain dark/light theme compatibility

3. Authentication
   - Handle all auth states appropriately
   - Implement proper error handling
   - Use toast notifications for user feedback

4. State Management
   - Use React hooks for local state
   - Implement context where needed
   - Maintain clean component hierarchy