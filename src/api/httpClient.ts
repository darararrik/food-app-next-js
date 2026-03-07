import { buildUrl, customFetch } from "./base";

export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const httpClient = {
  post: async <T = any>(endpoint: string, data: any): Promise<T> => {
    return customFetch(endpoint, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(data),
    });
  },

  get: async <T = any>(
    endpoint: string,
    options?: { params?: object },
  ): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    return customFetch(url, {
      method: HTTP_METHODS.GET,
    });
  },
};
