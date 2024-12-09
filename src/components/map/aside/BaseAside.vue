<script setup>
import { ref, watch } from "vue";
import TripList from "@/components/map/aside/TripList.vue";
import ThePageNavigation from "@/components/common/ThePageNavigation.vue";
import { useTripStore } from "@/stores/trip";
import { getAutoComplete } from "@/api/trip";
import IconSearch from "@/components/icons/IconSearch.vue";

// debounce 유틸 함수
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

defineProps({
  currentPage: {
    type: Number,
  },
});
const emit = defineEmits(["pageChange", "searchTag", "searchTitle"]);
const tripStore = useTripStore();

const searchTitle = ref("");
const searchFilter = ref("total");
const autoCompleteList = ref([]);
const selectedLocation = ref({
  sidoCode: 0,
  gugunCode: 0,
});

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
  if (
    searchFilter.value == "area" &&
    selectedLocation.value.sidoCode == 0 &&
    selectedLocation.value.gugunCode == 0
  ) {
    alert("정확한 지역을 선택해주세요.");
    return;
  }
  emit(
    "searchTitle",
    searchTitle.value,
    searchFilter.value,
    selectedLocation.value
  );
};

const handlePageChange = (pg) => {
  emit("pageChange", pg);
};

const handleSearchTag = (tagId) => {
  emit("searchTag", tagId);
};

// handleAutoComplete을 디바운스 처리
const debouncedAutoComplete = debounce(async (keyword) => {
  if (!keyword.trim()) {
    autoCompleteList.value = [];
    return;
  }

  await getAutoComplete(
    keyword,
    (response) => {
      autoCompleteList.value = response.data.autoComplete;
    },
    (error) => {
      console.log("자동완성 에러:", error);
      autoCompleteList.value = [];
    }
  );
}, 300); // 300ms 딜레이

const isFocus = ref(false);

const setListOpen = (value) => {
  isFocus.value = value;
  if (value && searchTitle.value.trim()) {
    // focus 시 검색어가 있다면 자동완성 실행
    debouncedAutoComplete(searchTitle.value);
  }
};

// watch 수정
watch(
  () => searchTitle.value,
  (newVal) => {
    if (!newVal.trim()) {
      autoCompleteList.value = [];
      return;
    }
    debouncedAutoComplete(newVal);
    console.log("searchTitle changed:", newVal);
  },
  { immediate: true, deep: true } // immediate와 deep 옵션 추가
);

// autoCompleteList watch 수정
watch(
  autoCompleteList,
  (newVal) => {
    console.log("autoCompleteList changed:", newVal);
  },
  { deep: true } // deep 옵션 추가
);

const handleSelectItem = (item) => {
  console.log("Selected item:", item);
  searchTitle.value = `${item.sido_name} ${item.gugun_name}`;
  selectedLocation.value = {
    sidoCode: item.sido_code,
    gugunCode: item.gugun_code,
  };
  console.log("selectedLocation:", selectedLocation.value);
  setListOpen(false);
};

const handleBlur = () => {
  // blur 이벤트가 발생하고 약간의 지연 후에 목록을 닫음
  setTimeout(() => {
    setListOpen(false);
  }, 200);
};

// 기존 handleFocus 수정
const handleFocus = () => {
  setListOpen(true);
  if (searchTitle.value.trim()) {
    getAutoComplete(
      searchTitle.value,
      (response) => {
        autoCompleteList.value = response.data.autoComplete;
      },
      (error) => {
        console.log("자동완성 에러:", error);
        autoCompleteList.value = [];
      }
    );
  }
};

// 기존 handleInput 수정
const handleInput = (e) => {
  const value = e.target.value;
  if (!value.trim()) {
    autoCompleteList.value = [];
    return;
  }
  debouncedAutoComplete(value);
};
</script>

<template>
  <section id="base-aside-section">
    <div id="search-container">
      <form class="search-bar-container" @submit.prevent="handleSearchTitle">
        <select
          name="filter-search"
          class="filter-search"
          v-model="searchFilter"
        >
          <option value="total">제목</option>
          <option value="area">지역</option>
        </select>
        <input
          type="search"
          class="search-bar"
          placeholder="찾고 싶은 곳을 입력해주세요"
          v-model="searchTitle"
          @blur="handleBlur"
          @focus="handleFocus"
          @input="handleInput"
        />
        <IconSearch
          size="30"
          color="#7bbcb0"
          class="search-btn"
          @click="handleSearchTitle"
          style="cursor: pointer"
        />

        <div class="auto-complete-container">
          <ul class="auto-complete-list" v-if="isFocus">
            <li v-if="autoCompleteList.length === 0" class="auto-complete-item">
              검색결과가없음.
            </li>
            <template v-else>
              <li
                v-for="(item, idx) in autoCompleteList"
                :key="idx"
                class="auto-complete-item"
                @click="handleSelectItem(item)"
                @mousedown.prevent
              >
                {{ item.sido_name }} {{ item.gugun_name }}
              </li>
            </template>
          </ul>
        </div>
      </form>

      <div class="tag-list">
        <button
          v-for="content in contents"
          :key="content.id"
          class="tag-item"
          :style="{
            backgroundColor:
              content.id == tripStore.getParamObj.contentTypeId
                ? content.color
                : '#b5b5b5',
          }"
          @click="handleSearchTag(content.id)"
        >
          {{ content.contentType }}
        </button>
      </div>
    </div>

    <div id="list-container" v-if="tripStore.getIsLoaded">
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
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
  position: relative;
}

.select {
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.filter-search {
  width: 10%;
  min-width: 80px;
  height: 100%;
  border: 1px solid #b5b5b5;
  border-radius: 5px;
  padding: 5px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  cursor: pointer;
  outline: none;
}

.filter-search:focus {
  border-color: #c2e0db;
}

.filter-search option {
  padding: 10px;
  font-size: 1rem;
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
  cursor: pointer;
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

.auto-complete-container {
  position: absolute;
  top: 40px;
  left: 90px;
  width: 69%;
  z-index: 1000;
}

.auto-complete-list {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0;
  padding: 0;
  list-style: none;
}

.auto-complete-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.auto-complete-item:hover {
  background-color: #f5f5f5;
}
</style>
