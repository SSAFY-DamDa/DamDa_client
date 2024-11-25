<script setup>
import { getReviewList } from "@/api/journey";
import { onMounted, ref, onUnmounted, computed } from "vue";

const reviews = ref([]);
const currentIndex = ref(0);

onMounted(async () => {
  await getReviewList(
    (response) => {
      reviews.value = response.data.reviews;
      console.log(response.data.reviews);
      if (reviews.value.length > 0) {
        startAutoSlide();
      }
    },
    (error) => {
      console.log(error);
    }
  );
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getVisibleReviews = () => {
  if (!reviews.value.length) return [];

  const itemsPerSlide = 4;
  const slides = [];

  // 첫 번째 슬라이드: 처음 4개
  slides.push(reviews.value.slice(0, itemsPerSlide));

  // 두 번째 슬라이드: 나머지 + 처음부터 채우기
  if (reviews.value.length > itemsPerSlide) {
    const secondSlide = [];
    // 남은 아이템 추가
    for (let i = itemsPerSlide; i < reviews.value.length; i++) {
      secondSlide.push(reviews.value[i]);
    }
    // 4개가 될 때까지 처음부터 추가
    for (let i = 0; secondSlide.length < itemsPerSlide; i++) {
      secondSlide.push(reviews.value[i]);
    }
    slides.push(secondSlide);
  }

  return slides;
};

const totalSlides = computed(() => getVisibleReviews().length);

const nextSlide = () => {
  if (totalSlides.value <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % totalSlides.value;
};

const prevSlide = () => {
  if (totalSlides.value <= 1) return;
  currentIndex.value =
    currentIndex.value === 0 ? totalSlides.value - 1 : currentIndex.value - 1;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

let autoSlideTimer;
const startAutoSlide = () => {
  stopAutoSlide();
  autoSlideTimer = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
  }
};

onUnmounted(() => {
  stopAutoSlide();
});

const maskUserId = (userId) => {
  if (!userId) return "";
  const visiblePart = userId.slice(0, 2);
  const maskedPart = "*".repeat(userId.length - 2);
  return visiblePart + maskedPart;
};
</script>

<template>
  <div class="review-list-container">
    <div class="review-slider">
      <button v-if="totalSlides > 1" class="slider-btn prev" @click="prevSlide">
        ❮
      </button>
      <div class="review-window">
        <div
          class="review-track"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(slide, slideIndex) in getVisibleReviews()"
            :key="slideIndex"
            class="review-slide"
          >
            <div
              v-for="review in slide"
              :key="`${slideIndex}-${review.id}`"
              class="review-card"
            >
              <div class="review-header">
                <div class="stars">
                  <span
                    v-for="i in 5"
                    :key="i"
                    class="star"
                    :class="{ active: i <= review.ratings }"
                    >★</span
                  >
                </div>
              </div>
              <div class="review-content">
                <p>{{ review.comment }}</p>
              </div>
              <div class="review-footer">
                <span class="user-id">{{ maskUserId(review.userId) }}</span>
                <span class="date">{{ formatDate(review.registerTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button v-if="totalSlides > 1" class="slider-btn next" @click="nextSlide">
        ❯
      </button>
    </div>

    <div v-if="totalSlides > 1" class="slider-dots">
      <button
        v-for="n in totalSlides"
        :key="n - 1"
        class="dot"
        :class="{ active: currentIndex === n - 1 }"
        @click="goToSlide(n - 1)"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.review-list-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  overflow: hidden; /* 추가 */
}

.review-slider {
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.review-window {
  width: 100%;
  overflow: hidden;
  position: relative; /* 추가 */
}

.review-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.review-slide {
  min-width: 100%;
  width: 100%; /* 추가 */
  display: flex;
  gap: 25px;
  padding: 0 20px;
  box-sizing: border-box;
  flex: 0 0 100%; /* 추가 */
}

.review-card {
  flex: 1;
  width: calc(25% - 19px);
  min-width: 0;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 반응형 스타일 */
@media (max-width: 1200px) {
  .review-list-container {
    max-width: 1100px;
  }

  .review-card {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .review-slide {
    flex-wrap: wrap;
    gap: 20px;
  }

  .review-card {
    flex: 0 0 calc(50% - 10px);
  }
}

.review-header {
  display: flex;
  align-items: center;
}

.stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 16px;
}

.star.active {
  color: #ffd700;
}

.review-content {
  flex-grow: 1;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
  word-break: break-word;
}

.review-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.user-id {
  color: #666;
  font-weight: bold;
  font-size: 0.9rem;
}

.date {
  color: #666;
  font-size: 0.8rem;
}

.slider-btn {
  background: #7bbcb0;
  border: none;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  margin: 0 10px;
  font-size: 18px;
}

.slider-btn:hover {
  background: #69a69b;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  padding: 0;
}

.dot.active {
  background-color: #7bbcb0;
}
</style>
