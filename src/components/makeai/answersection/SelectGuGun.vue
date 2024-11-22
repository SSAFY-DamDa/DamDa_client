<script setup>
import { ref, onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { useAiJourneyStore } from "@/stores/aijourney";
import { tripAxios } from "@/utils/http-trip";

const axios = tripAxios();
const tripStore = useTripStore();
const aiJourneyStore = useAiJourneyStore();

const activeGugunCode = ref(null);

onMounted(() => {
  getAllGuGun();
});

const getAllGuGun = async () => {
  try {
    const guResponse = await axios.get("/list-gugun", {
      params: {
        sidoCode: aiJourneyStore.answerDetail.sido_code,
      },
    });

    tripStore.setGuGunList(guResponse.data);

    console.log("gu list 얻기 성공 ", guResponse.data);
  } catch (error) {
    console.error("여행 계획 생성 중 오류가 발생했습니다.", error);
  }
};

const handleSiButtonClick = (gugunCode) => {
  aiJourneyStore.answerDetail.gugun_code = gugunCode;
  activeGugunCode.value = gugunCode;
};
</script>

<template>
  <div class="gugun-btn-container">
    <input
      class="gugun-btn"
      type="button"
      v-for="gugun in tripStore.getGuGunList"
      :key="gugun.gugun_code"
      :value="`${gugun.gugun_name.substring(0, 6)}`"
      :class="{ active: activeGugunCode === gugun.gugun_code }"
      @click="handleSiButtonClick(gugun.gugun_code)"
    />
  </div>
</template>

<style scoped>
.gugun-btn-container {
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.gugun-btn {
  min-width: 80px;
  height: 100%;
  max-width: 135px;
  max-height: 60px;
  border-radius: 10px;
  border: 1px solid #787878;
  color: #787878;
  font-size: 1.8rem;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.gugun-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.gugun-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
