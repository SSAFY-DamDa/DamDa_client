<script setup>
import { ref } from "vue";

import FindPwdForm from "@/components/welcome/findpwd/FindPwdForm.vue";
import damda_character_find from "@/assets/imgs/damda_character_find.png";

const level = ref(false);
const handleChangeLevel = () => {
  console.log("change");
  level.value = true;
};
</script>

<template>
  <div class="find-pwd-view">
    <FindPwdForm @change-level="handleChangeLevel" />
    <img
      :src="damda_character_find"
      id="damda_big"
      :class="{ 'change-level': level, 'confirm-level': !level }"
    />
  </div>
</template>

<style scoped>
.find-pwd-view {
  position: relative;
  background-color: #c2e0db;
}

@media (min-width: 1024px) {
  .find-pwd-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 1280px) {
  .find-pwd-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

#damda_big {
  position: absolute;
  max-width: 500px;
  width: 30%;
  object-fit: cover;
  z-index: 0;
  bottom: 0;
}

.confirm-level {
  left: 300px;
}

.change-level {
  right: 300px;
}
</style>
