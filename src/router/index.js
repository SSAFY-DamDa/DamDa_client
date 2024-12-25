import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

const FindPwdView = async () => await import("@/views/FindPwdView.vue");
const LoginView = async () => await import("@/views/LoginView.vue");
const MainView = async () => await import("@/views/MainView.vue");
const MapView = async () => await import("@/views/MapView.vue");
const MyPageView = async () => await import("@/views/MyPageView.vue");
const SignUpView = async () => await import("@/views/SignUpView.vue");
const FAQView = async () => await import("@/views/FAQView.vue");
const FAQRegister = async () =>
  await import("@/components/faq/register/FAQRegister.vue");
const FAQManage = async () =>
  await import("@/components/faq/manage/FAQManage.vue");
const FAQItemDetail = async () =>
  await import("@/components/faq/manage/detail/FAQItemDetail.vue");
const MakeSelfView = async () => await import("@/views/MakeSelfView.vue");
const CreateRoute = async () =>
  await import("@/components/makeai/CreateRoute.vue");
const MyJourneyView = async () => await import("@/views/MyJourneyView.vue");
const MakeAIView = async () => await import("@/views/MakeAIView.vue");
const ResultRecommend = async () =>
  await import("@/components/makeai/result/ResultRecommend.vue");
const MyCalendarView = async () => await import("@/views/MyCalendarView.vue");
const MyPagePreJourney = async () =>
  await import("@/components/mypage/main/MyPagePreJourney.vue");
const MyPageProfile = async () =>
  await import("@/components/mypage/main/MyPageProfile.vue");

const onlyAuthUser = async (to, from, next) => {
  const userStore = useUserStore();
  const { userInfo, isValidToken } = storeToRefs(userStore);
  const { getUserInfo } = userStore;

  let token = sessionStorage.getItem("accessToken");
  if (token) {
    await getUserInfo(token);
  }

  if (!isValidToken.value || userInfo.value === null) {
    if (to.path === "/") next();
    else next({ name: "login" });
  }
  // 로그인 상태에서 / 경로로 접근 시, "main"으로
  else if (isValidToken.value && userInfo.value !== null && to.path === "/") {
    next({ name: "main" });
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
      beforeEnter: onlyAuthUser,
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
      redirect: { name: "profile" },
      component: MyPageView,
      children: [
        {
          path: "profile",
          name: "profile",
          component: MyPageProfile,
        },
        {
          path: "prejourney",
          name: "prejourney",
          component: MyPagePreJourney,
        },
      ],
    },
    {
      path: "/mycalendar",
      name: "mycalendar",
      beforeEnter: onlyAuthUser,
      component: MyCalendarView,
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
      path: "/make",
      name: "make",
      beforeEnter: onlyAuthUser,
      redirect: { name: "question" },
      children: [
        {
          path: "question",
          name: "question",
          beforeEnter: onlyAuthUser,
          component: MakeAIView,
        },
        {
          path: "create",
          name: "create",
          beforeEnter: onlyAuthUser,
          component: CreateRoute,
        },
        {
          path: "result",
          name: "result",
          beforeEnter: onlyAuthUser,
          component: ResultRecommend,
        },
      ],
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
