import { AxiosError } from "axios";
import { IJWTResponse } from "../dto/IJWTResponse";
import { IRegisterData } from "../dto/IRegisterData";
import { ILoginData } from "../dto/ILoginData";
import { BaseService } from "./BaseService";
import { IAxiosResponse } from "../dto/IAxiosResponse";
import { IUser } from "../domain/IUser";

export class IdentityService extends BaseService {
  constructor() {
    super("v1/identity/account/");
  }

  async register(data: IRegisterData): Promise<IAxiosResponse | undefined> {
    try {
      const response = await this.axios.post<IJWTResponse>("register", data);

      console.log("register response", response);

      if (response.status === 200) {
        const res: IAxiosResponse = {
          status: 200,
          error: "",
          data: response.data,
        };

        return res;
      }
      return undefined;
    } catch (error) {
      const err: any = (error as AxiosError).response;

      const res: IAxiosResponse = {
        status: err.data.status,
        error: err.data.error,
        data: "",
      };

      return res;
    }
  }

  async login(data: ILoginData): Promise<IAxiosResponse | undefined> {
    try {
      const response = await this.axios.post<IJWTResponse>("login", data);

      console.log("login response", response);

      if (response.status === 200) {
        const res: IAxiosResponse = {
          status: 200,
          error: "",
          data: response.data,
        };

        return res;
      }
      return undefined;
    } catch (error) {
      const err: any = (error as AxiosError).response;

      const res: IAxiosResponse = {
        status: err.data.status,
        error: err.data.error,
        data: "",
      };

      return res;
    }
  }

  async updateUser(user: IUser): Promise<any | undefined> {
    try {
      const response = await this.axios.put<any>("update", user);
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
      const response = await this.axios.get<any>(`getUserById/${id}`);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

  async getProfileById(id: string): Promise<any | undefined> {
    try {
      const response = await this.axios.get<any>(`getProfileById/${id}`);

      if (response.status === 200) {
        return response.data;
      }

      return undefined;
    } catch (e) {
      console.log("error: ", (e as Error).message);
      return undefined;
    }
  }

  async logout(data: string): Promise<IAxiosResponse | undefined> {
    try {
      const response = await this.axios.post<IJWTResponse>("logout", data);

      console.log("logout response", response);

      if (response.status === 200) {
        const res: IAxiosResponse = {
          status: 200,
          error: "",
          data: response.data,
        };

        return res;
      }
      return undefined;
    } catch (error) {
      const err: any = (error as AxiosError).response;

      const res: IAxiosResponse = {
        status: err.data.status,
        error: err.data.error,
        data: "",
      };

      return res;
    }
  }
}
