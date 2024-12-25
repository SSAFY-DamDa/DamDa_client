<script setup>
defineProps({
  placeholder: {
    type: String,
  },
});
</script>

<template>
  <input type="text" class="set-title" :placeholder="placeholder" />
</template>

<style scoped>
.set-title {
  width: 95%;
  height: 30px;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #c2e0db;
  outline: none;
  font-size: 1.8rem;
}

.set-title:focus {
  border-bottom: 2px solid #7bbcb0;
}
</style>
