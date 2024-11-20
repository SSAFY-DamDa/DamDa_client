import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useKakaoStore = defineStore("kakao", () => {
  //state
  const kakao = ref(null);
  const coordinate = ref([37.500613, 127.036431]);

  //get
  const getKakao = computed(() => kakao.value);
  const getCoordinate = computed(() => coordinate.value);

  //set
  const setKakao = (_kakao) => {
    console.log("카카오 실행!");
    kakao.value = _kakao;
  };

  const setCoordinate = (_coor) => {
    coordinate.value = _coor;
  };

  return {
    getKakao,
    getCoordinate,
    setKakao,
    setCoordinate,
  };
});
