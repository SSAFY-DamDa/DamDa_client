<script setup>
import { postRegisterDetailJourney, postRegisterJourney } from "@/api/journey";
import MakeTripList from "./MakeTripList.vue";
import { useJourneyStore } from "@/stores/journey";
import { useUserStore } from "@/stores/user";
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
  const reqData = mergeJourneyData();
  console.log("userId:", userStore.userInfo.userId);
  await postRegisterJourney(
    reqData,
    userStore.userInfo.userId,
    async (response) => {
      console.log(response);
      const journeyId = response.data.journeyId;
      // 2. 여행 경로 정보 등록
      const journeyDetail = {};

      // journeyDay 데이터를 journeyDetail 구조로 합치기
      journeyStore.journeyDay.forEach((dayItem) => {
        const dayKey = `day${dayItem.day}`;
        journeyDetail[dayKey] = dayItem.places.map((place) => ({
          ...place,
        }));
      });
      console.log("jd:", journeyDetail);
      await postRegisterDetailJourney(
        journeyDetail,
        journeyId,
        () => {
          journeyStore.resetJourneyStore;
          alert("등록이 완료되었습니다.");
          router.push({ name: "main" });
        },
        (error) => {
          console.log("경로 정보 등록 요청 보내기 도중 오류!", error);
        }
      );
    },
    (error) => {
      console.error("여행 계획 생성 중 오류가 발생했습니다.", error);
    }
  );
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
  left: 470px;
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
