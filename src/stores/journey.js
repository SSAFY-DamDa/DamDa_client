import { ref } from "vue";
import { defineStore } from "pinia";

export const useJourneyStore = defineStore("journey", () => {
  const userJourneyList = ref([]);
  const journeyDetail = ref({
    title: "",
    start_date: "",
    end_date: "",
    personnel: 0,
    color: "",
    ai: 0,
  });

  /*
  journeyDay = [{day: 1, isOpen: false, places: []}]
  */
  const journeyDay = ref([]);
  const journeyPeriod = ref(0);
  const isPlaceAdded = ref({});

  const setJourneyPeriod = (_journeyPeriod) => {
    journeyPeriod.value = _journeyPeriod;
  };

  const addPlaceToDay = (place) => {
    const openDay = journeyDay.value.find((day) => day.isOpen);
    if (openDay) {
      const uniqueIndex = openDay.places.length;
      const placeWithUniqueId = {
        id: `${openDay.day}-${place.content_id}-${uniqueIndex}`,
        ...place,
      };
      openDay.places.push(placeWithUniqueId);
      isPlaceAdded.value[place.content_id] = true;
    }
  };

  const removePlaceFromDay = (placeId) => {
    journeyDay.value.forEach((day) => {
      day.places = day.places.filter((place) => place.id !== placeId);
    });
    delete isPlaceAdded.value[placeId];
  };

  const toggleDay = (index) => {
    journeyDay.value.forEach((day, idx) => {
      day.isOpen = idx === index;
    });
  };
  const setUserJourneyList = (journeyList) => {
    userJourneyList.value = journeyList;
  };

  const resetJourneyStore = () => {
    journeyDetail.value = {
      title: "",
      start_date: "",
      end_date: "",
      personnel: 0,
      color: "",
      ai: 0,
    };
    journeyDay.value = [];
    journeyPeriod.value = 0;
  };

  return {
    journeyDetail,
    journeyPeriod,
    journeyDay,
    userJourneyList,
    setJourneyPeriod,
    addPlaceToDay,
    removePlaceFromDay,
    toggleDay,
    setUserJourneyList,
    resetJourneyStore,
  };
});
