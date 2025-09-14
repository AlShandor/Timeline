import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Get approved emails from environment variable
const getApprovedEmails = (): string[] => {
  const emails = process.env.APPROVED_EMAILS || "";
  return emails.split(",").map(email => email.trim()).filter(Boolean);
};

// Get admin emails from environment variable
const getAdminEmails = (): string[] => {
  const emails = process.env.ADMIN_EMAILS || "";
  return emails.split(",").map(email => email.trim()).filter(Boolean);
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Only allow approved emails to sign in
      const approvedEmails = getApprovedEmails();
      
      if (!user.email || !approvedEmails.includes(user.email)) {
        console.log(`Unauthorized login attempt from: ${user.email}`);
        return false;
      }
      
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        // Add user ID to session
        session.user.id = token.sub || "";
        
        // Add admin role if user is in admin emails list
        const adminEmails = getAdminEmails();
        session.user.isAdmin = adminEmails.includes(session.user.email || "");
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        
        // Add admin role to JWT token
        const adminEmails = getAdminEmails();
        token.isAdmin = adminEmails.includes(user.email || "");
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
