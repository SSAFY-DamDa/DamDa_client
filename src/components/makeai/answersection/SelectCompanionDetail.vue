<script setup>
import { ref } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

const activeOption = ref(null);
const emit = defineEmits(["optionClicked"]);

const handleOptionClick = (option, index) => {
  activeOption.value = option;
  aiJourneyStore.answerDetail.companionType = option;
  emit("optionClicked", index); // 클릭한 옵션의 인덱스를 부모 컴포넌트로 보냄
};

const options = ["지체", "시각", "청각", "언어"];
</script>

<template>
  <div class="com-detail-btn-container">
    <input
      class="com-detail-btn"
      type="button"
      v-for="(option, index) in options"
      :key="index"
      :value="option"
      :class="{ active: activeOption === option }"
      @click="handleOptionClick(option, index)"
    />
  </div>
</template>

<style scoped>
.com-detail-btn-container {
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(4, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.com-detail-btn {
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

.com-detail-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.com-detail-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
