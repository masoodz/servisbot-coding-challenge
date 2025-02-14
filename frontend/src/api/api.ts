import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const fetchBots = (page = 1, limit = 10) =>
  axios.get(`${API_BASE_URL}/bots?page=${page}&limit=${limit}`);

export const fetchWorkersForBot = (botId: string, page = 1, limit = 10) =>
  axios.get(
    `${API_BASE_URL}/bots/${botId}/workers?page=${page}&limit=${limit}`
  );

export const fetchLogsForWorker = (workerId: string, page = 1, limit = 10) =>
  axios.get(
    `${API_BASE_URL}/workers/${workerId}/logs?page=${page}&limit=${limit}`
  );

export const fetchLogsForBot = (botId: string, page = 1, limit = 10) =>
  axios.get(`${API_BASE_URL}/bots/${botId}/logs?page=${page}&limit=${limit}`);
