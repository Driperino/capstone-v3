'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface CareAction {
  day: string;
  action: string;
}

interface Plant {
  _id: string;
  name: string;
  species: string;
}

interface TodayAction {
  action: string;
  plant: Plant;
}

const TodaysCareActions: React.FC = () => {
  const [todaysActions, setTodaysActions] = useState<TodayAction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodaysActions = async () => {
      try {
        const response = await fetch('/api/todays-actions');
        if (!response.ok) {
          throw new Error("Failed to fetch today's actions");
        }
        const data: TodayAction[] = await response.json();
        setTodaysActions(data);
      } catch (error) {
        console.error("Error fetching today's actions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysActions();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Today's Care Actions</h2>
      <ul>
        {todaysActions.length > 0 ? (
          todaysActions.map((action, i) => (
            <li key={i}>
              <strong>{action.action}</strong> for{' '}
              <strong>{action.plant.name}</strong> ({action.plant.species})
            </li>
          ))
        ) : (
          <p>No tasks for today!</p>
        )}
      </ul>
    </Card>
  );
};

export default TodaysCareActions;
