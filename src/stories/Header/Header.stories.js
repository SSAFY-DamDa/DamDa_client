import { fn } from "@storybook/test";
import MyHeader from "./StoryHeader.vue";

/**
 * 로그인 후 보여지는 헤더입니다. <br />
 * 배경은 헤더의 모습을 잘 보이기 위해 추가하였습니다.
 */
export default {
  title: "layout/Header",
  tags: ["autodocs"],
  argTypes: {
    color: {
      description: "메인 페이지에서 위치에 따라 ",
    },
  },
  args: { onClick: fn() },
};

/**
 * 메인 페이지 상단 부분을 제외한 모든 부분에서 보이는 헤더입니다.
 */
export const Main = {
  render: () => ({
    components: { MyHeader },
    template: `
    <MyHeader color="main" name="강성엽" />
    `,
  }),
};

/**
 * 메인 페이지 상단부분에서 보여지는 헤더입니다.
 */
export const White = {
  render: () => ({
    components: { MyHeader },
    template: `
        <MyHeader color='white' name="강성엽" />
    `,
  }),
};
