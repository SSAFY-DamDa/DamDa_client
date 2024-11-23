import axios from "axios";

const {
  VITE_FAQ_URL,
  VITE_MEMBER_URL,
  VITE_TRIP_URL,
  VITE_JOURNEY_URL,
  VITE_PUBLIC_DATA_URL,
} = import.meta.env;

function createAxiosInstance(url, auth) {
  let instance;
  if (auth) {
    instance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: sessionStorage.getItem("accessToken"),
      },
    });
  } else {
    instance = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
  }

  return instance;
}

/**
 *
 * @param { String } url REST API 기본 URL
 * @param { Boolean } auth 헤더에 인증이 필요한 경우
 * @returns
 */
function Axios(url, auth) {
  switch (url) {
    case "member":
      url = VITE_MEMBER_URL;
      break;
    case "trip":
      url = VITE_TRIP_URL;
      break;
    case "faq":
      url = VITE_FAQ_URL;
      break;
    case "journey":
      url = VITE_JOURNEY_URL;
      break;
    case "public_data":
      url = VITE_PUBLIC_DATA_URL;
      break;
  }
  return createAxiosInstance(url, auth);
}

export { Axios };
