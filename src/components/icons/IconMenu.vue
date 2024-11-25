<script setup>
defineProps({
  width: {
    type: String,
    default: "26",
  },
  height: {
    type: String,
    default: "20",
  },
  color: {
    type: String,
    default: "#c9c9c9",
  },
});
</script>

<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 20H26V16.6667H0V20ZM0 11.6667H26V8.33333H0V11.6667ZM0 0V3.33333H26V0H0Z"
      :fill="color"
    />
  </svg>
</template>

<style scoped></style>
