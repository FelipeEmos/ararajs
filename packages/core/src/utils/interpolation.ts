export function lerp(t: number, start: number, end: number): number {
  if (t < 0) {
    return start
  }
  if (t > 1) {
    return end
  }
  return start + (end - start) * t
}
