<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";
import TheHeader from "@/components/common/TheHeader.vue";

const userStore = useUserStore();
</script>

<template>
  <TheHeader />
  <main :class="{ 'height-full': userStore.userInfo }">
    <RouterView />
  </main>
</template>

<style scoped>
main {
  flex: 1;
  width: 100%;
  height: 100%;
  font-size: 1.6rem;
}

.height-full {
  height: calc(100% - 60px);
}
</style>
