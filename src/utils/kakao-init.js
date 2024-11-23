import { ref } from "vue";
import noimage from "@/assets/imgs/noImage.jpg";
import { getSearchTrip, getTripList } from "@/api/trip";

const isTag = ref(0);
const isTitle = ref("");

export const fetchPage = async (page, kakao, tripStore) => {
  // 검색한 상태에서 페이지 이동
  if (isTitle.value) {
    await fetchTitleSearchPage(page, kakao, isTitle.value, tripStore);
  } else if (isTag.value > 0) {
    await fetchTagSearchPage(page, kakao, isTag.value, tripStore);
  } else {
    await getTripList(
      page,
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

export const fetchTagSearchPage = async (page, kakao, tagId, tripStore) => {
  await getSearchTrip(
    {
      areaCode: 0,
      contentTypeId: tagId,
      title: isTitle.value,
      pgno: page,
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

export const fetchTitleSearchPage = async (page, kakao, title, tripStore) => {
  await getSearchTrip(
    {
      areaCode: 0,
      contentTypeId: isTag.value,
      title: title,
      pgno: page,
    },
    (response) => {
      isTitle.value = title;
      makeTripList(response.data.tripList, kakao, tripStore);
      tripStore.setTotalPage(response.data.totalPage);
    },
    (error) => {
      console.log("여행 검색 도중 오류!", error);
    }
  );
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
