import qs from "qs";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://front-school-strapi.ktsdev.ru/api";

export const customFetch = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  const url = `${BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("jwt");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMessage = `Ошибка запроса: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.error?.message || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const buildUrl = (path: string, params?: object) => {
  if (!params) return path;

  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  if (!queryString) return path;

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${queryString}`;
};
