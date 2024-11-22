<script setup>
import { getJourney } from "@/api/journey";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import JourneyListItem from "./item/JourneyListItem.vue";
import { useJourneyStore } from "@/stores/journey";

const userStore = useUserStore();
const journeyStore = useJourneyStore();
const userJourneyList = ref([]);

onMounted(async () => {
  await getJourney(
    userStore.userInfo.userId,
    (response) => {
      response.data.journey.forEach((j) => {
        console.log("j:", j);
        userJourneyList.value.push(j);
      });
      userJourneyList.value.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      journeyStore.setUserJourneyList(userJourneyList.value);
    },
    (error) => {
      console.log("여행 계획 가져오는 도중 오류!", error);
    }
  );
});
</script>

<template>
  <div id="journey-container">
    <div id="journey-list-title">여행 계획</div>
    <div id="journey-list-section">
      <JourneyListItem
        v-for="(journey, index) in userJourneyList"
        :key="journey.id"
        :journey="journey"
        :index="index"
      />
    </div>
  </div>
</template>

<style scoped>
#journey-container {
  margin-right: 10px;
  width: 30%;
  border: 1px solid #7bbcb0;
}

#journey-list-section {
  width: 100%;
}

#journey-list-title {
  display: flex;
  align-items: center;
  padding-left: 10px;
  height: 50px;
  background-color: #7bbcb0;
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
}
</style>
