"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { AppSidebar } from "@/components/app-sidebar";
import MainNavbar from "@/components/main-navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2];
  const label =
    currentPath === "clients"
      ? "Clients"
      : currentPath === "projects"
      ? "Projects"
      : currentPath === "transactions"
      ? "Transactions"
      : "Dashboard";

  const routesWithoutSidebar = [""];

  // Check if the current route should show the sidebar
  const shouldShowSidebar = !routesWithoutSidebar.includes(pathname);

  return (
    <>
      {shouldShowSidebar ? (
        <SessionProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* <header> */}
                <MainNavbar />
              {/* </header> */}
              <div className="">{children}</div>
            </SidebarInset>
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
