'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Menu items
const items = [
  { title: 'Overview', url: '/dashboard/overview', icon: Home },
  { title: 'My Plants', url: '/dashboard/my-plants', icon: Leaf },
  { title: 'Routines', url: '/dashboard/routines', icon: CalendarRange },
];

const sidebarItems = [
  {
    name: 'User Management',
    route: '/dashboard/settings/user-settings',
    icon: Users,
  },
  // {
  //   name: 'Notifications',
  //   route: '/dashboard/settings/notifications',
  //   icon: Bell,
  // },
];

export default function SideBar() {
  const { data: session, status } = useSession();

  const user = {
    name: session?.user?.name || 'John Doe',
    email: session?.user?.email || '',
    avatar: session?.user?.image || '/avatars/john-doe.jpg',
  };

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
              <div className="flex items-center w-full py-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 mr-2 group-data-[collapsible=icon]:hidden">
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <SidebarMenuButton asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className=""
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <div>
                      <LogOut className="size-4" />
                      <span className="sr-only">Logout</span>
                    </div>
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
