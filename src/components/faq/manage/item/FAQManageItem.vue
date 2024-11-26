<script setup>
import { getDetailFAQ } from "@/api/faq";
import { useFAQStore } from "@/stores/faq";
import { useRouter } from "vue-router";

const props = defineProps({
  faq: {
    type: Object,
  },
});

const router = useRouter();
const faqStore = useFAQStore();

const handleClickDetail = async () => {
  await getDetailFAQ(
    props.faq.articleNo,
    (response) => {
      faqStore.setFAQDetail(response.data.article);
      router.push({ name: "detail" });
    },
    (error) => {
      console.log("FAQ 상세 보기 도중 오류!", error);
    }
  );
};
</script>

<template>
  <div class="faq-item" @click="handleClickDetail">
    <div id="faq-item-no" class="item-att">
      {{ faq.articleNo }}
    </div>
    <div id="faq-item-subject" class="item-att">
      {{ faq.subject }}
    </div>
    <div id="faq-item-userId" class="item-att">
      {{ faq.userId }}
    </div>
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
