import { IIntensity } from "./IIntensity";
import { ILocation } from "./ILocation";
import { ISkillLevel } from "./ISkillLevel";
import { IWorkoutType } from "./IWorkoutType";
import { IWorkoutUsers } from "./IWorkoutUser";
import { IComment } from "./IComment";
import { IUser } from "./IUser";

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
  workoutType: IWorkoutType;
  skillLevel: ISkillLevel;
  intensity: IIntensity;
  appUser: IUser;
  workoutUsers: IWorkoutUsers[];
  comments: IComment[];
}
