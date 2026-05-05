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

const REQUEST_HEADER_AUTH_KEY = process.env.NEXT_PUBLIC_REQUEST_HEADER_AUTH_KEY ?? "Authorization";
const REQUEST_BASE_URL = process.env.NEXT_PUBLIC_REQUEST_BASE_URL;
const REQUEST_TIME_OUT = process.env.NEXT_PUBLIC_REQUEST_TIME_OUT;
const REQUEST_TOKEN_TYPE = process.env.NEXT_PUBLIC_REQUEST_TOKEN_TYPE ?? "Bearer";

const ApiService = axios.create({
  timeout: Number(REQUEST_TIME_OUT ?? 30000),
  baseURL: REQUEST_BASE_URL,
});

let originalConfig = { url: "" };

ApiService.interceptors.request.use(
  async (config) => {
    const _config = { ...config };
    _config.headers = _config.headers ?? {};

    const hasAuthHeader = Boolean(getHeaderValue(_config.headers, REQUEST_HEADER_AUTH_KEY));
    if (hasAuthHeader) return _config;

    let accessToken;

    try {
      if (typeof window !== "undefined") {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        accessToken = session?.token?.accessToken;
      } else {
        const { cookies } = await import("next/headers");
        const { getToken } = await import("next-auth/jwt");

        const cookieStore = await cookies();
        const cookieHeader = (cookieStore.getAll?.() ?? [])
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");

        const token = await getToken({
          req: { headers: { cookie: cookieHeader } },
          secret: process.env.NEXTAUTH_SECRET ?? process.env.NEXT_PUBLIC_REQUEST_NEXTAUTH_SECRET,
        });

        accessToken = token?.token?.accessToken;
      }
    } catch {
      return _config;
    }

    if (accessToken) {
      setHeaderIfMissing(_config.headers, REQUEST_HEADER_AUTH_KEY, `${REQUEST_TOKEN_TYPE} ${accessToken}`);
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
          });
          redirectToHome();
        }

        return Promise.reject(error);
      }

      if (typeof window !== "undefined") {
        const { extractApiErrorPayload, toastApiError } = await import("@/utils/toastApiError");
        const { message, errors } = extractApiErrorPayload(error.response.data);
        toastApiError(message || error.response.statusText || "Request failed", errors);
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default ApiService;
export { ApiService };
