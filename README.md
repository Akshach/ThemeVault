# ThemeVault

ThemeVault is a Next.js theme marketplace and playground for discovering, previewing, and applying UI themes across an application. Users can browse the available themes publicly, switch the active theme in real time, preview responsive layouts, and export theme code.

## Features

- Public theme gallery with search, category, tier, and sorting filters
- One-click theme application across the entire website
- Persistent theme selection using Zustand
- Light Minimal as the default theme
- Full-screen theme previews
- Responsive playground with mobile, tablet, and desktop views
- Theme customization controls for font size, spacing, and border radius
- CSS, Tailwind, React, Figma, and ZIP export options
- Optional account registration and sign-in
- JWT authentication with MongoDB user storage
- Tier and usage models ready for future monetization
- Reusable shadcn/ui-style components built with Radix UI and Tailwind CSS

All themes are currently available publicly without requiring sign-in. Authentication is retained for account and user-management features.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Zustand with persistence
- MongoDB
- JSON Web Tokens
- bcryptjs
- Lucide React icons

## Pages

| Route | Description |
| --- | --- |
| `/` | ThemeVault home page and featured theme selector |
| `/gallery` | Searchable public theme gallery |
| `/playground` | Interactive theme preview and customization playground |
| `/pricing` | Subscription and tier information |
| `/admin` | Admin dashboard for theme and user management |

## Getting Started

### Requirements

- Node.js 18 or newer
- npm, pnpm, or another compatible package manager
- MongoDB only when using authentication or account features

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Then configure:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.com
```

The public gallery and playground do not require a database connection. MongoDB is required by the authentication API routes.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Create a production build

```bash
npm run build
npm run start
```

## Project Structure

```text
app/
  api/auth/              Authentication API routes
  gallery/               Public theme gallery route
  playground/            Interactive playground route
  pricing/               Pricing route
  layout.tsx             Root layout, metadata, providers, and theme applier
components/
  auth/                  Sign-in UI
  export/                Export UI and export history
  pricing/               Pricing UI
  ui/                    Reusable interface primitives
  theme-applier.tsx      Applies the active theme globally
  theme-gallery.tsx      Theme gallery and previews
  theme-playground.tsx   Interactive playground
hooks/
  use-theme-vault.ts     Theme state and document token application
  use-auth.tsx           Authentication context
  use-export.ts           Export state and limits
lib/
  themes.ts              Theme definitions and design tokens
  export-generator.ts    Export generation logic
  auth.ts                Authentication service
  mongodb.ts             Lazy MongoDB connection
  models/User.ts         User and tier types
```

## Adding a Theme

Add a new `ThemeConfig` object to [`lib/themes.ts`](./lib/themes.ts). A theme should include:

- A unique `id`
- Display name, category, description, and preview image
- Color tokens
- Font tokens
- Spacing tokens
- Border radius
- Shadow tokens

Place preview images in [`public/`](./public), then reference them with a root-relative path such as `/my-theme-preview.png`.

Theme tokens are applied to the document as CSS custom properties. Components use Tailwind semantic classes such as `bg-background`, `text-foreground`, `bg-card`, and `text-primary`, so the application updates without requiring route-specific changes.

## Authentication API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user and issue an auth cookie |
| `POST` | `/api/auth/login` | Authenticate a user and issue an auth cookie |
| `GET` | `/api/auth/me` | Return the current authenticated user |
| `POST` | `/api/auth/logout` | Clear the auth cookie |

Do not commit `.env.local` or real credentials. Use strong, unique values for `JWT_SECRET` in deployed environments.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Build the application for production
npm run start    # Start the production server
npm run lint     # Run the configured Next.js lint command
```

## Current Status

Theme browsing and application are public and require no sign-in. Pricing, authentication, exports, and admin functionality are implemented as the foundation for future production billing and access-control rules.
