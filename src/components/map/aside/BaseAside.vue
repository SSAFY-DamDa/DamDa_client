<script setup>
import { ref } from "vue";
import TripList from "@/components/map/aside/TripList.vue";
import ThePageNavigation from "@/components/common/ThePageNavigation.vue";
import { useTripStore } from "@/stores/trip";
defineProps({
  currentPage: {
    type: Number,
  },
});
const emit = defineEmits(["pageChange"]);
const tripStore = useTripStore();

const searchTitle = ref("");

const contents = [
  { id: 12, contentType: "관광지", color: "#3498db" },
  { id: 14, contentType: "문화시설", color: "#9b59b6" },
  { id: 15, contentType: "축제공연행사", color: "#e74c3c" },
  { id: 25, contentType: "여행코스", color: "#1abc9c" },
  { id: 28, contentType: "레포츠", color: "#f39c12" },
  { id: 32, contentType: "숙박", color: "#34495e" },
  { id: 38, contentType: "쇼핑", color: "#2ecc71" },
  { id: 39, contentType: "음식점", color: "#e67e22" },
];

const handleSearchTitle = () => {
  emit("searchTitle", searchTitle.value);
};

const handlePageChange = (pg) => {
  emit("pageChange", pg);
};

const handleSearchTag = (tagId) => {
  emit("searchTag", tagId);
};
</script>

<template>
  <section id="base-aside-section">
    <div id="search-container">
      <form class="search-bar-container" @submit.prevent="handleSearchTitle">
        <input
          type="search"
          class="search-bar"
          placeholder="찾고 싶은 곳을 입력해주세요"
          v-model="searchTitle"
        />
        <img src="@/assets/icons/search.svg" class="search-btn" />
      </form>
      <form class="tag-list">
        <button
          v-for="content in contents"
          :key="content.id"
          class="tag-item"
          :style="{
            backgroundColor:
              content.id == tripStore.getSelectTag ? content.color : '#b5b5b5',
          }"
          @click="handleSearchTag(content.id)"
        >
          {{ content.contentType }}
        </button>
      </form>
    </div>

    <div id="list-container">
      <TripList />
      <ThePageNavigation
        @page-change="handlePageChange"
        :currentPage="currentPage"
      />
    </div>
  </section>
</template>

<style scoped>
#base-aside-section {
  height: calc(100% - 60px);
  min-width: 400px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px 10px 30px;
}

#search-container {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.search-bar-container {
  width: 100%;
  min-width: 100px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
  background-color: white;
}

.search-bar {
  padding: 10px;
  width: 85%;

  border: 1px solid #b5b5b5;
  border-radius: 5px;
  text-align: left;
  background-color: white;
}

.search-btn {
  border: 0;
  text-align: center;
  background-color: white;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  word-break: keep-all;
}

.tag-list > * {
  width: calc(25% - 6px); /* 4개의 아이템이 한 줄에 들어가도록 설정 */
  flex-shrink: 0; /* 크기 축소 방지 */
  text-align: center;
}

.tag-item {
  font-size: 1.3rem;
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b5b5b5;
  color: #ffffff;
  border: 0px;
  border-radius: 10px;
}

.tag-item:hover {
  background-color: #858585;
}

#list-container {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
