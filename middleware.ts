import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/localization.config";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({locales: locales, defaultLocale: defaultLocale});

const adminRoutes = [
	"/create-element",
	"/edit-element", 
	"/update-element",
	"/create-elementCollection",
	"/edit-elementCollection",
	"/update-elementCollection",
];

// Check if a path is an admin route (considering locale)
const isAdminRoute = (pathname: string): boolean => {
	// Remove locale prefix to check the base path
	const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
	return adminRoutes.some(route => pathWithoutLocale.startsWith(route));
};

export default withAuth(
	function middleware(req) {
		const path = req.nextUrl.pathname;
		
		// Skip localization for API routes and static assets
		if (path.includes("/api") || path.startsWith("/icons/") || path.startsWith("/images/") || path.startsWith("/fonts/")) {
			return NextResponse.next();
		}

		// Check if user is trying to access admin routes
		if (isAdminRoute(path)) {
			const token = req.nextauth.token;
			
			// If user is not admin, redirect to home
			if (!token?.isAdmin) {
				const locale = path.split("/")[1] || defaultLocale;
				return NextResponse.redirect(new URL(`/${locale}`, req.url));
			}
		}

		// Apply internationalization middleware
		return intlMiddleware(req);
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				const path = req.nextUrl.pathname;
				
				// Allow access to auth pages and public routes
				if (path.includes("/auth/") || path.includes("/api/auth/") || path === "/" || path.match(/^\/[a-z]{2}$/)) {
					return true;
				}
				
				// For admin routes, check if user is admin
				if (isAdminRoute(path)) {
					return !!token?.isAdmin;
				}
				
				// For other protected routes, just check if user is authenticated
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|icons|images|fonts|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.ico|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
	],
};
