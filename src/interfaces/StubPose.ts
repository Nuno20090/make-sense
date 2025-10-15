export interface Keypoint {
  part: string;
  position: { x: number; y: number };
  score?: number;
}

export interface Pose {
  keypoints: Keypoint[];
}
