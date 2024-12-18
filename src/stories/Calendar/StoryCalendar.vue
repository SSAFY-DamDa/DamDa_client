<script setup>
import { ref, onMounted } from "vue";
import IconArrowNav from "@/components/icons/IconArrowNav.vue";

defineProps({
  usage: {
    type: String,
    required: true,
  },
});

const days = ["일", "월", "화", "수", "목", "금", "토"];
const today = ref(new Date());
const weeks = ref([]);

// 달력 생성
const makeCalendar = (date) => {
  const preLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const preLastDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate(); // 이전 달의 마지막 날짜
  const preDates = Array.from(
    { length: preLastDay + 1 },
    (_, i) => new Date(date.getFullYear(), date.getMonth() - 1, preLastDate - i)
  ).reverse();

  const thisMonthDays = Array.from(
    { length: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() },
    (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1)
  );

  const nextDates = Array.from(
    {
      length: 6 - new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay(),
    },
    (_, i) => new Date(date.getFullYear(), date.getMonth() + 1, i + 1)
  );

  const allDates = [...preDates, ...thisMonthDays, ...nextDates];
  weeks.value = chunkArray(allDates, 7);
};

// 오늘 날짜 확인
const isToday = (date) => {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

// 달 변경
const handleChangeMonth = (offset) => {
  if (offset == 0) {
    today.value = new Date();
  } else {
    today.value.setMonth(today.value.getMonth() + offset);
  }
  makeCalendar(today.value);
};

// 유틸 함수: 배열을 일정 크기로 나눔
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

onMounted(() => {
  makeCalendar(today.value);
});
</script>

<template>
  <div :class="[usage]">
    <div class="header">
      <div style="width: 50px"></div>
      <div class="arrow-section">
        <IconArrowNav @click="() => handleChangeMonth(-1)" angle="180" />
        <span class="year-month-title"
          >{{ today.getFullYear() }}년 {{ today.getMonth() + 1 }}월</span
        >
        <IconArrowNav @click="() => handleChangeMonth(1)" />
      </div>

      <div class="button-section">
        <button class="today-btn" @click="() => handleChangeMonth(0)">
          오늘
        </button>
      </div>
    </div>

    <div class="days">
      <div class="day" v-for="(day, index) in days" :key="day">
        <span
          :class="[
            'day-title',
            { isSunday: index === 0 },
            { isSaturday: index === 6 },
          ]"
        >
          {{ day }}
        </span>
      </div>
    </div>

    <div class="weeks">
      <div class="week" v-for="week in weeks" :key="week[0]">
        <div
          class="date"
          v-for="(date, index) in week"
          :key="date"
          :class="{
            preMonth: date.getMonth() < today.getMonth(),
            nextMonth: date.getMonth() > today.getMonth(),
            today: isToday(date), // 오늘 날짜에 클래스 추가
          }"
        >
          <div
            :class="[
              'date-number',
              { isSunday: index === 0 },
              { isSaturday: index === 6 },
            ]"
          >
            {{ date.getDate() }}
          </div>
          <div class="isEvent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1440px) {
  .main-calendar {
    width: 50%;
    height: 100%;
  }
}

@media (max-width: 1440px) {
  .main-calendar {
    width: 70%;
    height: 100%;
  }
}

@media (max-width: 700px) {
  .main-calendar {
    width: 100%;
    height: 70%;
  }
}

.select-calendar {
  width: 90%;

  .date {
    height: 100%;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.year-month-title {
  font-size: 2rem;
  font-weight: 600;
}

.arrow-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.today-btn {
  width: 50px;
  padding: 5px;
  margin-left: 5px;
  border-radius: 10px;
  border: 1px solid #787878;
  color: #787878;
  font-size: 1.2rem;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-grow: 0;
}

.today-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.today-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
}

.days {
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  border-bottom: 1px solid #c9c9c9;
  border: 1px solid #c9c9c9;
}

.day {
  height: auto;
  width: 100%;
  margin-left: 5px;
}

.date {
  width: 100%;
  height: 100px;
  border-collapse: collapse;
  position: relative;
}

.date-number {
  margin-left: 5px;
  text-align: start;
}

.weeks {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  border: 1px solid #c9c9c9;
  border-top: 0;
  border-bottom: 0;
}

.select-calendar .weeks {
  height: 100%;
}

.week {
  height: 100%;
  min-height: 50px;
  max-height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c9c9c9;
}

.preMonth,
.nextMonth {
  opacity: 0.5;
}

.isEvent {
  position: absolute;
  width: 100%;
  height: 10px;
}

.start-event {
  left: 3px;
  width: calc(100% - 3px);
  border-radius: 5px 0 0 5px;
}

.end-event {
  position: absolute;
  right: 3px;
  width: calc(100% - 3px);
  border-radius: 0 5px 5px 0;
}

.single-event {
  width: 5px;
}

.selectedRange {
  background-color: #c2e0db;
}

.today {
  background-color: #e0f7e9;
  box-shadow: inset 0 0 0 2px #4caf50;
}

.isSunday {
  color: rgb(255, 30, 30);
}

.isSaturday {
  color: rgb(30, 30, 248);
}
</style>
