import { memberAxios } from "@/utils/http-member";

const userLogin = async (param, suc, err) => {
  return await memberAxios().post("/login", param).then(suc).catch(err);
};

const userLogout = async (suc, err) => {
  return await memberAxios().get("/logout").then(suc).catch(err);
};

const userJoin = async (param, suc, err) => {
  await memberAxios().post("/join", param).then(suc).catch(err);
};

const userIdCheck = async (param, suc, err) => {
  return await memberAxios()
    .get("/idcheck", { param: { param: param } })
    .then(suc)
    .catch(err);
};

const userModifyUser = async (param, suc, err) => {
  return await memberAxios(true).put("/modify", param).then(suc).catch(err);
};

const userDeleteUser = async (param, suc, err) => {
  return await memberAxios().delete("/delete", param).then(suc).catch(err);
};

const userFindPassword = async (param, suc, err) => {
  return await memberAxios().post("/findpwd", param).then(suc).catch(err);
};

const userResetPassword = async (param, suc, err) => {
  return await memberAxios().post("/resetpwd", param).then(suc).catch(err);
};

const userFindUser = async (param, suc, err) => {
  return await memberAxios(true)
    .get("/findbyid/" + param)
    .then(suc)
    .catch(err);
};

const userRefreshToken = async (param, suc, err) => {
  const axios = (memberAxios(true).defaults.headers["refreshToken"] =
    localStorage.getItem("refreshToken"));
  return await axios.post("/refresh", param).then(suc).catch(err);
};

export {
  userLogin,
  userLogout,
  userJoin,
  userIdCheck,
  userModifyUser,
  userDeleteUser,
  userFindPassword,
  userResetPassword,
  userFindUser,
  userRefreshToken,
};
