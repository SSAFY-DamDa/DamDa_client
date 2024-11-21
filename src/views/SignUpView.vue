<script setup>
import SignUpForm from "@/components/welcome/signup/SignUpForm.vue";
import damda_character_signup from "@/assets/imgs/damda_character_signup.png";
</script>

<template>
  <div class="signup-view">
    <img :src="damda_character_signup" id="damda_big" />
    <SignUpForm />
  </div>
</template>

<style scoped>
.signup-view {
  min-height: 1000px;
  position: relative;
  background-color: #c2e0db;
}

@media (min-width: 1280px) {
  .signup-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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
}
#damda_big {
  position: absolute;
  max-width: 500px;
  width: 30%;
  object-fit: cover;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
