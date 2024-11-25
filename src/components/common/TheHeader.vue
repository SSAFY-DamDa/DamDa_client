<script setup>
import { onUnmounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import PopUpForm from "@/components/popup/PopUpForm.vue";

defineEmits(["close-pop-up"]);

const userStore = useUserStore();
const router = useRouter();

const isShow = ref(false);
const handleDocumentClick = () => {
  if (isShow.value) {
    handleClosePopUp();
  }
};

document.addEventListener("click", handleDocumentClick);

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});

const handleClickHome = () => {
  router.push({ name: "main" });
};

const handleClickFAQ = () => {
  router.push({ name: "faq" });
};

const handleOpenPopUp = () => {
  isShow.value = !isShow.value;
};

const handleClosePopUp = () => {
  isShow.value = false;
};
</script>

<template>
  <header v-if="userStore.userInfo">
    <img
      src="@/assets/imgs/damda_logo.png"
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
          @click.stop="handleOpenPopUp"
          :value="userStore.userInfo.userName"
        />
        <PopUpForm :isShow="isShow" @close-pop-up="handleClosePopUp" />
      </div>
    </div>
  </header>
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
  padding: 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
}

img {
  height: 80%;
}

.logo {
  cursor: pointer;
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
  margin-left: 10px;
}

.text-name {
  border: 0px;
  text-decoration: underline;
  background-color: #ffffff;
  cursor: pointer;
}
</style>
