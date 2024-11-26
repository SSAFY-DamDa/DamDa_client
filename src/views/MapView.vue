<script setup>
import { ref, onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import {
  fetchPage,
  fetchSearchPage,
  fetchTitleSearchPage,
} from "@/utils/kakao-init";
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import BaseAside from "@/components/map/aside/BaseAside.vue";

const tripStore = useTripStore();
const currentPage = ref(1);
const isTag = ref(0);

onMounted(async () => {
  tripStore.resetParamObj();
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchPage(kakao, useTripStore());
  tripStore.setIsLoaded(true);
});

const handlePageChange = async (pg) => {
  currentPage.value = pg;
  tripStore.setParamObj({ ...tripStore.getParamObj, pgno: pg });
  tripStore.setIsLoaded(false);
  const kakao = await loadKakaoMap();
  await fetchPage(kakao, tripStore);
  tripStore.setIsLoaded(true);
};

const handleSearchTag = async (tagId) => {
  currentPage.value = 1;
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  if (tripStore.getSelectTag == tagId) {
    // 똑같은 태그 또 눌렀을 경우 태그 없애기
    tripStore.setSelectTag("");
    tripStore.setParamObj({
      ...tripStore.getParamObj,
      contentTypeId: 0,
      pgno: 1,
    });
    await fetchSearchPage(kakao, tripStore);
  } else {
    isTag.value = tagId;
    tripStore.setParamObj({
      ...tripStore.getParamObj,
      contentTypeId: tagId,
      pgno: 1,
    });
    await fetchSearchPage(kakao, tripStore); // 최초 검색
    tripStore.setSelectTag(tagId);
  }
  tripStore.setIsLoaded(true);
};

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
</script>

<template>
  <section id="map-view-section">
    <BaseAside
      :currentPage="currentPage"
      @page-change="handlePageChange"
      @search-tag="handleSearchTag"
      @search-title="handleSearchTitle"
    />
    <KakaoMap :positions="tripStore.getPositions" />
  </section>
</template>

<style scoped>
#map-view-section {
  height: 100%;
  display: flex;
}

.loading {
  width: 100%;
  height: 100%;
}
</style>
