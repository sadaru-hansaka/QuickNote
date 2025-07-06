import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppBar from "@/components/AppBar";
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
        <AppWrapper>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen pt-16">
              
              {/* Sidebar + Main Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar on the left */}
                <AppSidebar />

                {/* Main content area */}
                <main className="flex-1 p-4 overflow-y-auto">
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
