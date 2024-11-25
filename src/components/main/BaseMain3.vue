<script setup>
import { onMounted, ref } from "vue";
import mainBg from "@/assets/imgs/main_bg.jpg";

const subContent = ref(null);
const mainContent = ref(null);

const checkScroll = () => {
  if (!subContent.value || !mainContent.value) return;

  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // 스크롤 위치에 따라 opacity 조절
  const subOpacity = Math.max(1 - scrollPosition / windowHeight, 0);
  const mainOpacity = Math.min(scrollPosition / windowHeight, 1);

  subContent.value.style.opacity = subOpacity;
  mainContent.value.style.opacity = mainOpacity;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  // 초기 상태 설정
  checkScroll();
});
</script>

<template>
  <img :src="mainBg" alt="main-bg" id="main-bg" />
  <div id="main-wrapper">
    <div ref="subContent" class="content sub-content">내가 짜보는 여행</div>
    <div ref="mainContent" class="content main-content">AI가 짜주는 여행</div>
  </div>
</template>

<style scoped>
#main-wrapper {
  position: relative;
  height: 2500px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
}

#main-bg {
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  z-index: -1; /* 콘텐츠 뒤에 위치 */
}
.content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  transition: opacity 0.5s;
  z-index: 1;
}

.sub-content {
  opacity: 1;
}

.main-content {
  opacity: 0;
}
</style>
