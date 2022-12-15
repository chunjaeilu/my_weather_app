# my_weather_app

22.12.12(월) ~

URL : https://chunjaeilu.github.io/my_weather_app/

## 개인과제 :: 날씨앱 만들기

#### 과제 내용
- 날씨 API 활용하여 날씨앱 만들기 (Open Weather Map)
- 제출일정 : 1주일

#### Time Table

- 22.12.12(월)
  - 디자인 시안
  
- 22.12.13(화)
  - 디자인 시안 수정
  - 시안 기반 화면 구현(HTML, CSS)

- 22.12.14(수)
  - API활용 데이터 불러오기 (JavaScript)

- 22.12.15(목)
  - 1차 제출
  
---
#### 기획 및 디자인 컨셉
- 웹에서 접근 가능한 날씨 어플
- 현재 위치 및 주요도시 날씨정보
- 모바일 화면을 그대로 구현한 UI
- 현재 날씨에 따라 배경 동영상 변경
    
#### 주요 구현기능
- 사용자가 접속한 위치 좌표값 활용, 현재위치 날씨정보 출력
- 토글버튼 클릭시 도시선택 메뉴 노출, 도시 선택시 해당 도시 날씨정보 출력 (서울, 인천 등 국내 주요도시)
- 현재 날씨에 따라 배경 동영상 변경 (맑음/구름/눈/비/안개, 일부 날씨 낮/밤 구분)
- 현재 날씨에 따라 날씨 아이콘 변경 (API에서 제공하는 코드에 대응해 직접 제작한 아이콘이미지 변경)
- 현재 날씨 기반 데이터 노출 (날씨, 온도, 체감온도, 풍향, 풍속, 습도, 미세먼지, 초미세먼지)
  - 미세먼지, 초미세먼지 기상청 환경기준 농도에 따라 좋음, 보통, 나쁨, 매우나쁨 표시
- 현재시간 기준 3시간 단위(총 18시간) 일기예보 노출 (시간, 날씨(아이콘), 온도)
- 현재일자 기준 3일간 일기예보 노출 (날짜, 날씨(아이콘), 온도, 체감온도, 강수확률)


---
#### 향후 업데이트 방향
- 시간별예보 및 주간예보 슬라이드 기능 추가
- JavaScript 코드 최적화 (반복문 활용)
- 모바일환경 UI 변경 (웹-모바일 가변형)
