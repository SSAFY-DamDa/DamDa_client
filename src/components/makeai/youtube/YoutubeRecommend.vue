<script setup>
import { ref, onMounted } from "vue";
import { useAiJourneyStore } from "@/stores/aijourney";

const aiJourneyStore = useAiJourneyStore();

const videos = ref([]);
const { VITE_YOUTUBE_API_KEY } = import.meta.env;
const fetchVideos = async (keyword) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&maxResults=4&key=${VITE_YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    videos.value = data.items;
  } catch (error) {
    console.error("YouTube API 호출 중 오류:", error);
  }
};

onMounted(() => {
  fetchVideos(aiJourneyStore.selectPlaceName + "여행"); // 원하는 검색어로 변경하세요
});
</script>

<template>
  <section id="youtube-container">
    <span class="youtube-title">이런 영상 보고 가는건 어떤가요?</span>
    <div id="youtube-list-container">
      <div v-for="video in videos" :key="video.id.videoId" class="video-item">
        <a
          :href="`https://www.youtube.com/watch?v=${video.id.videoId}`"
          target="_blank"
        >
          <img
            :src="video.snippet.thumbnails.medium.url"
            :alt="video.snippet.title"
          />
          <h3>{{ video.snippet.title }}</h3>
          <p>{{ video.snippet.channelTitle }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
#youtube-container {
  width: 95%;
  height: auto;
  padding: 20px;
}

.youtube-title {
  font-size: 2rem;
  font-weight: bold;
  display: block;
  margin-bottom: 20px;
}

#youtube-list-container {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 5px 0;
}

.video-item {
  min-width: 320px;
  cursor: pointer;
}

.video-item a {
  text-decoration: none;
  color: inherit;
}

.video-item img {
  width: 95%;
  border-radius: 8px;
}

.video-item h3 {
  margin: 8px 0;
  font-size: 1rem;
  line-height: 1.4;
  word-break: keep-all;
}

.video-item p {
  color: #666;
  font-size: 0.9rem;
}
</style>
