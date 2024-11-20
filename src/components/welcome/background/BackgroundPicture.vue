<script setup></script>

<template>
  <div class="picture-section">
    <img src="/src/assets/imgs/background.png" />
  </div>
</template>

<style scoped>
@media (min-width: 1280px) {
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
