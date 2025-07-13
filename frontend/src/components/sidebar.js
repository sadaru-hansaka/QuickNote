'use client';
import { Calendar, Home, Inbox, Search, Settings,NotebookPenIcon,Clock,Star } from "lucide-react"

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
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },

]

export function AppSidebar() {
  const pathname = usePathname();
  const [categories, setCategories]=useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
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
    <Sidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
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
                {categories.map((cat) => {
                  // const isActive = pathname === item.url;
                  return (
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
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}