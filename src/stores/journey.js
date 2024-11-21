import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useJourneyStore = defineStore("journey", () => {
  const userStore = useUserStore();
  const userId = userStore.userInfo.userId;

  console.log(userId, userStore.userInfo);

  const journeyDetail = ref({
    title: "",
    user_id: userId,
    sido_code: 0,
    gugun_code: 0,
    content_type_id: 0,
    start_date: "",
    end_date: "",
    personnel: 0,
    color: "",
  });

  /*
  journeyDay = [{day: 1, isOpen: false, places: []}]
  */
  const journeyDay = ref([]);

  const journeyPeriod = ref(0);

  const setJourneyPeriod = (_journeyPeriod) => {
    journeyPeriod.value = _journeyPeriod;
  };

  const addPlaceToDay = (place) => {
    const openDay = journeyDay.value.find((day) => day.isOpen);
    if (openDay) {
      openDay.places.push(place);
    }
  };

  const toggleDay = (index) => {
    journeyDay.value.forEach((day, idx) => {
      day.isOpen = idx === index;
    });
  };

  return {
    journeyDetail,
    journeyPeriod,
    journeyDay,
    setJourneyPeriod,
    addPlaceToDay,
    toggleDay,
  };
});
