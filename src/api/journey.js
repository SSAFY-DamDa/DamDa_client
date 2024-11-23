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

export { getJourneyList, getJourney, getDetailJourney };
