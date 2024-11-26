<script setup>
import { useTripStore } from "@/stores/trip";
import { computed } from "vue";
import IconArrowNav from "../icons/IconArrowNav.vue";
import IconDoubleArrowNav from "../icons/IconDoubleArrowNav.vue";

const props = defineProps({
  currentPage: {
    type: Number,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});
const emit = defineEmits(["pageChange"]);
const tripStore = useTripStore();
const totalPage = tripStore.getTotalPage;

const startPage = computed(() => {
  return (
    parseInt(parseInt(props.currentPage - 1) / props.pageSize) * props.pageSize
  );
});

const endPage = computed(() => {
  const div =
    parseInt(parseInt(props.currentPage - 1) / props.pageSize) + parseInt(1);
  let lastPage = div * props.pageSize;
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
      <li class="page-link" @click="handlePageChange(1)">
        <IconDoubleArrowNav angle="180" />
      </li>
      <li
        class="page-link"
        @click="handlePageChange(startPage == 1 ? 1 : startPage)"
      >
        <IconArrowNav size="25" angle="180" />
      </li>
      <div id="page-number">
        <template v-for="pg in range(startPage, endPage)" :key="'key-' + pg">
          <li
            :class="currentPage === pg ? 'page-item-active' : 'page-item'"
            @click="handlePageChange(pg)"
          >
            {{ pg }}
          </li>
        </template>
      </div>
      <li
        class="page-link"
        @click="handlePageChange(endPage ? endPage + 1 : totalPage)"
      >
        <IconArrowNav size="25" />
      </li>
      <li
        class="page-link"
        id="page-link-last"
        @click="handlePageChange(totalPage)"
      >
        <IconDoubleArrowNav />
      </li>
    </ul>
  </div>
</template>

<style scoped>
#pagenavigation {
  display: flex;
  justify-content: center;
}

#page-ul {
  padding: 1px;
  font-size: 1.2rem;
  display: flex;
}

ul,
li {
  list-style-type: none;
}

li {
  border-radius: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #787878;
  cursor: pointer;
}

.page-item:hover {
  width: 30px;
  height: 30px;
  border-radius: 30%;
  background-color: #c2e0db;
}

#page-number {
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #f0f0f0;
}

.page-link {
  align-content: center;
}

.page-item {
  width: 30px;
  height: 30px;
}

.page-item-active {
  width: 28px;
  height: 28px;
  border-radius: 30%;
  background-color: #7bbcb0;
  font-weight: bold;
  color: #ffffff;
}
</style>
