export type Dimension = "1d" | "2d" | "3d";

export type Scalar = number;
export type Vector2 = { x: number; y: number };
export type Vector3 = { x: number; y: number; z: number };

export type PhysicalQuantity<D extends Dimension> = D extends "1d"
  ? Scalar
  : D extends "2d"
    ? Vector2
    : Vector3;

export type KinematicBody<D extends Dimension> = {
  position: PhysicalQuantity<D>;
  velocity: PhysicalQuantity<D>;
  acceleration: PhysicalQuantity<D>;
};
