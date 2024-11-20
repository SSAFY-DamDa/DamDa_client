<script setup>
import { RouterView } from "vue-router";
import TheHeader from "@/components/common/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  width: 100%;
  height: calc(100% - 60px);
  font-size: 1.6rem;
}
</style>
