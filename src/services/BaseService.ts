import Axios, { AxiosInstance } from "axios";

export abstract class BaseService {
  private static hostBaseURL = import.meta.env.VITE_BASE_API_URL;

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {
    this.axios = Axios.create({
      baseURL: BaseService.hostBaseURL + baseUrl,
      headers: {
        common: {
          "Content-Type": "application/json",
        },
      },
    });

    this.axios.interceptors.request.use(
      (config) => {
        let token = JSON.parse(localStorage.getItem("tokens") as string);
        if (token) {
          config.headers["Authorization"] = "Bearer " + token.jwt; // for Spring Boot back-end
          // config.headers["x-access-token"] = token; // for Node.js Express back-end
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          const authData = JSON.parse(localStorage.getItem("tokens") as string);
          const payload = {
            jwt: authData.jwt,
            refreshToken: authData.refreshToken,
          };

          let apiResponse = await this.axios.post(
            BaseService.hostBaseURL + "v1/identity/account/RefreshToken",
            payload
          );
          
          localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
          error.config.headers[
            "Authorization"
          ] = `bearer ${apiResponse.data.access_token}`;
          return this.axios(error.config);
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
}
