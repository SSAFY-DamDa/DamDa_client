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
  tripStore.setParamObj({
    ...tripStore.getParamObj,
    title: title,
    areaCode: location.sidoCode,
    gugunCode: location.gugunCode,
    pgno: 1,
  });
  tripStore.setIsLoaded(false);
  await fetchTitleSearchPage(kakao, filter, tripStore);
  tripStore.setIsLoaded(true);
};

const handlePageChange = async (pg) => {
  currentPage.value = pg;
  tripStore.setIsLoaded(false);
  tripStore.setParamObj({
    ...tripStore.getParamObj,
    pgno: pg,
  });
  const kakao = await loadKakaoMap();
  await fetchPage(kakao, tripStore);
  tripStore.setIsLoaded(true);
};
</script>

<template>
  <div class="search-place-container">
    <SearchBar @search-title="handleSearchTitle" />
    <div class="result-container" v-if="tripStore.getIsLoaded">
      <SearchResultList />
      <ThePageNavigation
        @page-change="handlePageChange"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>

<style scoped>
.search-place-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.result-container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
