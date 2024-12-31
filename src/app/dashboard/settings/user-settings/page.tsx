'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import UserProfileCard from '@/components/settings/UserProfileCard';
import VerifyEmailButton from '@/components/settings/VerifyEmailButton';
import { Button } from '@/components/ui/button';

// Define a User type
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  emailVerified: boolean;
  timezone?: string;
}

const UserSettings = () => {
  const { data: session, status } = useSession();

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/users/${session?.user?.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      alert('Account successfully deleted.');
      // Optionally, redirect to a different page after deletion
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An error occurred while trying to delete your account.');
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-muted-foreground">
          Loading your profile...
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-muted-foreground">
          Please log in to access your settings.
        </div>
      </div>
    );
  }

  // Extract the user data from the session
  const user: User = {
    _id: session.user.id || '', // Ensure your session includes the user ID
    name: session.user.name || '',
    email: session.user.email || '',
    image: session.user.image || '',
    emailVerified: session.user.emailVerified || false, // Customize this based on your auth configuration
    timezone: '', // Add timezone if available in the session
  };

  return (
    <main className="min-h-screen bg-background p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary mb-8">User Settings</h1>
      <UserProfileCard user={user} />
    </main>
  );
};

export default UserSettings;
