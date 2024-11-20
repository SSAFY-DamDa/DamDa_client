# 대전 5반 Spring 관통 프로젝트

## Member

- 강성엽
- 이하영

## ERD

![image](https://github.com/user-attachments/assets/844faf9c-97e9-4aa4-bda3-22c92c757e6b)

## Class Diagram

회원 관리 클래스 다이어그램

![image](https://github.com/user-attachments/assets/8a25e735-9e4b-4c00-ae32-798ce0d844d4)

관광지 정보 클래스 다이어그램

![image](https://github.com/user-attachments/assets/228d177c-a366-400d-9dbb-05b2d98a4838)

## UseCase Diagram

![image](https://github.com/user-attachments/assets/63151b2c-f21b-4822-817a-8a0f6d0150d4)

![image](https://github.com/user-attachments/assets/2984c461-566a-45a8-a21b-dae5553b9d7f)

## 구현 기능

전체적인 레이아웃 및 디자인 변경

### 회원 관련 기능

1.  로그인
    ![image](https://github.com/user-attachments/assets/6772aea8-3b31-49a1-900d-199d55b1a05d)

2.  비밀번호 찾기
    ![image](https://github.com/user-attachments/assets/aa4d9c5c-199e-4cdb-9e8f-d55d35487053)

    a. 정규표현식을 활용한 이메일 검사
    ![image](https://github.com/user-attachments/assets/522601eb-5bcb-432a-b614-bf295533fd42)

    b. 아이디와 이메일이 일치하면 비밀번호 재설정으로 이동
    ![image](https://github.com/user-attachments/assets/7251d2c2-e55e-48fc-ab1f-a3eb0a8e35d5)

3.  회원가입
    ![image](https://github.com/user-attachments/assets/ea1bf5d0-b100-4a02-8398-ae2514f59e24)

4.  마이페이지

    a. 팝업을 활용한 마이페이지 및 로그아웃
    ![image](https://github.com/user-attachments/assets/ee225b44-27f2-470c-89c5-945616de18b1)

    b. 마이페이지 화면
    ![image](https://github.com/user-attachments/assets/eeef8a1e-6f69-478d-9116-7dae257438a7)

### 여행 관련 기능

1.  메인 화면
    ![image](https://github.com/user-attachments/assets/5a2f630f-cea8-4cf3-a82a-6d9780a69be2)

2.  지도 화면
    ![image](https://github.com/user-attachments/assets/92264df9-0162-479e-883b-889b8ca903b8)

3.  검색

    메인화면에서 이동하기 클릭 시 전체 검색에서 상위 10개 출력 (**페이지네이션 구현**)

    - Input 창을 활용한 검색

      - attractions table에 저장된 데이터의 `titlt` 칼럼을 기준으로 검색
        ![image](https://github.com/user-attachments/assets/75878e2a-ddc4-42ee-9571-b27179ea33f2)

    - 태그를 활용한 검색

      - content_type table에 저장된 데이터를 기준으로 검색
        ![image](https://github.com/user-attachments/assets/93a842ec-de1d-4638-abf6-be83e66fcf01)

    - 둘 모두를 활용한 검색

      - 태그가 선택된 상태에서 Input 창에 검색한 경우
      - Input창으로 검색된 결과를 태그로 검색한 경우
      - 태그와 Input창으로 검색된 상태에서 태그를 해제한 경우
        ![image](https://github.com/user-attachments/assets/ff09832b-5282-4589-a858-dfad7ddda1ae)

    - 페이지네이션
      ![image](https://github.com/user-attachments/assets/76dd875f-c0d6-4b21-be30-4ccab30f66f4)

          - props로 받은 현재 페이지를 기준으로 최대 10개 페이지 수를 받고

          - 처음, 끝 버튼 -> 첫 페이지와 마지막 페이지로 이동

          - 이전, 다음 버튼 -> 이전 10개 페이지와 다음 10개 페이지로 이동

### 게시판 관련 기능

> QnA 게시판은 저희 서비스에 필요한 요소라 생각하지 않아 FAQ를 활용한 게시판 CRUD를 구현했습니다.
> admin 계정만 FAQ 글 등록, 수정, 삭제가 가능하며, 일반 user는 조회만 가능합니다.

1. FAQ

헤더에 FAQ 버튼을 FAQ 컴포넌트를 불러옵니다.

    a. admin 화면

![image](https://github.com/user-attachments/assets/471f5d21-735f-46bb-8382-bb2f65b23e50)

    b. user 화면

![image](https://github.com/user-attachments/assets/968e047f-08ee-488d-820b-b1d7777ae1c6)

2. 글 보기

![image](https://github.com/user-attachments/assets/8ad84c1a-07fd-495e-8265-e344a9d3001c)

3. 글 등록

![image](https://github.com/user-attachments/assets/10077a2e-51f3-466a-a9cf-97041abbd431)

![image](https://github.com/user-attachments/assets/2ede7f63-30ba-468e-8aef-d0311c801dd9)

3. 글 관리

![image](https://github.com/user-attachments/assets/4cc1816d-6a0f-4b51-ae60-dfe22a0b8a2c)

4. 글 상세 보기

![image](https://github.com/user-attachments/assets/a35d941d-e072-4b26-af98-d5fee42ee1ee)

5. 글 수정

![image](https://github.com/user-attachments/assets/ed49dd3f-8a14-4043-8769-969220f22844)

![image](https://github.com/user-attachments/assets/aa67a8a3-2755-4082-b788-b9ea4b37df95)

![image](https://github.com/user-attachments/assets/2942928a-7df4-479e-83ad-0837ac81f72b)

6. 글 삭제

![image](https://github.com/user-attachments/assets/2bfc6bc0-13b5-4c96-8f19-1f2034a53e85)

![image](https://github.com/user-attachments/assets/bfa15bb7-2327-4498-9cec-66be2c7a9faa)

![image](https://github.com/user-attachments/assets/7a71f351-cc6c-44aa-ab03-731c7061ab21)

```text
게시판 상세 검색은 FAQ에 많은 글이 없어 불필요하다 생각했습니다.

대신 여행에서 검색 기능이 이를 대체하였습니다.
```
