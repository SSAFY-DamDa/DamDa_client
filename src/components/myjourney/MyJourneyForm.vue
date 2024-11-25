<script setup>
import { getDetailJourney } from "@/api/journey";
import { useJourneyStore } from "@/stores/journey";
import { onMounted, ref } from "vue";
import IconCalendar from "../icons/IconCalendar.vue";
import IconPeople from "../icons/IconPeople.vue";
import MyJourneyDay from "./days/MyJourneyDay.vue";

const props = defineProps({
  journeyId: {
    type: Number,
  },
});
const journeyStore = useJourneyStore();
const info = journeyStore.userJourneyList[props.journeyId - 1];

console.log("info:", info);
const journeyInfo = ref(null);

onMounted(async () => {
  await getDetailJourney(
    props.journeyId,
    (response) => {
      journeyInfo.value = response.data;
      console.log("day1", response.data);
    },
    (error) => {
      console.log("여행 디테일 정보 가져오는 도중 오류!", error);
    }
  );
});
</script>

<template>
  <div class="journey-form">
    <div class="journey-top">
      <div id="journey-detail-title">{{ info.title }}</div>
      <div class="journey-detail-date">
        <div id="journey-detail-start" class="date-box">
          <IconCalendar size="20" class="calendar-icon" color="#7bbcb0" />
          <span>
            {{ info.startDate }}
          </span>
        </div>
        <div id="journey-detail-end" class="date-box">
          <IconCalendar size="20" class="calendar-icon" color="#7bbcb0" />
          {{ info.endDate }}
        </div>
      </div>
      <div class="journey-detail-etc">
        <div id="journey-detail-personnel">
          <IconPeople size="20" color="#7bbcb0" />
          {{ info.personnel }}
        </div>
        <div
          id="journey-detail-color"
          :style="{ backgroundColor: info.color }"
        ></div>
      </div>
    </div>
    <div class="journey-bottom">
      <MyJourneyDay v-if="journeyInfo" :journeyInfo="journeyInfo" />
    </div>
  </div>
</template>

<style scoped>
.journey-form {
  width: 100%;
  max-width: 405px;
  display: flex;
  flex-direction: column;
}
.journey-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #7bbcb0;
  margin-bottom: 10px;
}

#journey-detail-title {
  width: 90%;
  font-size: 2rem;
  font-weight: bold;
  padding: 10px;
  margin: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #7bbcb0;
}

.journey-detail-date {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.date-box {
  display: flex;
  border: 1px solid #7bbcb0;
  border-radius: 10px;
  gap: 10px;
  padding: 15px 20px;
}

.journey-detail-etc {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
}

#journey-detail-personnel {
  display: flex;
  align-items: center;
  width: 90%;
  gap: 10px;
  border: 1px solid #7bbcb0;
  border-radius: 10px;
  padding: 15px 10px;
}

#journey-detail-color {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.journey-bottom {
  overflow: auto;
}

.journey-bottom::-webkit-scrollbar {
  width: 4px;
}

.journey-bottom::-webkit-scrollbar-thumb {
  background-color: rgb(170, 170, 170);
  border-radius: 20px;
}

.journey-bottom::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
</style>
