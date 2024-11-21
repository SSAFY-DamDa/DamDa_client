<script setup>
import { ref } from "vue";
const isOpen = ref(false);

const toggleContent = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <li class="make-trip-list-item" @click="toggleContent">
    <div class="item-title">{{ day }}일차</div>
    <div v-if="isOpen" class="item-content">내용</div>
  </li>
</template>

<style scoped>
.make-trip-list-item {
  width: 90%;
  padding-left: 10px;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  line-height: 40px;
  color: #787878;
  font-weight: 700;
  cursor: pointer;
}

.item-title {
  height: 40px;
}

.item-content {
  margin-top: 5px;
  color: #555;
}
</style>
