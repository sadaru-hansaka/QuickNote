'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppBar from "@/components/AppBar";
import { AppSidebar } from "../components/sidebar";
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "QuckNotes",
//   description: "Save, Edit and View your Notes",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppWrapper>
          <SidebarProvider>
            {/* Main container with app bar height offset */}
            <div className="flex flex-col min-h-screen">
              {/* This empty div accounts for the fixed app bar space */}
              <div className="h-16"></div>
              
              {/* Content area that will contain sidebar + main content */}
              <div className="flex flex-1 overflow-hidden">
                {!isAuthPage && (
                  <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                    <AppSidebar />
                  </div>
                )}

                {/* Main content area */}
                <main className="flex-1 p-4 overflow-y-auto ml-[sidebar-width]">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </AppWrapper>
      </body>
    </html>
  );
}
