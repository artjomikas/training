import { ILocation } from "./ILocation";

export interface IResult {
  image: any;
  name: string;
  location: ILocation;
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  currentParticipants: Number;
  maxParticipants: Number;
  price: Number;
  workoutType: string;
  skillLevel: string;
  intensity: string;
}
