<script setup>
import { useTripStore } from "@/stores/trip";
import { computed } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
  },
});
const emit = defineEmits(["pageChange"]);
const tripStore = useTripStore();
const totalPage = tripStore.getTotalPage;

const startPage = computed(() => {
  return parseInt(parseInt(props.currentPage - 1) / 10) * 10;
});

const endPage = computed(() => {
  const div = parseInt(parseInt(props.currentPage - 1) / 10) + parseInt(1);
  let lastPage = div * 10;
  return totalPage < lastPage ? totalPage : lastPage;
});

const range = (start, end) => {
  const list = [];
  for (let i = start + 1; i <= end; i++) {
    list.push(i);
  }
  return list;
};

const handlePageChange = (pg) => {
  emit("pageChange", pg);
};
</script>

<template>
  <div id="pagenavigation">
    <ul id="page-ul">
      <li class="page-link" @click="handlePageChange(1)">처음</li>
      <li
        class="page-link"
        @click="handlePageChange(startPage == 1 ? 1 : startPage)"
      >
        이전
      </li>
      <template v-for="pg in range(startPage, endPage)" :key="'key-' + pg">
        <li
          :class="currentPage === pg ? 'page-item active' : 'page-item'"
          @click="handlePageChange(pg)"
        >
          {{ pg }}
        </li>
      </template>
      <li
        class="page-link"
        @click="handlePageChange(endPage ? endPage + 1 : totalPage)"
      >
        다음
      </li>
      <li
        class="page-link"
        id="page-link-last"
        @click="handlePageChange(totalPage)"
      >
        끝
      </li>
    </ul>
  </div>
</template>

<style scoped>
#pagenavigation {
  display: flex;
  justify-content: center;
  width: 100%;
}

#page-ul {
  padding: 1px;
  font-size: 1.2rem;
}

ul,
li {
  list-style-type: none;
}

ul {
  gap: 10px;
}

li {
  border-left: 1px solid #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: antiquewhite;
}

li:hover {
  background-color: rgb(252, 223, 185);
}

.page-link {
  height: 30px;
  padding: 0 5px;
}

#page-link-last {
  border-right: 1px solid #ffffff;
}

.page-item {
  padding: 0 5px;
  height: 30px;
}

.active {
  background-color: rgb(252, 223, 185);
}
</style>
