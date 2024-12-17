import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SideBar from '@/components/sidebar/SideBar';
import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/ui/mode-toggle';
import PageTitle from '@/components/ui/custom/PageTitle'; // Import the client component

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/'); // Redirect to login page if no session
    return null;
  }

  return (
    <SidebarProvider>
      <SideBar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b border-border px-4 bg-background text-foreground">
          <SidebarTrigger className="-ml-1" />
          <PageTitle /> {/* Dynamic page title */}
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 mx-auto bg-card text-card-foreground p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
