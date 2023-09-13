import { IJWTResponse } from "./IJWTResponse";
import { IWorkoutUsers } from './../domain/IWorkoutUser';

export interface IAxiosResponse {
  status: Number;
  error: string;
  data: IJWTResponse | any;
}
