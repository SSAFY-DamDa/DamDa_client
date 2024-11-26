<script setup>
defineProps({
  width: {
    type: String,
    default: "22",
  },
  height: {
    type: String,
    default: "17",
  },
  color: {
    type: String,
    default: "#27BB42",
  },
});
</script>

<template>
  <svg
    :width="Number(width)"
    :height="Number(height)"
    viewBox="0 0 22 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.99147 13.4124L1.77601 8.12603L0 9.9135L6.99147 17L22 1.78747L20.2365 0L6.99147 13.4124Z"
      :fill="color"
    />
  </svg>
</template>

<style scoped></style>
