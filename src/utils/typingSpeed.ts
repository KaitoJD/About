export function getRandomTypingSpeed(baseSpeed: number, variation: number = 0.5): number {
  const randomFactor = 1 + (Math.random() - 0.5) * 2 * variation;
  return Math.max(baseSpeed * randomFactor, 20);
}
