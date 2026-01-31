import axios from "axios";

// In production (Render): use backend URL. In dev: use proxy "/api" or VITE_API_URL.
const getBaseURL = () => {
  const env = import.meta.env.VITE_API_URL;
  if (env && typeof env === "string" && env.trim() !== "") {
    return env.trim().replace(/\/$/, "") + "/api";
  }
  if (import.meta.env.DEV) {
    return "/api"; // Vite proxy in dev
  }
  // Production fallback when VITE_API_URL not set (e.g. Render frontend)
  return "https://mock-interviewer-backend-u6tv.onrender.com/api";
};

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
