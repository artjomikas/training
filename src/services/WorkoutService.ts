import { BaseEntityService } from "./BaseEntityService";

export class WorkoutService extends BaseEntityService<any> {
  constructor() {
    super("v1/Workouts");
  }

  async getWithDate(data: any): Promise<any | undefined> {
    try {
      const response = await this.axios.post<any>("/date", data);

      console.log(response);

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
