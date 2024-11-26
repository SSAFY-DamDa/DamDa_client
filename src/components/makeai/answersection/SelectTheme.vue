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
    msg: "예술은\n아름다움이야",
  },
  {
    id: 39,
    msg: "일단\n맛있는걸 먹어야지",
  },
  {
    id: 38,
    msg: "여행의 꽃은\n쇼핑",
  },
  {
    id: 28,
    msg: "액티비티하게\n놀자",
  },
  {
    id: 15,
    msg: "행사가 있어야\n신나지",
  },
  {
    id: 32,
    msg: "잠자는게\n제일 중요해",
  },
  {
    id: 12,
    msg: "자연 관광으로\n힐링할래",
  },
  {
    id: 25,
    msg: "SNS 핫플이\n어디지?",
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  align-content: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.theme-btn {
  min-width: 70px;
  height: 60px;
  padding: 1% 4% 1% 4%;
  border-radius: 10px;
  border: 1px solid #787878;
  color: #787878;
  font-size: 1.8rem;
  background-color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-grow: 0;
  word-break: break-all;
}

/* 일반 태블릿 크기 */
@media screen and (max-width: 768px) {
  .theme-btn-container {
    max-width: 350px;
    gap: 20px;
  }

  .theme-btn {
    height: 50px;
    font-size: 1.4rem;
    min-width: 60px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .theme-btn-container {
    max-width: 300px;
    gap: 15px;
  }

  .theme-btn {
    height: 45px;
    font-size: 1rem;
    min-width: 50px;
    border-radius: 8px;
  }
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
