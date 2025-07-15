'use client';
import { Calendar, Home, Inbox, Search, Settings,NotebookPenIcon,Clock,Star } from "lucide-react"
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState,useEffect } from "react";
import axios from 'axios';

const items = [
  {
    title: "All Notes",
    url: "/",
    icon: NotebookPenIcon,
  },
  {
    title: "Recent",
    url: "/recent",
    icon: Clock,
  },
  {
    title: "Favourites",
    url: "/fav",
    icon: Star,
  },
  {
    title: "Catogories",
    url: "/categories",
    icon: Inbox,
  }
]

export function AppSidebar() {
  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    axios.get("https://quicknote-qzaj.onrender.com/api/category", {
      headers: {
        Authorization: user.token,
      },
    }).then(res => {
      setCategories(res.data);
    }).catch(err => {
      console.error("Error fetching categories:", err);
    });
  }, []);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-29 left-4 z-50 p-2 bg-white shadow rounded-md md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>



      {/* Sidebar */}
      <div
        className={`
          fixed top-25 left-0 h-full w-64 bg-gray-50 md:bg-transparent shadow-md transform transition-transform duration-300 ease-in-out
          z-[60]
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:top-0 md:relative md:block 
        `}
      >
        {/* Close Button (mobile only) */}
        <div className="flex justify-end md:hidden p-2">
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-700">
            ✕
          </button>
        </div>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={isActive ? "bg-blue-50 text-blue-950 font-bold" : "font-semibold text-[16px]"}
                      >
                        <Link href={item.url}>
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={"text-lg"}>Categories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {categories.map((cat) => (
                  <SidebarMenuItem key={cat.name}>
                    <SidebarMenuButton
                      asChild
                      className="hover:opacity-90 transition font-semibold text-[16px]"
                    >
                      <div className="flex align-middle">
                        <span className="h-4 w-5 rounded-full" style={{ backgroundColor: cat.color || '#999' }} />
                        <span>{cat.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </>
  );
}
