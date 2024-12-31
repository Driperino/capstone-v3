import React from 'react';
import { Card } from '@/components/ui/card';

type CareAction = {
  day: string;
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

  return (
    <div className="h-auto overflow-y-auto scrollbar-hide">
      <h2 className="text-xl font-bold mb-4">Care Timeline for {plant.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plant.careSchedule.map((action, index) => (
          <Card
            key={index}
            className="p-4 text-center flex flex-col items-center justify-center"
          >
            <h3 className="font-bold">{action.day}</h3>
            <p>{action.action}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareTimeline;
