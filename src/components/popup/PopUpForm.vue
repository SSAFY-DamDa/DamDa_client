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
    <div @click="handleLogout">로그아웃</div>
    <div @click="handleMyPage">마이페이지</div>
    <div>설정</div>
  </div>
</template>

<style scoped>
.pop-up {
  position: absolute;
  min-width: 65px;
  width: 100%;
  top: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: antiquewhite;
  font-size: 1.3rem;
  text-align: center;
  padding: 10px;
}
</style>
