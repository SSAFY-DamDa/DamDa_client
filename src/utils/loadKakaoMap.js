// src/utils/loadKakaoMap.js

const VITE_KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
let kakaoMapPromise = null;

export const loadKakaoMap = () => {
  if (kakaoMapPromise) {
    // 이전에 이미 스크립트가 로드 중이거나 완료된 경우 해당 Promise 반환
    return kakaoMapPromise;
  }

  // 새로운 Promise를 생성하여 전역 변수에 저장
  kakaoMapPromise = new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      kakao.maps.load(() => {
        resolve(window.kakao);
      });
      return;
    }

    // 스크립트가 이미 있는지 확인
    const existingScript = document.querySelector(
      `script[src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false"]`
    );

    if (existingScript) {
      existingScript.onload = () => {
        kakao.maps.load(() => {
          resolve(window.kakao);
        });
      };
      return;
    }

    // 스크립트를 처음 추가하는 경우
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_MAP_KEY}&autoload=false`;
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        kakao.maps.load(() => resolve(window.kakao));
      } else {
        reject(new Error("카카오 맵 API가 로드되지 않았습니다."));
      }
    };
    script.onerror = () => {
      console.error("카카오 맵 스크립트 로드 실패");
      reject(new Error("카카오 맵 스크립트 로드 실패"));
    };
    document.head.appendChild(script);
  });

  return kakaoMapPromise;
};
