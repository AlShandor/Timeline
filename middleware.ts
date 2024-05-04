import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
	"/create-element(.*)",
	"/edit-element(.*)",
	"/update-element(.*)",
	"/create-elementCollection(.*)",
	"/edit-elementCollection(.*)",
	"/update-elementCollection(.*)",
]);

export default clerkMiddleware((auth, req) => {
	// Restrict admin routes to users with specific permissions
	if (isProtectedRoute(req)) {
		auth().protect((has) => {
			return has({ role: "org:admin" });
		});
	}
});
