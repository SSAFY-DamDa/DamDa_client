import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useJourneyStore = defineStore("journey", () => {
  const journeyList = ref([{ id: 12 }]);
  const journeyDetail = ref({});
  const journeyPeriod = ref(0);

  const getJourneyList = computed(() => journeyList.value);
  const getJourneyDetail = computed(() => journeyDetail.value);
  const getJourneyPeriod = computed(() => journeyPeriod.value);

  const setJourneyList = (_journeyList) => {
    journeyList.value = _journeyList;
  };

  const setJourneyDetail = (_journeyDetail) => {
    journeyDetail.value = _journeyDetail;
  };

  const setJourneyPeriod = (_journeyPeriod) => {
    journeyPeriod.value = _journeyPeriod;
  };

  return {
    getJourneyList,
    getJourneyDetail,
    getJourneyPeriod,
    setJourneyList,
    setJourneyDetail,
    setJourneyPeriod,
  };
});
