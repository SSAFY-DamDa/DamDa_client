<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { validate } from "@/utils/email-validate";
import { memberAxios } from "@/utils/http-member";

import damda_character from "@/assets/imgs/damda_character.png";

const http = memberAxios();
const router = useRouter();

const inputFormData = ref({
  userId: { text: "", errMsg: "" },
  userPwd: { text: "", errMsg: "" },
  userPwdCheck: { text: "", errMsg: "" },
  userName: { text: "", errMsg: "" },
  emailId: "",
  emailDomain: "",
  birth: { text: "", errMsg: "" },
  phone: { text: "", errMsg: "" },
  address: "",
});

const inputEmail = ref("");
const emailErrMsg = ref("");

// inputFormData 검사
const validateField = (field, value) => {
  switch (field) {
    case "userId":
      if (!value) {
        return { errMsg: "아이디를 입력해주세요." };
      }
      break;
    case "userPwd":
      if (!value) {
        return { errMsg: "비밀번호를 입력해주세요." };
      }
      break;
    case "userPwdCheck":
      if (!value) {
        return { errMsg: "비밀번호 확인을 입력해주세요." };
      } else if (value !== inputFormData.value.userPwd.text) {
        return { errMsg: "비밀번호가 일치하지 않습니다." };
      }
      break;
    case "userName":
      if (!value) {
        return { errMsg: "이름을 입력해주세요." };
      }
      break;
    case "birth":
      if (!value) {
        return { errMsg: "생년월일을 입력해주세요." };
      }
      break;
    case "phone":
      if (!value) {
        return { errMsg: "핸드폰 번호를 입력해주세요." };
      }
      break;
  }
  return { errMsg: "" };
};

Object.keys(inputFormData.value).forEach((key) => {
  if (typeof inputFormData.value[key] === "object") {
    watch(
      () => inputFormData.value[key].text,
      (newValue) => {
        const validation = validateField(key, newValue);
        inputFormData.value[key].errMsg = validation.errMsg;
      }
    );
  }
});

