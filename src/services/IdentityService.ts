import { AxiosError } from "axios";
import { IJWTResponse } from "../dto/IJWTResponse";
import { IRegisterData } from "../dto/IRegisterData";
import { ILoginData } from "../dto/ILoginData";
import { BaseService } from "./BaseService";
import { IAxiosResponse } from "../dto/IAxiosResponse";

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
