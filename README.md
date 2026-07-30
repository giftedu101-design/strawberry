# 바다모아

부산 주요 해수욕장의 안전 정보, 지도, 편의시설, 해파리·쓰레기 시민 신고를 통합한 모바일 우선 정적 웹앱입니다. 고등학교 1학년 미래인재 프론티어 리더 양성 캠프 프로젝트용으로 제작했습니다.

## 주요 기능

- 해운대·광안리·송정·일광·송도·다대포 정보 구조 제공. 실제 수치는 API 연결 전까지 `연동 대기`로 표시
- 안전·주의·위험 3단계 종합 상태와 색상 마커 지도
- 해파리 및 쓰레기 신고, 사진 미리보기, 입력 검증, 상태 변경·삭제
- `localStorage` 저장으로 새로고침 후에도 신고 유지
- 샤워장·탈의실·화장실·보관소·음수대 및 상세 조건 필터
- 위치 권한 거부 시 해운대 기본 표시, 오류 안내와 재시도 UI
- 키보드 탐색, 대체 텍스트, 명확한 포커스와 충분한 색상 대비

## 폴더 구조

```text
.
├─ index.html
├─ css/styles.css
├─ js/
│  ├─ app.js       # 화면과 사용자 상호작용
│  ├─ api.js       # 실제 API 연결 지점
│  ├─ data.js      # 해변 목록과 빈 운영 데이터 구조
│  └─ storage.js   # localStorage 저장소 어댑터
├─ package.json
└─ README.md
```

## 실행

Node.js 20 이상에서(외부 패키지 설치 불필요):

```bash
npm run dev
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다. 배포용 파일은 `npm run build`로 `dist` 폴더에 생성됩니다.

## GitHub Pages 배포

1. 새 GitHub 저장소에 전체 파일을 업로드합니다.
2. 저장소 **Settings → Pages**에서 **Deploy from a branch**를 선택합니다.
3. `main` 브랜치와 `/ (root)`를 지정하고 저장합니다.
4. 잠시 후 표시되는 공개 주소로 접속합니다.

Vite 빌드 결과를 배포하는 경우 GitHub Actions에서 `npm ci`, `npm run build` 후 `dist` 폴더를 Pages artifact로 업로드하세요.

## 실제 API 연결

`js/api.js`의 `USE_MOCK`을 `false`로 바꾸고 `fetchBeachConditions()`의 `YOUR_API_PROXY_URL`을 실제 중계 API 주소로 교체합니다. API 연결 전에는 임의 수치를 표시하지 않습니다.

- 기상청 단기예보/생활기상지수: 기온, 강수, 풍속, 자외선
- 국립해양조사원 또는 해양수산부: 수온, 파고
- 부산광역시 공공데이터: 해수욕장 입수 통제, 혼잡도, 편의시설
- 공공데이터포털: 각 기관 API의 서비스 키 발급

정적 GitHub Pages에 서비스 키를 직접 넣으면 누구나 볼 수 있습니다. Cloudflare Worker, Firebase Functions 또는 Supabase Edge Functions 같은 서버리스 프록시에 키를 보관하고, 웹앱은 프록시 URL만 호출하는 방식을 권장합니다. API 응답은 `data.js`의 해변 객체 형식으로 변환해야 합니다.

## 저장소 교체

신고 데이터 처리는 `js/storage.js`에 분리되어 있습니다. Firebase 또는 Supabase 연결 시 동일한 `get`, `save`, `add`, `remove`, `updateStatus` 인터페이스의 비동기 어댑터를 만들고 `app.js`의 import만 교체하면 됩니다. 사진은 현재 Data URL로 저장되므로 브라우저 용량 제한이 있습니다. 운영 환경에서는 Firebase Storage 또는 Supabase Storage 업로드 URL을 저장하세요.

## 참고 앱 분석

- JellySafe: 모바일 카드형 위험도, 해변 선택, 빠른 하단 탐색의 장점을 참고했습니다.
- 부산 바다 실시간 앱: 확인 시점에 GitHub Pages 404 상태여서 요구사항에 맞춰 실시간 대시보드를 새로 구성했습니다.
- 비치케어: 지도와 거리순 시설 카드, 조건 필터의 장점을 참고했습니다.

공개 화면의 정보 구조와 사용자 흐름만 참고했으며 코드와 그래픽은 복사하지 않고 새로 작성했습니다.
