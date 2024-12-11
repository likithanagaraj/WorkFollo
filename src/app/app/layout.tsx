"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainNavbar from "@/components/main-navbar";
import { SidebarProvider,  } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routesWithoutSidebar = [
   ""
  ];

  // Check if the current route should show the sidebar
  const shouldShowSidebar = !routesWithoutSidebar.includes(pathname);

  return (
    <>
      {shouldShowSidebar ? (
        
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col w-full">
            <MainNavbar />
            {/* <SidebarTrigger /> */}
            <div className="bg-[#FAFAFA] h-full">{children}</div>
          </main>
        </SidebarProvider>
      ) : (
        <main className="flex flex-col w-full">
          <div className="bg-[#FAFAFA] h-full">
            {/* <SidebarTrigger /> */}
            {children}
          </div>
        </main>
      )}
    </>
  );
}
