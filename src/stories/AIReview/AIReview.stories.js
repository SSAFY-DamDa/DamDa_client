import AIReview from "./AIReview.vue";

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
