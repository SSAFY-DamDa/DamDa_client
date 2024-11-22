<script setup>
import { ref } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

const activeOption = ref(null);
const emit = defineEmits(["optionClicked"]);

const handleOptionClick = (option, index) => {
  activeOption.value = option;
  aiJourneyStore.answerDetail.content_type_id = option;
  emit("optionClicked", index); // 클릭한 옵션의 인덱스를 부모 컴포넌트로 보냄
};
const options = [
  {
    id: 14,
    msg: "예술은 아름다움이야",
  },
  {
    id: 39,
    msg: "일단 맛있는걸 먹어야지",
  },
  {
    id: 38,
    msg: "여행의 꽃은 쇼핑",
  },
  {
    id: 28,
    msg: "액티비티하게 놀자",
  },
  {
    id: 15,
    msg: "행사가 있어야 신나지",
  },
  {
    id: 32,
    msg: "잠자는게 제일 중요해",
  },
  {
    id: 12,
    msg: "자연 관광으로 힐링할래",
  },
  {
    id: 25,
    msg: "SNS 핫플이 어디지?",
  },
];
</script>

<template>
  <div class="theme-btn-container">
    <input
      class="theme-btn"
      type="button"
      v-for="(option, index) in options"
      :key="index"
      :value="option.msg"
      :class="{ active: activeOption === option.id }"
      @click="handleOptionClick(option.id, index)"
    />
  </div>
</template>

<style scoped>
.theme-btn-container {
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.theme-btn {
  height: 100%;
  max-height: 60px;
  border-radius: 10px;
  border: 1px solid #787878;
  color: #787878;
  font-size: 1.8rem;
  background-color: white;
  word-break: keep-all;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.theme-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
