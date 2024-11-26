<script setup>
import FAQManageList from "./FAQManageList.vue";
</script>

<template>
  <div id="faq-manage">
    <div id="faq-title">
      <span>FAQ 관리</span>
    </div>
    <FAQManageList />
  </div>
</template>

<style scoped>
#faq-manage {
  display: flex;
  flex-direction: column;
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

#top-background {
  width: 100%;
}
</style>
