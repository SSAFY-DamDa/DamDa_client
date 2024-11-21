<script setup>
import { ref, computed, watch, onMounted } from "vue";
import IconDeleteItem from "@/components/icons/IconDeleteItem.vue";
import IconAddCheck from "@/components/icons/IconAddCheck.vue";
import IconAddToList from "@/components/icons/IconAddToList.vue";
import { useJourneyStore } from "@/stores/journey";
import { useKakaoStore } from "@/stores/kakao";

const kakaoStore = useKakaoStore();
const journeyStore = useJourneyStore();

const props = defineProps({
  tripItem: {
    type: Object,
    required: true,
  },
});

const contentLabel = {
  12: ["관광지", "#3498db"],
  14: ["문화시설", "#9b59b6"],
  15: ["축제공연행사", "#e74c3c"],
  25: ["여행코스", "#1abc9c"],
  28: ["레포츠", "#f39c12"],
  32: ["숙박", "#34495e"],
  38: ["쇼핑", "#2ecc71"],
  39: ["음식점", "#e67e22"],
};

const handleClickMove = () => {
  const latlng = { La: props.tripItem.latitude, Ma: props.tripItem.longitude };
  kakaoStore.setCoordinate([latlng.La, latlng.Ma]);
};

const isAdded = ref(false);

const handleAddPlace = () => {
  const openDay = journeyStore.journeyDay.find((day) => day.isOpen);
  if (openDay && !isAdded.value) {
    journeyStore.addPlaceToDay(props.tripItem);
    isAdded.value = true;
  }
};

const handleDeletePlace = () => {
  journeyStore.journeyDay.forEach((day) => {
    day.places = day.places.filter((place) => place.id !== props.tripItem.id);
  });
  isAdded.value = false;
};
</script>

<template>
  <li class="trip-list-item-container" @click="handleClickMove">
    <img :src="tripItem.img1" alt="이미지 준비중" class="trip-item-img" />
    <div class="trip-item-box">
      <div class="trip-item-subject-box">
        <span
          class="trip-item-type"
          :style="{
            backgroundColor: contentLabel[tripItem.content_type_id][1],
          }"
          >{{ contentLabel[tripItem.content_type_id][0] }}</span
        >
        <span class="trip-item-title">{{ tripItem.title }}</span>
      </div>
      <span class="trip-item-address"
        >{{ tripItem.addr1 }}{{ tripItem.addr2 }}</span
      >
    </div>
    <IconAddToList
      v-if="!isAdded"
      size="25"
      class="icon-add-to-list"
      @click.stop="handleAddPlace"
    />
    <IconDeleteItem
      v-else
      size="25"
      class="icon-delete-item"
      @click.stop="handleDeletePlace"
    />
  </li>
</template>

<style scoped>
.trip-list-item-container {
  width: 95%;
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trip-item-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  flex: 1;
}

.trip-item-box {
  min-height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 3;
}

.icon-add-to-list .icon-delete-item {
  flex: 1;
}

.trip-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.trip-item-type {
  width: 50px;
  max-height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 1.1rem;
  color: white;
}

.trip-item-title {
  line-height: 25px;
  font-weight: 700;
  font-size: 1.5rem;
}

.trip-item-address {
  font-weight: 300;
  font-size: 1.2rem;
  color: #797979;
  line-height: 12px;
  word-break: keep-all;
}
</style>