const handleCreate = () => {
  let isCheck = false;
  Object.keys(inputFormData.value).forEach((key) => {
    // 에러가 존재하는 경우
    if (inputFormData.value[key].errMsg) {
      isCheck = true;
    }
  });

  // 아직 에러가 존재한 경우
  if (isCheck) {
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
};

watch(
  () => inputEmail.value,
  () => {
    if (!inputEmail.value) {
      emailErrMsg.value = "이메일을 입력해주세요.";
    } else if (!validate(inputEmail.value)) {
      if (inputEmail.value) {
        emailErrMsg.value = "올바른 이메일 형식이 아니에요.";
      }
    }
  }
);

const handleCancel = () => {
  router.push({ name: "login" });
};

const validateOnBlur = (field) => {
  const value = inputFormData.value[field]?.text || "";
  const validation = validateField(field, value);
  inputFormData.value[field].errMsg = validation.errMsg;
};

const handleEmailBlur = () => {
  if (!inputEmail.value) {
    emailErrMsg.value = "이메일을 입력해주세요.";
  } else if (!validate(inputEmail.value)) {
    emailErrMsg.value = "올바른 이메일 형식이 아니에요.";
  } else {
    emailErrMsg.value = "";
  }
};
</script>

<template>
  <form class="signup-form" @submit.prevent="handleCreate">
    <img :src="damda_character" id="damda_mini" />
    <div id="title">회원가입</div>
    <div class="input-section">
      <div class="label-input_interval">
        <label>아이디</label>
        <input
          type="text"
          name="input-id"
          v-model="inputFormData.userId.text"
          :class="{ 'err-input': inputFormData.userId.errMsg }"
          @blur="validateOnBlur('userId')"
          required
        />
        <div
          v-if="inputFormData.userId.errMsg"
          :class="{ 'err-msg': inputFormData.userId.errMsg }"
        >
          {{ inputFormData.userId.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>비밀번호</label>
        <input
          type="password"
          name="input-pw"
          v-model="inputFormData.userPwd.text"
          :class="{ 'err-input': inputFormData.userPwd.errMsg }"
          @blur="validateOnBlur('userPwd')"
          required
        />
        <div
          v-if="inputFormData.userPwd.errMsg"
          :class="{ 'err-msg': inputFormData.userPwd.errMsg }"
        >
          {{ inputFormData.userPwd.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>비밀번호 확인</label>
        <input
          type="password"
          name="input-pw-check"
          v-model="inputFormData.userPwdCheck.text"
          :class="{ 'err-input': inputFormData.userPwdCheck.errMsg }"
          @blur="validateOnBlur('userPwdCheck')"
          required
        />
        <div
          v-if="inputFormData.userPwdCheck.errMsg"
          :class="{ 'err-msg': inputFormData.userPwdCheck.errMsg }"
        >
          {{ inputFormData.userPwdCheck.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>이름</label>
        <input
          type="text"
          name="input-name"
          v-model.lazy="inputFormData.userName.text"
          :class="{ 'err-input': inputFormData.userName.errMsg }"
          @blur="validateOnBlur('userName')"
          required
        />
        <div
          v-if="inputFormData.userName.errMsg"
          :class="{ 'err-msg': inputFormData.userName.errMsg }"
        >
          {{ inputFormData.userName.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>이메일</label>
        <input
          type="email"
          name="input-email-id"
          v-model.lazy="inputEmail"
          :class="{ 'err-input': emailErrMsg }"
          @blur="handleEmailBlur"
          required
        />
        <div class="err-msg">{{ emailErrMsg }}</div>
      </div>
      <div class="label-input_interval">
        <label>생년월일</label>
        <input
          type="text"
          name="input-name"
          v-model.lazy="inputFormData.birth.text"
          :class="{ 'err-input': inputFormData.birth.errMsg }"
          @blur="validateOnBlur('birth')"
          required
        />
        <div
          v-if="inputFormData.birth.errMsg"
          :class="{ 'err-msg': inputFormData.birth.errMsg }"
        >
          {{ inputFormData.birth.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>핸드폰</label>
        <input
          type="text"
          name="input-name"
          v-model.lazy="inputFormData.phone.text"
          :class="{ 'err-input': inputFormData.phone.errMsg }"
          @blur="validateOnBlur('phone')"
          required
        />
        <div
          v-if="inputFormData.phone.errMsg"
          :class="{ 'err-msg': inputFormData.phone.errMsg }"
        >
          {{ inputFormData.phone.errMsg }}
        </div>
      </div>
      <div class="label-input_interval">
        <label>주소(선택)</label>
        <input
          type="text"
          name="input-name"
          v-model.lazy="inputFormData.address"
        />
      </div>
    </div>
    <div class="btn-section">
      <input
        type="button"
        id="cancel-btn"
        class="signup-btn"
        value="취소"
        @click="handleCancel"
      />
      <input type="submit" id="create-btn" class="signup-btn" value="생성" />
    </div>
  </form>
</template>

<style scoped>
.signup-form {
  max-width: 1160px;
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  z-index: 1;
}

#damda_mini {
  width: 80px;
  object-fit: cover;
}

#title {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 0 20px;
  color: #7bbcb0;
}

a {
  color: black;
}

.text-button {
  width: 50%;
  display: flex;
  justify-content: space-around;
}

.input-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.label-input_interval {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  label {
    max-width: 470px;
    width: 70%;
    margin: 0 5px 0 0;
    color: #a9a9a9;
    font-size: 1.6rem;
  }

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

.signup-btn {
  max-width: 492px;
  width: calc(70% + 22px);
  font-size: 1.6rem;
  padding: 10px;
  border: 0px;
  border-radius: 5px;
  color: #ffffff;
  font-weight: bold;
}

#create-btn {
  background-color: #c2e0db;
}

#create-btn:hover {
  background-color: #7bbcb0;
}

#cancel-btn {
  background-color: #c9c9c9;
}

#cancel-btn:hover {
  background-color: #a9a9a9;
}

.text-button {
  width: 100%;
  display: flex;
  justify-content: center;
}

.err-msg {
  max-width: 470px;
  width: 70%;
  color: #ff4545;
}
</style>
