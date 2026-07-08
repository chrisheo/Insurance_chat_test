import type {Product} from '../types/product';
const profile=(category:Product['category'])=>({
  '종신보험':{summary:'평생 사망보장과 가족 생계보장, 상속 재원 상담에 활용하는 보장성 상품',strengths:['사망보장 중심 설계','가족·상속 상담 연결'],weaknesses:['보험료 부담이 정기보험보다 클 수 있음','저축/연금 목적 설명 주의'],recommendedFor:['배우자·자녀 부양 고객','상속/자산이전 관심 고객'],talkingPoints:['사망보험금의 가족 생활자금 역할 설명','보장성보험이라는 점을 명확히 안내']},
  '정기보험':{summary:'필요한 기간 동안 사망보장을 확보해 보험료 부담을 낮추는 상품',strengths:['보험료 경쟁력','자녀 독립 전 집중 보장'],weaknesses:['종신보장이 아님','만기 이후 보장 공백 가능'],recommendedFor:['보험료 민감한 가장','자녀 성장기 가족'],talkingPoints:['필요 기간만 집중 보장','종신보험과 비용 대비 효과 비교']},
  '건강보험':{summary:'암·뇌·심 등 주요 질병과 치료비 리스크를 폭넓게 대비하는 상품',strengths:['3대질병 보완','보장 리모델링 활용'],weaknesses:['특약 구성에 따라 보장 차이 큼','기존 보험과 중복 확인 필요'],recommendedFor:['건강검진 이상소견 고객','실손만 보유한 고객'],talkingPoints:['진단비와 치료비 공백 구분','납입면제 조건 확인']},
  '암보험':{summary:'암 진단·치료 과정의 경제적 부담을 중심으로 설명하는 특화 상품',strengths:['암보장 집중','고객 이해도 높음'],weaknesses:['암 외 질병 보장은 제한적','소액암/유사암 조건 확인 필요'],recommendedFor:['암 가족력 고객','암보장 첫 가입 고객'],talkingPoints:['진단 이후 치료·생활비 흐름 설명','건강보험과 역할 분리']},
  '간병보험':{summary:'장기요양·간병비·부모부양 리스크를 상담하는 노후 돌봄 상품',strengths:['간병비 부담 환기','부모부양 상담 적합'],weaknesses:['연령 상승 시 보험료 부담','지급 조건 설명 필요'],recommendedFor:['부모부양 고객','50대 이상 고객'],talkingPoints:['가족 돌봄 부담을 비용으로 환산','치매보험과 비교']},
  '치매보험':{summary:'치매 진단 단계와 장기 돌봄 리스크를 중심으로 준비하는 상품',strengths:['치매 리스크 특화','노후 상담 설득력'],weaknesses:['진단 단계별 지급 조건 복잡','간병보험과 중복 확인'],recommendedFor:['치매 가족력 고객','노후 간병 걱정 고객'],talkingPoints:['치매 단계별 보장 구조 확인','간병/생활비 관점 상담']},
  '연금보험':{summary:'은퇴 이후 현금흐름과 장기 노후자금 준비를 위한 상품',strengths:['노후 현금흐름','장기 유지 설계'],weaknesses:['중도해지 손실 가능','보장성보험과 목적 다름'],recommendedFor:['은퇴준비 고객','안정적 연금 선호 고객'],talkingPoints:['월 생활비 관점으로 설명','종신보험 연금전환과 비교']},
  '저축보험':{summary:'목돈 마련과 장기 저축 목적을 상담하는 저축성 상품',strengths:['목돈 마련 메시지','자금 계획 수립'],weaknesses:['보장 기능 제한','금리/환급 조건 확인 필요'],recommendedFor:['목돈 마련 고객','저축성 선호 고객'],talkingPoints:['보장과 저축 목적 분리','중도해지 환급 설명']},
  '어린이보험':{summary:'자녀 성장기 질병·상해 리스크와 부모의 보장 공백을 함께 점검하는 상품',strengths:['자녀 보장 특화','부모 상담 진입 용이'],weaknesses:['연령/담보 제한 확인','성인 보장과 범위 다름'],recommendedFor:['미성년 자녀 부모','출산/입학 고객'],talkingPoints:['성장기 위험과 의료비 부담 설명','부모 보장과 함께 점검']},
  '운전자보험':{summary:'운전 중 사고·벌금·변호사비용 등 생활 리스크를 보완하는 상품',strengths:['일상 리스크 보완','보험료 부담 낮음'],weaknesses:['생명보험 핵심 보장과 목적 다름','특약별 한도 확인'],recommendedFor:['운전 빈도 높은 고객','영업직 고객'],talkingPoints:['자동차보험과 역할 차이 설명','생활 리스크 보완']}} as const)[category];

