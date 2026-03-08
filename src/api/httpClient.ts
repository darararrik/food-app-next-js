import { buildUrl, customFetch } from "./base";

export const HTTP_METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export const httpClient = {
  post: async <T = any>(
    endpoint: string,
    data: any,
    fetchOptions: RequestInit = {},
  ): Promise<T> => {
    return customFetch(endpoint, {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(data),
      ...fetchOptions,
    });
  },

  get: async <T = any>(
    endpoint: string,
    options?: { params?: object; fetchOptions?: RequestInit },
  ): Promise<T> => {
    const url = buildUrl(endpoint, options?.params);
    return customFetch(url, {
      method: HTTP_METHODS.GET,
      ...(options?.fetchOptions ?? {}),
    });
  },
};
