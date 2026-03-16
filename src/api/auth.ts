import { httpClient } from "./httpClient";

export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

const authApi = {
  login: async (username: string, password: string) => {
    return httpClient.post<AuthResponse>("/auth/local", {
      identifier: username,
      password,
    });
  },
  register: async (username: string, email: string, password: string) => {
    return httpClient.post<AuthResponse>("/auth/local/register", {
      username,
      email,
      password,
    });
  },
};

export default authApi;
