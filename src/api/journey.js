import { Axios } from "@/utils/client";

const JOURNEY = "journey";
const getJourneyList = async (suc, err) => {
  return await Axios(JOURNEY).get("/list").then(suc).catch(err);
};

const getJourney = async (param, suc, err) => {
  return await Axios(JOURNEY)
    .get("", { params: { userId: param } })
    .then(suc)
    .catch(err);
};

const getDetailJourney = async (param, suc, err) => {
  return await Axios(JOURNEY).get(`/detail/${param}`).then(suc).catch(err);
};

const postRegisterJourney = async (body, param, suc, err) => {
  return await Axios(JOURNEY)
    .post("/register", body, { params: { userId: param } })
    .then(suc)
    .catch(err);
};

const postRegisterDetailJourney = async (body, param, suc, err) => {
  return await Axios(JOURNEY)
    .post("/registerDetail", body, { params: { journeyId: param } })
    .then(suc)
    .catch(err);
};

const deleteJourney = async (param, suc, err) => {
  return await Axios(JOURNEY).delete(`/${param}`).then(suc).catch(err);
};

const registerReview = async (body, suc, err) => {
  return await Axios(JOURNEY).post("/review", body).then(suc).catch(err);
};

export {
  getJourneyList,
  getJourney,
  getDetailJourney,
  postRegisterJourney,
  postRegisterDetailJourney,
  deleteJourney,
  registerReview,
};
