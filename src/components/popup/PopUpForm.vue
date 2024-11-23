<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const emit = defineEmits(["closePopUp"]);
const router = useRouter();
const userStore = useUserStore();

defineProps({
  isShow: {
    type: Boolean,
  },
});

const handleMyPage = () => {
  emit("closePopUp", false);
  router.push({ name: "mypage" });
};

const handleLogout = async () => {
  emit("closePopUp", false);
  await userStore.storeLogout();
};
</script>

<template>
  <div v-show="isShow" class="pop-up">
    <div @click="handleMyPage" class="pop-up-btn" id="pop-up-mypage">
      마이페이지
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

#pop-up-logout:hover {
  color: #000000;
  text-decoration: underline;
}
#pop-up-mypage:hover {
  color: #000000;
  text-decoration: underline;
}
</style>
