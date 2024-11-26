<script setup>
import { ref } from "vue";
import SearchBar from "@/components/makeself/aside/leftaside/SearchBar.vue";
import SearchResultList from "@/components/makeself/aside/leftaside/SearchResultList.vue";
import ThePageNavigation from "@/components/common/ThePageNavigation.vue";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { fetchPage, fetchTitleSearchPage } from "@/utils/kakao-init";
import { useTripStore } from "@/stores/trip";

const currentPage = ref(1);
const tripStore = useTripStore();

const handleSearchTitle = async (title, filter, location) => {
  currentPage.value = 1;
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchTitleSearchPage(1, kakao, title, filter, location, tripStore);
  tripStore.setIsLoaded(true);
};

const handlePageChange = async (pg) => {
  currentPage.value = pg;
  tripStore.setIsLoaded(false);
  const kakao = await loadKakaoMap();
  await fetchPage(currentPage.value, kakao, tripStore);
  tripStore.setIsLoaded(true);
};
</script>

<template>
  <div class="search-place-container">
    <SearchBar @search-title="handleSearchTitle" />
    <SearchResultList />
    <ThePageNavigation
      @page-change="handlePageChange"
      :currentPage="currentPage"
    />
  </div>
</template>

<style scoped>
.search-place-container {
  width: 100%;
  height: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>
