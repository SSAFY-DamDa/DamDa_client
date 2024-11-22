<script setup>
import { ref } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

const activeOption = ref(null);
const emit = defineEmits(["optionClicked"]);

const handleOptionClick = (option, index) => {
  activeOption.value = option;
  aiJourneyStore.answerDetail.companion = option;
  emit("optionClicked", index); // 클릭한 옵션의 인덱스를 부모 컴포넌트로 보냄
};

const options = ["장애인", "노약자", "영유아"];
</script>

<template>
  <div class="companion-btn-container">
    <input
      class="companion-btn"
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
.companion-btn-container {
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.companion-btn {
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

.companion-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.companion-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
