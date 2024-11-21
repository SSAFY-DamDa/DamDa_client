import { ref } from "vue";
import noimage from "@/assets/imgs/noImage.jpg";
import { tripAxios } from "@/utils/http-trip";

const axios = tripAxios();
const isTag = ref(0);
const isTitle = ref("");

export const fetchPage = async (page, kakao, tripStore) => {
  // 검색한 상태에서 페이지 이동
  if (isTitle.value) {
    await fetchTitleSearchPage(page, kakao, isTitle.value, tripStore);
  } else if (isTag.value > 0) {
    await fetchTagSearchPage(page, kakao, isTag.value, tripStore);
  } else {
    try {
      const response = await axios.get("/list", {
        params: {
          pgno: page,
        },
      });

      makeTripList(response.data.tripList, kakao, tripStore);
      tripStore.setSiList(response.data.siList);
      tripStore.setTotalPage(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  }
};

export const fetchTagSearchPage = async (page, kakao, tagId, tripStore) => {
  try {
    const response = await axios.get("/search", {
      params: {
        areaCode: 0,
        contentTypeId: tagId,
        title: isTitle.value,
        pgno: page,
      },
    });

    makeTripList(response.data.tripList, kakao, tripStore);
    tripStore.setTotalPage(response.data.totalPage);
  } catch (error) {
    console.log(error);
  }
};

export const fetchTitleSearchPage = async (page, kakao, title, tripStore) => {
  try {
    const response = await axios.get("/search", {
      params: {
        areaCode: 0,
        contentTypeId: isTag.value,
        title: title,
        pgno: page,
      },
    });
    isTitle.value = title;
    makeTripList(response.data.tripList, kakao, tripStore);
    tripStore.setTotalPage(response.data.totalPage);
  } catch (error) {
    console.log(error);
  }
};

const makeTripList = (_tripList, kakao, tripStore) => {
  const markerInfoList = [];
  _tripList.forEach((area) => {
    // 리스트에 HTML 추가
    area.img1 = area.img1 ? area.img1 : area.img2 ? area.img2 : noimage;

    // 마커 정보 추가
    let markerInfo = {
      title: area.title,
      latlng: new kakao.maps.LatLng(area.latitude, area.longitude),
      area: area,
    };

    markerInfoList.push(markerInfo);
  });

  tripStore.setTripList(_tripList);
  tripStore.setPositions(markerInfoList);
};
