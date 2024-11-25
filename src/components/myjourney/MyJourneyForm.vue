<script setup>
import IconCalendar from "../icons/IconCalendar.vue";
import IconMenu from "../icons/IconMenu.vue";
import IconPeople from "../icons/IconPeople.vue";
import MyJourneyDay from "./days/MyJourneyDay.vue";
import { ref } from "vue";
import PopUpMenu from "../popup/PopUpMenu.vue";
import ReviewModal from "../review/ReviewModal.vue";
import { registerReview } from "@/api/journey";

defineProps({
  info: {
    type: Object,
  },
  journeyInfo: {
    type: Object,
  },
});

const isShow = ref(false);
const isReviewModalOpen = ref(false);

const handleOpenPopUp = () => {
  isShow.value = !isShow.value;
};

const handleClosePopUp = () => {
  isShow.value = false;
};

const handleReviewModal = () => {
  isReviewModalOpen.value = true;
  isShow.value = false;
};

const handleCloseReview = () => {
  isReviewModalOpen.value = false;
};

const handleSubmitReview = (reviewData) => {
  registerReview(
    reviewData,
    () => {
      alert("리뷰가 등록되었습니다.");
    },
    (error) => {
      console.log(error);
    }
  );
  isReviewModalOpen.value = false;
};
</script>

<template>
  <div class="journey-form">
    <div class="journey-top">
      <div class="title-container">
        <div
          id="journey-detail-color"
          :style="{ backgroundColor: info.color }"
        ></div>
        <div id="journey-detail-title">{{ info.title }}</div>
        <IconMenu class="menu-button" @click.stop="handleOpenPopUp" />
        <PopUpMenu
          :infoId="info.id"
          :isShow="isShow"
          @close-pop-up="handleClosePopUp"
          @open-review="handleReviewModal"
        />
      </div>

      <div class="journey-detail-date">
        <div id="journey-detail-start" class="date-box">
          <IconCalendar size="20" class="calendar-icon" color="#7bbcb0" />
          <span>
            {{ info.startDate }}
          </span>
        </div>
        <div id="journey-detail-end" class="date-box">
          <IconCalendar size="20" class="calendar-icon" color="#7bbcb0" />
          {{ info.endDate }}
        </div>
      </div>
      <div class="journey-detail-etc">
        <div id="journey-detail-personnel">
          <IconPeople size="20" color="#7bbcb0" />
          {{ info.personnel }}
        </div>
      </div>
    </div>
    <div class="journey-bottom">
      <MyJourneyDay v-if="journeyInfo" :journeyInfo="journeyInfo" />
    </div>
    <ReviewModal
      :isOpen="isReviewModalOpen"
      :journeyId="info.id"
      @close="handleCloseReview"
      @submit="handleSubmitReview"
    />
  </div>
</template>

<style scoped>
.journey-form {
  width: 100%;
  max-width: 405px;
  display: flex;
  flex-direction: column;
}
.journey-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #7bbcb0;
  margin-bottom: 10px;
}

.title-container {
  position: relative;
  width: 80%;
  display: flex;
  align-items: center;
}

#journey-detail-title {
  width: 90%;
  font-size: 2rem;
  font-weight: bold;
  padding: 10px;
  margin: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #7bbcb0;
}

.journey-detail-date {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
}

.date-box {
  display: flex;
  border: 1px solid #7bbcb0;
  border-radius: 10px;
  gap: 10px;
  padding: 15px 20px;
}

.journey-detail-etc {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
}

#journey-detail-personnel {
  display: flex;
  align-items: center;
  width: 90%;
  gap: 10px;
  border: 1px solid #7bbcb0;
  border-radius: 10px;
  padding: 15px 10px;
}

#journey-detail-color {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.menu-button {
}

.journey-bottom {
  overflow: auto;
}

.journey-bottom::-webkit-scrollbar {
  width: 4px;
}

.journey-bottom::-webkit-scrollbar-thumb {
  background-color: rgb(170, 170, 170);
  border-radius: 20px;
}

.journey-bottom::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
</style>
