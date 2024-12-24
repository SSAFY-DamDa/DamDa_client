<script setup>
import LoadingAIResultList from "./LoadingAIResultList.vue";
import LoadingSetJourneyInfo from "./LoadingSetJourneyInfo.vue";
</script>

<template>
  <section class="journey-info-container">
    <LoadingSetJourneyInfo />
    <hr />
    <LoadingAIResultList />

    <div class="btn-container">
      <button class="like-btn">마음에 들어요</button>
      <button class="regen-btn">다시 해주세요</button>
    </div>
  </section>
</template>

<style scoped>
.journey-info-container {
  width: 100%;
  max-width: 405px;
  display: flex;
  flex-direction: column;
  padding: 10px 30px 10px 30px;
}

hr {
  width: 90%;
  border: 0;
  border-bottom: 1px solid #c9c9c9;
}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.like-btn {
  width: 150px;
  border: 0;
  border-radius: 20px;
  background-color: #c2e0db;
  padding: 20px;
  color: white;
  font-weight: 700;
}

.regen-btn {
  width: 150px;
  border: 0;
  border-radius: 20px;
  background-color: #c9c9c9;
  padding: 20px;
  color: white;
  font-weight: 700;
}
</style>
