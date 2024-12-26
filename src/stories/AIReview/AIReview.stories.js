import AIReview from "./AIReview.vue";

/**
 * AI 계획으로 만든 여행 계획에서 리뷰를 작성할 수 있습니다.
 */
export default {
  title: "modal/Review",
  component: AIReview,
  layout: "fullscreen",
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export const Review = {
  render: () => ({
    components: { AIReview },
    layout: "fullscreen",
    setup() {
      return {};
    },
    template: `
        <div style="display:flex; width: 938px; heigth: 600px;">
          <AIReview />
        </div>
    `,
  }),
};
