<script setup>
defineProps({
  size: {
    type: String,
    default: "25",
  },
  color: {
    type: String,
    default: "#7BBCB0",
  },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 29 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.4167 6.58333H0.375V9.5H16.4167V6.58333ZM16.4167 0.75H0.375V3.66667H16.4167V0.75ZM22.25 12.4167V6.58333H19.3333V12.4167H13.5V15.3333H19.3333V21.1667H22.25V15.3333H28.0833V12.4167H22.25ZM0.375 15.3333H10.5833V12.4167H0.375V15.3333Z"
      :fill="color"
    />
  </svg>
</template>

<style scoped></style>
