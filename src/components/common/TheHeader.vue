<script setup>
import { onMounted, onUnmounted, ref } from "vue";
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

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const textNameElements = document.querySelectorAll(".text-name");
  textNameElements.forEach((element) => {
    if (scrollPosition >= 3950) {
      element.style.color = "black"; // 3000px 이상일 때 검은색
    } else {
      element.style.color = "#ffffff"; // 3000px 미만일 때 흰색
    }
  });
};

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
  window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 제거
});

const handleClickContent = (content) => {
  const textNameElements = document.querySelectorAll(".text-name");
  textNameElements.forEach((element) => {
    element.style.color = "black";
  });
  router.push({ name: content });
};

const handleClickText = (name) => {
  router.push({ name: name });
  window.removeEventListener("scroll", handleScroll); // 스크롤 이벤트 제거
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
      @click="handleClickText('main')"
    />
    <div class="text-btn-section cotent-section">
      <div class="text-btn">
        <input
          type="button"
          class="text-name content-btn"
          value="지도 검색"
          @click="handleClickContent('map')"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          class="text-name content-btn"
          value="AI 추천"
          @click="handleClickContent('make')"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          class="text-name content-btn"
          value="직접 계획"
          @click="handleClickContent('makeself')"
        />
      </div>
    </div>
    <div class="text-btn-section">
      <div class="text-btn">
        <input
          type="button"
          class="text-name sub-btn"
          @click="handleClickText('faq')"
          value="FAQ"
        />
      </div>
      <div class="text-btn">
        <input
          type="button"
          class="text-name sub-btn"
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
