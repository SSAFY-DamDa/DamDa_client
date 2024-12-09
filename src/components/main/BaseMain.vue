<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import mainBg from "@/assets/imgs/main_bg.jpg";
import { useRouter } from "vue-router";
import ReviewList from "../review/ReviewList.vue";
import { useLogoStore } from "@/stores/logo";

const router = useRouter();
const logoStore = useLogoStore();

const subContent = ref(null);
const mainContent = ref(null);

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const textNameElements = document.querySelectorAll(".text-name");
  textNameElements.forEach((element) => {
    if (scrollPosition >= 3900) {
      element.style.color = "black";
      logoStore.changeLogo("basic");
    } else {
      element.style.color = "white";
      logoStore.changeLogo("white");
    }
  });
  const contentBtnElements = document.querySelectorAll(".content-btn");
  contentBtnElements.forEach((element) => {
    if (scrollPosition >= 3900) {
      element.style.display = "none";
    } else {
      element.style.display = "flex";
    }
  });
};

const checkScroll = () => {
  if (!subContent.value || !mainContent.value) return;

  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const mainWrapperHeight =
    document.getElementById("main-wrapper").offsetHeight;

  if (scrollPosition >= mainWrapperHeight - windowHeight) {
    subContent.value.style.opacity = 0;
    mainContent.value.style.opacity = 0;
    return;
  }

  const subOpacity = Math.max(1 - scrollPosition / windowHeight, 0);
  const mainOpacity = Math.max(
    Math.min((scrollPosition - windowHeight * 0.3) / (windowHeight * 0.5), 1),
    0
  );

  const mainScale = 1 + (scrollPosition / windowHeight) * 0.3;

  subContent.value.style.opacity = subOpacity;
  mainContent.value.style.opacity = mainOpacity;

  subContent.value.style.transform = `translate(-50%, -50%)`;
  mainContent.value.style.transform = `translate(-50%, -50%) scale(${mainScale})`;
};

onMounted(() => {
  logoStore.changeLogo("white");
  const textNameElements = document.querySelectorAll(".text-name");
  const contentBtnElements = document.querySelectorAll(".content-btn");
  textNameElements.forEach((element) => {
    element.style.color = "white";
  });
  contentBtnElements.forEach((element) => {
    element.style.display = "flex";
  });
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("scroll", handleScroll);

  checkScroll();
});

onUnmounted(() => {
  logoStore.changeLogo("basic");
  window.removeEventListener("scroll", handleScroll);
  const textNameElements = document.querySelectorAll(".text-name");
  const contentBtnElements = document.querySelectorAll(".content-btn");
  const changeElemetns = () => {
    textNameElements.forEach((element) => {
      element.style.color = "black";
    });
    contentBtnElements.forEach((element) => {
      element.style.display = "none";
    });
  };

  setTimeout(() => {
    changeElemetns();
  });
});
</script>

<template>
  <img :src="mainBg" alt="main-bg" id="main-bg" />
  <div id="main-wrapper">
    <div ref="subContent" class="content sub-content">내가 만드는 추억</div>
    <div ref="mainContent" class="content main-content">
      AI가 만들어주는 추억
    </div>
  </div>
  <div class="content-box">
    <div id="map-box" data-aos="fade-down" data-aos-duration="1000">
      <div class="content-wrapper">
        <img
          src="@/assets/imgs/Mockup_phone.png"
          alt="지도로 이동"
          class="main-logo"
        />
        <div class="text-container">
          <p>지도 검색</p>
          <span>
            <p>궁금한 장소를</p>
            <p>빠르게 검색</p>
          </span>
          <div class="btnText" @click="router.push({ name: 'map' })">
            바로가기
          </div>
        </div>
      </div>
    </div>
    <div id="ai-box" data-aos="fade-down" data-aos-duration="1000">
      <div class="content-wrapper">
        <div class="text-container" id="ai-text-container">
          <p>AI 추천</p>
          <span>
            <p>내 취향에</p>
            <p>알맞게 추천</p>
          </span>
          <div class="btnText" @click="router.push({ name: 'make' })">
            바로가기
          </div>
        </div>
        <img
          src="@/assets/imgs/Mockup_Macbook.png"
          alt="AI 추천 경로"
          class="main-logo"
        />
      </div>
      <ReviewList />
    </div>
    <div id="self-box" data-aos="fade-down" data-aos-duration="1000">
      <div class="content-wrapper">
        <img
          src="@/assets/imgs/Mockup_Ipad.png"
          alt="직접 경로 담기"
          class="main-logo"
        />
        <div class="text-container">
          <p>직접 계획</p>
          <span>
            <p>원하는대로</p>
            <p>자유롭게 계획</p>
          </span>
          <div class="btnText" @click="router.push({ name: 'makeself' })">
            바로가기
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#main-wrapper {
  top: -60px;
  position: relative;
  width: 100%;
  height: 4000px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
}

#main-bg {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;
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
  transition: all 0.3s ease;
  z-index: 1;
  font-size: 4rem;
  font-weight: bold;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sub-content {
  opacity: 1;
  transform: translate(-50%, -50%);
}

.main-content {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1);
}

.content-wrapper {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 300px;
}

#map-box,
#self-box {
  width: 70%;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

#ai-box {
  width: 70%;
  height: 90vh;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-logo {
  width: 50%;
  height: 50%;
}

.text-container {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: start;

  > p {
    font-size: 3rem;
    font-weight: bold;
    color: #7bbcb0;
  }

  > span {
    height: 50%;
    font-size: 4rem;
    font-weight: bold;
    color: black;
    word-break: keep-all;
  }

  > span > p {
    width: 100%;
    margin: 0;
  }

  .btnText {
    align-content: center;
    padding: 10px 20px;
    background-color: #7bbcb0;
    border-radius: 10px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
  }

  .btnText:hover {
    background-color: #ffffff;
    color: #7bbcb0;
  }
}

#ai-text-container {
  align-items: end;
  text-align: end;
}
</style>
