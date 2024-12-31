import React from 'react';
import { Card } from '@/components/ui/card';

type CareAction = {
  day: string;
  action: string;
};

type Plant = {
  _id: string;
  name: string;
  species: string;
  imageUrl: string;
};

interface Props {
  actions: { plant: Plant; action: CareAction }[];
}

const DayActionTimeline: React.FC<Props> = ({ actions }) => {
  if (actions.length === 0) {
    return <p className="text-muted text-center">No actions for this day</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map(({ plant, action }, index) => (
        <Card key={index} className="p-4">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-24 object-cover rounded mb-4"
          />
          <h3 className="font-bold">{plant.name}</h3>
          <p className="text-sm text-muted">{plant.species}</p>
          <hr className="my-2" />
          <p className="font-semibold">{action.action}</p>
        </Card>
      ))}
    </div>
  );
};

export default DayActionTimeline;
