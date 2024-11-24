<script setup>
import { ref } from "vue";

const activeOption = ref(null);
const emit = defineEmits(["optionClicked"]);

const handleOptionClick = (option, index) => {
  activeOption.value = option;
  emit("optionClicked", index); // 클릭한 옵션의 인덱스를 부모 컴포넌트로 보냄
};

const options = [
  "여행은 혼자",
  "대화할 사람 한 명은 필요해",
  "가족끼리 추억 만들어야지",
  "친구들과 단체로 놀러가",
  "우린 N명이서 놀아",
];
</script>

<template>
  <div class="people-btn-container">
    <input
      class="people-btn"
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
.people-btn-container {
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

.people-btn {
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
  .people-btn-container {
    max-width: 350px;
    gap: 20px;
  }

  .people-btn {
    width: calc(33.33% - 15px);
    height: 50px;
    font-size: 1.4rem;
    min-width: 60px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .people-btn-container {
    max-width: 300px;
    gap: 15px;
    padding: 15px;
  }

  .people-btn {
    width: calc(33.33% - 12px);
    height: 45px;
    font-size: 1rem;
    min-width: 50px;
    border-radius: 8px;
  }
}

.people-btn:hover {
  border: 0;
  background-color: #c2e0db;
  color: #ffffff;
}

.people-btn.active {
  background-color: #7bbcb0;
  color: #ffffff;
  border: 0;
}
</style>
