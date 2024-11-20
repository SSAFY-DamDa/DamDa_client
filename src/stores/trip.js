import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTripStore = defineStore("trip", () => {
  //state
  const isLoaded = ref(false);
  const tripList = ref([]);
  const siList = ref([]);
  const positions = ref([]);
  const totalPage = ref(1);
  const selectTag = ref("");

  //get
  const getIsLoaded = computed(() => isLoaded.value);
  const getTripList = computed(() => tripList.value);
  const getSiList = computed(() => siList.value);
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
    getPositions,
    getTotalPage,
    getSelectTag,
    setIsLoaded,
    setTripList,
    setSiList,
    setPositions,
    setTotalPage,
    setSelectTag,
  };
});
