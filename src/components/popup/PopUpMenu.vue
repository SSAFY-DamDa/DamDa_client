<script setup>
import { deleteJourney } from "@/api/journey";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  isShow: {
    type: Boolean,
  },
  infoId: {
    type: Number,
  },
});

const emit = defineEmits(["close-pop-up", "open-review"]);

const handleReview = () => {
  emit("open-review");
};

const handleDeleteJourney = () => {
  deleteJourney(
    props.infoId,
    () => {
      console.log("여행 삭제 성공");
      alert("여행 삭제에 성공했습니다.");
      router.push({ name: "mycalendar" });
    },
    (error) => {
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
      console.log("여행 삭제 실패", error);
    }
  );
};
</script>

<template>
  <div v-show="isShow" class="pop-up" @click="handleClickOutside">
    <div @click="handleReview" class="pop-up-btn" id="pop-up-review">
      AI 기능 리뷰
    </div>
    <div @click="handleDeleteJourney" class="pop-up-btn" id="pop-up-delete">
      여행 삭제
    </div>
  </div>
</template>

<style scoped>
.pop-up {
  position: absolute;
  top: 20px;
  left: 330px;
  min-width: 65px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  background-color: #ffffff;
  color: #787878;
  font-size: 1.3rem;
  text-align: center;
  gap: 10px;
  padding: 10px;
  z-index: 1000;
}

.pop-up-btn {
  width: 100%;
  cursor: pointer;
}

#pop-up-review:hover {
  color: #000000;
  text-decoration: underline;
}
#pop-up-delete:hover {
  color: #000000;
  text-decoration: underline;
}
</style>
