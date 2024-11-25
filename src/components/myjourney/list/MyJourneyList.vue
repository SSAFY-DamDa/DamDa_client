<script setup>
import { ref } from "vue";
import MyJourneyItem from "./item/MyJourneyItem.vue";

const props = defineProps({
  day: {
    type: Array,
  },
  index: {
    type: String,
  },
});
const isShow = ref(false);
const handleClickDay = () => {
  isShow.value = !isShow.value;
};

console.log("my journey list day:", props.day);
</script>

<template>
  <div class="journey-day-list">
    <div
      :class="['day-title', { 'day-title-click': isShow }]"
      @click="handleClickDay"
    >
      {{ index.substring(3) }}일차
    </div>
    <div
      :class="['day-content', { 'day-show': isShow, 'day-none-show': !isShow }]"
    >
      <MyJourneyItem v-for="item in day" :key="item.content_id" :item="item" />
    </div>
  </div>
</template>

<style scoped>
.journey-day-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 0 5px;
}

.day-title {
  padding-left: 10px;
  align-content: center;
  border-radius: 5px;
  border: 1px solid #c0c0c0;
  height: 40px;
  cursor: pointer;
}

.day-title-click {
  color: #ffffff;
  background-color: #7bbcb0;
  border-radius: 5px 5px 0 0;
  border-bottom: 0px;
}

.day-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.6s ease;
}

.day-none-show {
  padding: 0px;
  max-height: 0px; /* 닫힌 상태 */
}

.day-show {
  padding: 10px;
  border: 1px solid #c0c0c0;
  max-height: 500px;
}
</style>
