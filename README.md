# Oneill8

## About

> 2022.07.23 - 2022.08.04 <br> [오닐 PICK 맛집 사이트 만들기](https://velog.io/@yujinoneill/series/Oneill8-%EB%A7%9B%EC%A7%91-%EC%82%AC%EC%9D%B4%ED%8A%B8) 👈 블로그 포스팅 바로가기 <br> [Oneill8](https://oneill8.herokuapp.com/) 👈 배포한 페이지 바로가기

<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=black"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=black"> <img src="https://img.shields.io/badge/tailwind CSS-06B6D4?style=for-the-badge&logo=tailwind CSS&logoColor=white">

![](https://velog.velcdn.com/images/yujinoneill/post/9ea6dfbc-845d-4f99-9876-53e78f4a60ab/image.png)

## Features

- Front-end
  - React를 이용한 Sing Page Application
  - Tailwind CSS와 그의 라이브러리인 Daisy UI로 CSS 디자인
  - 카카오 지도 API를 사용한 구현
- Back-end
  - Node.js와 Express로 서버 구성
  - Mongoose로 MongoDB 연결
  - 맛집 및 리뷰에 대한 CRUD 구성
  - Axios를 통한 REST API 호출
  - Heroku를 이용한 배포

## Details of Project

### Home

![](https://velog.velcdn.com/images/yujinoneill/post/9ea6dfbc-845d-4f99-9876-53e78f4a60ab/image.png)

- gif 용량 제한으로 인해 첨부하지 못했으나, 배경에 총 5개의 이미지가 일정 간격을 두고 Fade in/out 되는 애니메이션 적용
- 권한별 라우팅을 통해 해당 Home 페이지는 로그인하지 않았을 경우에만 접근할 수 있음

### Log In / Out

![](https://velog.velcdn.com/images/yujinoneill/post/f8a2a63c-560f-434c-9a1d-79bb4b57f249/image.gif)

- Home과 마찬가지로 권한별 라우팅을 통해 로그인하지 않았을 경우에만 접근 가능
- Passport 패키지를 사용하여 로그인과 로그아웃, 회원가입, 인증 등을 구현
- 로그아웃 시 Home 페이지로 리다이렉트

### Register

![](https://velog.velcdn.com/images/yujinoneill/post/e034d559-af99-4c1a-9510-e20fe2997279/image.png)

- 로그인 컴포넌트를 재사용
- 회원가입이 정상적으로 완료될 경우 바로 로그인할 수 있도록 로그인 페이지로 리다이렉트
- 리액트에서 아이디 길이, 비밀번호 구성 등의 유효성 검사를 거친 후 서버로 데이터가 넘어가면, DB에서 중복되는 username 또는 email이 있는지 검사 후 없을 경우에만 회원가입을 수행

### 404 Not Found

![](https://velog.velcdn.com/images/yujinoneill/post/94557591-b14d-4d96-84db-6a7edfe00388/image.png)

- 없는 경로에 접근할 경우 리액트에서 우선적으로 판단하여 404 페이지로 리다이렉트

### Map / Place List

![](https://velog.velcdn.com/images/yujinoneill/post/85599d51-a7f3-4498-b453-650edf26805e/image.gif)

- 로그인 여부와 상관없이 접근할 수 있으나, 로그인이 되어 있는 경우 Home을 대신하여 기본 페이지 역할
- 지도 상의 마커에 마우스를 올리면 상호명이 표시되고, 마커를 클릭하면 해당 맛집의 상세 페이지로 이동
- 지도는 고정한 채 맛집 리스트만 스크롤 가능
- 관리자 계정이 아닌 경우 내비게이션 바에 맛집 등록 버튼이 표시되지 않음

### Place Detail / Review

![](https://velog.velcdn.com/images/yujinoneill/post/d1b13dbf-06e2-4888-bc37-698c77856cd9/image.gif)

- 로그인하지 않은 경우 리뷰 작성 폼이 표시되지 않음
- 관리자 계정이 아닌 경우 맛집 수정 및 등록 버튼이 표시되지 않음
- 리뷰 작성자가 아닌 경우 리뷰 삭제 버튼이 표시되지 않음

### My page

![](https://velog.velcdn.com/images/yujinoneill/post/b6cb51d4-3808-4043-9171-f781a66bf5cf/image.gif)

- 작성한 리뷰가 있을 경우에만 리뷰를 모아볼 수 있음
- 작성한 리뷰가 없을 경우 리뷰 작성을 권유하는 문구 표시
- 로그인하지 않은 경우 해당 페이지 접근 불가

### Place Create / Update / Delete

![](https://velog.velcdn.com/images/yujinoneill/post/c514d618-47d6-4f01-9dc1-8e2da411e18c/image.gif)

- 관리자 계정으로만 가능한 기능
- isEdit과 originData를 props로 받아서 맛집 수정일 경우 폼에 originData를 불러옴
- 맛집 데이터 삭제 시 해당 맛집을 참조하는 리뷰 데이터도 함께 제거
