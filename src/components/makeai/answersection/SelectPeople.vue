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
  height: 50%;
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(3, minmax(auto, 1fr));
  align-items: center;
  justify-content: space-around;
}

.people-btn {
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
