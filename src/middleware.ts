import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
 
// const publicRoutes = ["/", "/login", "/signup"]; // Add your public routes here
 
export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
});
 
export const config = {
  matcher: ["/app/:path*", "/admin/:path*"],
};