<script setup>
import { ref } from "vue";
import { useFAQStore } from "@/stores/faq";
import { useRouter } from "vue-router";
import { deleteFAQ, putFAQ } from "@/api/faq";

const faqStore = useFAQStore();
const router = useRouter();

const article = ref(faqStore.getFAQDetail);
let save = {};
const isModify = ref(false);

const handleManageList = () => {
  router.push({ name: "manage" });
};

const handleModify = () => {
  save = { ...article.value };
  isModify.value = true;
};

const handleCancel = () => {
  article.value = { ...save };
  isModify.value = false;
};

const handleComplete = async () => {
  await putFAQ(
    article.value.articleNo,
    article.value,
    () => {
      isModify.value = false;
    },
    (error) => {
      console.log("FAQ 수정 중 오류!" + error);
    }
  );
};

const handleDelete = async () => {
  const isCheck = confirm("정말 삭제하시겠습니까?");

  if (isCheck) {
    await deleteFAQ(
      article.value.articleNo,
      () => {
        faqStore.setFAQList(
          faqStore.getFAQList.filter(
            (f) => f.articleNo !== article.value.articleNo
          )
        );
        alert("삭제가 완료되었습니다!");
        router.push({ name: "manage" });
      },
      (error) => {
        console.log("FAQ 삭제 중 오류!" + error);
      }
    );
  }
};
</script>

<template>
  <div id="faq-detail">
    <div id="faq-detail-top">
      <input
        id="faq-detail-subject"
        :value="article.subject"
        :readonly="!isModify"
      />
      <div id="faq-detail-user">
        <div>{{ article.userId }}</div>
        <div>{{ article.registerTime }}</div>
      </div>
    </div>
    <textarea
      id="faq-detail-middle"
      v-model="article.content"
      :readonly="!isModify"
    ></textarea>
    <div id="faq-detail-bottom">
      <div style="padding: 15px 0px 15px 0px">
        <button id="faq-list-button" @click="handleManageList">목록</button>
      </div>
      <div id="faq-detail-data">
        <button v-show="!isModify" id="faq-modify-button" @click="handleModify">
          수정
        </button>
        <button v-show="!isModify" id="faq-delete-button" @click="handleDelete">
          삭제
        </button>
        <button
          v-show="isModify"
          id="faq-complete-button"
          @click="handleComplete"
        >
          완료
        </button>
        <button v-show="isModify" id="faq-cancel-button" @click="handleCancel">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
input,
textarea {
  border: 0px;
}

#faq-detail {
  width: 100%;
  height: 100%;
  padding: 30px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#faq-detail-top {
  width: 50%;
  padding: 30px 10px 30px 10px;
  border-bottom: 1px solid #cdcdcd;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#faq-detail-middle {
  width: 50%;
  min-height: 200px;
  border-bottom: 1px solid #cdcdcd;
  margin-top: 20px;
  padding: 10px;
  display: flex;
  font-size: 1.6rem;
  word-break: keep-all;
}

#faq-detail-bottom {
  width: 50%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

#faq-detail-subject {
  font-size: 3rem;
  font-weight: bold;
}

#faq-detail-user {
  display: flex;
  justify-content: space-between;
}

#faq-detail-bottom button {
  width: 50px;
  height: 30px;
  border: 0;
  border-radius: 3px;
  color: #ffffff;
}

button {
  min-width: 80px;
  min-height: 40px;
  padding: 10px;
}

button:hover {
  cursor: pointer;
}

#faq-list-button {
  background-color: #5f5f5f;
}

#faq-detail-data {
  width: 50%;
  padding: 20px 0px 0px 10px;
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
}

#faq-delete-button {
  background-color: #ee482a;
}

#faq-modify-button {
  background-color: #7bbcb0;
}

#faq-cancel-button {
  background-color: #383a53;
}

#faq-complete-button {
  background-color: #29c2a6;
}

#faq-modify-button:hover {
  background-color: #5bb8a7;
}

#faq-delete-button:hover {
  background-color: #f03110;
}
#faq-cancel-button:hover {
  background-color: #1f2033;
}

#faq-complete-button:hover {
  background-color: #239c86;
}
</style>
