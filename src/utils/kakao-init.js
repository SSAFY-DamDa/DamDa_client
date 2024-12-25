import noimage from "@/assets/imgs/noImage.jpg";
import { getSearchTrip, getTripList } from "@/api/trip";

export const fetchPage = async (kakao, tripStore) => {
  // 검색한 상태에서 페이지 이동
  const { areaCode, gugunCode, contentTypeId, title, pgno } =
    tripStore.getParamObj;
  if (areaCode > 0 || gugunCode > 0 || contentTypeId > 0 || title) {
    await fetchSearchPage(kakao, tripStore);
  } else {
    await getTripList(
      pgno,
      (response) => {
        makeTripList(response.data.tripList, kakao, tripStore);
        tripStore.setSiList(response.data.siList);
        tripStore.setTotalPage(response.data.totalPage);
      },
      (error) => {
        console.log("여행 리스트 불러오는 도중 오류!", error);
      }
    );
  }
};

export const fetchSearchPage = async (kakao, tripStore) => {
  await getSearchTrip(
    {
      areaCode: tripStore.getParamObj.areaCode,
      gugunCode: tripStore.getParamObj.gugunCode,
      contentTypeId: tripStore.getParamObj.contentTypeId,
      title: tripStore.getParamObj.title,
      pgno: tripStore.getParamObj.pgno,
    },
    (response) => {
      makeTripList(response.data.tripList, kakao, tripStore);
      tripStore.setTotalPage(response.data.totalPage);
    },
    (error) => {
      console.log("태그 검색 도중 오류!", error);
    }
  );
};

export const fetchTitleSearchPage = async (kakao, filter, tripStore) => {
  //전체 검색
  if (filter == "total") {
    await getSearchTrip(
      {
        areaCode: tripStore.getParamObj.areaCode,
        gugunCode: tripStore.getParamObj.gugunCode,
        contentTypeId: tripStore.getParamObj.contentTypeId,
        title: tripStore.getParamObj.title,
        pgno: tripStore.getParamObj.pgno,
      },
      (response) => {
        makeTripList(response.data.tripList, kakao, tripStore);
        tripStore.setTotalPage(response.data.totalPage);
      },
      (error) => {
        console.log("여행 검색 도중 오류!", error);
      }
    );
  }
  //지역 검색
  else {
    await getSearchTrip(
      {
        areaCode: tripStore.getParamObj.areaCode,
        gugunCode: tripStore.getParamObj.gugunCode,
        contentTypeId: tripStore.getParamObj.contentTypeId,
        title: tripStore.getParamObj.title,
        pgno: tripStore.getParamObj.pgno,
      },
      (response) => {
        makeTripList(response.data.tripList, kakao, tripStore);
        tripStore.setTotalPage(response.data.totalPage);
      },
      (error) => {
        console.log("여행 검색 도중 오류!", error);
      }
    );
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
