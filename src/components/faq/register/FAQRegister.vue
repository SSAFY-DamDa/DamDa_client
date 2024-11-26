<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { postRegisterFAQ } from "@/api/faq";

const router = useRouter();
const userStore = useUserStore();

const content = ref("");
const updateContent = () => {
  content.value = document.querySelector(".editor-content-input").innerHTML;
};

const subject = ref("");

const handleRegister = async () => {
  const article = {
    userId: userStore.userInfo.userId,
    subject: subject.value,
    content: content.value,
  };
  console.log(article);
  await postRegisterFAQ(
    article,
    () => {
      alert("등록에 성공했어요!");
      router.push({ name: "list" });
    },
    (error) => {
      console.log("FAQ 등록 중 오류!" + error);
    }
  );
};

const handleClickCancel = () => {
  router.push({ name: "list" });
};
</script>

<template>
  <div id="faq-register">
    <div id="faq-title">
      <span>FAQ 등록</span>
    </div>
    <div class="editor-container">
      <div class="editor-title">
        <span class="editor-title-text">제목</span>
        <input
          class="editor-title-input"
          placeholder="게시글의 제목을 입력하세요."
          v-model="subject"
        />
      </div>
      <div class="editor-content">
        <span class="editor-content-text">본문</span>
        <div
          class="editor-content-input"
          contenteditable="true"
          ref="editor"
          @input="updateContent"
        ></div>
      </div>

      <div class="button-section">
        <button type="button" id="faq-cancel-button" @click="handleClickCancel">
          취소하기
        </button>
        <button type="button" id="faq-register-button" @click="handleRegister">
          등록하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#faq-register {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#faq-title {
  width: 100%;
  height: 400px;
  background-color: white;
  text-align: center;
  line-height: 400px;

  > span {
    color: black;
    font-size: 8rem;
    font-weight: 900;
  }
}

#top-background {
  width: 100%;
}

.editor-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  border: 2px solid #d0d0d0;
}

.editor-title {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  align-items: center;
}

.editor-title-text {
  width: 10%;
  font-size: 1.8rem;
}

.editor-title-input {
  width: 90%;
  padding: 10px;
  border: 0px;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.8rem;

  outline: none;
}

.editor-content {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  align-items: start;
}

.editor-content-text {
  width: 10%;
  font-size: 1.8rem;
}

.editor-content-input {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  color: blac;
}

.button-section {
  width: 100%;
  padding: 30px;

  display: flex;
  justify-content: center;
  gap: 10px;
}

.button-section button {
  width: 10%;
  max-width: 250px;
  height: 50px;
  border: 0;
  border-radius: 3px;
  background-color: #c2e0db;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
}

#faq-cancel-button {
  background-color: #c9c9c9;
}

#faq-register-button:hover {
  background-color: #78c2b6;
}

#faq-cancel-button:hover {
  background-color: #a9a9a9;
}
</style>
