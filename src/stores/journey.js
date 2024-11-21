import { ref } from "vue";
import { defineStore } from "pinia";

export const useJourneyStore = defineStore("journey", () => {
  const journeyList = ref([{ id: 12 }]);
  const journeyDetail = ref({
    title: "",
    user_id: 0,
    sido_code: 0,
    gugun_code: 0,
    content_type_id: 0,
    start_date: "",
    end_date: "",
    personnel: 0,
    color: "",
  });
  const journeyPeriod = ref(0);

  const setJourneyList = (_journeyList) => {
    journeyList.value = _journeyList;
  };

  const setJourneyDetail = (
    _title,
    _user_id,
    _sido_code,
    _gugun_code,
    _content_type_id,
    _start_date,
    _end_date,
    _personnel,
    _color
  ) => {
    journeyDetail.value.title = _title;
    journeyDetail.value.user_id = _user_id;
    journeyDetail.value.sido_code = _sido_code;
    journeyDetail.value.gugun_code = _gugun_code;
    journeyDetail.value.content_type_id = _content_type_id;
    journeyDetail.value.start_date = _start_date;
    journeyDetail.value.end_date = _end_date;
    journeyDetail.value.personnel = _personnel;
    journeyDetail.value.color = _color;
  };

  const setJourneyPeriod = (_journeyPeriod) => {
    journeyPeriod.value = _journeyPeriod;
  };

  return {
    journeyDetail,
    journeyPeriod,
    setJourneyList,
    setJourneyDetail,
    setJourneyPeriod,
  };
});
