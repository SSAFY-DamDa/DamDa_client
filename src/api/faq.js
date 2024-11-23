import { Axios } from "@/utils/client";

const FAQ = "faq";

const getListFAQ = async (suc, err) => {
  return await Axios(FAQ).get("/list").then(suc).catch(err);
};

const postRegisterFAQ = async (param, suc, err) => {
  return await Axios(FAQ).post("/register", param).then(suc).catch(err);
};

const getDetailFAQ = async (param, suc, err) => {
  return await Axios(FAQ).get(`/${param}`).then(suc).catch(err);
};

const deleteFAQ = async (param, suc, err) => {
  return await Axios(FAQ).delete(`/${param}`).then(suc).catch(err);
};

const putFAQ = async (param, body, suc, err) => {
  return await Axios(FAQ).put(`/modify/${param}`, body).then(suc).catch(err);
};

export { getListFAQ, postRegisterFAQ, getDetailFAQ, deleteFAQ, putFAQ };
