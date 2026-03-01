interface InteractionOverlayProps {
  isAnimationsComplete: boolean;
}

export default function InteractionOverlay({ isAnimationsComplete }: InteractionOverlayProps) {
  if (isAnimationsComplete) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-transparent cursor-default pointer-events-auto"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      onScroll={(e) => e.preventDefault()}
    />
  );
}
