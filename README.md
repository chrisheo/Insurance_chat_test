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
`.github/workflows/deploy-github-pages.yml` 워크플로는 모든 브랜치에서 `npm ci`, `npm run build` 검증을 실행하고, GitHub Pages 배포는 환경 보호 규칙을 피하기 위해 `main` 또는 `master` 브랜치에서만 실행합니다. GitHub 저장소에서 **Settings → Pages → Source: GitHub Actions**를 선택하세요.

### Vercel
`vercel.json`에 Vite 배포 설정이 포함되어 있습니다. Vercel에서 GitHub 저장소를 import한 뒤 기본값으로 Deploy하면 됩니다.

### GitHub Pages에서 화면이 안 보일 때 체크리스트
1. GitHub 저장소의 **Settings → Pages → Source**가 `GitHub Actions`로 되어 있어야 합니다.
2. `codex/*` 같은 작업 브랜치에서는 build 검증만 실행되고 Pages deploy는 건너뜁니다. GitHub Pages 환경이 `main`/`master`만 허용하는 경우, PR을 병합한 뒤 기본 브랜치에서 배포해야 합니다.
3. Actions 탭에서 기본 브랜치의 `Deploy to GitHub Pages`가 성공했는지 확인합니다.
4. Vite는 GitHub Actions 환경에서 자동으로 `/<repository-name>/` base path를 사용합니다. 예: `https://<owner>.github.io/Insurance_chat_test/`.
5. 배포 URL은 Actions 실행 결과의 `github-pages` environment URL에서 확인합니다.

## 14. 엑셀/HTML Table 상품 데이터 가공 구조
업로드 ZIP 또는 원천 `.xls` 파일이 제공되는 경우 확장자는 `.xls`여도 내부가 Microsoft Excel HTML Table일 수 있으므로, `openpyxl` 단독 처리보다 HTML table parser 방식으로 row를 추출하는 전처리를 권장합니다. 현재 저장소에는 ZIP/XLS 원천 파일이 포함되어 있지 않아, 본 구현은 요청서의 `rawProductSeed`를 `src/data/products.ts`에서 파싱해 `InsuranceProduct[]` seed data로 변환합니다.

생성된 상품 데이터는 다음 구조를 따릅니다.
- `src/types/product.ts`: `InsuranceCategory`, `SourceKind`, `InsuranceProduct` 타입 정의와 기존 UI 호환용 `Product` 타입
- `src/data/products.ts`: `rawProductSeed` 파싱, `insuranceProducts`, `featuredProducts`, `demoProducts`, 기존 화면용 `products` 변환 데이터
- `src/data/productCategories.ts`: 화면 필터용 보험 카테고리 목록
- `src/utils/productClassifier.ts`: 상품명/급부 키워드 기반 카테고리·sourceKind·tag 생성
- `src/utils/productScoring.ts`: 상품명/급부 키워드 기반 mock scoring, 추천 고객, 영업 포인트, 주의사항 생성

## 15. 상품 분류 기준
상품 카테고리는 상품명, 급부명칭, 지급사유에 포함된 키워드를 우선 적용합니다.
- 종신보험: 종신, 상속, 사망보험금, H종신, 제로백
- 정기보험: 정기, 경영인정기, e정기, 정기사망
- 질병/건강보험: 건강, 질병, 수술, 입원, 뇌혈관, 허혈성심장질환, 심근경색, 뇌출혈
- 암보험: 암, 항암, 암진단, 암수술, 암주요치료, 유사암, 고액암
- CI/GI보험: CI, GI, 중대한, 선지급, 라이프케어, 미리받는, 진단보험금
- 간병/치매보험: 간병, 치매, 장기요양, LTC, 요양병원
- 상해보험: 상해, 재해, 골절, 교통재해, 레저, 장해
- 연금/저축/변액보험: 연금, 연금저축, 저축, 목돈마련, 변액, 유니버셜, 적립 등

변액 상품은 `변액종신보험`, `변액정기보험`, `변액저축보험`, `변액연금보험`처럼 category에 변액 속성을 유지하고, tags에도 `변액`, `유니버셜`, `저축/연금` 키워드를 남겨 비교·추천 화면에서 함께 활용할 수 있게 했습니다.

## 16. 상품 점수 산정 방식
엑셀 원천에 정량 점수가 없다는 전제에서 `src/utils/productScoring.ts`가 키워드 기반 mock scoring을 생성합니다. 예를 들어 사망/종신/정기/상속 키워드는 `deathProtection`, 암/항암/유사암 키워드는 `cancerProtection`, 간병/치매/LTC 키워드는 `nursingCare`, 연금/저축/적립 키워드는 `pension`, `savings`, `refundCompetitiveness`에 반영됩니다.

한화생명 상품은 `consultingUsability`와 `hanwhaStrategicFit`에 소폭 가중치를 주지만, 추천 엔진에서는 고객 니즈와 상품군 적합도를 함께 계산하므로 타사 상품이 더 적합하면 상위 추천이 가능합니다. 모든 상품에는 공통 주의사항으로 “실제 가입 전 상품설명서와 약관 확인 필요” 문구를 포함합니다.
