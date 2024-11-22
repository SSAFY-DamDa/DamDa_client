import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", () => {
  //state
  const isLoaded = ref(false);
  const tripList = ref([]);
  const siList = ref([]);
  const gugunList = ref([]);
  const positions = ref([]);
  const totalPage = ref(1);
  const selectTag = ref("");

  //get
  const getIsLoaded = computed(() => isLoaded.value);
  const getTripList = computed(() => tripList.value);
  const getSiList = computed(() => siList.value);
  const getGuGunList = computed(() => gugunList.value);
  const getPositions = computed(() => positions.value);
  const getTotalPage = computed(() => totalPage.value);
  const getSelectTag = computed(() => selectTag.value);

  //set
  const setIsLoaded = (flag) => {
    isLoaded.value = flag;
  };

  const setTripList = (_tripList) => {
    tripList.value = _tripList;
  };

  const setSiList = (_siList) => {
    siList.value = _siList;
  };

  const setGuGunList = (_guList) => {
    gugunList.value = _guList;
  };

  const setPositions = (_positions) => {
    positions.value = _positions;
  };

  const setTotalPage = (_totalPage) => {
    totalPage.value = _totalPage;
  };

  const setSelectTag = (tag) => {
    selectTag.value = tag;
  };

  return {
    getIsLoaded,
    getTripList,
    getSiList,
    getGuGunList,
    getPositions,
    getTotalPage,
    getSelectTag,
    setIsLoaded,
    setTripList,
    setSiList,
    setGuGunList,
    setPositions,
    setTotalPage,
    setSelectTag,
  };
});
