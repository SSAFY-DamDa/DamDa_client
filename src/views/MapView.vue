<script setup>
import { ref, onMounted } from "vue";
import { tripAxios } from "@/utils/http-trip";
import { useTripStore } from "@/stores/trip";
import { loadKakaoMap } from "@/utils/loadKakaoMap";

import KakaoMap from "@/components/map/kakao/KakaoMap.vue";
import BaseAside from "@/components/map/aside/BaseAside.vue";
import noimage from "@/assets/imgs/noImage.jpg";

const axios = tripAxios();
const tripStore = useTripStore();
const currentPage = ref(1);
const isTag = ref(0);
const isTitle = ref("");

onMounted(async () => {
  tripStore.setSelectTag(0);
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchPage(currentPage.value, kakao);
  tripStore.setIsLoaded(true);
});

const fetchPage = async (page, kakao) => {
  // 검색한 상태에서 페이지 이동
  if (isTitle.value) {
    await fetchTitleSearchPage(page, kakao, isTitle.value);
  } else if (isTag.value > 0) {
    await fetchTagSearchPage(page, kakao, isTag.value);
  } else {
    try {
      const response = await axios.get("/list", {
        params: {
          pgno: page,
        },
      });

      makeTripList(response.data.tripList, kakao);
      tripStore.setSiList(response.data.siList);
      tripStore.setTotalPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  }
};

const fetchTagSearchPage = async (page, kakao, tagId) => {
  try {
    const response = await axios.get("/search", {
      params: {
        areaCode: 0,
        contentTypeId: tagId,
        title: isTitle.value,
        pgno: page,
      },
    });

    makeTripList(response.data.tripList, kakao);
    tripStore.setTotalPage(response.data.totalPage);
  } catch (error) {
    console.log(error);
  }
};

const fetchTitleSearchPage = async (page, kakao, title) => {
  try {
    const response = await axios.get("/search", {
      params: {
        areaCode: 0,
        contentTypeId: isTag.value,
        title: title,
        pgno: page,
      },
    });
    isTitle.value = title;
    makeTripList(response.data.tripList, kakao);
    tripStore.setTotalPage(response.data.totalPage);
  } catch (error) {
    console.log(error);
  }
};

const makeTripList = (_tripList, kakao) => {
  const markerInfoList = [];
  _tripList.forEach((area) => {
    // 리스트에 HTML 추가
    area.img1 = area.img1 ? area.img1 : area.img2 ? area.img2 : noimage;

    // 마커 정보 추가
    let markerInfo = {
      title: area.title,
      latlng: new kakao.maps.LatLng(area.latitude, area.longitude),
      area: area,
    };

    markerInfoList.push(markerInfo);
  });

  tripStore.setTripList(_tripList);
  tripStore.setPositions(markerInfoList);
};

const handlePageChange = async (pg) => {
  currentPage.value = pg;
  tripStore.setIsLoaded(false);
  const kakao = await loadKakaoMap();
  await fetchPage(currentPage.value, kakao);
  tripStore.setIsLoaded(true);
};

const handleSearchTag = async (tagId) => {
  currentPage.value = 1;
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  if (tripStore.getSelectTag == tagId) {
    // 똑같은 태그 또 눌렀을 경우 태그 없애기
    isTag.value = 0;
    tripStore.setSelectTag("");
    await fetchPage(1, kakao);
  } else {
    await fetchTagSearchPage(1, kakao, tagId); // 최초 검색
    tripStore.setSelectTag(tagId);
    isTag.value = tagId;
  }
  tripStore.setIsLoaded(true);
};

const handleSearchTitle = async (title) => {
  currentPage.value = 1;
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchTitleSearchPage(1, kakao, title);
  tripStore.setIsLoaded(true);
};
</script>

<template>
  <section id="map-view-section">
    <BaseAside
      v-if="tripStore.getIsLoaded"
      :currentPage="currentPage"
      @page-change="handlePageChange"
      @search-tag="handleSearchTag"
      @search-title="handleSearchTitle"
    />
    <div v-else>로딩중</div>
    <KakaoMap :positions="tripStore.getPositions" />
  </section>
</template>

<style scoped>
#map-view-section {
  height: 100%;
  display: flex;
}
</style>
