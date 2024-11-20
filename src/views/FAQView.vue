<script setup>
import FAQTop from "@/assets/imgs/FAQTop.png";
import FAQList from "@/components/faq/FAQList.vue";
import SideBar from "@/components/faq/sidebar/SideBar.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div id="faq-view">
    <img :src="FAQTop" />
    <div>
      <SideBar v-if="userStore.userInfo.userId === 'admin'" />
      <FAQList />
    </div>
  </div>
</template>

<style scoped>
#faq-view {
  width: 100%;
}

img {
  width: 100%;
}
</style>
