import { Axios } from "@/utils/client";

const MEMBER = "member";
const userLogin = async (param, suc, err) => {
  return await Axios(MEMBER).post("/login", param).then(suc).catch(err);
};

const userLogout = async (suc, err) => {
  return await Axios(MEMBER).get("/logout").then(suc).catch(err);
};

const userJoin = async (param, suc, err) => {
  await Axios(MEMBER).post("/join", param).then(suc).catch(err);
};

const userIdCheck = async (param, suc, err) => {
  return await Axios(MEMBER)
    .get("/idcheck", { params: { checkid: param } })
    .then(suc)
    .catch(err);
};

const userModifyUser = async (param, suc, err) => {
  return await Axios(MEMBER, true).put("/modify", param).then(suc).catch(err);
};

const userDeleteUser = async (param, suc, err) => {
  return await Axios(MEMBER).delete("/delete", param).then(suc).catch(err);
};

const userFindPassword = async (param, suc, err) => {
  return await Axios(MEMBER).post("/findpwd", param).then(suc).catch(err);
};

const userResetPassword = async (param, suc, err) => {
  return await Axios(MEMBER).post("/resetpwd", param).then(suc).catch(err);
};

const userFindUser = async (param, suc, err) => {
  return await Axios(MEMBER, true)
    .get("/findbyid/" + param)
    .then(suc)
    .catch(err);
};

const userRefreshToken = async (param, suc, err) => {
  const axios = (Axios(MEMBER, true).defaults.headers["refreshToken"] =
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
