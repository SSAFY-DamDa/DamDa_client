<script setup></script>

<template>
  <div class="faq-item">
    <div id="faq-item-no" class="item-att">1</div>
    <div id="faq-item-subject" class="item-att">FAQ 제목</div>
    <div id="faq-item-userId" class="item-att">FAQ 등록 ID</div>
  </div>
</template>

<style scoped>
.faq-item {
  width: 50%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000000;
  padding: 30px 20px;
}

#faq-item-subject {
  width: 70%;
  display: flex;
  justify-content: flex-start;
  font-size: 1.8rem;
  color: black;
}

#faq-item-subject:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
