<script setup>
defineProps({
  placeholder: {
    type: String,
  },
});
</script>

<template>
  <input class="search-bar" :placeholder="placeholder" />
</template>

<style scoped>
.search-bar {
  padding: 10px;
  width: 85%;

  border: 1px solid #aaaaaa;
  border-radius: 5px;
  text-align: left;
  background-color: #ffffff;
}
</style>
