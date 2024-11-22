import { ref } from "vue";
import { defineStore } from "pinia";

export const useAiJourneyStore = defineStore("aijourney", () => {
  const answerDetail = ref({
    sido_code: 0,
    gugun_code: 0,
    period: 0,
    people: 1,
    content_type_id: 0,
    companion: "",
    companionType: "",
  });

  const selectDates = ref([]);

  return { answerDetail, selectDates };
});
