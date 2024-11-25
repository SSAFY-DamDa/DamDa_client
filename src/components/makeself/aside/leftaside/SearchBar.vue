<script setup>
import { ref } from "vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const title = ref("");
</script>

<template>
  <form
    class="search-bar-container"
    @submit.prevent="$emit('searchTitle', title)"
  >
    <input
      type="search"
      class="search-bar"
      placeholder="찾고 싶은 곳을 입력해주세요"
      v-model="title"
    />
    <IconSearch
      size="30"
      color="#7bbcb0"
      @click="$emit('searchTitle', title)"
    />
  </form>
</template>

<style scoped>
.search-bar-container {
  width: 100%;
  min-width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.search-bar {
  width: 85%;
  padding: 10px;
  border: 1px solid #7bbcb0;
  border-radius: 5px;
}

.search-button {
  color: #7bbcb0;
}
</style>
