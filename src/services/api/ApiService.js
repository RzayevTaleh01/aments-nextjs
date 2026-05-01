import axios from "axios";

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

const REQUEST_HEADER_AUTH_KEY = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY;
const REQUEST_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_ADMIN_BASE_URL;
const REQUEST_TIME_OUT = process.env.NEXT_PUBLIC_REQUEST_TIME_OUT;
const REQUEST_TOKEN_TYPE = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE;
const REQUEST_NEXT_ADMIN_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_NEXT_ADMIN_BASE_URL;

const ApiService = axios.create({
  timeout: Number(REQUEST_TIME_OUT ?? 30000),
  baseURL: REQUEST_ADMIN_BASE_URL,
});

let originalConfig = { url: "" };

ApiService.interceptors.request.use(async (config) => {
    let _config = { ...config };
    _config.headers = _config.headers ?? {};

    let session;
    if (typeof window !== "undefined") {
      const { getSession } = await import("next-auth/react");
      session = await getSession();
    }

    if (REQUEST_HEADER_AUTH_KEY && !getHeaderValue(_config.headers, REQUEST_HEADER_AUTH_KEY)) {
      if (session?.token?.accessToken) {
        setHeaderIfMissing(_config.headers, REQUEST_HEADER_AUTH_KEY, `${REQUEST_TOKEN_TYPE} ${session?.token?.accessToken}`);
      }
    }

    if (session?.adminToken?.accessToken) {
      setHeaderIfMissing(_config.headers, "Authorization-Admin", `${REQUEST_TOKEN_TYPE} ${session?.adminToken?.accessToken}`);
    }

    return _config;
  },
  (error) => Promise.reject(error)
);

ApiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    originalConfig = error?.config || {};

    if (error?.response) {
      if ([401].includes(error.response.status) && !originalConfig._retry) {
        originalConfig._retry = true;

        if (typeof window !== "undefined") {
          const { signOut } = await import("next-auth/react");
          await signOut({
            redirect: false,
            callbackUrl: `${REQUEST_NEXT_ADMIN_BASE_URL ?? ""}/`,
          });
          redirectToHome();
        }

        return Promise.reject(error);
      } else {
        if (typeof window !== "undefined") {
          const { extractApiErrorPayload, toastApiError } = await import("@/utils/toastApiError");
          const { message, errors } = extractApiErrorPayload(error.response.data);
          toastApiError(message || error.response.statusText || "Request failed", errors);
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default ApiService;
export { ApiService };
