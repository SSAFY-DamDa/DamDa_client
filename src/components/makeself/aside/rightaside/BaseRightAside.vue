<script setup>
import MakeTripList from "./MakeTripList.vue";
</script>

<template>
  <section id="right-aside-container">
    <MakeTripList />
  </section>
</template>

<style scoped>
#right-aside-container {
  position: absolute;
  top: 80px;
  left: 410px;
  width: 405px;
  height: 90%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  z-index: 100;
}
</style>
