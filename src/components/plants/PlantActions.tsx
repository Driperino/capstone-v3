import { Button } from '@/components/ui/button';

export default function PlantActions({
  onEdit,
  onDelete,
  onLogCare,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onLogCare: () => void;
}) {
  return (
    <div className="flex justify-between gap-2 p-4 mt-auto bg-[--background] border-t-[--border]">
      <Button
        className="flex-1 bg-[--accent] text-[--accent-foreground] hover:text-secondary px-2 py-1 text-xs"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Edit
      </Button>
      <Button
        className="flex-1 bg-[--accent] text-[--accent-foreground] hover:text-secondary px-2 py-1 text-xs"
        onClick={(e) => {
          e.stopPropagation();
          onLogCare();
        }}
      >
        Log Care
      </Button>
      <Button
        className="flex-1 bg-[--accent] text-[--accent-foreground] hover:text-secondary px-2 py-1 text-xs"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
