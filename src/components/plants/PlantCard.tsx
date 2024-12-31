import { Card } from '@/components/ui/card';
import PlantImage from './PlantImage';
import PlantContent from './PlantContent';
import PlantActions from './PlantActions';

export default function PlantCard({
  plant,
  onEdit,
  onDelete,
  // onLogCare,
  isSelected,
  onSelect,
}: {
  plant: any;
  onEdit: () => void;
  onDelete: (id: string) => void;
  // onLogCare: () => void;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`plant-card flex flex-col justify-between overflow-hidden shadow-lg relative cursor-pointer h-full ${
        isSelected ? 'border-2 border-[--primary]' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <PlantImage imageUrl={plant.imageUrl} name={plant.name} />
      <PlantContent plant={plant} />
      {isSelected && (
        <PlantActions
          onEdit={onEdit}
          onDelete={() => onDelete(plant._id)}
          // onLogCare={onLogCare}
        />
      )}
    </Card>
  );
}
