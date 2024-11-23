import { Axios } from "@/utils/client";

const TRIP = "trip";

const getTripList = async (param, suc, err) => {
  return await Axios(TRIP)
    .get("/list", { params: { pgno: param } })
    .then(suc)
    .catch(err);
};

const getSearchTrip = async (param, suc, err) => {
  return await Axios(TRIP)
    .get("/search", {
      params: {
        areaCode: param.areaCode,
        contentTypeId: param.contentTypeId,
        title: param.title,
        pgno: param.pgno,
      },
    })
    .then(suc)
    .catch(err);
};

const getSearchAITrip = async (param, suc, err) => {
  return await Axios(TRIP)
    .get("/search-ai", {
      params: { areaCode: param.areaCode, contentTypeId: param.contentTypeId },
    })
    .then(suc)
    .catch(err);
};

const getSiList = async (suc, err) => {
  return await Axios(TRIP).get("/list-si").then(suc).catch(err);
};

const getGugunList = async (param, suc, err) => {
  return await Axios(TRIP)
    .get("/list-gugun", { params: { sidoCode: param } })
    .then(suc)
    .catch(err);
};

export { getTripList, getSearchTrip, getSearchAITrip, getSiList, getGugunList };
