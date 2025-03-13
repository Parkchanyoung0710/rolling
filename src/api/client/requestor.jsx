import axios from "axios";

const requestor = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT.trim(),
  timeout: 60000, // 시간 지나면 자동으로 응답 없다고 에러 출력?
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default requestor;
