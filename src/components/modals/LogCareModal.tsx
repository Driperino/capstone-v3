import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/modals/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export function LogCareModal({ isOpen, onClose, onSave }: any) {
  const [action, setAction] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  const handleSave = () => {
    onSave({ action, notes, date });
    onClose();
  };

  return (
    isOpen && (
      <Modal onClose={onClose}>
        <ModalContent>
          <ModalHeader>Log Care Action</ModalHeader>
          <ModalBody>
            <Input
              placeholder="Care Action (e.g., Watered)"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
            <Input
              placeholder="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Textarea
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={handleSave} className="mt-4">
              Save Action
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}
