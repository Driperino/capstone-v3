import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/custom/Modal';
import { Button } from '@/components/ui/button';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p className="text-sm text-[--muted-foreground] mb-4">
            {description}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              variant="destructive"
              className="bg-[--destructive] text-[--destructive-foreground]"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
