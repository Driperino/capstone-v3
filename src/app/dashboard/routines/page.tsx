'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import PlantSearch, { Plant } from '@/components/routines/PlantSearch';
import CareTimeline from '@/components/routines/CareTimeline';
import DayActionsTimeline from '@/components/routines/DayActionsTimeline';

export default function PlantCarePage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [selectedActions, setSelectedActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/my-plants');
        if (!response.ok) {
          throw new Error('Failed to fetch plants');
        }

        // Map API response to match the Plant type
        const data: any[] = await response.json();
        const mappedPlants: Plant[] = data.map((plant) => ({
          _id: plant._id || `generated-id-${Math.random()}`, // Ensure _id is a string
          name: plant.name,
          species: plant.species,
          description: plant.description || 'No description provided',
          imageUrl: plant.imageUrl || '/placeholder.jpg', // Fallback image
          careSchedule: plant.careSchedule || [], // Default empty care schedule
        }));
        setPlants(mappedPlants);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  if (loading) {
    return <p className="text-center text-muted">Loading plants...</p>;
  }

  return (
    <main className="flex flex-col gap-6 w-full h-screen p-6 bg-card text-card-foreground">
      {/* Top Section: Fixed height for PlantSearch and CareCalendar */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ height: '300px' }}
      >
        <Card className="overflow-hidden col-span-2 h-full px-1">
          <PlantSearch
            plants={plants}
            onSelect={(plant) => {
              setSelectedPlant(plant);
              setSelectedActions([]);
            }}
          />
        </Card>
      </div>

      {/* Bottom Section: Render either CareTimeline or DayActionsTimeline */}
      <Card className="w-full overflow-hidden p-6">
        {selectedPlant ? (
          <CareTimeline plant={selectedPlant} />
        ) : selectedActions.length > 0 ? (
          <DayActionsTimeline actions={selectedActions} />
        ) : (
          <p className="text-center text-muted">
            Select a plant or click on a calendar date to view actions.
          </p>
        )}
      </Card>
    </main>
  );
}
