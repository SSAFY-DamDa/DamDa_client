<script setup>
import FAQList from "@/components/faq/FAQList.vue";
import SideBar from "@/components/faq/sidebar/SideBar.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <div id="faq-view">
    <div id="faq-title">
      <span>FAQs</span>
    </div>
    <div id="faq-section">
      <SideBar v-if="userStore.userInfo.userId === 'admin'" />
      <FAQList />
    </div>
  </div>
</template>

<style scoped>
#faq-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#faq-title {
  width: 100%;
  height: 400px;
  background-color: white;
  text-align: center;
  line-height: 400px;

  > span {
    color: black;
    font-size: 8rem;
    font-weight: 900;
  }
}

#faq-section {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  position: relative;
}
</style>
