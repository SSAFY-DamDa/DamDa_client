<script setup>
import { onMounted, ref } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";
import { tripAxios } from "@/utils/http-trip";
import { publicDataAxios } from "@/utils/http-publicdata";
const { VITE_PUBLIC_DATA_KEY } = import.meta.env;
import { useGPTApi } from "@/utils/gpt-init";

const aiJourneyStore = useAiJourneyStore();
const tripaxios = tripAxios();
const publicaxios = publicDataAxios();

onMounted(async () => {
  aiJourneyStore.resultOfNormalAnswer = [];
  aiJourneyStore.resultOfPublicData = [];

  // searchByDefault()가 완료된 후 publicData()를 호출합니다.
  await searchByDefault();
  // await publicData();

  await fetchRecommendedRoute();

  console.log("after normal response", aiJourneyStore.resultOfNormalAnswer);
  // console.log("after public response", aiJourneyStore.resultOfPublicData);
});

const searchByDefault = async () => {
  const response = await tripaxios.get("/search-ai", {
    params: {
      areaCode: aiJourneyStore.answerDetail.sido_code,
      contentTypeId: aiJourneyStore.answerDetail.content_type_id,
    },
  });

  aiJourneyStore.resultOfNormalAnswer = response.data.tripList;

  console.log("response ", response.data);
};

//https://apis.data.go.kr/B551011/KorWithService1/detailWithTour1?MobileOS=ETC&MobileApp=AppTest&contentId=3040712&_type=json&serviceKey=ccVp6skX2dU%2BY5rBo8m95EiEsR2PQ%2Fb9MNgoBBb4bBRVIH3gMw6ciSgpTe%2FJP6vIuyTuheuIWczAeN2%2Bgzw4Fg%3D%3D
const publicData = async () => {
  for (const place of aiJourneyStore.resultOfNormalAnswer) {
    const response = await publicaxios.get(
      `detailWithTour1?MobileOS=ETC&MobileApp=AppTest`,
      {
        params: {
          contentId: place.content_id,
          _type: "json",
          serviceKey: VITE_PUBLIC_DATA_KEY,
        },
      }
    );

    if (response.data.response && response.data.response.body.totalCount > 0) {
      aiJourneyStore.resultOfPublicData.push(
        response.data.response.body.items.item
      );

      console.log("herem", response.data.response.body.items.item);
    }
  }
};

const fetchRecommendedRoute = async () => {
  try {
    const result = await useGPTApi(aiJourneyStore.resultOfNormalAnswer);
    aiJourneyStore.recommendedRoute.value = JSON.parse(result);
  } catch (err) {
    console.log("error fetch recommend ", err);
  }
};
</script>

<template>
  <div id="loading-container">
    <h1 class="loading-title">AI가 경로를 생성 중입니다.</h1>
    <img src="@/assets/icons/Loading.gif" alt="생성중" />
    <span class="loading-msg">조금만 기다려 주세요! </span>
  </div>
</template>

<style scoped>
#loading-container {
  width: 50%;
  height: 95%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid black;
}

.loading-title {
  height: 70px;
  line-height: 70px;
}

.loading-msg {
  height: 70px;
  line-height: 70px;
}
</style>
