import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect('/'); // Redirect to login page if no session
    return null;
  } else {
    redirect('/dashboard/overview');
  }

  return <div>This is the dashboard page</div>;
}
