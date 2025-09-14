# Custom Google OAuth Authentication Setup

This guide explains how to set up the custom Google OAuth authentication system that replaces Clerk.

## Overview

The authentication system now uses:
- **NextAuth.js** for authentication management
- **Google OAuth** as the authentication provider
- **Environment variables** for approved email management
- **MongoDB** for session storage
- **Custom middleware** for route protection

## Setup Steps

### 1. Google OAuth Configuration

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure the OAuth consent screen
6. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 2. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# MongoDB Connection (Optional - not used with JWT strategy)
# MONGODB_URI=your_mongodb_connection_string

# Approved Emails (comma-separated)
APPROVED_EMAILS=admin@example.com,user1@gmail.com,user2@gmail.com

# Optional: Admin emails (subset of approved emails with admin privileges)
ADMIN_EMAILS=admin@example.com
```

### 3. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

### 4. Email Management

#### Approved Emails
- Add email addresses to `APPROVED_EMAILS` (comma-separated)
- Only these emails can sign in to your application
- Users with non-approved emails will see an "Access Denied" error

#### Admin Emails
- Add admin email addresses to `ADMIN_EMAILS` (comma-separated)
- Admin users can access protected routes like:
  - `/create-element`
  - `/edit-element`
  - `/create-elementCollection`
  - `/edit-elementCollection`

#### Example:
```env
APPROVED_EMAILS=john@gmail.com,jane@company.com,admin@mysite.com
ADMIN_EMAILS=admin@mysite.com
```

## Authentication Flow

### Sign In Process
1. User clicks "Sign In" button
2. Redirected to Google OAuth
3. Google verifies user identity
4. System checks if email is in `APPROVED_EMAILS`
5. If approved, user is signed in and session is created
6. If not approved, access is denied

### Route Protection
- **Public routes**: Home page, auth pages
- **Protected routes**: Require authentication
- **Admin routes**: Require admin privileges (`isAdmin: true`)

### Session Management
- Sessions are stored as JWT tokens (stateless)
- User data includes:
  - `id`: User ID
  - `name`: User's name
  - `email`: User's email
  - `image`: User's profile picture
  - `isAdmin`: Boolean indicating admin status

## API Changes

All API routes now use NextAuth session checking instead of Clerk:

```javascript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  // Check if user is admin
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    return new Response("You do not have admin rights", {
      status: 401,
    });
  }
  // ... rest of the API logic
}
```

## Component Usage

### Navigation Component
The Nav component now shows:
- User's profile picture and name when signed in
- "Admin" badge for admin users
- Sign in/out buttons
- Admin-only navigation links

### Using Authentication in Components
```tsx
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Not signed in</p>;
  
  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      {session.user.isAdmin && <p>You have admin privileges</p>}
    </div>
  );
}
```

## Security Features

1. **Email Whitelist**: Only approved emails can access the application
2. **Admin Role**: Separate admin privileges for sensitive operations
3. **Session-based Auth**: Secure session management with MongoDB
4. **CSRF Protection**: Built-in CSRF protection from NextAuth
5. **Secure Cookies**: HTTP-only, secure cookies for session tokens

## Troubleshooting

### Common Issues

1. **"Configuration" Error**
   - Check that all environment variables are set
   - Verify Google OAuth credentials

2. **"Access Denied" Error**
   - User's email is not in `APPROVED_EMAILS`
   - Add the email to the approved list

3. **Admin Routes Not Working**
   - Check that user's email is in `ADMIN_EMAILS`
   - Verify the user has signed out and back in after adding to admin list

4. **Database Connection Issues**
   - Verify `MONGODB_URI` is correct
   - Check database connectivity

### Debug Mode

To enable debug mode, add this to your `.env.local`:

```env
NEXTAUTH_DEBUG=true
```

This will show detailed logs in the console during development.

## Migration from Clerk

The system has been fully migrated from Clerk to NextAuth:

- ✅ Removed `@clerk/nextjs` dependency
- ✅ Replaced Clerk components with NextAuth equivalents
- ✅ Updated middleware for route protection
- ✅ Modified API routes to use NextAuth sessions
- ✅ Implemented email-based access control
- ✅ Added admin role management

## Benefits of This Approach

1. **Cost Effective**: No monthly fees for authentication service
2. **Full Control**: Complete control over authentication logic
3. **Simple Email Management**: Easy to manage approved users via environment variables
4. **Flexible**: Easy to extend with additional features
5. **Secure**: Industry-standard OAuth 2.0 implementation
6. **MongoDB Integration**: Sessions stored in your existing database
