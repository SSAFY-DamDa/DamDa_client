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

const options = ["장애인", "노약자", "영유아", "없어요"];
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
  width: 100%;
  height: 75%;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  align-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.companion-btn {
  min-width: 70px;
  height: 60px;
  padding: 1% 3% 1% 3%;
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
  .companion-btn-container {
    max-width: 350px;
    gap: 20px;
  }

  .companion-btn {
    width: calc(33.33% - 15px);
    height: 50px;
    font-size: 1.4rem;
    min-width: 60px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .companion-btn-container {
    max-width: 300px;
    gap: 15px;
    padding: 15px;
  }

  .companion-btn {
    width: calc(33.33% - 12px);
    height: 45px;
    font-size: 1rem;
    min-width: 50px;
    border-radius: 8px;
  }
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
