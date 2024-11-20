<script setup>
import faqRegister from "@/assets/imgs/faqRegister.png";
import { ref } from "vue";
import { FAQAxios } from "@/utils/http-faq";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const axios = FAQAxios();
const router = useRouter();
const userInfoStore = useUserStore();

const content = ref("");
const updateContent = () => {
  content.value = document.querySelector(".content-editor").innerHTML;
};

const subject = ref("");

const handleRegister = async () => {
  const article = {
    userId: userInfoStore.userId,
    subject: subject.value,
    content: content.value,
  };
  console.log(article);
  try {
    const response = await axios.post("/register", article);
    if (response.status == 201) {
      alert("등록에 성공했어요!");
      router.push({ name: "list" });
    }
  } catch (error) {
    console.log(error);
  }
};

const handleClickCancel = () => {
  router.push({ name: "list" });
};
</script>

<template>
  <div id="faq-register">
    <img id="top-background" :src="faqRegister" />
    <div class="editor-container">
      <input class="subject-editor" placeholder="게시글의 제목을 입력하세요." v-model="subject" />
      <div class="content-editor" contenteditable="true" ref="editor" placeholder="본문을 작성하세요..." @input="updateContent">
      </div>
      <div class="button-section">
        <button type="button" id="faq-register-button" @click="handleRegister">
          등록하기
        </button>
        <button type="button" id="faq-cancel-button" @click="handleClickCancel">
          취소하기
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

#top-background {
  width: 100%;
}

.editor-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.subject-editor {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 0px;
  border-bottom: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.content-editor {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
}

.button-section {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
}

.button-section button {
  width: 250px;
  height: 50px;
  border: 0;
  border-radius: 3px;
  background-color: #7bbcb0;
  color: #ffffff;
}

#faq-cancel-button {
  background-color: #4f5a66;
}

#faq-register-button:hover {
  background-color: #5bb8a7;
}

#faq-cancel-button:hover {
  background-color: #2d333a;
}
</style>
