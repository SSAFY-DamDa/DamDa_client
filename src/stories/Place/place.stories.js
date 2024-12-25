import { fn } from "@storybook/test";
import MyPlace from "./TripPlace.vue";

const contentLabels = [
  "관광지",
  "문화시설",
  "축제공연행사",
  "여행코스",
  "레포츠",
  "숙박",
  "쇼핑",
  "음식점",
];
/**
 * 여행 장소의 정보를 보여줍니다.
 */
export default {
  title: "components/Place",
  component: MyPlace,
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "장소의 이름이 들어갑니다.",
    },
    content: {
      options: contentLabels,
      control: { type: "select" },
      description: "장소의 컨텐츠가 들어갑니다.",
    },
    address: {
      description: "장소의 주소가 들어갑니다.",
    },
    onClick: {
      description: "해당 위치로 지도가 이동합니다.",
    },
  },
  args: { onClick: fn(), title: String, content: String, address: String },
};

export const Primary = {
  render: () => ({
    components: { MyPlace },
    template: `
        <MyPlace title="불국사" content="관광지" address="경주" />
    `,
  }),
};
