'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ChevronDown,
  Sprout,
  Bell,
  Users,
  Leaf,
  Home,
  CalendarRange,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

// Menu items
const items = [
  { title: 'Overview', url: '/dashboard/overview', icon: Home },
  { title: 'My Plants', url: '/dashboard/my-plants', icon: Leaf },
  { title: 'Routines', url: '/dashboard/routines', icon: CalendarRange },
];

const sidebarItems = [
  {
    name: 'Account Settings',
    route: '/dashboard/settings/account',
    icon: Settings,
  },
  {
    name: 'Notifications',
    route: '/dashboard/settings/notifications',
    icon: Bell,
  },
  {
    name: 'User Management',
    route: '/dashboard/settings/user-settings',
    icon: Users,
  },
];

export default function SideBar() {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Sprout className="size-5" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Leaf Matrix</span>
                    <span className="text-xs text-sidebar-foreground/60">
                      Grow smarter
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* Settings Dropdown */}
                <hr className="flex-1 border-t border-sidebar-border" />
                <Collapsible>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="flex items-center w-full">
                      <Settings className="flex items-center gap-2" />
                      <span>Settings</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <hr className="flex-1 border-t border-sidebar-border" />
                  <CollapsibleContent>
                    {sidebarItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.route}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="size-4" />
                            <span>{item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center justify-between w-full px-4">
                {/* Logout Button */}
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    className="justify-start w-full"
                    onClick={() => signOut({ callbackUrl: '/' })} // Redirects to '/' after logout
                  >
                    <LogOut className="mr-2 size-4" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      Logout
                    </span>
                  </Button>
                </SidebarMenuButton>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
