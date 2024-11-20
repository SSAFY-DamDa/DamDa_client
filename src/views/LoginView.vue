<script setup>
import LoginForm from '@/components/welcome/login/LoginForm.vue';
import BackgroundPicture from '@/components/welcome/background/BackgroundPicture.vue';
</script>

<template>
  <div class="login-view">
    <div class="login-section">
      <LoginForm />
    </div>
    <BackgroundPicture />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .login-view {
    height: 100%;
    display: flex;
  }

  .login-section {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  .login-section {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>