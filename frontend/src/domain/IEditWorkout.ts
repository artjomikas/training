import { ILocation } from "./ILocation";

export interface IEditWorkout {
  name: string;
  id: string;
  image: string;
  description: string;
  startDate: Date;
  endDate: Date;
  workoutTypeId: string;
  location: any;
  intensityId: string;
  skillLevelId: string;
  maxParticipants: Number;
  price: Number;
}
