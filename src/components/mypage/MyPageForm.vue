<script setup>
import MypageMainAside from "@/components/mypage/aside/MyPageAside.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="mypage-form">
    <MypageMainAside />
    <RouterView />
  </div>
</template>

<style scoped>
.mypage-form {
  width: 70%;
  height: 100%;
  display: flex;
}

main {
  width: 70%;
  display: flex;
  flex-direction: column;
}

main > h3 {
  margin-left: 50px;
}

#no-use {
  visibility: hidden;
  pointer-events: none;
}

.mypage-btn {
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 3px;
  background-color: #7bbcb0;
  color: #ffffff;
}

.mypage-change-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.mypage-submit-btn {
  display: flex;
  justify-content: center;
  gap: 10px;

  input[type="button"] {
    background-color: #4f5a66;
  }
}
</style>
