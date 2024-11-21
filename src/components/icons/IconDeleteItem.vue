<script setup>
defineProps({
  size: {
    type: String,
    default: "22",
  },
  color: {
    type: String,
    default: "#EB7171",
  },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.82477 15.4123C9.82477 16.8943 10.4135 18.3155 11.4613 19.3634C12.5092 20.4113 13.9305 21 15.4124 21C16.8943 21 18.3156 20.4113 19.3635 19.3634C20.4113 18.3155 21 16.8943 21 15.4123C21 13.9304 20.4113 12.5092 19.3635 11.4613C18.3156 10.4134 16.8943 9.82471 15.4124 9.82471C13.9305 9.82471 12.5092 10.4134 11.4613 11.4613C10.4135 12.5092 9.82477 13.9304 9.82477 15.4123Z"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.6185 15.4124H18.2062"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.98454 16.366H2.39691C2.02643 16.366 1.67112 16.2188 1.40914 15.9569C1.14717 15.6949 1 15.3396 1 14.9691V3.8078C1 3.43731 1.14717 3.082 1.40914 2.82003C1.67112 2.55806 2.02643 2.41089 2.39691 2.41089H14.9691C15.3396 2.41089 15.6949 2.55806 15.9568 2.82003C16.2188 3.082 16.366 3.43731 16.366 3.8078V7.98455"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 6.58765H16.366"
      :stroke="color"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M5.1842 3.79382V1"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M12.1688 3.79382V1"
      stroke="#EB7171"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped></style>
