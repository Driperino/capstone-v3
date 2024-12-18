import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/modals/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function AddPlantModal({
  isOpen,
  onClose,
  onSubmit,
  name,
  setName,
  species,
  setSpecies,
  description,
  setDescription,
  setFile,
}: any) {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add a New Plant</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Input
                placeholder="Plant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}

export function EditPlantModal({
  isOpen,
  onClose,
  onSubmit,
  name,
  setName,
  species,
  setSpecies,
  description,
  setDescription,
}: any) {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit Plant</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Input
                placeholder="Plant Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}

export function DeleteConfirmationModal({ isOpen, onClose, onDelete }: any) {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <ModalContent>
          <ModalHeader>Delete Plant</ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete this plant? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}

export function LogCareModal({ isOpen, onClose, onSubmit }: any) {
  return (
    isOpen && (
      <Modal onClose={onClose}>
        <ModalContent>
          <ModalHeader>Log Care Action</ModalHeader>
          <ModalBody>
            <form onSubmit={onSubmit} className="grid gap-4">
              <Textarea placeholder="Notes (optional)" />
              <div className="flex justify-end gap-2">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  );
}
