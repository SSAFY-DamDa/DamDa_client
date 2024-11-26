<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ProcessBar from "./ProcessBar.vue";
import SelectSi from "@/components/makeai/answersection/SelectSi.vue";
import SelectGuGun from "@/components/makeai/answersection/SelectGuGun.vue";
import SelectPeriod from "@/components/makeai/answersection/SelectPeriod.vue";
import SelectPeople from "@/components/makeai/answersection/SelectPeople.vue";
import SelectPeopleDetail from "@/components/makeai/answersection/SelectPeopleDetail.vue";
import SelectTheme from "@/components/makeai/answersection/SelectTheme.vue";
import IconDoubleArrowNav from "@/components/icons/IconDoubleArrowNav.vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

const title = [
  "어느 지역으로 떠나고 싶은가요?",
  "어느 지역으로 떠나고 싶은가요?",
  "어느 기간동안 떠나고 싶은가요?",
  "누구와 함께 떠나고 싶은가요?",
  "몇 명이서 떠날 계획인가요?",
  "어떤 활동을 가장 하고 싶으신가요?",
];

const msg = [
  "원하는 지역 중 한 곳을 선택해 주세요.",
  "원하는 지역 중 한 곳을 선택해 주세요.",
  "시작일과 종료일을 선택해 주세요.",
  "여행 인원을 선택해 주세요.",
  "자세한 여행 인원을 선택해 주세요.",
  "여행 테마를 하나만 선택해 주세요.",
];

const componentsMap = [
  SelectSi,
  SelectGuGun,
  SelectPeriod,
  SelectPeople,
  SelectPeopleDetail,
  SelectTheme,
];

const level = ref(0);
const router = useRouter();

const currentComponent = computed(() => {
  if (level.value < componentsMap.length) {
    return componentsMap[level.value];
  }
  return null;
});

const nextLevel = () => {
  if (level.value < componentsMap.length - 1) {
    level.value++;
  } else {
    router.push({ name: "create" });
  }
};

const previousLevel = () => {
  if (
    level.value == 2 &&
    aiJourneyStore.answerDetail.sido_code >= 0 &&
    aiJourneyStore.answerDetail.sido_code <= 8
  ) {
    level.value = 0;
  } else {
    level.value--;
  }
};

const handleOptionClicked = (index) => {
  //특별시 및 광역시
  if (level.value == 0 && index >= 0 && index <= 7) {
    level.value += 2;
  }
  //혼자 여행
  else if (level.value === 3 && index === 0) {
    level.value += 2;
  } else {
    nextLevel();
  }
};
</script>

<template>
  <div id="make-ai-view-box">
    <h1 class="make-ai-title">{{ title[level] }}</h1>
    <ProcessBar :level="level" />
    <span class="make-ai-msg">{{ msg[level] }}</span>

    <div class="content-wrapper">
      <IconDoubleArrowNav
        v-if="level >= 1"
        class="btn-before"
        @click="previousLevel"
        size="50"
        angle="0"
      />
      <component
        :is="currentComponent"
        @optionClicked="handleOptionClicked"
      ></component>
    </div>
  </div>
</template>

<style scoped>
#make-ai-view-box {
  width: 50%;
  height: 95%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid black;
}

.content-wrapper {
  width: 100%;
  height: 60%;
  display: flex;
  align-items: start;
  justify-content: center;
  position: relative;
}

.btn-before {
  position: absolute;
  left: -10%;
  top: 40%;
  transform: translateY(-50%) rotate(180deg);
}

.make-ai-title {
  height: 70px;
  line-height: 70px;
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.make-ai-msg {
  height: 70px;
  line-height: 70px;
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

/* 일반 태블릿 크기 */
@media screen and (max-width: 768px) {
  #make-ai-view-box {
    width: 80%;
  }

  .make-ai-title {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .make-ai-msg {
    font-size: 1.4rem;
    margin-bottom: 22px;
  }
}

/* 모바일 크기 */
@media screen and (max-width: 480px) {
  .make-ai-title {
    font-size: 1.4rem;
    margin-bottom: 12px;
  }

  .make-ai-msg {
    font-size: 1rem;
    margin-bottom: 20px;
    padding: 0 15px; /* 좌우 여백 추가 */
  }
}
</style>
