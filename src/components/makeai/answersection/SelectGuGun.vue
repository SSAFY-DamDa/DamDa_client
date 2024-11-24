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
  aiJourneyStore.answerDetail.gugun_code = gugun.gugunCode;
  activeGugunCode.value = gugun.gugunCode;
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