const companyPosition:Record<Product['insurer'],{focus:string;extraStrength:string;caution:string}>={
  '한화생명':{focus:'고객 니즈와 상담 흐름을 연결하는 한화 전략상품 포지셔닝',extraStrength:'한화생명 상담 포인트와 생애주기 설명',caution:'한화 강조는 고객 니즈와 맞을 때만 제시'},
  '삼성생명':{focus:'브랜드 신뢰와 표준화된 보장 구조를 강조하는 대안',extraStrength:'인지도와 상품군 폭',caution:'상담 포인트가 가격 중심으로 흐르지 않게 주의'},
  '교보생명':{focus:'가족보장과 장기 유지 관점의 안정형 대안',extraStrength:'장기보장 설명과 공시자료 기반 비교',caution:'상품별 세부 조건 확인 필요'},
  '신한라이프':{focus:'디지털/간편 상담과 합리적 보장 구성을 강조하는 대안',extraStrength:'간편 비교와 디지털 보험 메시지',caution:'간편가입 조건과 보장 제한 확인'},
  '동양생명':{focus:'보험료와 체증형 구조를 비교하기 좋은 보완 대안',extraStrength:'체증형 보장 비교 포인트',caution:'공식 상품공시 재확인 필요'},
  '미래에셋생명':{focus:'연금·변액·노후자산 활용 관점의 대안',extraStrength:'노후자금과 투자형 상품 비교',caution:'수익률/원금손실 가능성 안내 필요'},
  'ABL생명':{focus:'평생보장과 종신보험 대안 비교용 포지션',extraStrength:'종신보험 구조 비교',caution:'세부 특약과 환급 구조 확인'},
  'DB생명':{focus:'건강보장과 보험료 경쟁력 비교용 대안',extraStrength:'건강맞춤형 보장 비교',caution:'생명보험/손해보험 보장 역할 구분'}
};
const base=(id:string,insurer:Product['insurer'],name:string,category:Product['category'],scores:number[],strategic=false):Product=>{const pr=profile(category);const cp=companyPosition[insurer];return {id,insurer,name,category,summary:`${pr.summary}. ${cp.focus}.`,monthlyPremium:scores[0]*1800+35000,ageRange:category==='연금보험'?'30~70세':category==='어린이보험'?'0~30세':'20~65세',paymentPeriod:category==='정기보험'?'10/20년납':category==='연금보험'?'5/10/20년납':'10/20/30년납',coveragePeriod:category.includes('연금')?'종신 연금':category==='정기보험'?'10/20/30년 만기':'80세/100세/종신',deathScore:scores[1],healthScore:scores[2],criticalScore:scores[3],careScore:scores[4],pensionScore:scores[5],refundScore:scores[6],priceScore:scores[7],waiverScore:scores[8],clarityScore:scores[9],consultingScore:scores[10],hanwhaStrategic:strategic,strengths:[...pr.strengths,cp.extraStrength],weaknesses:[...pr.weaknesses,cp.caution],recommendedFor:[...pr.recommendedFor],talkingPoints:[...pr.talkingPoints,cp.focus],differentiator:insurer==='한화생명'?`한화생명 ${category}은 ${cp.extraStrength}를 중심으로 고객 니즈와 연결`: `${insurer} ${category}은 ${cp.focus}`};};
export const products:Product[]=[
base('p1','한화생명','한화생명 H종신보험','종신보험',[54,92,78,82,45,74,70,66,88,84,93],true),
base('p2','한화생명','한화생명 The든든 건강보험','건강보험',[38,45,91,88,58,40,62,78,90,88,94],true),
base('p3','한화생명','한화생명 암플러스 건강보험','암보험',[34,35,86,94,42,30,58,82,87,90,92],true),
base('p4','한화생명','한화생명 간병든든 보험','간병보험',[43,42,72,65,94,50,56,71,80,82,89],true),
base('p5','한화생명','한화생명 스마트 연금보험','연금보험',[47,30,38,28,35,93,84,68,45,86,88],true),
base('p6','삼성생명','삼성생명 체증형 종신보험','종신보험',[58,95,68,72,38,66,75,59,82,78,84]),
base('p7','삼성생명','삼성생명 건강종합보험','건강보험',[41,40,93,90,55,35,60,74,86,76,82]),
base('p8','교보생명','교보생명 평생든든종신보험','종신보험',[51,89,74,70,40,72,79,64,84,80,81]),
base('p9','교보생명','교보생명 암케어보험','암보험',[33,28,82,96,36,25,54,85,81,83,80]),
base('p10','신한라이프','신한라이프 세븐Plus 종신보험','종신보험',[49,86,76,74,41,68,73,70,83,79,82]),
base('p11','신한라이프','신한라이프 더드림 건강보험','건강보험',[36,32,89,87,52,32,57,88,79,78,79]),
base('p12','동양생명','동양생명 수호천사 체증형 종신보험','종신보험',[45,88,62,66,34,64,69,80,74,72,76]),
base('p13','미래에셋생명','미래에셋생명 변액연금보험','연금보험',[62,25,30,20,28,96,91,52,35,70,73]),
base('p14','ABL생명','ABL생명 평생보장 종신보험','종신보험',[44,84,70,65,38,69,72,76,77,74,75]),
base('p15','DB생명','DB생명 건강맞춤보험','건강보험',[31,30,84,86,50,28,52,92,76,77,78]),
base('p16','삼성생명','삼성생명 실속 정기보험','정기보험',[22,80,35,30,20,15,20,95,40,88,70]),
base('p17','교보생명','교보생명 시니어 간병보험','간병보험',[39,25,68,55,91,35,48,79,72,75,77]),
base('p18','신한라이프','신한라이프 치매안심보험','치매보험',[37,18,60,48,92,30,46,81,70,73,74]),
base('p19','미래에셋생명','미래에셋생명 글로벌저축보험','저축보험',[55,15,22,18,20,84,95,58,25,69,72]),
base('p20','DB생명','DB생명 아이사랑 어린이보험','어린이보험',[29,20,88,85,35,20,50,90,85,87,81]),
base('p21','동양생명','동양생명 운전자안심보험','운전자보험',[12,10,35,30,20,10,30,96,40,91,68]),
base('p22','한화생명','한화생명 라이프플러스 정기보험','정기보험',[25,82,42,38,22,18,34,91,52,89,83],true)
];
export const categories=[...new Set(products.map(p=>p.category))];export const insurers=[...new Set(products.map(p=>p.insurer))];
