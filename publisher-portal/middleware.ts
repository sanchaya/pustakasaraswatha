import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/','/en','/kn','/About/kn','/Contact/kn','/About/en','/Contact/en'],
    ignoredRoutes: ["/facebook.png", "/twitter.webp", "/sanchaya.jpg"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};