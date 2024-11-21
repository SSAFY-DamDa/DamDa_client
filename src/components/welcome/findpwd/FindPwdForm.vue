<script setup>
import { ref, watch } from "vue";
import { validate } from "@/utils/email-validate";
import { userFindPassword, userResetPassword } from "@/api/user";
import router from "@/router";

import damda_character from "@/assets/imgs/damda_character.png";

const emit = defineEmits(["changeLevel"]);

const checkFormData = ref({
  userId: "",
  emailId: "",
  emailDomain: "",
});

const newFormData = ref({
  userId: "",
  newPwd: "",
  newPwdCheck: "",
});

const level = ref(true);
const inputEmail = ref("");
const errMsg = ref("");
const handleValidate = () => {
  errMsg.value = "";
  if (!validate(inputEmail.value)) {
    if (inputEmail.value) {
      errMsg.value = "올바른 이메일 형식이 아닙니다.";
    }
  }
};

watch(
  () => checkFormData.value.userId,
  () => {
    errMsg.value = "";
  }
);

watch(
  () => newFormData.value,
  () => {
    errMsg.value = "";
  },
  { deep: true }
);

const handleNextBtn = async () => {
  // 이메일 분리
  const [emailId, emailDomain] = inputEmail.value.split("@");
  checkFormData.value.emailId = emailId;
  checkFormData.value.emailDomain = emailDomain;
  emit("changeLevel", 2);
  await userFindPassword(
    checkFormData.value,
    (res) => {
      if (res.status == 200) {
        newFormData.value.userId = checkFormData.value.userId;
        level.value = !level.value;
      }
    },
    () => (errMsg.value = "아이디와 이메일이 일치하지 않습니다.")
  );
};

const handleSubmitNewPassword = async () => {
  console.log(newFormData.value);
  if (newFormData.value.newPwd !== newFormData.value.newPwdCheck) {
    errMsg.value = "비밀번호가 일치하지 않습니다.";
    console.log("not");
  } else {
    console.log("ok");
    await userResetPassword(
      newFormData.value,
      () => {
        alert("새로운 비밀번호로 바뀌었어요!");
        router.push({ name: "login" });
      },
      (err) => console.log(err)
    );
  }
  console.log("err-msg:", errMsg.value);
};

const handleCancel = () => {
  checkFormData.value.userId = "";
  inputEmail.value = "";
  newFormData.value.newPwd = "";
  newFormData.value.newPwdCheck = "";
  errMsg.value = "";

  router.push({ name: "login" });
};
</script>

<template>
  <div class="find-pwd-form">
    <img :src="damda_character" id="damda_mini" />
    <div id="title">비밀번호 찾기</div>
    <!-- 아이디 이메일 입력 -->
    <div v-show="level" class="find-pwd-part">
      <div class="label-input_interval">
        <input
          type="text"
          name="input-id"
          v-model="checkFormData.userId"
          placeholder="아이디"
        />
      </div>
      <div class="label-input_interval">
        <input
          type="email"
          name="input-email"
          @blur="handleValidate"
          v-model="inputEmail"
          placeholder="이메일"
        />
      </div>
      <div class="err-msg">{{ errMsg }}</div>
      <div class="btn-section">
        <input
          type="button"
          id="cancel-btn"
          class="findpwd-btn"
          value="취소"
          @click="handleCancel"
        />
        <input
          type="button"
          id="next-btn"
          class="findpwd-btn"
          @click="handleNextBtn"
          value="다음"
        />
      </div>
    </div>
    <!-- 새 비밀번호 입력 -->
    <div v-show="!level" class="find-pwd-part">
      <div class="label-input_interval">
        <input
          type="password"
          name="input-pw"
          v-model="newFormData.newPwd"
          placeholder="새 비밀번호"
        />
      </div>
      <div class="label-input_interval">
        <input
          type="password"
          name="input-pw-check"
          v-model="newFormData.newPwdCheck"
          placeholder="새 비밀번호 확인"
        />
      </div>
      <div class="err-msg">{{ errMsg }}</div>
      <div class="btn-section">
        <input
          type="button"
          id="cancel-btn"
          class="findpwd-btn"
          value="취소"
          @click="handleCancel"
        />
        <input
          type="button"
          id="change-btn"
          class="findpwd-btn"
          value="변경"
          @click="handleSubmitNewPassword"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.find-pwd-form {
  max-width: 1160px;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
}

.find-pwd-part {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#damda_mini {
  width: 80px;
  object-fit: cover;
}

#title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #7bbcb0;
}

.text-button {
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.label-input_interval {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  input {
    max-width: 470px;
    width: 70%;
    height: 60px;
    outline: none;
    border: 1px solid #7bbcb0;
    border-radius: 5px;
    padding: 0 10px;
    font-size: 1.6rem;
  }

  input:focus {
    height: 58px;
    border: 2px solid #5e9288;
  }

  .err-input {
    border: 1px solid #ff4545;
  }
  .err-input:focus {
    border-color: #f53b3b;
  }
}

.btn-section {
  max-width: 492px;
  width: 70%;
  display: flex;
  gap: 10px;
}

.findpwd-btn {
  max-width: 492px;
  width: calc(70% + 22px);
  font-size: 1.6rem;
  padding: 10px;
  border: 0px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
}

#next-btn,
#complete-btn {
  background-color: #7bbcb0;
}
#next-btn:hover,
#change-btn:hover {
  background-color: #5e9288;
}

#cancel-btn {
  background-color: #c9c9c9;
}
#cancel-btn:hover {
  background-color: #a9a9a9;
}

.err-msg {
  color: #dd0000;
}
</style>
