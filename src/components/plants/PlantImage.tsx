import Image from 'next/image';

export default function PlantImage({
  imageUrl,
  name,
}: {
  imageUrl: string;
  name: string;
}) {
  return (
    <div className="h-40">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={200}
        className="object-cover w-full h-40"
      />
    </div>
  );
}
