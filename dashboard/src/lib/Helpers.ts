export const getTemperatureColour = (value: number): string => {
  const min = -8
  const max = 30

  const diff = Math.abs(min) + Math.abs(max)
  const t = value < min ? min : value > max ? max : value
  const hue = (250 * (max - t)) / diff

  return `hsl(${hue}, 70%, 50%)`
}
