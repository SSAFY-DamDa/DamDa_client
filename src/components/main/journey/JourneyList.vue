<script setup>
import { getJourney } from "@/api/journey";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import JourneyListItem from "./item/JourneyListItem.vue";
import { useJourneyStore } from "@/stores/journey";
import JourneyAddModal from "./modal/JourneyAddModal.vue";

const userStore = useUserStore();
const journeyStore = useJourneyStore();
const userJourneyList = ref([]);
const showModal = ref(false);
onMounted(async () => {
  await getJourney(
    userStore.userInfo.userId,
    (response) => {
      response.data.journey.forEach((j) => {
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
    <div id="journey-list-title">
      여행 계획
      <button id="journey-add" @click="showModal = true">+</button>
    </div>
    <div id="journey-list-section">
      <JourneyListItem
        v-for="journey in userJourneyList"
        :key="journey.id"
        :journey="journey"
      />
    </div>
    <JourneyAddModal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
@media (min-width: 700px) {
  #journey-container {
    width: 30%;
  }
}

@media (max-width: 700px) {
  #journey-container {
    width: 100%;
  }
}

#journey-container {
  position: relative;
  margin-right: 10px;
  max-width: 400px;
  height: 100%;
  min-height: fit-content;
  border: 1px solid #7bbcb0;
}

#journey-list-section {
  width: 100%;
}

#journey-list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  height: 50px;
  background-color: #7bbcb0;
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
}

#journey-add {
  border: 0px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0);
  font-size: 3rem;
  margin-right: 10px;
  cursor: pointer;
}
</style>
