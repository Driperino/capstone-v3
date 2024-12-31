import React from 'react';
import { Card } from '@/components/ui/card';

type CareAction = {
  day: string; // Original day offset, e.g., "Day 1"
  action: string;
};

type Plant = {
  _id: string;
  name: string;
  careSchedule: CareAction[];
};

interface Props {
  plant?: Plant; // Make plant optional
}

const CareTimeline: React.FC<Props> = ({ plant }) => {
  if (!plant) {
    return null; // Render nothing if no plant is selected
  }

  // Helper to calculate the date for each day offset
  const getDateForDay = (dayOffset: number) => {
    const today = new Date();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + dayOffset - 1); // Adjust for "Day 1" being today
    return targetDate;
  };

  // Format date and day name
  const formatDate = (date: Date) => {
    const dayName = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
    }).format(date);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
    }).format(date);
    return `${dayName}, ${formattedDate}`;
  };

  return (
    <div className="h-auto overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-bold mb-4">Care Timeline for {plant.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plant.careSchedule.map((action, index) => {
          const dayOffset = parseInt(action.day.replace('Day ', ''), 10); // Extract day number
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
