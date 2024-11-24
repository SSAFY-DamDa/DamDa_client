<script setup>
import IconDoubleArrowNav from "@/components/icons/IconDoubleArrowNav.vue";
import { useAiJourneyStore } from "@/stores/aijourney";
import { ref } from "vue";

const peopleNum = ref(1);
const aiJourneyStore = useAiJourneyStore();

const emit = defineEmits(["optionClicked"]);

const handleClickNext = () => {
  aiJourneyStore.answerDetail.people = parseInt(peopleNum.value, 10);
  emit("optionClicked", 0);
};
</script>

<template>
  <div class="select-people-container">
    <span class="static-text">우리는</span>
    <div class="input-box">
      <input type="text" class="input-people-num" v-model="peopleNum" />
      <span class="people-num">명</span>
    </div>
    <span class="static-text">이에요</span>
  </div>
  <IconDoubleArrowNav
    class="btn-next"
    @click="handleClickNext"
    size="50"
    angle="0"
  />
</template>

<style scoped>
.select-people-container {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.static-text {
  width: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 3rem;
}

.people-num {
  text-align: left;
  font-weight: 700;
  font-size: 3rem;
}

.input-box {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.input-people-num {
  width: 50%;
  max-width: 170px;
  max-height: 100px;
  border: 1px solid #7bbcb0;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
}

.btn-next {
  position: absolute;
  left: 102%;
  top: 35%;
  transform: translateY(50%);
}
</style>
