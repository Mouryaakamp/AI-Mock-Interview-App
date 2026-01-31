import axios from "axios";

const BACKEND_URL = "https://mock-interviewer-backend-u6tv.onrender.com/api";

// Use backend URL in production (Render). In dev (localhost) use proxy "/api".
function getBaseURL() {
  const env = import.meta.env.VITE_API_URL;
  if (env && typeof env === "string" && env.trim() !== "") {
    return env.trim().replace(/\/$/, "") + "/api";
  }
  if (typeof window !== "undefined") {
    const host = window.location.hostname || "";
    if (host === "localhost" || host === "127.0.0.1") {
      return "/api";
    }
  }
  return BACKEND_URL;
}

const baseURL = getBaseURL();
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach access token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function API(config) {
  try {
    return await api(config);
  } catch (err) {
    if (err.response?.status === 401) {
      try {
        const { data } = await api.post("/auth/refresh");

        if (data?.accessToken) {
          localStorage.setItem("token", data.accessToken);

          return await api({
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${data.accessToken}`,
            },
          });
        }
      } catch (refreshErr) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(err);
  }
}

export { API, api };
