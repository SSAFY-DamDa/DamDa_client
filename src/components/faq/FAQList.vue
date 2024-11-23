<script setup>
import { ref, onMounted } from "vue";
import FAQItem from "./Item/FAQItem.vue";
import { useFAQStore } from "@/stores/faq";
import { getListFAQ } from "@/api/faq";

defineEmits(["clickToggle"]);

const faqStore = useFAQStore();
const articleList = ref([]);
const activeArticleNo = ref(null);

onMounted(async () => {
  console.log("onMouned");
  await getListFAQ(
    (response) => {
      articleList.value = response.data.articles;
      faqStore.setFAQList(articleList.value);
    },
    (error) => {
      console.log("FAQ 리스트 불러오는 도중 오류!", error);
    }
  );
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
