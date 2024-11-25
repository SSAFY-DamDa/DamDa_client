import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useKakaoStore = defineStore("kakao", () => {
  //state
  const coordinate = ref([37.500613, 127.036431]);
  const markers = ref([]);

  //get
  const getCoordinate = computed(() => coordinate.value);

  //set
  const setCoordinate = (_coor) => {
    coordinate.value = _coor;
  };

  const addMarker = (_marker) => {
    markers.value.push(_marker);
  };

  const resetKakao = () => {
    coordinate.value = [37.500613, 127.036431];
    markers.value = [];
  };

  return {
    getCoordinate,
    markers,
    setCoordinate,
    addMarker,
    resetKakao,
  };
});
