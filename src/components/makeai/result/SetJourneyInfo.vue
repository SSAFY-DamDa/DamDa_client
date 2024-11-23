<script setup>
import { ref, watch } from "vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconPeople from "@/components/icons/IconPeople.vue";
import { storeToRefs } from "pinia";
import { useAiJourneyStore } from "@/stores/aijourney";

const isFocusedStart = ref(false);
const isFocusedEnd = ref(false);
const isFocusedPeople = ref(false);

const aiJourneyStore = useAiJourneyStore();
const { finalJourneyInfo } = storeToRefs(aiJourneyStore);

const handleFocusStart = () => {
  isFocusedStart.value = true;
};

const handleBlurStart = () => {
  isFocusedStart.value = false;
};

const handleFocusEnd = () => {
  isFocusedEnd.value = true;
};

const handleBlurEnd = () => {
  isFocusedEnd.value = false;
};

const handleFocusPeople = () => {
  isFocusedPeople.value = true;
};

const handleBlurPeople = () => {
  isFocusedPeople.value = false;
};

const handleStartDateChange = (e) => {
  const newStartDate = e.target.value;
  finalJourneyInfo.value.startDate = newStartDate;

  if (
    finalJourneyInfo.value.endDate &&
    finalJourneyInfo.value.endDate < newStartDate
  ) {
    finalJourneyInfo.value.endDate = newStartDate;
  }

  console.log("Start date changed:", finalJourneyInfo.value.startDate); // 디버깅용
};

const handleEndDateChange = (e) => {
  const newEndDate = e.target.value;
  finalJourneyInfo.value.endDate = newEndDate;
  console.log("End date changed:", finalJourneyInfo.value.endDate); // 디버깅용
};

// 값이 제대로 변경되는지 확인하기 위한 watch
watch(
  () => finalJourneyInfo.value.startDate,
  (newVal) => {
    console.log("Start date updated:", newVal);
  }
);

watch(
  () => finalJourneyInfo.value.endDate,
  (newVal) => {
    console.log("End date updated:", newVal);
  }
);
</script>

<template>
  <div class="set-container">
    <input
      class="set-title"
      type="text"
      placeholder="여행의 제목을 정해주세요"
      v-model="finalJourneyInfo.title"
    />
    <div class="date-input-container">
      <div class="date-input-box">
        시작일
        <div class="date-input-item">
          <input
            type="date"
            class="date-input"
            :value="finalJourneyInfo.startDate"
            @input="handleStartDateChange"
            @focus="handleFocusStart"
            @blur="handleBlurStart"
          />
          <IconCalendar
            size="20"
            class="calendar-icon"
            :color="isFocusedStart ? '#7bbcb0' : '#c9c9c9'"
          />
        </div>
      </div>

      <div class="date-input-box">
        종료일
        <div class="date-input-item">
          <input
            type="date"
            class="date-input"
            :value="finalJourneyInfo.endDate"
            @input="handleEndDateChange"
            :min="finalJourneyInfo.startDate"
            @focus="handleFocusEnd"
            @blur="handleBlurEnd"
          />
          <IconCalendar
            size="20"
            class="calendar-icon"
            :color="isFocusedEnd ? '#7bbcb0' : '#c9c9c9'"
          />
        </div>
      </div>
    </div>

    <div class="people-input-container">
      <IconPeople size="30" :color="isFocusedPeople ? '#7bbcb0' : '#c9c9c9'" />
      <input
        class="set-people"
        type="number"
        placeholder="인원수"
        @focus="handleFocusPeople"
        @blur="handleBlurPeople"
        v-model="finalJourneyInfo.personnel"
      />
    </div>

    <div class="color-input-container">
      <span class="color-title">컬러 선택</span>
      <input
        class="set-color"
        type="color"
        placeholder="컬러"
        value="#7bbcb0"
        v-model="finalJourneyInfo.color"
      />
    </div>
  </div>
</template>

<style scoped>
.journey-info-container {
  width: 100%;
  max-width: 405px;
  display: flex;
  flex-direction: column;
}

.set-title {
  width: 95%;
  height: 40px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #c2e0db;
  outline: none;
  font-size: 1.8rem;
}

.set-title:focus {
  border-bottom: 2px solid #7bbcb0;
}

.date-input-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.date-input-box {
  width: 100%;
}

.date-input-item {
  width: 90%;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  padding: 5px;
}

.date-input {
  width: 90%;
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
}

.date-input::placeholder {
  color: #787878;
}

.date-input::-webkit-calendar-picker-indicator,
.date-input::-webkit-inner-spin-button {
  opacity: 0;
  appearance: none;
}

.date-input-item:focus-within {
  border: 2px solid #7bbcb0;
}

.people-input-container {
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c9c9c9; /* 테두리 색상 */
  border-radius: 5px; /* 모서리를 둥글게 */
  outline: none;
  padding: 5px;
}

.people-icon {
  color: #787878;
  margin-right: 5px;
}

.set-people {
  width: 95%;
  height: 40px;
  padding: 10px;
  border: none;
  padding: 5px;
  outline: none;
}

.set-people::placeholder {
  color: #787878;
}

.people-input-container:focus-within {
  border: 2px solid #7bbcb0;
}

.color-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.color-title {
  color: #787878;
}

.set-color {
  width: 100px;
  height: 50px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
}

.set-color::-webkit-color-swatch {
  border-radius: 30px;
  border: none;
}
</style>
