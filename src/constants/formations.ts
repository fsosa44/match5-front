export interface FieldPosition {
  x: number;
  y: number;
  role: string;
}

// Positions defined for the bottom team (y: 52–95).
// Top team is mirrored via getMirroredFormation().
const formations: Record<number, FieldPosition[]> = {
  5: [
    { x: 50, y: 92, role: "POR" },
    { x: 28, y: 76, role: "DEF" },
    { x: 72, y: 76, role: "DEF" },
    { x: 28, y: 62, role: "DEL" },
    { x: 72, y: 62, role: "DEL" },
  ],
  6: [
    { x: 50, y: 92, role: "POR" },
    { x: 28, y: 78, role: "DEF" },
    { x: 72, y: 78, role: "DEF" },
    { x: 28, y: 66, role: "MED" },
    { x: 72, y: 66, role: "MED" },
    { x: 50, y: 56, role: "DEL" },
  ],
  7: [
    { x: 50, y: 92, role: "POR" },
    { x: 22, y: 79, role: "DEF" },
    { x: 50, y: 79, role: "DEF" },
    { x: 78, y: 79, role: "DEF" },
    { x: 30, y: 66, role: "MED" },
    { x: 70, y: 66, role: "MED" },
    { x: 50, y: 56, role: "DEL" },
  ],
  8: [
    { x: 50, y: 92, role: "POR" },
    { x: 22, y: 80, role: "DEF" },
    { x: 50, y: 80, role: "DEF" },
    { x: 78, y: 80, role: "DEF" },
    { x: 22, y: 67, role: "MED" },
    { x: 50, y: 67, role: "MED" },
    { x: 78, y: 67, role: "MED" },
    { x: 50, y: 56, role: "DEL" },
  ],
  9: [
    { x: 50, y: 93, role: "POR" },
    { x: 18, y: 80, role: "DEF" },
    { x: 42, y: 80, role: "DEF" },
    { x: 58, y: 80, role: "DEF" },
    { x: 82, y: 80, role: "DEF" },
    { x: 25, y: 67, role: "MED" },
    { x: 50, y: 67, role: "MED" },
    { x: 75, y: 67, role: "MED" },
    { x: 50, y: 56, role: "DEL" },
  ],
  11: [
    { x: 50, y: 93, role: "POR" },
    { x: 15, y: 81, role: "DEF" },
    { x: 38, y: 81, role: "DEF" },
    { x: 62, y: 81, role: "DEF" },
    { x: 85, y: 81, role: "DEF" },
    { x: 25, y: 68, role: "MED" },
    { x: 50, y: 66, role: "MED" },
    { x: 75, y: 68, role: "MED" },
    { x: 22, y: 56, role: "DEL" },
    { x: 50, y: 54, role: "DEL" },
    { x: 78, y: 56, role: "DEL" },
  ],
};

export function getFormation(playersPerTeam: number): FieldPosition[] {
  if (formations[playersPerTeam]) return formations[playersPerTeam];

  const sizes = Object.keys(formations)
    .map(Number)
    .sort((a, b) => a - b);

  const closest = sizes.reduce((prev, curr) =>
    Math.abs(curr - playersPerTeam) < Math.abs(prev - playersPerTeam)
      ? curr
      : prev,
  );

  return formations[closest];
}

export function getMirroredFormation(
  playersPerTeam: number,
): FieldPosition[] {
  return getFormation(playersPerTeam).map((pos) => ({
    x: pos.x,
    y: 100 - pos.y,
    role: pos.role,
  }));
}
