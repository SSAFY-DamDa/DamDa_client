<script>
import { reactive, computed } from "vue";

export default {
  name: "my-button",

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ["click"],

  setup(props, { emit }) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        "storybook-button": true,
        "storybook-button--primary": props.primary,
        "storybook-button--secondary": !props.primary,
        [`storybook-button--${props.size || "medium"}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit("click");
      },
    };
  },
};
</script>

<template>
  <button type="button" :class="classes" @click="onClick" :style="style">
    {{ label }}
  </button>
</template>

<style scoped>
@import url(../../assets/styles/variable.css);
* {
  width: 100%;
  height: 100%;
  font-size: 62.5%;
}

.storybook-button--primary {
  color: #ffffff;
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #7bbcb0;
}

.storybook-button--secondary {
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
  background-color: transparent;
  color: #333;
}
.storybook-button--small {
  width: 80px;
  font-size: 1.3rem;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aaaaaa;
  color: #ffffff;
  border: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.storybook-button--small:hover {
  background-color: #797979;
}

.storybook-button--medium {
  width: 100px;
  border: 0;
  border-radius: 20px;
  background-color: #c2e0db;
  padding: 10px 20px;
  color: white;
  font-weight: 700;
}
.storybook-button--large {
  width: calc(70% + 22px);
  padding: 10px;
  border: 0px;
  border-radius: 5px;
}
</style>
