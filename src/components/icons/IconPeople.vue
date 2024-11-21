<script setup>
defineProps({
  size: {
    type: String,
    default: "12",
  },
  color: {
    type: String,
    default: "#c9c9c9",
  },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 88 56"
    :fill="color"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 24C66.64 24 71.96 18.64 71.96 12C71.96 5.36 66.64 0 60 0C53.36 0 48 5.36 48 12C48 18.64 53.36 24 60 24ZM28 24C34.64 24 39.96 18.64 39.96 12C39.96 5.36 34.64 0 28 0C21.36 0 16 5.36 16 12C16 18.64 21.36 24 28 24ZM28 32C18.68 32 0 36.68 0 46V56H56V46C56 36.68 37.32 32 28 32ZM60 32C58.84 32 57.52 32.08 56.12 32.2C60.76 35.56 64 40.08 64 46V56H88V46C88 36.68 69.32 32 60 32Z"
      :fill="color"
    />
  </svg>
</template>

<style scoped></style>
