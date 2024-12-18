export function FeedbackMessage({
  message,
}: {
  message: { type: string; text: string } | null;
}) {
  if (!message) return null;

  return (
    <div
      className={`p-3 mb-4 text-sm rounded ${
        message.type === 'error'
          ? 'bg-red-100 text-red-600'
          : 'bg-green-100 text-green-600'
      }`}
    >
      {message.text}
    </div>
  );
}
