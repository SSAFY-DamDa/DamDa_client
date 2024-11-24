<script setup>
import TheCalendar from "@/components/common/TheCalendar.vue";
import { useAiJourneyStore } from "@/stores/aijourney";
import { ref, watch } from "vue";

const aiJourneyStore = useAiJourneyStore();

const emit = defineEmits(["optionClicked"]);

const handleClickNext = () => {
  emit("optionClicked", 0); // 클릭한 옵션의 인덱스를 부모 컴포넌트로 보냄
  console.log("startDate:", startDate.value);
  console.log("endDate:", endDate.value);
  aiJourneyStore.answerDetail.start_date = startDate.value;
  aiJourneyStore.answerDetail.end_date = endDate.value;
};

// 시작일과 종료일 메시지
const startmsg = ref("선택되지 않음");
const endmsg = ref("선택되지 않음");
const startDate = ref("");
const endDate = ref("");

// 날짜를 한국어 형식으로 변환하는 함수
const formatDateToKorean = (dateString) => {
  if (!dateString) return "날짜가 유효하지 않습니다";

  const date = new Date(dateString);
  if (isNaN(date)) return "날짜가 유효하지 않습니다";

  return new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
};

// 날짜를 'YYYY-MM-DD' 형식으로 변환하는 함수 추가
const formatDateToYYYYMMDD = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

watch(
  () => aiJourneyStore.selectDates.value,
  (newDates) => {
    if (newDates && newDates.length > 0) {
      startmsg.value = formatDateToKorean(newDates[0]);
      startDate.value = formatDateToYYYYMMDD(newDates[0]);

      console.log("in watch", startDate.value);
    } else {
      startmsg.value = "선택되지 않음";
    }

    if (newDates && newDates.length > 1) {
      endmsg.value = formatDateToKorean(newDates[1]);
      endDate.value = formatDateToYYYYMMDD(newDates[1]);
      console.log("in watch", endDate.value);
    } else {
      endmsg.value = "선택되지 않음";
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div id="period-container">
    <div class="date-container">
      <div class="start-date">
        <span>시작일</span>
        <span class="date-item">{{ startmsg }} </span>
      </div>
      <div class="end-date">
        <span>종료일</span>
        <span class="date-item">
          {{ endmsg }}
        </span>
      </div>
    </div>
    <div class="calendar-container">
      <TheCalendar usage="select-calendar" />
    </div>
    <button @click="handleClickNext">다음</button>
  </div>
</template>

<style scoped>
#period-container {
  width: 100%;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.date-container {
  display: flex;
  align-items: center;
  gap: 50px;
  font-size: 1.4rem;
  color: #787878;
}

.start-date {
  display: flex;
  align-items: center;
  gap: 10px;
}

.end-date {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-item {
  padding: 20px;
  border: 1px solid #7bbcb0;
  border-radius: 5px;
}

.calendar-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
