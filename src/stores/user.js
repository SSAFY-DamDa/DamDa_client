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
        if (response.status === 201) {
          let { data } = response;
          let accessToken = data["accessToken"];
          let refreshToken = data["refreshToken"];
          isLogin.value = true;
          isValidToken.value = true;
          sessionStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          router.push({ name: "main" });
        }
      },
      (err) => {
        if (err.response.status === 401) {
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else {
          alert("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
        }
        isLogin.value = false;
        isValidToken.value = false;
      }
    );
  };

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token);

    await userFindUser(
      decodeToken.userId,
      (response) => {
        if (response.status === 200) {
          isValidToken.value = true;
          userInfo.value = response.data;
        }
      },
      async () => {
        isValidToken.value = false;
        await tokenRegenerate();
      }
    );
  };

  const tokenRegenerate = async () => {
    await userRefreshToken(
      JSON.stringify(userInfo.value),
      (response) => {
        if (response.status === 201) {
          let accessToken = response.data["accessToken"];
          sessionStorage.setItem("accessToken", accessToken);
          isValidToken.value = true;
        }
      },
      (error) => {
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
