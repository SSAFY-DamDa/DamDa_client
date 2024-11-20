<script setup>
import { useFAQStore } from "@/stores/faq";
import { FAQAxios } from "@/utils/http-faq";
import { useRouter } from "vue-router";

const props = defineProps({
  faq: {
    type: Object,
  },
});

const router = useRouter();
const faqStore = useFAQStore();
const axios = FAQAxios();
const handleClickDetail = async () => {
  try {
    const response = await axios.get(`/${props.faq.articleNo}`);
    faqStore.setFAQDetail(response.data.article);
    router.push({ name: "detail" });
  } catch (error) {
    console.log(error);
  }
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
  padding: 10px 20px;
}

#faq-item-subject {
  width: 80%;
  display: flex;
  justify-content: flex-start;
}
</style>
