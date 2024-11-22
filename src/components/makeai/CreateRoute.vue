<script setup>
import { ref } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

console.log(aiJourneyStore.answerDetail);
</script>

<template>
  <div id="loading-container">
    <h1 class="loading-title">AI가 경로를 생성 중입니다.</h1>
    <img src="@/assets/icons/Loading.gif" alt="생성중" />
    <span class="loading-msg">조금만 기다려 주세요! </span>
  </div>
</template>

<style scoped>
#loading-container {
  width: 50%;
  height: 95%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid black;
}

.loading-title {
  height: 70px;
  line-height: 70px;
}

.loading-msg {
  height: 70px;
  line-height: 70px;
}
</style>
