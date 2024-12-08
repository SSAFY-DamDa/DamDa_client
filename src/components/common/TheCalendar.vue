<script setup>
import { useAiJourneyStore } from "@/stores/aijourney";
import { useJourneyStore } from "@/stores/journey";
import { ref, onMounted, watch } from "vue";
import IconArrowNav from "../icons/IconArrowNav.vue";

const journeyStore = useJourneyStore();
const aiJourneyStore = useAiJourneyStore();
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

// 일정 추가
const addEventDates = (date) => {
  if (props.usage !== "main-calendar") return false;
  date.forEach((d) => {
    const temp = { dates: [], color: d.color };
    const current = toKST(new Date(d.startDate));
    const end = toKST(new Date(d.endDate));

    while (current <= end) {
      temp.dates.push(toKST(new Date(current)));
      current.setDate(current.getDate() + 1);
    }
    eventSchedule.value.push(temp);
  });
  console.log(eventSchedule.value);
};

const isEventDate = (date) => {
  if (props.usage !== "main-calendar") return false;
  date = toKST(date);
  for (const event of eventSchedule.value) {
    for (let eventDate of event.dates) {
      eventDate = toKST(eventDate);
      if (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      ) {
        return event.color; // 해당 날짜의 색상 반환
      }
    }
  }
  return null;
};

// 연속된 이벤트의 시작, 중간, 끝 확인
const getEventPosition = (date) => {
  const dateStr = date.toISOString().split("T")[0];
  for (const event of eventSchedule.value) {
    const eventDates = event.dates.map((d) => d.toISOString().split("T")[0]);
    const index = eventDates.indexOf(dateStr);
    if (index !== -1) {
      if (eventDates.length === 1) return "single";
      if (index === 0) return "start";
      if (index === eventDates.length - 1) return "end";
      return "middle";
    }
  }
  return null;
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

  aiJourneyStore.selectDates.value = selectDates;

  // 두 날짜가 모두 선택되었을 때 기간 계산하여 저장
  if (selectDates.value.length === 2) {
    const [startDate, endDate] = selectDates.value;
    const period = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    aiJourneyStore.answerDetail.period = period + 1;
  }
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

// KST로 변환
const toKST = (date) => {
  const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
  return new Date(date.getTime() - kstOffset);
};

onMounted(() => {
  makeCalendar(today.value);
});

watch(
  () => journeyStore.userJourneyList,
  (date) => {
    addEventDates(date);
  }
);
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
            selectedRange: isInSelectedRange(date),
            today: isToday(date), // 오늘 날짜에 클래스 추가
          }"
          @click="handleClickDate(date)"
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
          <div
            :class="[
              'isEvent',
              {
                'start-event': getEventPosition(date) === 'start',
                'end-event': getEventPosition(date) === 'end',
                'single-event': getEventPosition(date) === 'single',
              },
            ]"
            :style="{
              backgroundColor: isEventDate(date),
            }"
          ></div>
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
