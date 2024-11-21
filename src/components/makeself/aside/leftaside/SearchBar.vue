<script setup>
import { ref } from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const title = ref("");
</script>

<template>
  <form class="search-bar-container">
    <input
      type="search"
      class="search-bar"
      placeholder="찾고 싶은 곳을 입력해주세요"
      v-model="title"
    />
    <IconSearch
      size="35"
      color="#7bbcb0"
      @click="$emit('searchTitle', title)"
    />
  </form>
</template>

<style scoped>
.search-bar-container {
  width: 80%;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  width: 80%;
  max-width: 370px;
  padding: 15px;
  border: 1px solid #7bbcb0;
  border-radius: 5px;
}

.search-button {
  color: #7bbcb0;
}
</style>
