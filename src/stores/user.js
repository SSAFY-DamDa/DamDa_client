import { defineStore } from "pinia";
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";
import {
  userLogin,
  userFindUser,
  userLogout,
  userRefreshToken,
} from "@/api/user";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const router = useRouter();

  const isLogin = ref(false);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const handleLogin = async (user) => {
    await userLogin(
      user,
      async (response) => {
        console.log("로그인 성공;", response);
        if (response.status === 201) {
          let { data } = response;
          let accessToken = data["accessToken"];
          let refreshToken = data["refreshToken"];
          isLogin.value = true;
          isValidToken.value = true;
          console.log("ivt:", isValidToken.value);
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          router.push({ name: "main" });
        }
      },
      () => {
        console.log("로그인 실패");
        isLogin.value = false;
        isValidToken.value = false;
      }
    );
  };

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token);
    console.log(decodeToken);

    await userFindUser(
      decodeToken.userId,
      (response) => {
        console.log("finduser", response);
        if (response.status === 200) {
          isValidToken.value = true;
          userInfo.value = response.data;
          console.log("finduser isvalidtoken get:", isValidToken.value);
        }
      },
      async () => {
        isValidToken.value = false;
        await tokenRegenerate();
      }
    );
  };

  const tokenRegenerate = async () => {
    console.log("token re:", userInfo.value);
    await userRefreshToken(
      JSON.stringify(userInfo.value),
      (response) => {
        console.log("token re:", response);
        if (response.status === 201) {
          let accessToken = response.data["accessToken"];
          sessionStorage.setItem("accessToken", accessToken);
          isValidToken.value = true;
        }
      },
      (error) => {
        console.log("token re:", error);
        if (error.response.status === 401) {
          userLogout(
            () => {
              isLogin.value = false;
              userInfo.value = null;
              isValidToken.value = false;
              router.push({ name: "login" });
            },
            () => {
              isLogin.value = false;
              userInfo.value = null;
            }
          );
        }
      }
    );
  };

  const storeLogout = async () => {
    await userLogout(
      () => {
        isLogin.value = false;
        userInfo.value = null;
        isValidToken.value = false;
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("accessToken");
        router.push({ name: "login" });
      },
      () => {
        isLogin.value = false;
        userInfo.value = null;
      }
    );
  };

  return {
    isLogin,
    userInfo,
    isValidToken,
    handleLogin,
    getUserInfo,
    tokenRegenerate,
    storeLogout,
  };
});
