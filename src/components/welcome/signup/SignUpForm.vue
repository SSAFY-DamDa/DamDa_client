<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { validate } from "@/utils/email-validate";
import { memberAxios } from "@/utils/http-member";

const http = memberAxios();
const router = useRouter();

const inputFormData = ref({
  userId: "",
  userPwd: "",
  userPwdCheck: "",
  userName: "",
  emailId: "",
  emailDomain: "",
});
const inputEmail = ref("");
const pwdErrMsg = ref("");
const errMsg = ref("");

watch(
  () => inputFormData.value.userPwdCheck,
  () => {
    const { userPwd, userPwdCheck } = inputFormData.value;
    if (userPwd !== userPwdCheck) {
      pwdErrMsg.value = "비밀번호가 일치하지 않습니다.";
    } else {
      pwdErrMsg.value = "";
    }
  }
);

const handleCreate = () => {
  if (!inputFormData.value.userId) {
    errMsg.value = "아이디를 입력해주세요.";
    return;
  } else if (!inputFormData.value.userPwd) {
    errMsg.value = "비밀번호를 입력해주세요.";
    return;
  } else if (!inputFormData.value.userPwdCheck) {
    errMsg.value = "비밀번호 확인을 입력해주세요.";
    return;
  } else if (!inputFormData.value.userName) {
    errMsg.value = "이름을 입력해주세요.";
    return;
  } else if (!inputEmail.value) {
    errMsg.value = "이메일을 입력해수제요.";
    return;
  } else {
    const { userPwd, userPwdCheck } = inputFormData.value;
    if (userPwd !== userPwdCheck) {
      pwdErrMsg.value = "비밀번호가 일치하지 않습니다.";
    } else {
      pwdErrMsg.value = "";
    }

    // 아직 에러가 존재한 경우
    if (errMsg.value || pwdErrMsg.value) {
      alert("입력이 잘못되었습니다.");
      return;
    }
    const [emailId, emailDomain] = inputEmail.value.split("@");
    inputFormData.value.emailId = emailId;
    inputFormData.value.emailDomain = emailDomain;

    http
      .post("/join", inputFormData.value)
      .then(() => {
        alert("회원가입에 성공했어요!");
        router.push({ name: "login" });
      })
      .catch((err) => console.log(err));
    console.log("ifd:", inputFormData.value);
  }
};

watch(
  () => inputEmail.value,
  () => {
    errMsg.value = "";
    if (!validate(inputEmail.value)) {
      if (inputEmail.value) {
        errMsg.value = "올바른 이메일 형식이 아니에요.";
      }
    }
  }
);

const handleCancel = () => {
  router.push({ name: "login" });
};
</script>

<template>
  <form class="login-form" @submit.prevent="handleCreate">
    <div id="title">회원가입</div>
    <div class="label-input_interval">
      <label>아이디</label>
      <input type="text" name="input-id" v-model="inputFormData.userId" />
    </div>
    <div class="label-input_interval">
      <label>비밀번호</label>
      <input type="password" name="input-pw" v-model="inputFormData.userPwd" />
    </div>
    <div class="label-input_interval">
      <label>비밀번호 확인</label>
      <input
        type="password"
        name="input-pw-check"
        v-model.lazy="inputFormData.userPwdCheck"
      />
    </div>
    <div class="err-msg">{{ pwdErrMsg }}</div>
    <div class="label-input_interval">
      <label>이름</label>
      <input
        type="text"
        name="input-name"
        v-model.lazy="inputFormData.userName"
      />
    </div>
    <div class="label-input_interval">
      <label>이메일</label>
      <input type="email" name="input-email-id" v-model.lazy="inputEmail" />
    </div>
    <div class="err-msg">{{ errMsg }}</div>
    <div class="btn-section">
      <input type="button" id="cancel-btn" value="취소" @click="handleCancel" />
      <input type="submit" id="create-btn" value="생성" />
    </div>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

a {
  color: black;
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

.btn-section {
  display: flex;
  gap: 20px;
}

.err-msg {
  color: #dd0000;
}
</style>
