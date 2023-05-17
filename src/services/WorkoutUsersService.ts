import { BaseEntityService } from "./BaseEntityService";

export class WorkoutUsersService extends BaseEntityService<any> {
  constructor() {
    super("v1/WorkoutUsers");
  }

  async getSchedule(data: any): Promise<any | undefined> {
    try {
      const response = await this.axios.post<any>("schedule", data);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }
  async getHistory(data: any): Promise<any | undefined> {
    try {
      const response = await this.axios.post<any>("history", data);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

  async addToSchedule(data: any): Promise<any | undefined> {
    try {
      const response = await this.axios.post<any>("join", data);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
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
