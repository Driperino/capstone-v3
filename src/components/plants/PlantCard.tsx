import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PlantCard({
  plant,
  onEdit,
  onDelete,
  isSelected,
  onSelect,
}: {
  plant: any;
  onEdit: () => void;
  onDelete: (id: string) => void;
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
      {/* Image */}
      <CardHeader>
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          width={400}
          height={200}
          className="object-cover w-full h-40"
        />
      </CardHeader>

      {/* Content */}
      <CardContent className="flex-1">
        <CardTitle className="text-lg font-semibold text-primary">
          {plant.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Species:</span> {plant.species}
        </p>
        <p className="text-sm mt-2">{plant.description}</p>
      </CardContent>

      {/* Buttons */}
      {isSelected && (
        <div className="flex justify-between gap-2 p-4 mt-auto bg-[--background] border-t-[--border]">
          <Button
            className="flex-1 bg-[--primary] text-[--primary-foreground] hover:bg-[--primary-foreground] hover:text-[--primary] px-2 py-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            Edit
          </Button>
          <Button
            className="flex-1 bg-[--destructive] text-[--destructive-foreground] hover:opacity-80 px-2 py-1 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(plant._id); // Trigger delete handler directly
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
}
