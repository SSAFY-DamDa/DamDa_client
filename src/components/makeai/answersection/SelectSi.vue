<script setup>
import { useAiJourneyStore } from "@/stores/aijourney";
import { useTripStore } from "@/stores/trip";
import { tripAxios } from "@/utils/http-trip";
import { ref, onMounted } from "vue";

const tripStore = useTripStore();
const aiJourneyStore = useAiJourneyStore();
const axios = tripAxios();

const activeSidoCode = ref(null);
const emit = defineEmits(["optionClicked"]);

onMounted(() => {
  getAllSi();
});

const getAllSi = async () => {
  try {
    const siResponse = await axios.get("/list-si");

    tripStore.setSiList(siResponse.data);

    console.log("si list 얻기 성공 ", tripStore.getSiList);
  } catch (error) {
    console.error("여행 계획 생성 중 오류가 발생했습니다.", error);
  }
};

// 버튼 클릭 시 해당 sido_code를 aiJourneyStore에 저장하고 활성화 상태로 설정
const handleSiButtonClick = (sidoCode, index) => {
  aiJourneyStore.answerDetail.sido_code = sidoCode;
  activeSidoCode.value = sidoCode;
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
      :value="`${si.sido_name.substring(0, 2)}`"
      :class="{ active: activeSidoCode === si.sido_code }"
      @click="handleSiButtonClick(si.sido_code, index)"
    />
  </div>
</template>

<style scoped>
.si-btn-container {
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.si-btn {
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
