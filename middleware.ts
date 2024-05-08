import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { locales, defaultLocale } from "@/localization.config";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({locales: locales, defaultLocale: defaultLocale});

const isProtectedRoute = createRouteMatcher([
	"/:locale/create-element(.*)",
	"/:locale/edit-element(.*)",
	"/:locale/update-element(.*)",
	"/:locale/create-elementCollection(.*)",
	"/:locale/edit-elementCollection(.*)",
	"/:locale/update-elementCollection(.*)",
]);

export default clerkMiddleware((auth, req) => {
	// Restrict admin routes to users with specific permissions
	if (isProtectedRoute(req)) {
		auth().protect((has) => {
			return has({ role: "org:admin" });
		});
	}

    // do not localize api routes
    const path = req.nextUrl.pathname;
	if (path.includes("/api")) {
        return;
    }

    return intlMiddleware(req);
});

export const config = {
	matcher: "/((?!static|.*\\..*|_next).*)",
};
