import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import FindPwdView from "@/views/FindPwdView.vue";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import MapView from "@/views/MapView.vue";
import MyPageView from "@/views/MyPageView.vue";
import SignUpView from "@/views/SignUpView.vue";
import FAQView from "@/views/FAQView.vue";
import FAQRegister from "@/components/faq/register/FAQRegister.vue";
import FAQManage from "@/components/faq/manage/FAQManage.vue";
import FAQItemDetail from "@/components/faq/manage/detail/FAQItemDetail.vue";
import MakeSelfView from "@/views/MakeSelfView.vue";
import MyJourneyView from "@/views/MyJourneyView.vue";
import MakeAIView from "@/views/MakeAIView.vue";

const onlyAuthUser = async (to, from, next) => {
  const userStore = useUserStore();
  const { userInfo, isValidToken } = storeToRefs(userStore);
  const { getUserInfo } = userStore;

  let token = sessionStorage.getItem("accessToken");
  if (token) {
    await getUserInfo(token);
  }

  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/findpwd",
      name: "findpwd",
      component: FindPwdView,
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthUser,
      component: MyPageView,
    },
    {
      path: "/main",
      name: "main",
      beforeEnter: onlyAuthUser,
      component: MainView,
    },
    {
      path: "/map",
      name: "map",
      beforeEnter: onlyAuthUser,
      component: MapView,
    },
    {
      path: "/faq",
      name: "faq",
      redirect: { name: "list" },
      // 관리자만 등록 및 글 관리 가능
      beforeEach(to) {
        const userStore = useUserStore();
        const isAdmin = userStore.userInfo.userId !== "admin";
        if (!isAdmin && to.name != "register" && to.name != "manage") {
          return { name: "main" };
        }
      },
      children: [
        {
          path: "list",
          name: "list",
          beforeEnter: onlyAuthUser,
          component: FAQView,
        },
        {
          path: "register",
          name: "register",
          component: FAQRegister,
        },
        {
          path: "manage",
          name: "manage",
          component: FAQManage,
        },
        {
          path: "detail",
          name: "detail",
          component: FAQItemDetail,
        },
      ],
    },
    {
      path: "/makeself",
      name: "makeself",
      beforeEnter: onlyAuthUser,
      component: MakeSelfView,
    },
    {
      path: "/makeai",
      name: "makeai",
      beforeEnter: onlyAuthUser,
      component: MakeAIView,
    },
    {
      path: "/myjourney/:id",
      name: "myjourney",
      beforeEnter: onlyAuthUser,
      component: MyJourneyView,
    },
  ],
});

export default router;
