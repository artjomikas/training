import { IIntensity } from "./IIntensity";
import { ILocation } from "./ILocation";
import { ISkillLevel } from "./ISkillLevel";
import { IWorkoutType } from "./IWorkoutType";
import { IWorkoutUsers } from "./IWorkoutUser";
import { IComment } from "./IComment";

export interface IResult {
  image: any;
  name: string;
  locationName: string;
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  currentParticipants: Number;
  maxParticipants: Number;
  price: Number;
  workoutTypeName: string;
  skillLevelName: string;
  intensityName: string;
  workoutUsers: IWorkoutUsers[];
  comments: IComment[];
}
