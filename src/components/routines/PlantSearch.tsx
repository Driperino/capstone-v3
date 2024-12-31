import React, { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSession } from 'next-auth/react';

type Plant = {
  _id: string;
  name: string;
  species: string;
  description: string;
  imageUrl?: string;
};

interface Props {
  onSelect: (plant: Plant) => void;
}

const PlantSearch: React.FC<Props> = ({ onSelect }) => {
  const { data: session, status } = useSession();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPlants = useCallback(async () => {
    if (status !== 'authenticated') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/my-plants');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

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
    <div className="flex flex-col h-full pt-2 ">
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
                src={plant.imageUrl}
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
