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
} from '@/components/custom/Modal';

export default function MyPlantsPage() {
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Fetch plants on mount
  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch('/api/my-plants');
        const data = await res.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();

    // Deselect on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.plant-card')) setSelectedCardId(null);
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle submit new plant
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !file) return alert('Name and image are required!');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Upload the file
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Image upload failed');
      const uploadData = await uploadRes.json();

      // Submit plant data
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
      setName('');
      setSpecies('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Handle delete logic
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
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete plant. Try again.');
    }
  };

  const handleSelectCard = (id: string) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const handleEdit = (id: string) => {
    console.log('Edit plant:', id);
    // Placeholder for edit logic
  };

  const openDeleteModal = (id: string) => {
    setPlantToDelete(id);
    setDeleteModalOpen(true);
  };

  // Filter plants based on search
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <Input
          placeholder="Search plants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />

        {/* Add Plant Button */}
        <Button onClick={() => setModalOpen(true)} variant="default">
          <Plus className="mr-2 h-4 w-4" /> Add Plant
        </Button>
      </div>

      {/* Plants Display */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : filteredPlants.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No plants found. Add your first plant!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlants.map((plant) => (
            <motion.div
              key={plant._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <PlantCard
                plant={plant}
                isSelected={selectedCardId === plant._id}
                onSelect={() => handleSelectCard(plant._id)}
                onEdit={() => handleEdit(plant._id)}
                onDelete={() => openDeleteModal(plant._id)}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal for Adding Plants */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <ModalContent>
            <ModalHeader>Add a New Plant</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
                <Button type="submit" className="mt-2" variant="default">
                  Submit
                </Button>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Modal for Deleting Plants */}
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
                <Button
                  variant="secondary"
                  onClick={() => setDeleteModalOpen(false)}
                >
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
    </div>
  );
}
