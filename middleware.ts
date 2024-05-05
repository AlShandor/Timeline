import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { i18n } from "@/i18n.config";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(i18n);

const isProtectedRoute = createRouteMatcher([
	"/(" + i18n.locales.join('|') + ")/create-element(.*)",
	"/(" + i18n.locales.join('|') + ")/edit-element(.*)",
	"/(" + i18n.locales.join('|') + ")/update-element(.*)",
	"/(" + i18n.locales.join('|') + ")/create-elementCollection(.*)",
	"/(" + i18n.locales.join('|') + ")/edit-elementCollection(.*)",
	"/(" + i18n.locales.join('|') + ")/update-elementCollection(.*)",
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
	if (!path.includes("/api")) {
		return intlMiddleware(req);
	}
});

export const config = {
	matcher: "/((?!static|.*\\..*|_next).*)",
};
