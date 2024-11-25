<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import mainBg from "@/assets/imgs/main_bg.jpg";
import { useRouter } from "vue-router";

const router = useRouter();

const subContent = ref(null);
const mainContent = ref(null);

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const textNameElements = document.querySelectorAll(".text-name");
  textNameElements.forEach((element) => {
    if (scrollPosition >= 3900) {
      element.style.color = "black";
    } else {
      element.style.color = "white";
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

  // main-wrapper가 끝나는 지점을 넘어갔는지 확인
  if (scrollPosition >= mainWrapperHeight - windowHeight) {
    subContent.value.style.opacity = 0;
    mainContent.value.style.opacity = 0;
    return;
  }

  // opacity 계산 구간 조정
  const subOpacity = Math.max(1 - scrollPosition / windowHeight, 0);
  // opacity 시작점을 늦추고 끝점을 연장 (0.3 ~ 0.8 구간에서 변화)
  const mainOpacity = Math.max(
    Math.min((scrollPosition - windowHeight * 0.3) / (windowHeight * 0.5), 1),
    0
  );

  // AI가 짜주는 여행만 scale 계산 (1에서 1.5까지)
  const mainScale = 1 + (scrollPosition / windowHeight) * 0.3; // 1에서 1.5로

  subContent.value.style.opacity = subOpacity;
  mainContent.value.style.opacity = mainOpacity;

  // 내가 짜보는 여행은 크기 고정
  subContent.value.style.transform = `translate(-50%, -50%)`;
  // AI가 짜주는 여행만 확대
  mainContent.value.style.transform = `translate(-50%, -50%) scale(${mainScale})`;
};

onMounted(() => {
  const textNameElements = document.querySelectorAll(".text-name");
  textNameElements.forEach((element) => {
    element.style.color = "white";
  });
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("scroll", handleScroll);
  // 초기 상태 설정
  checkScroll();
});

onUnmounted(() => {
  console.log("main unmounted");
  window.removeEventListener("scroll", handleScroll);
  const textNameElements = document.querySelectorAll(".text-name");
  const contentBtnElements = document.querySelectorAll(".content-btn");
  const changeElemetns = () => {
    textNameElements.forEach((element) => {
      element.style.color = "black";
    });
    contentBtnElements.forEach((element) => {
      element.style.display = "flex";
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
    <div ref="subContent" class="content sub-content">내가 짜보는 여행</div>
    <div ref="mainContent" class="content main-content">AI가 짜주는 여행</div>
  </div>
  <div class="content-box">
    <div id="map-box" data-aos="fade-down-right" data-aos-duration="1000">
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
    <div id="ai-box" data-aos="fade-down-left" data-aos-duration="1000">
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
    </div>
    <div id="self-box" data-aos="fade-down-right" data-aos-duration="1000">
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
  height: 4000px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
}

#main-bg {
  position: fixed; /* 화면에 고정 */
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 1500px; /* 최대 너비를 1500px로 제한 */
  transform: translate(-50%, -50%); /* 화면 중앙에 배치 */
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
  transition: all 0.3s ease; /* 부드러운 전환 효과 추가 */
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
  transform: translate(-50%, -50%); /* 크기 변화 없음 */
}

.main-content {
  opacity: 0;
  transform: translate(-50%, -50%) scale(1); /* 초기 크기 1로 설정 */
}

.content-wrapper {
  height: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 300px;
}

#map-box,
#ai-box,
#self-box {
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-logo {
  width: 50%;
  height: 50%;
}

.text-container {
  width: 50%;
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
