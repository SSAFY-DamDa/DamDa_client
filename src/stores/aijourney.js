import { ref } from "vue";
import { defineStore } from "pinia";

export const useAiJourneyStore = defineStore("aijourney", () => {
  const answerDetail = ref({
    sido_code: 0,
    gugun_code: 0,
    period: 0,
    start_date: "",
    end_date: "",
    people: 1,
    content_type_id: 0,
    companion: "",
    companionType: "",
  });

  const finalJourneyInfo = ref({
    title: "",
    startDate: "",
    endDate: "",
    personnel: "",
    color: "",
  });

  const selectPlaceName = ref("");
  const selectDates = ref([]);
  const resultOfNormalAnswer = ref([]);
  const resultOfPublicData = ref([]);
  const recommendedRoute = ref([]); //gpt 결과

  const resetJourneyStore = () => {
    finalJourneyInfo.value = {
      title: "",
      startDate: "",
      endDate: "",
      personnel: 0,
      color: "",
    };
    answerDetail.value = {
      sido_code: 0,
      gugun_code: 0,
      period: 0,
      start_date: "",
      end_date: "",
      people: 1,
      content_type_id: 0,
      companion: "",
      companionType: "",
    };
    selectDates.value = [];
    resultOfNormalAnswer.value = [];
    resultOfPublicData.value = [];
    recommendedRoute.value = [];
  };

  return {
    answerDetail,
    selectDates,
    selectPlaceName,
    resultOfNormalAnswer,
    resultOfPublicData,
    recommendedRoute,
    finalJourneyInfo,
    resetJourneyStore,
  };
});
