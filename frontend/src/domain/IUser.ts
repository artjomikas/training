import { IResult } from "./IResult";
import { IReview } from "./IReview";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  registeredAt: string;
  bio: string;
  image: string;
  commentsNumber: Number,
  workoutParticipatedNumber: Number,
  postedWorkouts: Number,
  workouts: IResult[]
  reviews: IReview[]
}
