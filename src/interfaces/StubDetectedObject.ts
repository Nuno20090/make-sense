export interface DetectedObject {
  class: string;
  score?: number;
  bbox: [number, number, number, number];
}
