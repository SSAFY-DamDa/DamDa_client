<script setup>
import SignUpForm from '@/components/welcome/signup/SignUpForm.vue';
</script>

<template>
  <div class="signup-view">
    <div class="signup-section">
      <SignUpForm />
    </div>
    <div class="picture-section">
      <img src="/src/assets/imgs/background.png" />
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .signup-view {
    height: 100%;
    display: flex;
  }

  .signup-section {
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
  .signup-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .signup-section {
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