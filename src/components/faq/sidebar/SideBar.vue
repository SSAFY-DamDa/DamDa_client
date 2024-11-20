<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleClickRegister = () => {
  router.push({ name: "register" });
};

const handleClickManage = () => {
  router.push({ name: "manage" });
};
</script>

<template>
  <div id="faq-side-bar" class="side-bar">
    <div class="board-register" @click="handleClickRegister">FAQ 등록</div>
    <div class="board-manage" @click="handleClickManage">FAQ 관리</div>
  </div>
</template>

<style scoped>
#faq-side-bar {
  position: fixed;
  left: 100px;
  width: 100px;
  height: 200px;
  background-color: #f3f3f3;
}

@media (min-height: 700px) {
  #faq-side-bar {
    top: 60%;
    transform: translateY(-40%);
  }
}

.side-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  border: 1px solid #d0d0d0;
  border-radius: 5px;
}
</style>
