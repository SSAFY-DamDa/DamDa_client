<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

import damda_character from "@/assets/imgs/damda_character.png";

const userStore = useUserStore();

const inputFormData = ref({
  userId: "",
  userPwd: "",
});

const errMsg = ref("");
const handleLogin = async () => {
  await userStore.handleLogin(inputFormData.value);
};

watch(
  () => inputFormData.value,
  () => {
    errMsg.value = "";
  },
  { deep: true }
);
</script>

<template>
  <form class="login-form" @submit.prevent="handleLogin">
    <img :src="damda_character" id="damda_mini" />
    <div id="title">로그인</div>
    <div id="login-description">로그인 후 추억을 담아보세요.</div>
    <div class="input-section">
      <input
        type="text"
        class="user-input"
        name="input-id"
        v-model="inputFormData.userId"
        placeholder="아이디"
      />
      <input
        type="password"
        class="user-input"
        name="input-pw"
        v-model="inputFormData.userPwd"
        placeholder="비밀번호"
      />
    </div>
    <div class="err-msg">{{ errMsg }}</div>
    <input type="submit" id="login-btn" value="로그인" />
    <div class="text-button">
      <RouterLink :to="{ name: 'findpwd' }">비밀번호를 잊으셧나요?</RouterLink>
      <span style="color: #7bbcb0; padding: 0 10px"> | </span>
      <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
    </div>
  </form>
</template>

<style scoped>
.login-form {
  max-width: 1160px;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
}

#damda_mini {
  width: 80px;
  object-fit: cover;
}

#title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 0 20px;
  color: #7bbcb0;
}

#login-description {
  color: #7bbcb0;
  font-size: 1.6rem;
  margin: 10px 0 20px 0;
}

.input-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

input {
  max-width: 470px;
  width: 70%;
  height: 60px;
  outline: none;
  border: 1px solid #7bbcb0;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 1.6rem;
}

.user-input:focus {
  height: 58px;
  border: 2px solid #5e9288;
}

#login-btn {
  max-width: 492px;
  width: calc(70% + 22px);
  font-size: 2rem;
  padding: 0 10px;
  margin: 10px;
  border: 0px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
  background-color: #c2e0db;
}

#login-btn:hover {
  background-color: #7bbcb0;
}

.text-button {
  width: 100%;
  display: flex;
  justify-content: center;
}

a {
  color: #7bbcb0;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #5e9288;
}

.err-msg {
  color: #dd0000;
}
</style>
