export default function PlantContent({ plant }: { plant: any }) {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-lg font-semibold text-primary">{plant.name}</h2>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold">Species:</span> {plant.species}
      </p>
      <p className="text-sm mt-2">{plant.description}</p>

      {/* Growth Stages */}
      <div className="mt-2">
        <p className="text-sm font-semibold">Growth Stages:</p>
        {plant.growthStages?.length > 0 ? (
          plant.growthStages.map((stage: any, index: number) => (
            <p key={index} className="text-xs text-muted-foreground">
              {stage.stageName} -{' '}
              {new Date(stage.startDate).toLocaleDateString()}
            </p>
          ))
        ) : (
          <p className="text-xs text-muted-foreground">
            No growth stages recorded.
          </p>
        )}
      </div>

      {/* Care Schedule */}
      <div className="mt-2">
        <p className="text-sm font-semibold">Care Schedule:</p>
        <p className="text-xs text-muted-foreground">
          Water every {plant.careSchedule?.wateringFrequency || 'N/A'} days
        </p>
        {plant.careSchedule?.fertilizingFrequency && (
          <p className="text-xs text-muted-foreground">
            Fertilize every {plant.careSchedule.fertilizingFrequency} days
          </p>
        )}
      </div>
    </div>
  );
}
