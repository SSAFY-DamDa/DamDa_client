<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["c"]);
const router = useRouter();
const userStore = useUserStore();

defineProps({
  isShow: {
    type: Boolean,
  },
});

const handleClickOutside = (e) => {
  if (e.target.classList.contains("pop-up")) {
    emit("close-pop-up", false);
  }
};

const handleMyPage = () => {
  router.push({ name: "mypage" });
};

const handleMyJourney = () => {
  router.push({ name: "mycalendar" });
};

const handleLogout = async () => {
  await userStore.storeLogout();
};
</script>

<template>
  <div v-show="isShow" class="pop-up" @click="handleClickOutside">
    <div @click="handleMyPage" class="pop-up-btn" id="pop-up-mypage">
      마이페이지
    </div>
    <div @click="handleMyJourney" class="pop-up-btn" id="pop-up-myplan">
      나의 여정
    </div>
    <div @click="handleLogout" class="pop-up-btn" id="pop-up-logout">
      로그아웃
    </div>
  </div>
</template>

<style scoped>
.pop-up {
  position: absolute;
  top: 30px;
  min-width: 65px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #c9c9c9;
  border-radius: 3px;
  background-color: #f0f0f0;
  color: #787878;
  font-size: 1.3rem;
  text-align: center;
  gap: 10px;
  padding: 10px;
}

.pop-up-btn {
  width: 100%;
  cursor: pointer;
}

.pop-up-btn:hover {
  font-weight: 600;
  transition: font-weight 0.3s ease;
  color: #000000;
  text-decoration: underline;
}
</style>
