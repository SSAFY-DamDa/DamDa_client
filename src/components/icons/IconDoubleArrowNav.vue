<script setup>
defineProps({
  size: {
    type: String,
    default: "30",
  },
  color: {
    type: String,
    default: "#000000",
  },
  angle: {
    type: String,
    default: "0",
  },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :transform="'rotate(' + Number(angle) + ')'"
    viewBox="0 0 19 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect
      x="15"
      y="15"
      width="15"
      height="15"
      transform="rotate(-180 15 15)"
      fill="url(#pattern0_340_427)"
    />
    <rect
      x="19"
      y="15"
      width="15"
      height="15"
      transform="rotate(-180 19 15)"
      fill="url(#pattern1_340_427)"
    />
    <defs>
      <pattern
        id="pattern0_340_427"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlink:href="#image0_340_427" transform="scale(0.015625)" />
      </pattern>
      <pattern
        id="pattern1_340_427"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlink:href="#image0_340_427" transform="scale(0.015625)" />
      </pattern>
      <image
        id="image0_340_427"
        width="64"
        height="64"
        xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAh5JREFUeJztmktuE0EURc8zyGEtCDFgyAqIiPgowjtAKGIB5eoFuLvtKQLBEgiEj0BiDcAQmLEJRrGJ6jEAg4kaooCr6xHeGXZJfeselfpT3eA4juM4juM4jvMfIqUn8CuqqjqfUrqtqqdU9cF0On2dI8ekgBjjlqo+Aja+HToALjZN82bdWYN1n/BvCSFsquouP8oDnFbVmznyTAkIIWyKyB5w5vCYiHzOkWlGQIxxS0Se0lEemA8Gg3s5ck0IWFn2w47hhYiMJpPJuxzZxS+Cv1v2fC1/o67r57nyiwooXR4KCrBQHgoJsFIeCgiwVB56FmCtPPQowGJ56EmA1fLQgwDL5SGzAOvlIaOAf6E8ZBJQVdW5lNJbfn6lXTJX1e22bV/myD4uWV6GUkq36C6/EJGRlfKQSYCIaI7z5iDXCrgPzDuGhqr6MIRwOUfun5BFQNu274FrwH7H8IaI7MUYr+TIPi5Zb4Pj8fgS8ATDd4LsD0LWJfTyKGxZQm8vQ1Yl9LYp2jTNK+A63RfGoaruhhCu9jWfJb1viBy1ElR11Lbts77mU2RLzJKEYpuiViQU3Ra3IKH4h5HSEooLgLISTAiA7/8EPKb7++BcRC7Udf1h3bkmPo4C1HX9QkS2gUXH8Iaq7uTINSMAjpRwsv8PWLIiYXU/4RNwN0eemWvAYWKMZ1V1R1UPUkp3ZrPZx9JzchzHcRzHcRzHOTF8AfI/Flv8Pq5NAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
</template>

<style scoped></style>
