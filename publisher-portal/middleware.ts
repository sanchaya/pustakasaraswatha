import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// export default clerkMiddleware({
//     publicRoutes:['/','/en','/kn','/about/kn','/contact/kn','/about/en','/contact/en','/publishers/en','/publishers/kn','/authors/en','/authors/kn'],
//     ignoredRoutes: ["/favicon.ico","/facebook.png", "/twitter.webp", "/sanchaya.jpg"]
// });

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)','/','/en','/kn','/about/kn','/contact/kn','/about/en','/contact/en','/publishers/en','/publishers/kn','/authors/en','/authors/kn',"/favicon.ico","/facebook.png", "/twitter.webp", "/sanchaya.jpg"]);
export default clerkMiddleware((auth, request) =>{
  if(!isPublicRoute(request)){
    auth().protect();
  }
});
export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};