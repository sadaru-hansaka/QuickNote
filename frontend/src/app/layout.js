import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/AppBar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "../components/sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuckNotes",
  description: "Save, Edit and View your Notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          {/* <AppBar
            onAddClick={() => {}}
            onSearch={() => {}}
            user={null}
            logout={() => {}}
          /> */}
        
          {/* {children} */}
          <div>
            <SidebarProvider>
              <div className="flex min-h-screen min-w-screen">
                {/* Sidebar on the left */}
                <AppSidebar />

                {/* Main content on the right */}
                <main className="flex-1 p-4">
                  {children}
                </main>
              </div>
            </SidebarProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
