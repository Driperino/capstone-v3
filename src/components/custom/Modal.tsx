'use client';

import { ReactNode } from 'react';

export function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[--overlay-bg] z-50">
      <div className="bg-[--modal-bg] text-[--modal-foreground] border border-[--modal-border] rounded-[--radius] shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[--muted-foreground] hover:text-[--foreground] transition-colors"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function ModalHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold mb-4 text-[--primary-foreground]">
      {children}
    </h2>
  );
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div className="text-[--muted-foreground]">{children}</div>;
}
