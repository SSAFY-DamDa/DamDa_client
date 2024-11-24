<script setup>
import SetJourneyInfo from "./SetJourneyInfo.vue";
import AIResultList from "./AIResultList.vue";
import { useAiJourneyStore } from "@/stores/aijourney";
import { useRouter } from "vue-router";
import { postRegisterDetailJourney, postRegisterJourney } from "@/api/journey";
import { useUserStore } from "@/stores/user";

const aiJourneyStore = useAiJourneyStore();
const userStore = useUserStore();
const router = useRouter();

const handleClickLike = async () => {
  const reqData = aiJourneyStore.finalJourneyInfo;

  console.log("최종 reqData:", reqData);

  await postRegisterJourney(
    reqData,
    userStore.userInfo.userId,
    async (response) => {
      console.log(response);
      const journeyId = response.data.journeyId;
      // 2. 여행 경로 정보 등록
      const journeyDetail = {};

      // journeyDay 데이터를 journeyDetail 구조로 합치기
      aiJourneyStore.recommendedRoute.forEach((dayItem) => {
        const dayKey = `day${dayItem.day}`;
        journeyDetail[dayKey] = dayItem.places.map((place) => ({
          ...place,
        }));
      });
      console.log("journey detail:", journeyDetail);
      await postRegisterDetailJourney(
        journeyDetail,
        journeyId,
        () => {
          aiJourneyStore.resetJourneyStore;
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
const handleClickRegenerate = () => {
  router.push({ name: "create" });
};
</script>

<template>
  <section class="journey-info-container">
    <SetJourneyInfo />
    <hr />
    <AIResultList />

    <div class="btn-container">
      <button class="like-btn" @click="handleClickLike">마음에 들어요</button>
      <button class="regen-btn" @click="handleClickRegenerate">
        다시 해주세요
      </button>
    </div>
  </section>
</template>

<style scoped>
.journey-info-container {
  width: 100%;
  max-width: 405px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px 10px 30px;
}

hr {
  width: 90%;
  border: 0;
  border-bottom: 1px solid #c9c9c9;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.like-btn {
  width: 150px;
  border: 0;
  border-radius: 20px;
  background-color: #c2e0db;
  padding: 20px;
  color: white;
  font-weight: 700;
}

.regen-btn {
  width: 150px;
  border: 0;
  border-radius: 20px;
  background-color: #c9c9c9;
  padding: 20px;
  color: white;
  font-weight: 700;
}
</style>
