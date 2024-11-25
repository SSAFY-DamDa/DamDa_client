<script setup>
import { useRoute } from "vue-router";
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import MyJourneyForm from "@/components/myjourney/MyJourneyForm.vue";
import { onMounted, ref } from "vue";
import { getDetailJourney } from "@/api/journey";
import { useJourneyStore } from "@/stores/journey";
import { useTripStore } from "@/stores/trip";
import { loadKakaoMap } from "@/utils/loadKakaoMap";

const route = useRoute();
const { params } = route;
const journeyStore = useJourneyStore();
const tripStore = useTripStore();
const info = journeyStore.userJourneyList[params.id - 1];

const journeyInfo = ref(null);

onMounted(async () => {
  await getDetailJourney(
    params.id,
    async (response) => {
      journeyInfo.value = response.data;
      const temp = [];
      const kakao = await loadKakaoMap();
      Object.keys(response.data).forEach((day) => {
        response.data[day].forEach((trip) => {
          temp.push({
            title: trip.title,
            latlng: new kakao.maps.LatLng(trip.latitude, trip.longitude),
            area: trip,
          });
        });
      });
      tripStore.setPositions(temp);
    },
    (error) => {
      console.log("여행 디테일 정보 가져오는 도중 오류!", error);
    }
  );
});
</script>

<template>
  <div id="journey-view">
    <MyJourneyForm :info="info" :journeyInfo="journeyInfo" />
    <KakaoMap />
  </div>
</template>

<style scoped>
#journey-view {
  display: flex;
  height: 100%;
}
</style>
