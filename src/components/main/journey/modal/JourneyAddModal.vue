<script setup>
import IconDraw from "@/components/icons/IconDraw.vue";
import IconRobot from "@/components/icons/IconRobot.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div id="modal-wrapper">
    <div class="modal-container">
      <div class="modal-close-btn">
        <div @click="handleClose" class="close-btn">&times;</div>
      </div>
      <div class="modal-title">
        <span>여행 계획을 추가할 수 있어요</span>
      </div>
      <div class="modal-description">
        직접 세세하게 계획하거나, AI의 추천을 받아볼 수 있어요
      </div>
      <div class="modal-btn-section">
        <div id="btn-self" class="modal-btn" @click="router.push('/makeself')">
          <IconDraw size="23" />
          나만의 특별한 여정을 그려보세요
        </div>
        <div
          id="btn-ai"
          class="modal-btn"
          @click="router.push('/make/question')"
        >
          <IconRobot width="20" height="23" />
          AI가 당신의 꿈같은 여행을 만들어드려요
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#modal-wrapper {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.modal-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 330px;
  height: 200px;
  background-color: #ffffff;
}

.modal-close-btn {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  margin-right: 20px;
}

.close-btn {
  position: absolute;
  top: 0;
  font-size: 3rem; /* X 크기 증가 */
  color: #707070;
  cursor: pointer;
  transition: color 0.2s ease;
  line-height: 1;
}

.close-btn:hover {
  color: #333333;
}

.modal-title {
  width: 90%;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: #707070;
}

.modal-description {
  width: 90%;
  display: flex;
  font-size: 1.3rem;
  color: #969696;
  padding: 0 10px;
  margin: 10px 0;
}

.modal-btn-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.modal-btn {
  width: 90%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  gap: 10px;
  transition: all 0.3s ease-in-out;
}

#btn-self {
  width: 85%;
  padding: 5px 10px;
  border: 1px solid #7bbcb0;
  color: #7a7a7a;
}

#btn-ai {
  width: 85%;
  padding: 5px 10px;
  border: 1px solid #7bbcb0;
  background-color: #7bbcb0;
  color: #ffffff;
}
</style>
