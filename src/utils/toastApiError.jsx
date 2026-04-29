import { toast } from "react-toastify";

export function extractApiErrorPayload(data) {
  if (!data || typeof data !== "object") return {};
  const message = typeof data.message === "string" ? data.message : undefined;
  const errors = Array.isArray(data.errors) ? data.errors : undefined;
  return { message, errors };
}

export function toastApiError(message, errors) {
  if (typeof window === "undefined") return;

  toast.error(
    <div>
      <div>{message}</div>
      {Array.isArray(errors) && errors.length > 0 ? (
        <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
          {errors.map((item, index) => {
            const msg = typeof item === "string" ? item : item?.message;
            if (!msg) return null;
            return (
              <li key={`${index}-${msg}`} style={{ fontSize: "0.75em" }}>
                {index + 1}. {msg}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
