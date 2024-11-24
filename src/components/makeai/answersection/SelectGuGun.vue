<script setup>
import { ref, onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { useAiJourneyStore } from "@/stores/aijourney";
import { getGugunList } from "@/api/trip";

const tripStore = useTripStore();
const aiJourneyStore = useAiJourneyStore();

const activeGugunCode = ref(null);
const emit = defineEmits(["optionClicked"]);

onMounted(() => {
  getAllGuGun();
});

const getAllGuGun = async () => {
  await getGugunList(
    aiJourneyStore.answerDetail.sido_code,
    (response) => {
      tripStore.setGuGunList(response.data);
    },
    (error) => {
      console.log("구군 리스트 불러오는 도중 오류!", error);
    }
  );
};

const handleSiButtonClick = (gugun, index) => {
  aiJourneyStore.answerDetail.gugun_code = gugun.gugun_code;
  activeGugunCode.value = gugun.gugun_code;
  aiJourneyStore.selectPlaceName = gugun.gugun_name;
  emit("optionClicked", index);
};
</script>

<template>
  <div class="gugun-btn-container">
    <input
      class="gugun-btn"
      type="button"
      v-for="(gugun, index) in tripStore.getGuGunList"
      :key="gugun.gugun_code"
      :value="`${gugun.gugun_name.substring(0, 6)}`"
      :class="{ active: activeGugunCode === gugun.gugun_code }"
      @click="handleSiButtonClick(gugun, index)"
    />
  </div>
</template>

<style scoped>
.gugun-btn-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  align-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.gugun-btn {
  width: calc(33.33% - 20px);
  min-width: 70px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #787878;
  color: #787878;
  font-size: 1.8rem;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-grow: 0;
}

/* 일반 태블릿 크기 */
@media screen and (max-width: 768px) {
  .gugun-btn-container {
    max-width: 350px;
    gap: 20px;
  }

  .gugun-btn {
    width: calc(33.33% - 15px);
    height: 50px;
    font-size: 1.4rem;
    min-width: 60px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .gugun-btn-container {
    max-width: 300px;
    gap: 15px;
    padding: 15px;
  }

  .gugun-btn {
    width: calc(33.33% - 12px);
    height: 45px;
    font-size: 1rem;
    min-width: 50px;
    border-radius: 8px;
  }
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
