<script setup>
import faqManage from "@/assets/imgs/faqManage.png";
import FAQManageList from "./FAQManageList.vue";
</script>

<template>
  <div id="faq-manage">
    <img id="top-background" :src="faqManage" />
    <FAQManageList />
  </div>
</template>

<style scoped>
#faq-manage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#top-background {
  width: 100%;
}
</style>
