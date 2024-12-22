"use client";

import { SessionProvider } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";
import MainNavbar from "@/components/main-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Session } from "inspector/promises";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routesWithoutSidebar = [""];

  // Check if the current route should show the sidebar
  const shouldShowSidebar = !routesWithoutSidebar.includes(pathname);

  return (
    <>
      {shouldShowSidebar ? (
        <SessionProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full">
              <MainNavbar />
              {/* <SidebarTrigger /> */}
              <div className=" h-full">{children}</div>
            </main>
          </SidebarProvider>
        </SessionProvider>
      ) : (
        <main className="flex flex-col w-full">
          <div className=" bg-background h-full">
            {/* <SidebarTrigger /> */}
            {children}
          </div>
        </main>
      )}
    </>
  );
}
