'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import PlantContent from '@/components/plants/PlantContent';

type CareAction = {
  day: string;
  action: string;
};

type Plant = {
  _id: string;
  name: string;
  species: string;
  description: string;
  datePlanted: string;
  careSchedule: CareAction[];
  imageUrl: string;
};

export default function DashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch('/api/my-plants');
        if (!response.ok) throw new Error('Failed to fetch plants');
        const data: Plant[] = await response.json();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const getRecentPlant = () =>
    plants.reduce((latest, plant) =>
      new Date(plant.datePlanted) > new Date(latest.datePlanted)
        ? plant
        : latest
    );

  const getTodaysActions = () => {
    const today = new Date().toISOString().split('T')[0];
    return plants.flatMap((plant) =>
      plant.careSchedule
        .map((task) => {
          const actionDate = new Date(plant.datePlanted);
          const offset = parseInt(task.day.replace('Day ', ''), 10) - 1;
          actionDate.setDate(actionDate.getDate() + offset);

          return {
            ...task,
            plant,
            actionDate: actionDate.toISOString().split('T')[0],
          };
        })
        .filter((task) => task.actionDate === today)
    );
  };

  const recentPlant = plants.length > 0 ? getRecentPlant() : null;
  const todaysActions = getTodaysActions();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col gap-6 w-full h-screen p-6 bg-card text-card-foreground">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Tasks - Full Width on Top Row */}
        <Card className="p-4 col-span-1 md:col-span-2 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {plants.flatMap((plant) =>
              plant.careSchedule.slice(0, 5).map((task, i) => {
                const dayOffset = parseInt(task.day.replace('Day ', ''), 10);
                const today = new Date();
                const taskDate = new Date(today);
                taskDate.setDate(today.getDate() + dayOffset - 1);

                // Format day and date
                const dayName = new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                }).format(taskDate);
                const formattedDate = new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                }).format(taskDate);

                return (
                  <li key={`${plant._id}-${i}`} className="mb-2">
                    <strong>{task.action}</strong> for{' '}
                    <strong>{plant.name}</strong> <br />
                    <span className="text-muted">
                      {dayName}, {formattedDate}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </Card>

        {/* Total Plants */}
        <Card className="p-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-bold">Total Plants</h2>
          <p className="text-2xl">{plants.length}</p>
        </Card>

        {/* Today's Care Actions */}
        <Card className="p-4 col-span-2">
          <h2 className="text-xl font-bold mb-4">Today's Care Actions</h2>
          <ul className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            {todaysActions.length > 0 ? (
              todaysActions.slice(0, 5).map((action, i) => {
                // Format date for display
                const actionDate = new Date(action.plant.datePlanted);
                const offset = parseInt(action.day.replace('Day ', ''), 10) - 1;
                actionDate.setDate(actionDate.getDate() + offset);

                const formattedDate = new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                }).format(actionDate);

                return (
                  <li key={i} className="mb-2">
                    <strong>{action.action}</strong> for{' '}
                    <strong>{action.plant.name}</strong> <br />
                    <span className="text-muted">{formattedDate}</span>
                  </li>
                );
              })
            ) : (
              <p>No tasks for today!</p>
            )}
          </ul>
        </Card>

        {/* Recently Added Plants */}
        {plants.length > 0 && (
          <Card className="p-4 flex flex-col gap-4 row-span-2">
            <h2 className="text-xl font-bold">Recently Added Plants</h2>
            <div className="flex flex-col gap-4">
              {plants
                .slice() // Create a shallow copy to avoid mutating the original array
                .sort(
                  (a, b) =>
                    new Date(b.datePlanted).getTime() -
                    new Date(a.datePlanted).getTime()
                ) // Sort by datePlanted descending
                .slice(0, 5) // Get the three most recent plants
                .map((plant) => (
                  <div key={plant._id} className="flex items-center gap-4">
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{plant.name}</h3>
                      <p className="text-sm">{plant.species}</p>
                      <p className="text-sm text-muted">
                        Planted on{' '}
                        {new Date(plant.datePlanted).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        )}

        {/* Random Plant Highlight */}
        {plants.length > 0 && (
          <Card className="p-4 flex flex-col gap-4 col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="text-xl font-bold">Random Plant Highlight</h2>
            <div className="flex items-start gap-4">
              <img
                src={plants[Math.floor(Math.random() * plants.length)].imageUrl}
                alt="Random Plant"
                className="w-24 h-24 rounded object-cover"
              />
              <PlantContent
                plant={plants[Math.floor(Math.random() * plants.length)]}
              />
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
