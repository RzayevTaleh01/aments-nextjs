import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { extractApiErrorPayload, toastApiError } from "@/utils/toastApiError";

function getHeaderValue(headers, key) {
  if (!headers) return undefined;
  if (typeof headers.get === "function") return headers.get(key) ?? headers.get(key.toLowerCase());
  return headers[key] ?? headers[key?.toLowerCase()];
}

function setHeaderValue(headers, key, value) {
  if (!headers) return;
  if (typeof headers.set === "function") headers.set(key, value);
  else headers[key] = value;
}

function setHeaderIfMissing(headers, key, value) {
  const existing = getHeaderValue(headers, key);
  if (typeof existing !== "undefined") return;
  setHeaderValue(headers, key, value);
}

function redirectToHome() {
  if (typeof window !== "undefined") window.location.assign("/");
}

export const AdminApiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL,
  timeout: Number(process.env.NEXT_PUBLIC_REQUEST_TIME_OUT ?? 30000),
});

AdminApiService.interceptors.request.use(async (config) => {
  const session = await getSession();

  const accessToken = session?.token?.accessToken;
  const adminAccessToken = session?.adminToken?.accessToken;

  const authHeaderKey = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY ?? "Authorization";
  const tokenType = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE ?? "Bearer";

  config.headers = config.headers ?? {};

  if (accessToken) setHeaderIfMissing(config.headers, authHeaderKey, `${tokenType} ${accessToken}`);
  if (adminAccessToken) setHeaderIfMissing(config.headers, "Authorization-Admin", `${tokenType} ${adminAccessToken}`);

  return config;
});

AdminApiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      if (typeof window !== "undefined") {
        const callbackUrl = `${process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL ?? ""}/`;
        await signOut({ redirect: false, callbackUrl });
        redirectToHome();
      }
      return Promise.reject(error);
    }

    if (error?.response) {
      const { message, errors } = extractApiErrorPayload(error.response.data);
      toastApiError(message || error.response.statusText || "Request failed", errors);
    }

    return Promise.reject(error);
  }
);

