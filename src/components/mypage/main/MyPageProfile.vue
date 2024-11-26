<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { userFindUser, userModifyUser } from "@/api/user";

const userStore = useUserStore();

const userInfo = ref(userStore.userInfo);
const isChange = ref(false);

onMounted(async () => {
  await userFindUser(userStore.userInfo.userId);
  userInfo.value.birthDate = userInfo.value.birthDate.slice(0, 10);
});

let save = {};
const handleChange = () => {
  save = { ...userInfo.value };
  isChange.value = !isChange.value;
};

const handleCancel = () => {
  userInfo.value = { ...save };
  isChange.value = !isChange.value;
};

const handleChangeSubmit = async () => {
  await userModifyUser(userInfo.value, () => {
    isChange.value = !isChange.value;
  });
};
</script>

<template>
  <main>
    <h3>회원정보</h3>
    <div class="item-list">
      <div class="mypage-item">
        <label for="userId">이름</label>
        <input
          type="text"
          id="userId"
          v-model="userInfo.userName"
          :readonly="!isChange"
        />
      </div>
      <div class="mypage-item">
        <label for="userId">생년월일</label>
        <input
          type="date"
          id="userId"
          v-model="userInfo.birthDate"
          :readonly="!isChange"
        />
      </div>
      <div class="mypage-item">
        <label for="userId">핸드폰 번호</label>
        <input
          type="text"
          id="userId"
          v-model="userInfo.phoneNum"
          :readonly="!isChange"
        />
      </div>
      <div class="mypage-item">
        <label for="userId">주소</label>
        <input
          type="text"
          id="userId"
          v-model="userInfo.address"
          :readonly="!isChange"
        />
      </div>
      <div class="mypage-item">
        <label for="">이메일</label>
        <div class="email-item">
          <input
            type="text"
            class="email-input"
            v-model="userInfo.emailId"
            :readonly="!isChange"
          />
          <div id="email-center">@</div>
          <input
            type="text"
            class="email-input"
            v-model="userInfo.emailDomain"
            :readonly="!isChange"
          />
        </div>
      </div>
      <div class="mypage-item">
        <label for="userId">가입일자</label>
        <input id="userId" v-model="userInfo.joinDate" readonly />
      </div>
    </div>
    <div class="mypage-change-btn" v-if="!isChange">
      <button class="mypage-btn" id="no-use"></button>
      <button class="mypage-btn" @click="handleChange">변경</button>
    </div>
    <form @submit.prevent="handleChangeSubmit" class="mypage-submit-btn" v-else>
      <button
        id="mypage-cancel-btn"
        class="mypage-btn"
        type="button"
        @click="handleCancel"
      >
        취소
      </button>
      <button class="mypage-btn" type="submit">완료</button>
    </form>
  </main>
</template>

<style scoped>
main {
  width: 70%;
  display: flex;
  flex-direction: column;
}

main > h3 {
  margin-left: 50px;
}

.item-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mypage-item {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.email-item {
  display: flex;
  flex-direction: row;
}

.email-input {
  width: 40%;
}

#email-center {
  width: 10%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  height: 30px;
  background-color: #f4f4f4;
  border: 0px;
  border-radius: 5px;
  padding: 20px;
}

#no-use {
  visibility: hidden;
  pointer-events: none;
}

.mypage-btn {
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 3px;
  background-color: #7bbcb0;
  color: #ffffff;
}

.mypage-btn:hover {
  background-color: #5e9288;
}

.mypage-change-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.mypage-submit-btn {
  display: flex;
  gap: 10px;
  justify-content: center;
}

#mypage-cancel-btn {
  background-color: #c9c9c9;
}
#mypage-cancel-btn:hover {
  background-color: #a9a9a9;
}
</style>
