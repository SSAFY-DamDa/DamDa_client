<script setup>
import SetInfoTrip from "@/components/makeself/aside/leftaside/SetInfoTrip.vue";
import SearchPlace from "@/components/makeself/aside/leftaside/SearchPlace.vue";
</script>

<template>
  <section id="left-aside-container">
    <SetInfoTrip />
    <hr />
    <SearchPlace />
  </section>
</template>

<style scoped>
#left-aside-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 405px;
}

hr {
  width: 90%;
  border: 0;
  border-bottom: 1px solid #c9c9c9;
}
</style>
