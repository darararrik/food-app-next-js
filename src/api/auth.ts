import { httpClient } from "./httpClient";

const authApi = {
  login: async (username: string, password: string) => {
    return httpClient.post("/auth/local", { identifier: username, password });
  },
  register: async (username: string, email: string, password: string) => {
    return httpClient.post("/auth/local/register", {
      username,
      email,
      password,
    });
  },
};

export default authApi;
