import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes:['/','/About','/Contact'],
    ignoredRoutes: ["/facebook.png", "/twitter.webp", "/sanchaya.jpg"]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};