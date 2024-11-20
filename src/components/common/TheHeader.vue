<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

import PopUpForm from "@/components/popup/PopUpForm.vue";

const userStore = useUserStore();
const router = useRouter();

const isShow = ref(false);
const handleClickHome = () => {
  router.push({ name: "main" });
};

const handleClickFAQ = () => {
  router.push({ name: "faq" });
};

const handleOpenPopUp = () => {
  isShow.value = !isShow.value;
};
</script>

<template>
  <header v-if="userStore.userInfo">
    <img
      src="@/assets/imgs/logo_temp.png"
      alt="logo"
      class="logo"
      @click="handleClickHome"
    />
    <div class="text-btn-section">
      <div class="text-btn">
        <input
          type="button"
          class="text-name"
          @click="handleClickFAQ"
          value="FAQ"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          class="text-name"
          @click="handleOpenPopUp"
          :value="userStore.userInfo.userName"
        />
        <PopUpForm :isShow="isShow" @close-pop-up="isShow = $event" />
      </div>
    </div>
  </header>
  <header v-else class="non-header"></header>
</template>

<style scoped>
header {
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 15px 60px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

.non-header {
  border: 0px;
}

@media (min-width: 1280px) {
  .non-header {
    padding: 0;
    height: 0px;
  }
}

.text-btn-section {
  display: flex;
  align-items: flex-end;
}

.text-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-name {
  border: 0px;
  text-decoration: underline;
  background-color: #ffffff;
}
</style>
