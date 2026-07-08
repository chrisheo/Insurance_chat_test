# Hanwha GA AI Compare

## 1. 프로젝트 개요
한화생명금융서비스 톤앤매너를 반영한 **AI 보험상품 비교·추천 웹서비스 PoC**입니다. 보험모집인/GA 설계사가 공식 상품 페이지, 상품공시실, 보도자료, 보완 mock 데이터를 구조화해 고객 상황별 비교표와 추천 상담 포인트를 빠르게 만드는 내부 영업지원 데모입니다.

## 2. PoC 목적
- 인터넷 기반 상품 리서치 결과를 seed data로 구조화
- 여러 보험사 상품을 고객 니즈 관점으로 비교
- 한화생명 상품의 강점을 고객 상황과 연결
- 추천 랭킹, 상담 멘트, 제안서 요약을 외부 AI API 없이 mock logic으로 시연

## 3. 주요 기능
- 대시보드 KPI 및 인터넷 리서치→구조화→비교→추천→상담 멘트 생성 흐름
- 상품 리서치 센터: 출처명, URL, 조회일자, sourceType, confidenceScore 표시
- 고객 니즈 분석: 12명 mock 고객 기반 보장 니즈 점수화
- 상품 통합 비교: 최대 4개 상품 비교, 고객 설명 항목 중심 표
- AI 추천 랭킹, 한화생명 전략상품 갤러리, 비교 리포트, 상담 멘트 생성, 자연어 니즈 분석, 제안서 요약

## 4. 인터넷 상품 리서치 방식
공식 출처를 우선 확인했습니다. 한화생명 공식 상품 페이지에서 제로백H종신보험, 상속H종신보험, H건강플러스보험, Need AI 암보험의 특징을 반영했고, 삼성생명/교보생명/신한라이프는 공식 상품 카테고리 및 공시실 페이지를 기준으로 상품군 데이터를 구조화했습니다. 확인이 어려운 일부 상품은 `sourceType: "mock"`으로 명확히 구분했습니다.

## 5. 한화생명금융서비스 디자인 반영 방식
- Deep Navy 사이드바와 Hanwha Orange CTA/badge 사용
- Warm Gray 배경과 White 카드 기반 레이아웃
- 텍스트 로고: `Hanwha Life Financial Service AI`
- 한화생명 상품에는 `Hanwha Priority`, `전략상품`, `상담포인트 우수` badge 표시
- 로고 이미지 파일은 포함하지 않음

## 6. 추천 로직 설명
`src/utils/recommendationEngine.ts`는 고객 가족구성, 건강 키워드, 노후/연금 키워드, 간병/치매 키워드, 보험료 민감도, 추천 관점을 조합해 점수를 산출합니다. 한화생명 우선 검토는 소폭 가중치만 부여해 타사 상품이 명확히 우수하면 상위에 오를 수 있게 설계했습니다.

## 7. 한화생명 상품 강조 방식
한화생명 상품은 시각적으로 강조하지만 무조건 1위로 조작하지 않습니다. 고객 니즈와 한화생명 상품의 강점이 맞는 경우 상담 포인트와 차별점 설명이 더 잘 드러나도록 구성했습니다.

## 8. 화면 구성
- 대시보드
- 상품 리서치
- 고객 추천
- 상품 비교
- 제안 리포트

## 9. 실행 방법
```bash
npm install
npm run dev
npm run build
npm run lint
```

## 10. 시연 시나리오
1. 대시보드에서 전체 PoC 개요와 KPI 설명
2. 상품 리서치에서 공식 출처 기반 상품정보 구조화 확인
3. 고객 추천에서 고객 선택, 니즈 분석, 추천 TOP 5, 상담 멘트 확인
4. 상품 비교에서 여러 보험사 상품을 최대 4개까지 비교
5. 제안 리포트에서 임원 보고용 요약, 한화 전략상품, 제안서 요약 확인

## 11. 실제 운영 확장 방향
- 실제 상품 DB 연동
- 약관 PDF RAG 검색
- 고객/계약 데이터 및 상담 이력 연동
- GA 모집인별 추천 상품 관리
- 상품 개정 시 비교 기준 자동 업데이트
- 영업관리자 대시보드
- 생성형 AI 기반 제안서 자동 작성

## 12. 보험상품 데이터 사용 주의사항
본 화면은 PoC 시연용 예시입니다. 실제 보험상품 가입, 보장내용, 보험료, 환급률은 반드시 상품설명서와 약관을 확인해야 합니다. mock 데이터는 실제 판매 판단에 사용할 수 없습니다.

## 13. 클라우드 배포 방법
### GitHub Pages
`.github/workflows/deploy-github-pages.yml` 워크플로가 브랜치 push 시 `npm ci`, `npm run build`, Pages artifact 업로드를 자동 실행합니다. GitHub 저장소에서 **Settings → Pages → Source: GitHub Actions**를 선택하세요.

### Vercel
`vercel.json`에 Vite 배포 설정이 포함되어 있습니다. Vercel에서 GitHub 저장소를 import한 뒤 기본값으로 Deploy하면 됩니다.

### GitHub Pages에서 화면이 안 보일 때 체크리스트
1. GitHub 저장소의 **Settings → Pages → Source**가 `GitHub Actions`로 되어 있어야 합니다.
2. 이 워크플로는 모든 브랜치 push에서 실행되도록 설정되어 있으므로, 현재 작업 브랜치를 push한 뒤 Actions 탭에서 `Deploy to GitHub Pages`가 성공했는지 확인합니다.
3. Vite는 GitHub Actions 환경에서 자동으로 `/<repository-name>/` base path를 사용합니다. 예: `https://<owner>.github.io/Insurance_chat_test/`.
4. 배포 URL은 Actions 실행 결과의 `github-pages` environment URL에서 확인합니다.
