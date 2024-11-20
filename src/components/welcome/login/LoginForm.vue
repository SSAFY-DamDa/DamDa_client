<script setup>
import { ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

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
    <div id="title">로그인</div>
    <div class="label-input_interval">
      <label>아이디</label>
      <input type="text" name="input-id" v-model="inputFormData.userId" />
    </div>
    <div class="label-input_interval">
      <label>비밀번호</label>
      <input type="password" name="input-pw" v-model="inputFormData.userPwd" />
    </div>
    <div class="err-msg">{{ errMsg }}</div>
    <div class="text-button">
      <RouterLink :to="{ name: 'findpwd' }">비밀번호 찾기</RouterLink>
      <RouterLink :to="{ name: 'signup' }">회원가입</RouterLink>
    </div>
    <input type="submit" id="login-btn" value="로그인" />
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

a {
  color: black;
}

.text-button {
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.label-input_interval {
  width: 40%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  label {
    margin-right: 5px;
  }

  input {
    width: 60%;
  }
}

#login-btn {
  margin: 10px;
}

.err-msg {
  color: #dd0000;
}
</style>
