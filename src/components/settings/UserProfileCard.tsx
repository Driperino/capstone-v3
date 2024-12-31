'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import TimezoneDropdown from '@/components/settings/TimeZoneDropdown';

interface UserProfileCardProps {
  user: {
    _id: string;
    name: string;
    email: string;
    timezone?: string;
    image: string;
  };
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [timezone, setTimezone] = useState(user.timezone || '');
  const [profileImage, setProfileImage] = useState(user.image);
  const [error, setError] = useState<string | null>(null); // Error state

  // Define the handleImageUpload function inside the component
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to upload image');
        return;
      }

      const data = await response.json();
      setProfileImage(data.secure_url); // Update the profile image URL
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(
        'An error occurred while uploading the image. Please try again.'
      );
      console.error('Error uploading image:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, timezone, image: profileImage }),
      });

      if (!response.ok) {
        setError('Failed to save changes. Please try again.');
        return;
      }

      setError(null); // Clear any previous errors
    } catch (error) {
      setError('An error occurred while saving changes.');
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-card text-card-foreground w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Edit User</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Configure your profile settings below.
      </p>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-secondary-foreground mb-2"
          >
            Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-input text-foreground"
          />
        </div>

        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-secondary-foreground mb-2"
          >
            Email
          </Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-input text-foreground"
          />
        </div>

        <div>
          <Label
            htmlFor="timezone"
            className="block text-sm font-medium text-secondary-foreground mb-2"
          >
            Timezone
          </Label>
          <TimezoneDropdown
            currentTimezone={timezone}
            onTimezoneChange={setTimezone}
          />
        </div>

        {/* <div>
          <Label
            htmlFor="profileImage"
            className="block text-sm font-medium text-secondary-foreground mb-2"
          >
            Profile Image
          </Label>
          <input
            id="profileImage"
            type="file"
            onChange={(e) => handleImageUpload(e, setProfileImage, setError)}
            className="mt-1 block w-full text-sm bg-input text-foreground file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-secondary file:text-secondary-foreground"
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="mt-4 w-24 h-24 rounded-full object-cover border border-border"
            />
          )}
        </div> */}
      </div>

      <Button
        onClick={handleSave}
        className="mt-6 bg-primary text-primary-foreground w-full py-2"
      >
        Save Changes
      </Button>

      <div className="mt-6 flex flex-col gap-4">
        {/* <Button className="bg-secondary text-secondary-foreground w-full py-2">
          Send Verification Email
        </Button> */}
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground w-full py-2">
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default UserProfileCard;
