type Vector2 = {
  x: number;
  y: number;
};

export default Vector2;

export const add = (a: Vector2, b: Vector2): Vector2 => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const sub = (a: Vector2, b: Vector2): Vector2 => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const mul = (a: Vector2, b: number): Vector2 => ({
  x: a.x * b,
  y: a.y * b,
});

export const div = (a: Vector2, b: number): Vector2 => ({
  x: a.x / b,
  y: a.y / b,
});
