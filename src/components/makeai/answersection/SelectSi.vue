<script setup>
import { getSiList } from "@/api/trip";
import { useAiJourneyStore } from "@/stores/aijourney";
import { useTripStore } from "@/stores/trip";
import { ref, onMounted } from "vue";
import { siLabels } from "@/assets/constants/contentLabels";

const tripStore = useTripStore();
const aiJourneyStore = useAiJourneyStore();

const activeSidoCode = ref(null);
const emit = defineEmits(["optionClicked"]);

onMounted(() => {
  getAllSi();
});

const getAllSi = async () => {
  await getSiList(
    (response) => {
      tripStore.setSiList(response.data);
    },
    (error) => {
      console.log("시 리스트 불러오는 도중 오류!", error);
    }
  );
};

// 버튼 클릭 시 해당 sido_code를 aiJourneyStore에 저장하고 활성화 상태로 설정
const handleSiButtonClick = (si, index) => {
  aiJourneyStore.answerDetail.sido_code = si.sido_code;
  activeSidoCode.value = si.sido_code;
  aiJourneyStore.selectPlaceName = si.sido_name;
  emit("optionClicked", index);
};
</script>

<template>
  <div class="si-btn-container">
    <input
      class="si-btn"
      type="button"
      v-for="(si, index) in tripStore.getSiList"
      :key="si.sido_code"
      :value="siLabels[si.sido_code]"
      :class="{ active: activeSidoCode === si.sido_code }"
      @click="handleSiButtonClick(si, index)"
    />
  </div>
</template>

<style scoped>
.si-btn-container {
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

.si-btn {
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
  .si-btn-container {
    max-width: 350px;
    gap: 20px;
  }

  .si-btn {
    width: calc(33.33% - 15px);
    height: 50px;
    font-size: 1.4rem;
    min-width: 60px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .si-btn-container {
    max-width: 300px;
    gap: 15px;
    padding: 15px;
  }

  .si-btn {
    width: calc(33.33% - 12px);
    height: 45px;
    font-size: 1rem;
    min-width: 50px;
    border-radius: 8px;
  }
}

.si-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.si-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
