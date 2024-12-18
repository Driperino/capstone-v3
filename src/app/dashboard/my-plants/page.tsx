'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus } from 'lucide-react';
import PlantCard from '@/components/plants/PlantCard';
import { motion } from 'framer-motion';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@/components/modals/Modal';

export default function MyPlantsPage() {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [logCareModalOpen, setLogCareModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [plantToDelete, setPlantToDelete] = useState<string | null>(null);
  const [currentPlantId, setCurrentPlantId] = useState<string | null>(null);
  const [currentPlantData, setCurrentPlantData] = useState<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Fetch plants on mount
  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch('/api/my-plants');
        const data = await res.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
        showFeedback('error', 'Failed to fetch plants.');
        s;
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();

    // Deselect card when clicking outside
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.plant-card')) setSelectedCardId(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => setFeedbackMessage(null), 3000); // Clear after 3 seconds
  };

  // Add Plant
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !file) {
      showFeedback('error', 'Name and image are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!uploadRes.ok) throw new Error('Image upload failed');

      const uploadData = await uploadRes.json();
      const response = await fetch('/api/my-plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          species,
          description,
          imageUrl: uploadData.secure_url,
        }),
      });

      if (!response.ok) throw new Error('Failed to save plant data');

      const newPlant = await response.json();
      setPlants((prev) => [...prev, newPlant.data]);
      setModalOpen(false);
      resetForm();
      showFeedback('success', 'Plant added successfully.');
    } catch (error) {
      console.error('Error:', error);
      showFeedback('error', 'Failed to add plant.');
    }
  };

  // Delete Plant
  const handleDelete = async () => {
    if (!plantToDelete) return;

    try {
      const res = await fetch(`/api/my-plants/${plantToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete plant');

      setPlants((prev) => prev.filter((plant) => plant._id !== plantToDelete));
      setDeleteModalOpen(false);
      setPlantToDelete(null);
      showFeedback('success', 'Plant deleted successfully.');
    } catch (error) {
      console.error('Error deleting plant:', error);
      showFeedback('error', 'Failed to delete plant.');
    }
  };

  // Edit Plant
  const handleEditSubmit = async () => {
    if (!currentPlantId) return;

    try {
      const response = await fetch(`/api/my-plants/${currentPlantId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, species, description }),
      });

      if (response.ok) {
        const updatedPlant = await response.json();
        setPlants((prev) =>
          prev.map((plant) =>
            plant._id === currentPlantId ? updatedPlant.data : plant
          )
        );
        setEditModalOpen(false);
        showFeedback('success', 'Plant updated successfully!');
      } else {
        throw new Error('Failed to update plant');
      }
    } catch (error) {
      console.error('Error updating plant:', error);
      showFeedback('error', 'Failed to update plant.');
    }
  };

  const resetForm = () => {
    setName('');
    setSpecies('');
    setDescription('');
    setFile(null);
  };

  // Filter plants
  const filteredPlants = plants.filter((plant) =>
    plant?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Feedback Message */}
      {feedbackMessage && (
        <div
          className={`p-3 mb-4 text-sm rounded ${
            feedbackMessage.type === 'error'
              ? 'bg-red-100 text-red-600'
              : 'bg-green-100 text-green-600'
          }`}
        >
          {feedbackMessage.text}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={() => setModalOpen(true)} variant="default">
          <Plus className="mr-2 h-4 w-4" /> Add Plant
        </Button>
      </div>

      {/* Plant Cards */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlants.map((plant) => (
            <motion.div
              key={plant._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <PlantCard
                plant={plant}
                isSelected={selectedCardId === plant._id}
                onSelect={() => setSelectedCardId(plant._id)}
                onEdit={() => {
                  setCurrentPlantId(plant._id);
                  setCurrentPlantData(plant);
                  setEditModalOpen(true);
                }}
                onDelete={() => {
                  setPlantToDelete(plant._id);
                  setDeleteModalOpen(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Plant Modal */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ModalContent>
            <ModalHeader>Add a New Plant</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="grid gap-4">
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
      )}

      {/* Edit Plant Modal */}
      {editModalOpen && (
        <Modal onClose={() => setEditModalOpen(false)}>
          <ModalContent>
            <ModalHeader>Edit Plant</ModalHeader>
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit();
                }}
                className="grid gap-4"
              >
                <Input
                  placeholder="Plant Name"
                  value={name || currentPlantData?.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Species"
                  value={species || currentPlantData?.species}
                  onChange={(e) => setSpecies(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={description || currentPlantData?.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <Modal onClose={() => setDeleteModalOpen(false)}>
          <ModalContent>
            <ModalHeader>Delete Plant</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this plant? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Log Care Modal */}
      {logCareModalOpen && (
        <Modal onClose={() => setLogCareModalOpen(false)}>
          <ModalContent>
            <ModalHeader>Log Care Action</ModalHeader>
            <ModalBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveCareAction({ action: 'Watered', date: new Date() });
                }}
                className="grid gap-4"
              >
                <Textarea placeholder="Notes (optional)" />
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setLogCareModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
