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
  <div id="faq-side-bar">
    <div class="faq-menu board-register" @click="handleClickRegister">
      FAQ 등록
    </div>
    <div class="faq-menu board-manage" @click="handleClickManage">FAQ 관리</div>
  </div>
</template>

<style scoped>
#faq-side-bar {
  position: absolute;
  top: 30%;
  left: 10%;
  width: 150px;
  height: 300px;
  padding: 20px 15px;
  background-color: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

@media (min-width: 700px) {
  #faq-side-bar {
    top: 15%;
    transform: translateY(-40%);
  }
}

.faq-menu:hover {
  text-decoration: underline;
  font-weight: bold;
  color: black;
  cursor: pointer;
}
</style>
