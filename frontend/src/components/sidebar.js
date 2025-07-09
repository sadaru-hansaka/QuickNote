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
    url: "#",
    icon: Star,
  },
  {
    title: "Catogories",
    url: "/categories",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },

]

export function AppSidebar() {
  const pathname = usePathname();
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
                      className={isActive ? "bg-blue-50 text-blue-950 font-medium" : ""}
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
      </SidebarContent>
    </Sidebar>
  )
}