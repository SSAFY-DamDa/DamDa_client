<script setup>
import { FAQAxios } from "@/utils/http-faq";
import { ref, onMounted } from "vue";
import FAQItem from "./Item/FAQItem.vue";
import { useFAQStore } from "@/stores/faq";

defineEmits(["clickToggle"]);

const http = FAQAxios();
const faqStore = useFAQStore();
const articleList = ref([]);
const activeArticleNo = ref(null);

onMounted(async () => {
  console.log("onMouned");
  try {
    const res = await http.get("/list");
    articleList.value = res.data.articles;
    faqStore.setFAQList(articleList.value);
  } catch (error) {
    console.log(error);
  }
});

const handleToggle = (articleNo) => {
  activeArticleNo.value =
    activeArticleNo.value === articleNo ? null : articleNo;
};
</script>

<template>
  <div class="faq-section">
    <FAQItem
      v-for="article in articleList"
      :key="article.articleNo"
      :article="article"
      :is-active="article.articleNo === activeArticleNo"
      @click-toggle="handleToggle(article.articleNo)"
    />
  </div>
</template>

<style scoped>
.faq-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
