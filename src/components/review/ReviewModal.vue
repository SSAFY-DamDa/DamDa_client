<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  journeyId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close", "submit"]);

const ratings = ref(0);
const comment = ref("");

const handleSubmit = () => {
  if (ratings.value === 0) {
    alert("별점을 선택해주세요.");
    return;
  }

  emit("submit", {
    userId: userStore.userInfo.userId,
    journeyId: props.journeyId,
    ratings: ratings.value,
    comment: comment.value,
  });
  comment.value = "";
  ratings.value = 0;
};

const handleClose = () => {
  emit("close");
  comment.value = "";
  ratings.value = 0;
};
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
      <div class="modal-content">
        <div class="modal-header">
          <h2>AI 추천 기능 리뷰</h2>
          <button class="close-btn" @click="handleClose">&times;</button>
        </div>

        <div class="modal-body">
          <div class="rating-section">
            <p>AI 추천 기능에 대한 평가를 남겨주세요</p>
            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                :class="['star', { active: i <= ratings }]"
                @click="ratings = i"
              >
                ★
              </span>
            </div>
          </div>

          <div class="review-section">
            <p>한 줄 후기</p>
            <input
              type="text"
              class="review-input"
              v-model="comment"
              placeholder="한 줄 후기를 남겨주세요 (필수)"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button class="submit-btn" @click="handleSubmit">등록하기</button>
          <button class="cancel-btn" @click="handleClose">취소</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 95%;
  max-width: 550px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 25px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #666;
}

.modal-body {
  padding: 25px;
}

.rating-section,
.review-section {
  margin-bottom: 20px;
}

.rating-section p,
.review-section p {
  margin-bottom: 10px;
  color: #666;
  font-size: 1.25rem;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.star {
  font-size: 36px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease;
}

.star:hover {
  color: #ffd700;
}

.star.active {
  color: #ffd700;
}

.review-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  min-height: 100px;
  box-sizing: border-box;
  font-size: 1.15rem;
}

.review-input:focus {
  outline: none;
  border-color: #c2e0db;
}

.modal-footer {
  padding: 25px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.submit-btn,
.cancel-btn {
  padding: 12px 28px;
  border: none;
  border-radius: 25px;
  font-size: 1.15rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn {
  background-color: #c2e0db;
  color: white;
}

.submit-btn:hover {
  background-color: #a5ccc5;
}

.cancel-btn {
  background-color: #c9c9c9;
  color: white;
}

.cancel-btn:hover {
  background-color: #b5b5b5;
}

/* 트랜지션 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
