import { JourneyAxios } from "@/utils/http-journey";

const getJourneyList = async (suc, err) => {
  return await JourneyAxios().get("/list").then(suc).catch(err);
};

const getJourney = async (param, suc, err) => {
  return await JourneyAxios()
    .get("", { params: { id: param } })
    .then(suc)
    .catch(err);
};

const getDetailJourney = async (id, body, suc, err) => {
  return await JourneyAxios()
    .get("/update/" + id, body)
    .then(suc)
    .catch(err);
};

export { getJourneyList, getJourney, getDetailJourney };
