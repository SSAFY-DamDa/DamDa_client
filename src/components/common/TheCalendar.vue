<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  usage: {
    type: String,
    required: true,
  },
});

const days = ["일", "월", "화", "수", "목", "금", "토"];
const today = ref(new Date());
const weeks = ref([]);
const eventSchedule = ref([]);

const schedule = ref({
  title: "경주 여행",
  startDate: new Date("2024-12-13"),
  endDate: new Date("2025-01-03"),
  color: "#82B4FF",
});

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

// 일정 추가
const addEventDates = () => {
  const temp = [];
  let current = new Date(schedule.value.startDate);

  while (current <= schedule.value.endDate) {
    temp.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  eventSchedule.value = temp;
};

const isEventDate = (date) => {
  if (props.usage !== "main-calendar") return false;

  return eventSchedule.value.some(
    (eventDate) =>
      eventDate.getFullYear() === date.getFullYear() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getDate() === date.getDate()
  );
};

// 날짜 선택
const selectDates = ref([]);
const handleClickDate = (date) => {
  // usage가 "select-calendar"인 경우에만 동작
  if (props.usage !== "select-calendar") return;

  if (selectDates.value.length === 2) {
    selectDates.value = [];
  }
  selectDates.value.push(date);
  selectDates.value.sort((a, b) => new Date(a) - new Date(b));
};

// 선택된 범위 확인
const isInSelectedRange = (date) => {
  if (props.usage !== "select-calendar") return false;

  if (selectDates.value.length === 1) {
    return selectDates.value[0].getTime() === date.getTime();
  }

  const [start, end] = selectDates.value;
  return date >= start && date <= end;
};

// 달 변경
const handleChangeMonth = (offset) => {
  today.value.setMonth(today.value.getMonth() + offset);
  makeCalendar(today.value);
};

onMounted(() => {
  makeCalendar(today.value);
  if (props.usage === "main-calendar") addEventDates();
});

// 유틸 함수: 배열을 일정 크기로 나눔
const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
</script>

<template>
  <div :class="[usage]">
    <div class="header">
      <span>{{ today.getFullYear() }}년 {{ today.getMonth() + 1 }}월</span>
      <div class="button-section">
        <button @click="() => handleChangeMonth(0)">오늘</button>
        <button @click="() => handleChangeMonth(-1)">이전</button>
        <button @click="() => handleChangeMonth(1)">다음</button>
      </div>
    </div>

    <div class="days">
      <div class="date" v-for="day in days" :key="day">{{ day }}</div>
    </div>

    <div class="weeks">
      <div class="week" v-for="week in weeks" :key="week[0]">
        <div
          class="date"
          v-for="date in week"
          :key="date"
          :class="{
            preMonth: date.getMonth() < today.getMonth(),
            nextMonth: date.getMonth() > today.getMonth(),
            selectedRange: isInSelectedRange(date),
          }"
          @click="handleClickDate(date)"
        >
          <div class="date-number">
            {{ date.getDate() }}
          </div>
          <div v-if="isEventDate(date)" class="isEvent"></div>
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
    height: 70%;
  }
}

@media (max-width: 1280px) {
  .main-calendar {
    width: 100%;
    height: 100%;
  }
}

.select-calendar {
  width: 20%;
  border: 1px solid #c9c9c9;

  .date {
    height: 40px;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.days {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c9c9c9;
}

.day {
  text-align: center;
  padding: 10px;
}

.date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  border-collapse: collapse;
}

.date-number {
  text-align: start;
}

.weeks {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
}

.week {
  height: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c9c9c9;
}

.preMonth,
.nextMonth {
  color: #c9c9c9;
}

.isEvent {
  width: 100%;
  height: 10px;
  background-color: #82b4ff;
}

.selectedRange {
  background-color: #c2e0db;
}
</style>
