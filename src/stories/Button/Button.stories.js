import { fn } from "@storybook/test";

import MyButton from "./Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
/**
 * 각 버튼 UI 입니다. <br />
 * %로 버튼의 크기를 지정하여 상위 DIV에 맞게 지정
 */
export default {
  title: "components/Button",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      description: "크기를 %로 잡아 상위 div에 맞게 설정됩니다.",
    },
    backgroundColor: {
      description: "용도에 맞게 색깔을 지정합니다.",
    },
    onClick: {
      description: "모든 버튼은 submit으로 지정됩니다.",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: () => ({
    components: { MyButton },
    setup() {
      return {
        buttons: [
          { id: 0, label: "버튼", size: "large", primary: true },
          { id: 1, label: "계획 생성", size: "medium", primary: true },
          { id: 2, label: "Tag", size: "small", primary: false },
        ],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <MyButton 
          v-for="(btn, index) in buttons" 
          :key="btn.id" 
          v-bind="btn" 
        />
      </div>
    `,
  }),
};
