import FAQItemDetail from "@/components/faq/manage/detail/FAQItemDetail.vue";
import FAQManage from "@/components/faq/manage/FAQManage.vue";
import FAQRegister from "@/components/faq/register/FAQRegister.vue";
import FAQItem from "./FAQItem.vue";
import { useFAQStore } from "@/stores/faq";
import { fn } from "@storybook/test";

/**
 * admin 권한으로만 볼 수 있는 페이지를 UI 테스트를 위해 story로 작성하였습니다.
 */
export default {
  title: "page/FAQ",
  tags: ["autodocs"],
  args: { onClick: fn() },
};

export const Manage = {
  render: () => ({
    components: { FAQManage, FAQItem },
    setup() {
      const faq = [
        { articleNo: 1, subject: "FAQ 제목 1", userId: "admin" },
        { articleNo: 2, subject: "FAQ 제목 2", userId: "admin" },
        { articleNo: 3, subject: "FAQ 제목 3", userId: "admin" },
      ];
      const faqStore = useFAQStore();
      faqStore.setFAQList(faq);
      return {};
    },
    template: `
            <FAQManage />
        `,
  }),
};

export const Register = {
  render: () => ({
    components: { FAQRegister },
    setup() {
      return {};
    },
    template: `<FAQRegister />`,
  }),
};

export const Detail = {
  render: () => ({
    components: { FAQItemDetail },
    setup() {
      const faqStore = useFAQStore();
      const item = {
        articleNo: 1,
        subject: "FAQ 제목 1",
        userId: "admin",
        content: "FAQ 상세 내용입니다.",
        registerTime: "2024-11-11",
      };
      faqStore.setFAQDetail(item);
      return {};
    },
    template: `<FAQItemDetail />`,
  }),
};
