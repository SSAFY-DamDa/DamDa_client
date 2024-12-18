<script setup>
import WhiteLogo from "@/assets/imgs/damda_logo_white.png";
import MainLogo from "@/assets/imgs/damda_logo.png";
import { computed } from "vue";

const props = defineProps({
  color: {
    type: String,
    validator: (value) => {
      return ["white", "main"].indexOf(value) !== -1;
    },
  },
});

const logoImg = computed(() => {
  return props.color === "white" ? WhiteLogo : MainLogo;
});
</script>

<template>
  <header class="story-header">
    <img :src="logoImg" alt="logo" class="logo" />
    <div class="text-btn-section cotent-section">
      <div class="text-btn">
        <input
          type="button"
          :class="[
            'text-name',
            'content-btn',
            logoImg === WhiteLogo ? 'text-name-white' : '',
          ]"
          value="지도 검색"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          :class="[
            'text-name',
            'content-btn',
            logoImg === WhiteLogo ? 'text-name-white' : '',
          ]"
          value="AI 추천"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          :class="[
            'text-name',
            'content-btn',
            logoImg === WhiteLogo ? 'text-name-white' : '',
          ]"
          value="직접 계획"
        />
      </div>
    </div>
    <div class="text-btn-section">
      <div class="text-btn">
        <input
          type="button"
          :class="[
            'text-name',
            'sub-btn',
            logoImg === WhiteLogo ? 'text-name-white' : '',
          ]"
          value="FAQ"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          :class="[
            'text-name',
            'sub-btn',
            logoImg === WhiteLogo ? 'text-name-white' : '',
          ]"
          value="강성엽"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.story-header {
  background-color: #c9c9c9;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  font-size: 62.5%;
}

img {
  height: 80%;
}

.logo {
  cursor: pointer;
}

.desktop-btn {
  align-items: center;
  color: #ffffff;
}

.text-btn-section {
  display: flex;
  align-items: flex-end;
}

.content-section {
  gap: 100px;
}

.text-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
}

.text-name {
  border: 0px;
  background-color: transparent;
  cursor: pointer;
}

.text-name-white {
  color: white;
}

.content-btn {
  font-size: 1.8rem;
  border: 0px;
  background-color: transparent;
  cursor: pointer;
  transition: font-size 0.3s ease;
}

.content-btn:hover {
  font-size: 2rem;
  font-weight: 600;
  transition: font-size 0.3s ease;
}

.sub-btn {
  text-decoration: underline;
}
</style>
