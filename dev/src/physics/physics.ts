import { vec2, vec3 } from "gl-matrix";

export type Quantity = number | vec2 | vec3;

export type KinematicBody<Q extends Quantity = number> = {
  position: Q;
  velocity: Q;
  acceleration: Q;
};
