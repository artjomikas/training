import { BaseEntityService } from "./BaseEntityService";
import { AxiosError } from "axios";
import { IAxiosResponse } from "../dto/IAxiosResponse";



export class WorkoutUsersService extends BaseEntityService<any> {
  constructor() {
    super("v1/WorkoutUsers");
  }

  async getSchedule(): Promise<any | undefined> {
    try {
      const response = await this.axios.get<any>("");

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }
  async getHistory(): Promise<any | undefined> {
    try {
      const response = await this.axios.get<any>("history");

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

  async addToSchedule(data: any): Promise<IAxiosResponse | undefined> {
    try {
      const response = await this.axios.post<any>("join", data);

      if (response.status === 200) {
        const res: IAxiosResponse = {
          status: 200,
          error: "",
          data: response.data,
        };

        return res;
      }
    } catch (error) {
      const err: any = (error as AxiosError).response;

      console.log(err);
      const res: IAxiosResponse = {
        status: err.status,
        error: err.data,
        data: "",
      };

      return res;
    }
  }

  async removeFromSchedule(id: string): Promise<any | undefined> {
    try {
      const response = await this.axios.delete<any>("/" + id, );

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

}
