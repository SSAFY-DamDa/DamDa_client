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
      } else if (
        !/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value)
      ) {
        return {
          errMsg:
            "비밀번호는 8자 이상이어야 하며 대문자, 숫자, 특수문자를 포함해야 합니다.",
        };
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
    case "birthDate":
      if (!value) {
        return { errMsg: "생년월일을 입력해주세요." };
      }
      break;
    case "phoneNum":
      if (!value) {
        return { errMsg: "핸드폰 번호를 입력해주세요." };
      }
      break;
  }
  return { errMsg: "" };
};

const formatPhoneNumber = () => {
  let phoneNum = inputFormData.value.phoneNum.text.replace(/[^\d]/g, ""); // 숫자만 남기기
  if (phoneNum.length > 3 && phoneNum.length <= 6) {
    phoneNum = phoneNum.replace(/(\d{3})(\d{1,4})/, "$1-$2");
  } else if (6 < phoneNum.length && phoneNum.length <= 10) {
    phoneNum = phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (phoneNum.length > 10) {
    phoneNum = phoneNum.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
  inputFormData.value.phoneNum.text = phoneNum;
};

const handleCreate = async () => {
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

  console.log("iform:", inputFormData.value);
  let formData = {};
  Object.keys(inputFormData.value).forEach((key) => {
    console.log("key:", key);
    if (key !== "userPwdCheck") {
      if (typeof inputFormData.value[key] === "object") {
        console.log("Object");
        formData[key] = inputFormData.value[key].text;
      } else {
        console.log("non Object");
        formData[key] = inputFormData.value[key];
      }
    }
  });
  console.log(formData);
  await userJoin(
    formData,
    () => {
      alert("회원가입에 성공했어요!");
      router.push({ name: "login" });
    },
    (err) => {
      console.log(err);
    }
  );
};

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

// 빈 입력 확인
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

// 이메일 정규표현식 확인
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

// 아이디 중복 확인
let time = null;
watch(
  () => inputFormData.value.userId.text,
  (newValue) => {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(async () => {
      if (!newValue) {
        inputFormData.value.userId.errMsg = "아이디를 입력해주세요.";
        return;
      }
      await userIdCheck(
        inputFormData.value.userId.text,
        (response) => {
          console.log(response);
          if (response.data.cnt == 1) {
            console.log("중복!");
            inputFormData.value.userId.errMsg = `${response.data.checkid} 는 이미 존재하는 아이디입니다. `;
          } else {
            console.log("중복아님!!");
            inputFormData.value.userId.errMsg = "";
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }, 500);
  }
);
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
        @blur="() => validateOnBlur('userId')"
      />
      <InputContainer
        title="비밀번호"
        type="password"
        name="input-pwd"
        v-model="inputFormData.userPwd.text"
        :error="inputFormData.userPwd.errMsg"
        required
        @blur="() => validateOnBlur('userPwd')"
      />
      <InputContainer
        title="비밀번호 확인"
        type="password"
        name="input-pwd-check"
        v-model="inputFormData.userPwdCheck.text"
        :error="inputFormData.userPwdCheck.errMsg"
        required
        @blur="() => validateOnBlur('userPwdCheck')"
      />
      <InputContainer
        title="이름"
        name="input-name"
        v-model="inputFormData.userName.text"
        :error="inputFormData.userName.errMsg"
        required
        @blur="() => validateOnBlur('userName')"
      />
      <InputContainer
        title="생년월일"
        name="input-birthDate"
        type="date"
        v-model="inputFormData.birthDate.text"
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
        v-model="inputFormData.phoneNum.text"
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
