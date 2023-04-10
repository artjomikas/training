import { IJWTResponse } from "./IJWTResponse";

export interface IAxiosResponse {
  status: Number;
  error: string;
  data: IJWTResponse | string;
}
