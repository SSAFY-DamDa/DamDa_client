<script setup>
import FindPwdForm from '@/components/welcome/findpwd/FindPwdForm.vue';
</script>

<template>
  <div class="find-pwd-view">
    <div class="find-pwd-section">
      <FindPwdForm />
    </div>
    <div class="picture-section">
      <img src="/src/assets/imgs/background.png" />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .find-pwd-view {
    height: 100%;
    display: flex;
  }

  .find-pwd-section {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .picture-section {
    width: 50%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}


@media (max-width: 1280px) {
  .find-pwd-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .find-pwd-section {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .picture-section {
    width: 100%;
    height: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>