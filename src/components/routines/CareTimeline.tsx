import React from 'react';
import { Card } from '@/components/ui/card';

type CareAction = {
  day: string; // Original day offset, e.g., "Day 1"
  action: string;
};

export type Plant = {
  _id: string;
  name: string;
  careSchedule?: { day: string; action: string }[];
};

interface Props {
  plant?: Plant; // Make plant optional
}

// Helper to calculate the date for each day offset
const getDateForDay = (dayOffset: number): Date => {
  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + dayOffset - 1); // Adjust for "Day 1" being today
  return targetDate;
};

// Helper to format the date and day name
const formatDate = (date: Date): string => {
  const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    date
  );
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date);
  return `${dayName}, ${formattedDate}`;
};

const CareTimeline: React.FC<Props> = ({ plant }) => {
  if (!plant) {
    return null; // Render nothing if no plant is selected
  }

  const schedule = plant.careSchedule || []; // Fallback to empty array

  if (schedule.length === 0) {
    return (
      <p className="text-center text-muted">
        No care schedule available for {plant.name}.
      </p>
    );
  }

  return (
    <div className="h-auto overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-bold mb-4">Care Timeline for {plant.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plant.careSchedule.map((action, index) => {
          let dayOffset = 1; // Default day offset in case of invalid format
          if (/Day \d+/.test(action.day)) {
            dayOffset = parseInt(action.day.replace('Day ', ''), 10); // Extract day number
          }
          const dateForAction = getDateForDay(dayOffset);

          return (
            <Card
              key={index}
              className="p-4 text-center flex flex-col items-center justify-center"
            >
              <h3 className="font-bold">{formatDate(dateForAction)}</h3>
              <p>{action.action}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CareTimeline;
