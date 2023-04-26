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

}
