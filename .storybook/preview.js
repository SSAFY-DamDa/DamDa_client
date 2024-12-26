/** @type { import('@storybook/vue3').Preview } */
import { setup } from "@storybook/vue3";
import { createPinia } from "pinia";

// Pinia 설정
setup((app) => {
  const pinia = createPinia();
  app.use(pinia);
});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
