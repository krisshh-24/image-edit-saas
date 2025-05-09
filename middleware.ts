import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protect root ("/"), dashboard, and forum, but exclude /api/webhooks/clerk
const isProtectedRoute = createRouteMatcher([
  '/',
  '/dashboard(.*)',
  '/forum(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip protection for /api/webhooks/clerk
  if (req.url === '/api/webhooks/clerk') return;

  // Protect other routes
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)', // Ensure API routes are protected
  ],
};
