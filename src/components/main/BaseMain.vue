<script setup>
import { useRouter } from "vue-router";
import IconDoubleArrowNav from "../icons/IconDoubleArrowNav.vue";

const router = useRouter();

const scrollToNextSection = () => {
  const mapBox = document.getElementById("map-box");
  mapBox.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section id="main-container">
    <div id="main-box">
      <img
        src="@/assets/imgs/damda_character_raw.png"
        alt="메인캐릭터"
        class="main-logo"
      />
      <div class="scroll-down-container" @click="scrollToNextSection">
        <span class="scroll-down">SCROLL DOWN</span>
        <IconDoubleArrowNav class="scroll-down-icon" angle="90" />
      </div>
    </div>
    <div id="map-box" data-aos="fade-down">
      <div class="content-wrapper">
        <img
          src="@/assets/imgs/Map-img.png"
          alt="지도로 이동"
          class="main-logo"
        />
      </div>
      <div class="content-wrapper">
        <div class="button" @click="router.push({ name: 'map' })">
          <p class="btnText">장소 검색</p>
          <div class="btnTwo">
            <p class="btnText2">GO!</p>
          </div>
        </div>
      </div>
    </div>
    <div id="ai-box" data-aos="fade-down">
      <div class="content-wrapper">
        <div class="button" @click="router.push('/make/question')">
          <p class="btnText">AI 추천 경로</p>
          <div class="btnTwo">
            <p class="btnText2">GO!</p>
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <img
          src="@/assets/imgs/AI-img.png"
          alt="AI 추천 경로"
          class="main-logo"
        />
      </div>
    </div>
    <div id="self-box" data-aos="fade-down">
      <div class="content-wrapper">
        <img
          src="@/assets/imgs/Calendar-img.png"
          alt="직접 경로 담기"
          class="main-logo"
        />
      </div>
      <div class="content-wrapper">
        <div class="button" @click="router.push('/makeself')">
          <p class="btnText">직접 여행 계획</p>
          <div class="btnTwo">
            <p class="btnText2">GO!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#main-container {
  width: 100%;
  height: 100vh - 60px;
  background-color: #e4f2ef;
}

#main-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#main-box .main-logo {
  width: 20%; /* 기존 크기 유지 */
}

.scroll-down-container {
  position: absolute;
  bottom: 100px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.scroll-down {
  color: #7bbcb0;
  position: static;
}

.scroll-down-icon {
  position: static;
}

#main-box {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  gap: 2rem;
}

.content-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%;
}

.content-wrapper .main-logo {
  width: 45%;
  height: auto;
  object-fit: contain;
}

.button {
  background: #fff;
  margin: 20px auto;
  width: 200px;
  height: 50px;
  overflow: hidden;
  text-align: center;
  transition: 0.2s;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
}
.btnTwo {
  position: relative;
  width: 200px;
  height: 100px;
  margin-top: -100px;
  padding-top: 2px;
  background: #26a69a;
  left: -250px;
  transition: 0.3s;
}
.btnText {
  color: #7bbcb0;
  transition: 0.3s;
}
.btnText2 {
  margin-top: 63px;
  margin-right: -130px;
  color: #fff;
}
.button:hover .btnTwo {
  /*When hovering over .button change .btnTwo*/
  left: -130px;
}
.button:hover .btnText {
  /*When hovering over .button change .btnText*/
  margin-left: 65px;
}
.button:active {
  /*Clicked and held*/
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.3);
}
</style>
