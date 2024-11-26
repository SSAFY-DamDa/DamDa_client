<script setup>
import LoginForm from "@/components/welcome/login/LoginForm.vue";
import damda_character_login from "@/assets/imgs/damda_character_login.png";
</script>

<template>
  <div class="login-view">
    <LoginForm />
    <img :src="damda_character_login" id="damda_big" />
  </div>
</template>

<style scoped>
.login-view {
  position: relative;
  background-color: #c2e0db;
}

@media (min-width: 1024px) {
  .login-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 1280px) {
  .login-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

#damda_big {
  position: absolute;
  max-width: 500px;
  width: 30%;
  object-fit: cover;
  bottom: 0;
  right: 0;
  z-index: 0;
}
</style>
