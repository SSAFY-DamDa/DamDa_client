import LoadingAIResult from "./LoadingAIResult.vue";

/**
 * AI 계획 기능의 모든 절차를 수행하면 최종적으로 볼 수 있는 결과 페이지 입니다.
 */
export default {
  title: "page/makeai",
  tags: ["autodocs"],
};

export const MakeAI = {
  render: () => ({
    components: { LoadingAIResult },
    layout: "fullscreen",
    setup() {
      return {};
    },
    template: `
            <div style="width: 100%; height: 100%">
              <LoadingAIResult />
            </div>
        `,
  }),
};
