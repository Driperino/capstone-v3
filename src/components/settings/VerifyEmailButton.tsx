'use client';

import { Button } from '@/components/ui/button';

interface VerifyEmailButtonProps {
  userId: string;
  emailVerified: boolean;
}

const VerifyEmailButton: React.FC<VerifyEmailButtonProps> = ({
  userId,
  emailVerified,
}) => {
  const handleVerification = async () => {
    await fetch(`/api/users/${userId}/send-verification`, { method: 'POST' });
    alert('Verification email sent!');
  };

  return (
    <Button
      onClick={handleVerification}
      disabled={emailVerified}
      className={`${
        emailVerified ? 'bg-muted text-muted-foreground' : 'bg-primary'
      }`}
    >
      {emailVerified ? 'Email Verified' : 'Send Verification Email'}
    </Button>
  );
};

export default VerifyEmailButton;
