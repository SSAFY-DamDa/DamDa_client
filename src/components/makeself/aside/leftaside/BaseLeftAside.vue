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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 405px;
  padding: 10px 30px;
}

hr {
  width: 90%;
  border: 0;
  border-bottom: 1px solid #c9c9c9;
}
</style>
