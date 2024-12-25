import { fn } from "@storybook/test";
import StoryCalendar from "./StoryCalendar.vue";

/**
 * 여행 계획 뷰어 및 여행 일정 선택 기능을 가지고 있습니다.
 */
export default {
  title: "components/Calendar",
  tags: ["autodocs"],
  argTypes: {
    usage: {
      description: "용도에 따라 달력 모양이 변합니다.",
    },
    onClick: {
      description: "클릭한 날짜의 년, 월, 일 정보를 가져옵니다.",
    },
  },
  args: { onClick: fn() },
};

/**
 * 앞으로 남은 여행 일정을 볼 수 있는 달력입니다.
 */
export const Main = {
  render: () => ({
    components: { StoryCalendar },
    template: `
        <StoryCalendar usage="main-calendar" />
    `,
  }),
};

/**
 * 여행 일정을 선택할 수 있는 달력입니다.
 */
export const Select = {
  render: () => ({
    components: { StoryCalendar },
    template: `
            <StoryCalendar usage="select=calendar" />
        `,
  }),
};
