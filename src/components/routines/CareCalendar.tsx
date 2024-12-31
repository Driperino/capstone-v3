import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';

type CareAction = {
  day: string;
  action: string;
};

type Plant = {
  _id: string;
  name: string;
  species: string;
  imageUrl: string;
  datePlanted: string; // Date in ISO format
  careSchedule: CareAction[];
};

interface Props {
  plants: Plant[];
  onDateSelect: (actions: { plant: Plant; action: CareAction }[]) => void;
}

const CareCalendar: React.FC<Props> = ({ plants, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Generate a map of actions by date
  const actionsByDate: Record<string, { plant: Plant; action: CareAction }[]> =
    {};

  plants.forEach((plant) => {
    if (!plant.datePlanted) {
      console.warn(`Plant "${plant.name}" is missing a planting date.`);
      return;
    }

    const plantedDate = new Date(plant.datePlanted);
    plant.careSchedule.forEach((schedule) => {
      const actionDate = new Date(plantedDate);
      const dayOffset = parseInt(schedule.day.replace('Day ', ''), 10);
      actionDate.setDate(actionDate.getDate() + dayOffset);

      if (isNaN(actionDate.getTime())) {
        console.warn(
          `Invalid action date for plant "${plant.name}":`,
          schedule
        );
        return;
      }

      const dateKey = actionDate.toISOString().split('T')[0];
      if (!actionsByDate[dateKey]) {
        actionsByDate[dateKey] = [];
      }
      actionsByDate[dateKey].push({ plant, action: schedule });
    });
  });

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    console.log('Selected date:', dateKey);

    setSelectedDate(date);

    const actionsForDate = actionsByDate[dateKey] || [];
    console.log('Actions for selected date:', actionsForDate);

    onDateSelect(actionsForDate);
  };

  return (
    <div className="w-full">
      <Calendar
        selected={selectedDate}
        onSelect={(date) => {
          console.log('Date clicked:', date);
          handleDateSelect(date);
        }}
        dayContentRenderer={(day) => {
          const dateKey = day.toISOString().split('T')[0];
          const hasActions = actionsByDate[dateKey]?.length > 0;

          console.log('Rendering day:', dateKey, 'Has Actions:', hasActions);

          return (
            <div className="relative">
              {day.getDate()}
              {hasActions && (
                <div className="w-2 h-2 rounded-full bg-primary absolute bottom-1 left-1/2 transform -translate-x-1/2"></div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CareCalendar;
