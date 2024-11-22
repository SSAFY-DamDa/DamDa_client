import { JourneyAxios } from "@/utils/http-journey";

const getJourneyList = async (suc, err) => {
  return await JourneyAxios().get("/list").then(suc).catch(err);
};

const getJourney = async (param, suc, err) => {
  return await JourneyAxios()
    .get("", { params: { userId: param } })
    .then(suc)
    .catch(err);
};

const getDetailJourney = async (param, suc, err) => {
  return await JourneyAxios().get(`/detail/${param}`).then(suc).catch(err);
};

export { getJourneyList, getJourney, getDetailJourney };
