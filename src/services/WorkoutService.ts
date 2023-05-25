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


  async getById(id: string): Promise<any | undefined> {
    try {
      const response = await this.axios.get<any>(`/${id}`);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }


  async deleteById(id: string): Promise<any | undefined> {
    try {
      const response = await this.axios.delete<any>(`/${id}`);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

  async updateWorkout(data: any): Promise<any | undefined> {
    try {
      const response = await this.axios.put<any>(`/${data.id}`, data);

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
