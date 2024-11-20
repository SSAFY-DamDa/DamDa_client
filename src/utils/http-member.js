import axios from "axios";

const { VITE_MEMBER_URL } = import.meta.env;

function createAxiosInstance(baseUrl, auth) {
  let instance;
  if (auth) {
    instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
  } else {
    instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  }

  // instance.interceptors.request.use(
  //   function (config) {
  //     if (config.onStart) config.onStart(); // 콜백 함수로 로딩 시작
  //     return config;
  //   },
  //   function (error) {
  //     if (error.config?.onFinish) error.config.onFinish(); // 콜백 함수로 로딩 종료
  //     return Promise.reject(error);
  //   }
  // );

  // instance.interceptors.response.use(
  //   function (response) {
  //     if (response.config.onFinish) response.config.onFinish(); // 콜백 함수로 로딩 종료
  //     return response;
  //   },
  //   function (error) {
  //     if (error.config?.onFinish) error.config.onFinish(); // 콜백 함수로 로딩 종료
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
}

function memberAxios(auth) {
  return createAxiosInstance(VITE_MEMBER_URL, auth);
}

export { memberAxios };
