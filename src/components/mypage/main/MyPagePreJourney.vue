<script setup>
import { getPreJourney } from "@/api/journey";
import { useUserStore } from "@/stores/user";
import { ref, watch } from "vue";
import JourneyListItem from "@/components/main/journey/item/JourneyListItem.vue";
import { useJourneyStore } from "@/stores/journey";

const userStore = useUserStore();
const journeyStore = useJourneyStore();
const thisYear = ref(new Date().getFullYear());
const yearList = ref([]);
const monthList = ref([
  "월",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "8",
  "9",
  "10",
  "11",
  "12",
]);

const selectedYear = ref(thisYear.value);
const selectedMonth = ref("월");

for (let i = 2000; i <= thisYear.value; i++) {
  yearList.value.push(i);
}

const handleYearChange = () => {
  selectedMonth.value = "월";
};

const preJourneyList = ref([]);

watch(
  () => selectedMonth.value,
  async (newMonth) => {
    if (newMonth === "월") return;
    console.log("newMonth", newMonth);
    const formData = selectedYear.value + "-" + newMonth;
    console.log("formData", formData);
    await getPreJourney(
      { userId: userStore.userInfo.userId, startDate: formData },
      (response) => {
        preJourneyList.value = response.data.journey;
        journeyStore.setUserJourneyList(preJourneyList.value);
        console.log("이전 여정들", preJourneyList.value);
      },
      (error) => {
        console.log("이전 여정 불러오는 도중 오류!", error);
      }
    );
  }
);
</script>

<template>
  <main>
    <h3>다녀온 추억</h3>
    <section class="select-date-section">
      <select
        id="select-year"
        class="select-date"
        v-model="selectedYear"
        @change="handleYearChange"
      >
        <option v-for="year in yearList" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <span>년</span>
      <select id="select-month" class="select-date" v-model="selectedMonth">
        <option v-for="month in monthList" :key="month" :value="month">
          {{ month }}
        </option>
      </select>
      <span>월</span>
    </section>
    <section class="pre-journey-section">
      <div class="pre-journey-list" v-if="preJourneyList.length > 0">
        <JourneyListItem
          v-for="journey in preJourneyList"
          :key="journey.journeyId"
          :journey="journey"
        />
      </div>
      <div id="non-pre-journey-text" v-else>여정이 없어요!</div>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 70%;
  display: flex;
  flex-direction: column;
}

main > h3,
main > section {
  margin-left: 50px;
}

.select-date-section {
  width: 30%;
  height: 30px;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;

  .select-date {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #c9c9c9;
    padding: 5px;
    font-size: 1.4rem;
    color: #787878;
    background-color: white;
    appearance: none;
    cursor: pointer;
    outline: none;
  }

  #select-month {
    width: 50%;
    min-width: 25px;
  }

  #select-year {
    min-width: 40px;
  }

  .select-date::-webkit-scrollbar {
    width: 4px;
  }

  .select-date::-webkit-scrollbar-thumb {
    background-color: rgb(170, 170, 170);
    border-radius: 20px;
  }

  .select-date::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
}

.pre-journey-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pre-journey-list {
  width: 100%;
}

#non-pre-journey-text {
  font-size: 2rem;
  color: #787878;
}
</style>
