<script setup>
import { ref, onMounted } from "vue";
const days = ["일", "월", "화", "수", "목", "금", "토"];
const today = ref(new Date());
const firstWeek = ref([]);
const middleWeek = ref([]);
const lastWeek = ref([]);
const eventSchedule = ref([]); // [{'월', '일'}, {'월', '일'}, {'월', '일'}, ...]

const schedule = ref({
  title: "경주 여행",
  startDate: new Date("2024-10-13"),
  endDate: new Date("2024-11-23"),
  color: "#82B4FF",
});

const makeCalendar = (date) => {
  const preMonthLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const thisMonthLastDate = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  );

  const preLastDate = preMonthLastDate.getDate();
  const preLastDay = preMonthLastDate.getDay();

  const thisLastDate = thisMonthLastDate.getDate();
  const thisLastDay = thisMonthLastDate.getDay();

  const preDates = [];
  const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
  const nextDates = [];

  if (preLastDay !== 6) {
    for (let i = 0; i < preLastDay + 1; i++) {
      preDates.unshift(preLastDate - i);
    }
  }

  for (let i = 1; i < 7 - thisLastDay; i++) {
    nextDates.push(i);
  }
  firstWeek.value = preDates.concat(thisDates.slice(0, 6 - preLastDay));
  lastWeek.value = thisDates
    .slice(thisLastDate - thisLastDay - 1)
    .concat(nextDates);

  thisDates.splice(thisLastDate - thisLastDay - 1);
  thisDates.splice(0, 6 - preLastDay);

  middleWeek.value = splitIntoWeeks(thisDates);

  addToEvent();
};

onMounted(() => {
  makeCalendar(today.value);
});

const splitIntoWeeks = (dates) => {
  const weeks = [];
  while (dates.length > 0) {
    weeks.push(dates.splice(0, 7)); // 7일씩 잘라서 배열에 넣기
  }
  return weeks;
};

const addToEvent = () => {
  // 일정 넣기
  let start = schedule.value.startDate;
  const end = schedule.value.endDate;

  const temp = [];
  let nowYear = start.getFullYear();
  let nowMonth = start.getMonth();
  let nowDate = start.getDate();
  let lastDate = new Date(nowYear, nowMonth + 1, 0).getDate();
  temp.push({ nowMonth, nowDate });
  while (nowMonth != end.getMonth() || nowDate != end.getDate()) {
    nowDate++;
    temp.push({ nowMonth, nowDate });
    if (lastDate < nowDate) {
      nowDate = 1;
      nowMonth++;
      temp.push({ nowMonth, nowDate });
      lastDate = new Date(nowYear, nowMonth + 1, 0).getDate();
    }
  }
  eventSchedule.value.push(temp);
};

const handlePrevMonth = () => {
  today.value = new Date(today.value.setMonth(today.value.getMonth() - 1));
  firstWeek.value = [];
  middleWeek.value = [];
  lastWeek.value = [];
  makeCalendar(today.value);
};

const handleNextMonth = () => {
  today.value = new Date(today.value.setMonth(today.value.getMonth() + 1));
  firstWeek.value = [];
  middleWeek.value = [];
  lastWeek.value = [];
  makeCalendar(today.value);
};

const handleToday = () => {
  today.value = new Date();
  firstWeek.value = [];
  middleWeek.value = [];
  lastWeek.value = [];
  makeCalendar(today.value);
};

const handleIsEventDate = (month, date) => {
  return eventSchedule.value.some((eventDates) =>
    eventDates.some(
      (eventDate) => eventDate.nowMonth === month && eventDate.nowDate === date
    )
  );
};
</script>

<template>
  <div class="calendar">
    <div class="header">
      <span> {{ today.getFullYear() }}년 {{ today.getMonth() + 1 }}월 </span>
      <div class="button-section">
        <button @click="handleToday">오늘</button>
        <button @click="handlePrevMonth">이전</button>
        <button @click="handleNextMonth">다음</button>
      </div>
    </div>

    <div class="days">
      <div class="date" v-for="day in days" :key="day">{{ day }}</div>
    </div>

    <div class="weeks">
      <div class="week" v-if="firstWeek.length > 0">
        <div
          class="date"
          v-for="date in firstWeek"
          :key="date"
          :class="{ preMonth: date > 7 }"
        >
          <div class="date-number">{{ date }}</div>
          <div
            v-if="
              handleIsEventDate(
                date > 7 ? today.getMonth() - 1 : today.getMonth(),
                date
              )
            "
            class="isEvent"
          ></div>
        </div>
      </div>

      <div class="week" v-for="(week, index) in middleWeek" :key="index">
        <div class="date" v-for="date in week" :key="date">
          <div class="date-number">{{ date }}</div>
          <div
            v-if="handleIsEventDate(today.getMonth(), date)"
            class="isEvent"
          ></div>
        </div>
      </div>

      <div class="week" v-if="lastWeek.length > 0">
        <div
          class="date"
          v-for="date in lastWeek"
          :key="date"
          :class="{ nextMonth: date < 7 }"
        >
          <div class="date-number">{{ date }}</div>
          <div
            v-if="
              handleIsEventDate(
                date < 7 ? today.getMonth() + 1 : today.getMonth(),
                date
              )
            "
            class="isEvent"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1440px) {
  .calendar {
    width: 50%;
  }
}

@media (max-width: 1440px) {
  .calendar {
    width: 70%;
  }
}

@media (max-width: 1280px) {
  .calendar {
    width: 100%;
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
  margin-bottom: 10px;
  border-bottom: 1px solid #c9c9c9;
}

.day {
  text-align: center;
  padding: 10px;
}

.date {
  width: 100%;
  height: 100px;
  border-collapse: collapse;
}

.date-number {
  text-align: start;
}

.weeks {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
}

.week {
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
</style>
