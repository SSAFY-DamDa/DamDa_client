<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { validate } from "@/utils/email-validate";
import { userIdCheck, userJoin } from "@/api/user";
import InputContainer from "./inputcontainer/InputContainer.vue";
import damda_character from "@/assets/imgs/damda_character.png";

const router = useRouter();
const inputFormData = ref({
  userId: { text: "", errMsg: "" },
  userPwd: { text: "", errMsg: "" },
  userPwdCheck: { text: "", errMsg: "" },
  userName: { text: "", errMsg: "" },
  emailId: "",
  emailDomain: "",
  birthDate: { text: "", errMsg: "" },
  phoneNum: { text: "", errMsg: "" },
  address: "",
});
const inputEmail = ref("");
const emailErrMsg = ref("");
const idCheck = ref(null);

const validateField = (field, value) => {
  const rules = {
    userId: () =>
      !value
        ? "아이디를 입력해주세요."
        : inputFormData.value.userId.errMsg
        ? inputFormData.value.userId.errMsg
        : "",
    userPwd: () => {
      if (
        inputFormData.value.userPwdCheck.text &&
        inputFormData.value.userPwdCheck.text !== value
      ) {
        inputFormData.value.userPwdCheck.errMsg =
          "비밀번호가 일치하지 않습니다.";
      }
      return !value
        ? "비밀번호를 입력해주세요."
        : !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)
        ? "비밀번호는 8자 이상이어야 하며 대문자, 숫자, 특수문자를 포함해야 합니다."
        : "";
    },
    userPwdCheck: () =>
      value !== inputFormData.value.userPwd.text
        ? "비밀번호가 일치하지 않습니다."
        : "",
    userName: () => (!value ? "이름을 입력해주세요." : ""),
    birthDate: () => (!value ? "생년월일을 입력해주세요." : ""),
    phoneNum: () => (!value ? "핸드폰 번호를 입력해주세요." : ""),
  };
  return { errMsg: rules[field] ? rules[field]() : "" };
};

// 전화번호 형식 변경
const formatPhoneNumber = () => {
  let phoneNum = inputFormData.value.phoneNum.text.replace(/[^\d]/g, "");
  phoneNum = phoneNum.replace(/^(\d{3})(\d{3,4})?(\d{4})?$/, (_, p1, p2, p3) =>
    [p1, p2, p3].filter(Boolean).join("-")
  );
  inputFormData.value.phoneNum.text = phoneNum;
};

const handleEmailBlur = () => {
  emailErrMsg.value = !inputEmail.value
    ? "이메일을 입력해주세요."
    : !validate(inputEmail.value)
    ? "올바른 이메일 형식이 아니에요."
    : "";
};

const validateOnBlur = (field) => {
  const value = inputFormData.value[field]?.text || "";
  const { errMsg } = validateField(field, value);
  inputFormData.value[field].errMsg = errMsg;
};

const handleCancel = () => {
  router.push({ name: "login" });
};

const handleCreate = async () => {
  const hasErrors = Object.values(inputFormData.value).some(
    (field) => field.errMsg
  );
  if (hasErrors || emailErrMsg.value) {
    alert("입력이 잘못되었습니다.");
    return;
  }

  const [emailId, emailDomain] = inputEmail.value.split("@");
  inputFormData.value.emailId = emailId;
  inputFormData.value.emailDomain = emailDomain;

  const formData = Object.entries(inputFormData.value).reduce(
    (acc, [key, field]) => {
      if (key !== "userPwdCheck")
        acc[key] = typeof field === "object" ? field.text : field;
      return acc;
    },
    {}
  );

  await userJoin(
    formData,
    () => {
      alert("회원가입에 성공했어요!");
      router.push({ name: "login" });
    },
    (err) => console.error(err)
  );
};

// 아이디 중복 확인 (Debounce 적용)
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const checkUserId = debounce(async () => {
  const userId = inputFormData.value.userId.text;
  if (!userId) {
    inputFormData.value.userId.errMsg = "아이디를 입력해주세요.";
    return;
  }
  await userIdCheck(
    userId,
    (response) => {
      inputFormData.value.userId.errMsg =
        response.data.cnt == 1
          ? `${response.data.checkid} 는 이미 존재하는 아이디입니다.`
          : "";
      if (inputFormData.value.userId.errMsg) {
        idCheck.value = false;
      } else {
        idCheck.value = true;
      }
    },
    (error) => {
      console.log("로그인 도중 오류!", error);
    }
  );
}, 500);

watch(() => inputFormData.value.userId.text, checkUserId);
</script>

<template>
  <form class="signup-form" @submit.prevent="handleCreate">
    <img :src="damda_character" id="damda_mini" />
    <div id="title">회원가입</div>
    <div class="input-section">
      <InputContainer
        title="아이디"
        name="input-id"
        v-model="inputFormData.userId.text"
        :error="inputFormData.userId.errMsg"
        required
        :idCheck="idCheck"
        @blur="() => validateOnBlur('userId')"
      />
      <InputContainer
        title="비밀번호"
        type="password"
        name="input-pwd"
        v-model.lazy="inputFormData.userPwd.text"
        :error="inputFormData.userPwd.errMsg"
        required
        @blur="() => validateOnBlur('userPwd')"
      />
      <InputContainer
        title="비밀번호 확인"
        type="password"
        name="input-pwd-check"
        v-model.lazy="inputFormData.userPwdCheck.text"
        :error="inputFormData.userPwdCheck.errMsg"
        required
        @blur="() => validateOnBlur('userPwdCheck')"
      />
      <InputContainer
        title="이름"
        name="input-name"
        v-model.lazy="inputFormData.userName.text"
        :error="inputFormData.userName.errMsg"
        required
        @blur="() => validateOnBlur('userName')"
      />
      <InputContainer
        title="생년월일"
        name="input-birthDate"
        type="date"
        v-model.lazy="inputFormData.birthDate.text"
        :error="inputFormData.birthDate.errMsg"
        required
        @blur="() => validateOnBlur('birthDate')"
      />
      <InputContainer
        title="이메일"
        name="input-email"
        v-model.lazy="inputEmail"
        :error="emailErrMsg"
        required
        @blur="() => handleEmailBlur('email')"
      />
      <InputContainer
        title="핸드폰"
        name="input-phoneNum"
        v-model.lazy="inputFormData.phoneNum.text"
        :error="inputFormData.phoneNum.errMsg"
        required
        @input="formatPhoneNumber"
        @blur="() => validateOnBlur('phoneNum')"
      />
      <InputContainer
        title="주소(선택)"
        name="input-address"
        v-model="inputFormData.address.text"
        @blur="() => validateOnBlur('address')"
      />
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
  margin-bottom: 20px;
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
</style>
