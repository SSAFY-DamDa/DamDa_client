<script setup>
import defaultProfile from "@/assets/imgs/default_profile.png";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
const isSelect = ref("profile");
const selectItem = (name) => {
  isSelect.value = name;
  router.push({ name: name });
};
</script>

<template>
  <nav>
    <div class="profile-top">
      <img :src="defaultProfile" />
      <div style="font-weight: bold">{{ userStore.userInfo.userName }}</div>
      <div>{{ userStore.userInfo.userId }}</div>
    </div>
    <div class="profile-list">
      <div
        :class="['list-item', { select: isSelect === 'profile' }]"
        @click="selectItem('profile')"
      >
        <span> 프로필 </span>
      </div>
      <div
        :class="['list-item', { select: isSelect === 'prejourney' }]"
        @click="selectItem('prejourney')"
      >
        <span> 이전 여정 </span>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 30%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img {
  width: 100px;
  border: 1px solid #cdcdcd;
  border-radius: 50%;
  margin-top: 50px;
}

.profile-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}

.profile-list {
  width: 100%;
}

.list-item {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: lighter;
  span {
    margin-left: 30px;
  }

  &.select {
    background-color: #7bbcb0;
    color: #ffffff;
    font-weight: normal;
  }
}
</style>
