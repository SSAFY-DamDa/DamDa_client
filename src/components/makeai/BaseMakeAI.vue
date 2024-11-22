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
import SelectCompanion from "@/components/makeai/answersection/SelectCompanion.vue";
import SelectCompanionDetail from "@/components/makeai/answersection/SelectCompanionDetail.vue";

const title = [
  "어느 지역으로 떠나고 싶은가요?",
  "어느 지역으로 떠나고 싶은가요?",
  "어느 기간동안 떠나고 싶은가요?",
  "누구와 함께 떠나고 싶은가요?",
  "몇 명이서 떠날 계획인가요?",
  "어떤 활동을 가장 하고 싶으신가요?",
  "동반하는 분이 계신가요?",
  "어디가 불편하신가요?",
];

const msg = [
  "원하는 지역 중 한 곳을 선택해 주세요.",
  "원하는 지역 중 한 곳을 선택해 주세요.",
  "시작일과 종료일을 선택해 주세요.",
  "여행 인원을 선택해 주세요.",
  "자세한 여행 인원을 선택해 주세요.",
  "여행 테마를 하나만 선택해 주세요.",
  "해당 사항이 있다면 선택해 주세요. 없다면 다음을 눌러주세요.",
  "세부 사항이 있다면 선택해 주세요.",
];

const componentsMap = [
  SelectSi,
  SelectGuGun,
  SelectPeriod,
  SelectPeople,
  SelectPeopleDetail,
  SelectTheme,
  SelectCompanion,
  SelectCompanionDetail,
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
  if (level.value > 0) {
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
  }

  //노약자 및 영유아
  else if (level.value == 6 && (index == 1 || index == 2)) {
    router.push({ name: "create" });
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

    <component
      :is="currentComponent"
      @optionClicked="handleOptionClicked"
    ></component>

    <div class="button-container">
      <button class="btn-before" @click="previousLevel">이전</button>
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

  border: 1px solid black;
}

.make-ai-title {
  height: 70px;
  line-height: 70px;
}

.make-ai-msg {
  height: 70px;
  line-height: 70px;
}

.button-container {
  height: 100px;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
