import { ref } from "vue";
import { defineStore } from "pinia";
import damdaLogo from "@/assets/imgs/damda_logo.png";
import damdaLogoWhite from "@/assets/imgs/damda_logo_white.png";

export const useLogoStore = defineStore("logo", () => {
  const logo = ref(damdaLogo);

  const changeLogo = (color) => {
    logo.value = color === "white" ? damdaLogoWhite : damdaLogo;
  };

  return {
    logo,
    changeLogo,
  };
});
