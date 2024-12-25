import { fn } from "@storybook/test";
import InputContainer from "@/components/welcome/signup/inputcontainer/InputContainer.vue";
import TripTitleInput from "./TripTitleInput.vue";
import PlaceSearchInput from "./PlaceSearchInput.vue";

export default {
  title: "components/Input",
  tags: ["autodocs"],
  argTypes: {
    error: {
      description: "요구사항에 맞지 않는 입력이 들어온 경우 활성화",
    },
  },
  args: { onFocus: fn() },
};

/**
 * 로그인, 회원가입, 회원 정보 변경 등 회원과 관련된 Input창 입니다.
 */
export const UserDataInput = {
  render: () => ({
    components: { InputContainer },
    setup() {
      return {
        buttons: [
          {
            placeholder: "OOO을 입력해주세요.",
            usage: "user",
            primary: true,
            error: false,
          },
          {
            placeholder: "OOO를 입력해주세요.",
            usage: "user",
            primary: true,
            error: "잘못입력하였습니다.",
          },
        ],
      };
    },
    template: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <InputContainer 
            v-for="(btn, index) in buttons" 
            :key="index" 
            v-bind="btn" 
          />
        </div>
      `,
    argTypes: {
      error: {
        description: "errorrr",
      },
    },
  }),
};

/**
 * 여행 제목 입력 Input창 입니다.
 */
export const TitleInput = {
  render: () => ({
    components: { TripTitleInput },
    setup() {
      return {
        buttons: [
          {
            placeholder: "여행의 제목을 입력해주세요.",
            primary: true,
            error: false,
          },
        ],
      };
    },
    template: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <TripTitleInput 
                v-for="(btn, index) in buttons" 
                :key="index" 
                v-bind="btn" 
              />
            </div>
          `,
  }),
};

/**
 * 장소를 검색하는 Input창 입니다.
 */
export const SearchInput = {
  render: () => ({
    components: { PlaceSearchInput },
    setup() {
      return {
        buttons: [
          {
            placeholder: "찾고 싶은 곳을 입력해주세요",
            primary: true,
            error: false,
          },
        ],
      };
    },
    template: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <PlaceSearchInput 
                v-for="(btn, index) in buttons" 
                :key="index" 
                v-bind="btn" 
              />
            </div>
          `,
  }),
};
