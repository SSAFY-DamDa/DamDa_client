<script setup>
import { ref, watch } from "vue";
import { validate } from "@/utils/email-validate";
import { userFindPassword, userResetPassword } from "@/api/user";
import router from "@/router";


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
  console.log(checkFormData.value);
  await userFindPassword(
    checkFormData.value,
    (res) => {
      if (res.status == 200) {
        newFormData.value.userId = checkFormData.value.userId;
        level.value = !level.value;
      }
    },
    () => (errMsg.value = "아이디와 이메일이 일치하지 않습니다.")
  )
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
    )
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
    <div id="title">비밀번호 찾기</div>
    <!-- 아이디 이메일 입력 -->
    <div v-show="level" class="find-pwd-part">
      <div class="label-input_interval">
        <label>아이디</label>
        <input type="text" name="input-id" v-model="checkFormData.userId" />
      </div>
      <div class="label-input_interval">
        <label>이메일</label>
        <input type="email" name="input-email" @blur="handleValidate" v-model="inputEmail" />
      </div>
      <div class="err-msg">{{ errMsg }}</div>
      <div class="btn-section">
        <input type="button" id="cancel-btn" value="취소" @click="handleCancel" />
        <input type="button" id="next-btn" @click="handleNextBtn" value="다음" />
      </div>
    </div>
    <!-- 새 비밀번호 입력 -->
    <div v-show="!level" class="find-pwd-part">
      <div class="label-input_interval">
        <label>새 비밀번호</label>
        <input type="password" name="input-pw" v-model="newFormData.newPwd" />
      </div>
      <div class="label-input_interval">
        <label>새 비밀번호 확인</label>
        <input type="password" name="input-pw-check" v-model="newFormData.newPwdCheck" />
      </div>
      <div class="err-msg">{{ errMsg }}</div>
      <div class="btn-section">
        <input type="button" id="cancel-btn" value="취소" @click="handleCancel" />
        <input type="button" id="change-btn" value="변경" @click="handleSubmitNewPassword" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.find-pwd-form,
.find-pwd-part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.find-pwd-part {
  width: 100%;
}

#title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.text-button {
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.label-input_interval {
  width: 40%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  label {
    margin-right: 5px;
  }

  input {
    width: 60%;
  }
}

#find-pwd-btn {
  margin: 10px;
}

.btn-section {
  display: flex;
  gap: 20px;
}

.err-msg {
  color: #dd0000;
}
</style>
