<script setup>
defineProps({
  size: {
    type: String,
    default: "30",
  },
});
</script>

<template>
  <svg
    :width="Number(size)"
    :height="Number(size)"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <rect width="30" height="30" fill="url(#pattern0_339_675)" />
    <defs>
      <pattern
        id="pattern0_339_675"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlink:href="#image0_339_675" transform="scale(0.0104167)" />
      </pattern>
      <image
        id="image0_339_675"
        width="96"
        height="96"
        xlink:href="data:image/png;base64,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"
      />
    </defs>
  </svg>
</template>

<style scoped></style>
