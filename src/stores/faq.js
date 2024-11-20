import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useFAQStore = defineStore("faq", () => {
  const faqList = ref([]);
  const faqDetail = ref({});

  const getFAQList = computed(() => faqList.value);
  const getFAQDetail = computed(() => faqDetail.value);

  const setFAQList = (_faqList) => {
    faqList.value = _faqList;
  };

  const setFAQDetail = (_faq) => {
    faqDetail.value = _faq;
  };

  return {
    getFAQList,
    getFAQDetail,
    setFAQList,
    setFAQDetail,
  };
});
