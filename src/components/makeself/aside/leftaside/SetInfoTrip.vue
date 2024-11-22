<script setup>
import { ref, watch } from "vue";
import IconCalendar from "@/components/icons/IconCalendar.vue";
import IconPeople from "@/components/icons/IconPeople.vue";
import { storeToRefs } from "pinia";
import { useJourneyStore } from "@/stores/journey";

const isFocusedStart = ref(false);
const isFocusedEnd = ref(false);
const isFocusedPeople = ref(false);

const journeyStore = useJourneyStore();
const { journeyDetail } = storeToRefs(journeyStore);

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

watch(
  () => journeyDetail.value.end_date,
  (newEndDate) => {
    const startDate = journeyDetail.value.start_date;

    if (newEndDate && startDate) {
      const start = new Date(startDate);
      const end = new Date(newEndDate);
      const timeDifference = end - start;

      const period = timeDifference / (1000 * 60 * 60 * 24) + 1;

      journeyStore.setJourneyPeriod(period);

      journeyStore.journeyDay = [];
      for (let d = 1; d <= period; d++) {
        journeyStore.journeyDay.push({ day: d, isOpen: false, places: [] });
      }
    }
  }
);

const handleStartDateChange = () => {
  if (journeyDetail.value.end_date < journeyDetail.value.start_date) {
    journeyDetail.value.end_date = journeyDetail.value.start_date;
  }
};

const validateEndDate = () => {
  const startDate = journeyDetail.value.start_date;
  const endDate = journeyDetail.value.end_date;

  if (endDate && startDate && endDate < startDate) {
    journeyDetail.value.end_date = startDate;
  }
};
</script>

<template>
  <div class="set-container">
    <input
      class="set-title"
      type="text"
      placeholder="여행의 제목을 정해주세요"
      v-model="journeyDetail.title"
    />
    <div class="date-input-container">
      <div class="date-input-box">
        시작일
        <div class="date-input-item">
          <input
            type="date"
            class="date-input"
            @focus="handleFocusStart"
            @blur="handleBlurStart"
            v-model="journeyDetail.start_date"
            @input="handleStartDateChange"
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
            @focus="handleFocusEnd"
            @blur="handleBlurEnd"
            v-model="journeyDetail.end_date"
            :min="journeyDetail.start_date"
            @input="validateEndDate"
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
        v-model="journeyDetail.personnel"
      />
    </div>

    <div class="color-input-container">
      <span class="color-title">컬러 선택</span>
      <input
        class="set-color"
        type="color"
        placeholder="컬러"
        value="#7bbcb0"
        v-model="journeyDetail.color"
      />
    </div>
  </div>
</template>

<style scoped>
.set-container {
  width: 80%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
