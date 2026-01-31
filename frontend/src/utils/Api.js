import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

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
