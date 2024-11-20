import axios from "axios";

const { VITE_SEARCH_TRIP_URL } = import.meta.env;

function createAxiosInstance(baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  instance.interceptors.request.use(
    function (config) {
      if (config.onStart) config.onStart(); // 콜백 함수로 로딩 시작
      return config;
    },
    function (error) {
      if (error.config?.onFinish) error.config.onFinish(); // 콜백 함수로 로딩 종료
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      if (response.config.onFinish) response.config.onFinish(); // 콜백 함수로 로딩 종료
      return response;
    },
    function (error) {
      if (error.config?.onFinish) error.config.onFinish(); // 콜백 함수로 로딩 종료
      return Promise.reject(error);
    }
  );

  return instance;
}

function publicAxios() {
  return createAxiosInstance(VITE_SEARCH_TRIP_URL);
}

export { publicAxios };
