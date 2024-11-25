<script setup>
import IconCalendar from "../icons/IconCalendar.vue";
import IconPeople from "../icons/IconPeople.vue";
import MyJourneyDay from "./days/MyJourneyDay.vue";
import { deleteJourney } from "@/api/journey";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  info: {
    type: Object,
  },
  journeyInfo: {
    type: Object,
  },
});

const handleDeleteJourney = () => {
  deleteJourney(
    props.info.id,
    () => {
      console.log("여행 삭제 성공");
      alert("여행 삭제에 성공했습니다.");
      router.push({ name: "mycalendar" });
    },
    (error) => {
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      console.log("여행 삭제 실패", error);
    }
  );
};
</script>

<template>
  <div class="journey-form">
    <div class="journey-top">
      <div class="title-container">
        <div
          id="journey-detail-color"
          :style="{ backgroundColor: info.color }"
        ></div>
        <div id="journey-detail-title">{{ info.title }}</div>
      </div>

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
        <button class="delete-button" @click="handleDeleteJourney">
          여행 삭제
        </button>
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

.title-container {
  width: 80%;
  display: flex;
  align-items: center;
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

.delete-button {
  border: none;
  width: 20%;
  height: 95%;
  border-radius: 10px;
  background-color: #7bbcb0;
  color: #fff;
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
