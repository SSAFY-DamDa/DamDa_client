<script setup>
import MakeTripList from "./MakeTripList.vue";
import { useJourneyStore } from "@/stores/journey";
import { useUserStore } from "@/stores/user";
import { JourneyAxios } from "@/utils/http-journey";
import { useRouter } from "vue-router";

const journeyStore = useJourneyStore();
const userStore = useUserStore();
const router = useRouter();

const mergeJourneyData = () => {
  // 기본 여행 정보 복사
  const reqData = {
    title: journeyStore.journeyDetail.title,
    startDate: journeyStore.journeyDetail.start_date,
    endDate: journeyStore.journeyDetail.end_date,
    personnel: journeyStore.journeyDetail.personnel,
    color: journeyStore.journeyDetail.color,
  };
  console.log("here ", reqData);

  return reqData;
};

const journeyDetail = {};

// journeyDay 데이터를 journeydetail 구조로 합치기
journeyStore.journeyDay.forEach((dayItem) => {
  const dayKey = `day${dayItem.day}`;
  journeyDetail[dayKey] = dayItem.places.map((place) => ({
    ...place,
  }));
});

const handleCreate = async () => {
  try {
    const axiosInstance = JourneyAxios();

    // 1. 기본 여행 정보 등록
    const reqData = mergeJourneyData(); // 여행의 기본 정보 (title, startDate, endDate, personnel, color)
    const userId = userStore.userInfo.userId; // 사용자 ID

    // 여행 정보를 먼저 등록하고 생성된 journeyId를 받아옵니다
    const journeyResponse = await axiosInstance.post("/register", reqData, {
      params: {
        userId: userId,
      },
    });

    console.log("등록 성공", journeyResponse.data);

    const journeyId = journeyResponse.data.journeyId;

    console.log("여행 기본 정보 등록 성공, journeyId: ", journeyId);

    // 2. 여행 경로 정보 등록
    const journeyDetail = {};

    // journeyDay 데이터를 journeyDetail 구조로 합치기
    journeyStore.journeyDay.forEach((dayItem) => {
      const dayKey = `day${dayItem.day}`;
      journeyDetail[dayKey] = dayItem.places.map((place) => ({
        ...place,
      }));
    });

    console.log("경로 자세히 등록 데이터 ", journeyDetail);

    // 경로 정보 등록 요청 보내기
    await axiosInstance.post("/registerDetail", journeyDetail, {
      params: {
        journeyId: journeyId,
      },
    });

    journeyStore.resetJourneyStore;

    alert("등록이 완료되었습니다.");
    router.push({ name: "main" });

    console.log("여행 경로 정보 등록 성공");
  } catch (error) {
    console.error("여행 계획 생성 중 오류가 발생했습니다.", error);
  }
};
</script>

<template>
  <section id="right-aside-container">
    <MakeTripList />

    <button class="trip-plan-create-btn" @click="handleCreate">생성</button>
  </section>
</template>

<style scoped>
#right-aside-container {
  position: absolute;
  top: 80px;
  left: 410px;
  width: 405px;
  height: 90%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  z-index: 100;
}

.trip-plan-create-btn {
  position: relative;
  top: -20px;
  left: 150px;
  width: 100px;
  border: 0;
  border-radius: 20px;
  background-color: #c2e0db;
  padding: 20px;
  color: white;
  font-weight: 700;
}
</style>
