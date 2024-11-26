<script setup>
import { useFAQStore } from "@/stores/faq";
import FAQManageItem from "./item/FAQManageItem.vue";

const faqStore = useFAQStore();
</script>

<template>
  <div id="faq-manage-item-list">
    <FAQManageItem
      v-for="faq in faqStore.getFAQList"
      :key="faq.articleNo"
      :faq="faq"
    />
  </div>
</template>

<style scoped>
#faq-manage-item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
}
</style>
