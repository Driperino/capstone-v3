import React, { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';

export type Plant = {
  _id: string; // Ensure _id is always a string
  name: string;
  species: string;
  description?: string; // Optional
  imageUrl?: string;
  careSchedule?: { day: string; action: string }[]; // Optional care schedule
};

interface Props {
  plants?: Plant[]; // Optional external plant data
  onSelect: (plant: Plant) => void;
}

const PlantSearch: React.FC<Props> = ({ plants: externalPlants, onSelect }) => {
  const { data: session, status } = useSession();
  const [plants, setPlants] = useState<Plant[]>(externalPlants || []);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(!externalPlants);

  const fetchPlants = useCallback(async () => {
    if (status !== 'authenticated' || externalPlants) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/my-plants');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data: any[] = await response.json();
      const mappedPlants: Plant[] = data.map((plant) => ({
        _id: plant._id || `generated-id-${Math.random()}`, // Fallback ID
        name: plant.name,
        species: plant.species,
        description: plant.description || 'No description available.',
        imageUrl: plant.imageUrl || '/placeholder.jpg',
        careSchedule: plant.careSchedule || [], // Default empty care schedule
      }));
      setPlants(mappedPlants);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  }, [status, externalPlants]);

  useEffect(() => {
    if (!externalPlants) {
      fetchPlants();
    }
  }, [fetchPlants, externalPlants]);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Please log in to view your plants.</p>;
  }

  return (
    <div className="flex flex-col h-full pt-2">
      <Input
        type="text"
        placeholder="Search plants..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-2"
      />
      <div className="overflow-y-auto space-y-2 h-full scrollbar-hide">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <Card
              key={plant._id}
              onClick={() => onSelect(plant)}
              className="p-2 cursor-pointer hover:bg-muted transition flex items-center gap-4"
            >
              <img
                src={plant.imageUrl || '/placeholder.jpg'} // Fallback for missing images
                alt={plant.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="truncate">{plant.name}</p>
                <p className="text-sm text-muted truncate">{plant.species}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted">No plants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlantSearch;
