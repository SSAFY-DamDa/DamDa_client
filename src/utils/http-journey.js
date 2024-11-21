import axios from "axios";

const { VITE_JOURNEY_URL } = import.meta.env;

function createAxiosInstance(baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      withCredentials: true,
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

function JourneyAxios() {
  return createAxiosInstance(VITE_JOURNEY_URL);
}

export { JourneyAxios };
