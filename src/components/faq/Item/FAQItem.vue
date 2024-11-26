<script setup>
import arrow from "@/assets/icons/arrow.svg";

defineProps({
  article: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="faq-qna">
    <div
      :class="['faq', 'question', { qActive: isActive }]"
      @click="$emit('clickToggle')"
    >
      Q. {{ article.subject }}
      <img :src="arrow" :class="{ imgActive: isActive }" />
    </div>
    <div :class="['faq', 'answer', { aActive: isActive }]">
      <div class="a-content-section">
        <div class="a-section">A.</div>
        <div v-html="article.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq-qna {
  width: 50%;
}
.faq {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.question {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  font-size: 2.1rem;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid #cdcdcd;
  color: #7bbcb0;
  font-weight: 500;
  cursor: pointer;
}

.answer {
  width: 100%;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0 30px;
  background-color: #efefef;
  transition: max-height 0.3s ease, opacity 0.1s ease, padding 0.3s ease;
}

.a-section {
  font-weight: bold;
  margin-right: 5px;
}

.qActive {
  font-weight: bold;
  background-color: #c2e0db;
  color: #222222;
}

.imgActive {
  transform: scaleY(-1);
}

.aActive {
  display: flex;
  align-items: flex-start;
  max-height: 400px;
  opacity: 1;
  padding: 10px 30px;
}

.a-content-section {
  display: flex;
  gap: 10px;
  padding: 30px 0px;
  font-size: 1.8rem;
  word-break: keep-all;
}
</style>
