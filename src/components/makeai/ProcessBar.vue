<script setup>
defineProps({
  level: {
    type: Number,
  },
});
</script>

<template>
  <div class="progress-container">
    <div
      class="progress-bar"
      :style="{ width: `${((level + 1) / 6) * 100}%` }"
    ></div>
  </div>
</template>

<style scoped>
.progress-container {
  width: 80%;
  height: 10px;
  background-color: #e0e0e0; /* 배경 회색 */
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #7bbcb0; /* 진행된 부분의 색 */
  transition: width 0.3s ease-in-out; /* 애니메이션 효과 */
  border-radius: 5px;
}
</style>
