import type {InsuranceProduct,Product} from '../types/product';
import {classifyProduct,sourceKindFor,tagsFor} from '../utils/productClassifier';
import {cautionPointsFor,salesPointsFor,scoreInsuranceProduct,targetCustomersFor} from '../utils/productScoring';

export const rawProductSeed=`company|category|productName|mainBenefits|premiumMale|premiumFemale|hanwhaPriority
한화생명|종신보험|한화생명 H종신보험 무배당[2종 3대질병납입면제형](해약환급금 일부지급형Ⅰ)|사망보험금|2566000 원|2,471,000 원|high
한화생명|종신보험|한화생명 H종신보험 무배당[1종 기본납입면제형](해약환급금 일부지급형Ⅰ)|사망보험금, 9대질병보험료납입면제특약|2521000 원|2,424,000 원|high
한화생명|종신보험|한화생명 제로백H종신보험 무배당|사망보험금, 9대질병보험료납입면제특약|798000 원|767,000 원|high
한화생명|종신보험|한화생명 상속H종신보험 무배당|사망보험금|159900 원|139,425 원|high
한화생명|CI/GI보험|한화생명 하나로H종신보험 무배당|사망보험금, 12대질병보험료납입면제특약, 12대질병케어특약|1178000 원|1,120,000 원|high
한화생명|정기보험|한화생명 e정기보험 무배당[순수보장형]|사망보험금|16000 원|8,400 원|medium
한화생명|정기보험|한화생명 경영인H정기보험 무배당_2종(10%체증형, 해약환급금 일부지급형)|사망보험금|409000 원|278,000 원|high
한화생명|암보험|한화생명 H건강플러스보험 무배당(해약환급금 일부지급형)[일반가입형Ⅰ]|3대질병 사망보험금, 암주요치료보장특약, 사망보험금|132900 원|122,700 원|high
한화생명|암보험|한화생명 Need AI 암보험 무배당|암사망보험금, 암주요치료보장N특약, 사망보험금|8340 원|7,020 원|high
한화생명|암보험|한화생명 e암보험(비갱신형) 무배당(표준체형)|특정 고액치료비관련 암진단자금, 암진단자금, 중증 갑상선암 진단자금|33150 원|25,350 원|medium
한화생명|질병/건강보험|한화생명 걸음e건강보험 무배당|뇌혈관질환진단, 허혈성심장질환진단, 암진단|12920 원|12,180 원|medium
한화생명|간병/치매보험|한화생명 H간병보험 무배당 [일반가입]|사망보험금, 간병인지원금특약, 요양병원제외 간병보장|6900 원|4,750 원|high
한화생명|상해보험|한화생명 스마트H상해보험 무배당|재해사망보험금, 고도장해보험금|2611100 원|1,964,100 원|medium
한화생명|상해보험|한화생명 포켓골절보험 무배당|재해골절진단자금|1177 원|852 원|medium
한화생명|연금저축보험|한화생명 e연금저축보험 무배당|연금저축, 계약자적립액, 해약환급금|3,435,428 원||medium
한화생명|저축보험|WE CARE DREAM 저축보험 무배당|저축, 계약자적립액, 해약환급금|3,617,188 원||medium
한화생명|저축보험|한화생명 2030 목돈마련 디딤돌저축보험 무배당|저축, 목돈마련, 계약자적립액|3,650,674 원||medium
삼성생명|종신보험|삼성 암치료플러스종신보험(2605)(무배당,저해약환급금형)|사망보험금Ⅰ, 사망보험금Ⅱ, 항암약물치료보험금|554000 원|499,000 원|none
교보생명|종신보험|교보간편K-실속종신보험 [D](무배당)|재해사망보험금, 질병사망보험금, 사망보험금|463000 원|441,000 원|none
신한라이프생명|종신보험|신한(간편가입)종신보험 드림UP(무배당, 해약환급금 일부지급형)|사망보험금, 보험료납입면제특약|1596800 원|1,582,900 원|none
ABL생명|종신보험|(무)우리WON세븐종신보험(해약환급금 일부지급형Ⅱ) [일반심사형]|사망보험금, 증액사망보험금, 6대질병보험료납입면제특약|1375000 원|1,255,000 원|none
동양생명|종신보험|(무)우리WON하는7배더행복한플러스종신보험(간편심사형)|사망보험금|1918400 원|1,708,400 원|none
메트라이프생명|종신보험|무배당 모두의 종신보험(무해약환급금형)_체증형|사망보험금, 암사망특약, 재해사망특약|305000 원|284,000 원|none
미래에셋생명|변액종신보험|미래에셋생명 변액종신보험 무배당 미담|사망보험금, 납입면제특약, 변액종신|546,000 원|506,000 원|none
메트라이프생명|변액종신보험|무배당 변액유니버셜 모두의상속종신보험|사망보험금, 뇌출혈진단특약, 암수술특약|177,400 원|158,400 원|none
삼성생명|정기보험|삼성 내리사랑정기보험(2501)(무배당,순수보장형)|사망보험금|23000 원|16,000 원|none
교보생명|정기보험|교보간편경영인정기보험 [2501](무배당)|사망보험금, 재해장해납입면제특약|360000 원|288,000 원|none
신한라이프생명|정기보험|신한SOL정기보험(무배당)|사망보험금|14400 원|7,900 원|none
KB라이프생명|정기보험|KB 착한정기보험Ⅱ 무배당|사망보험금|16100 원|9,000 원|none
미래에셋생명|변액정기보험|미래에셋생명 헤리티지 변액정기보험 무배당 [일반가입형]|사망보험금, 체증형 정기보장|577,000 원|330,000 원|none
삼성생명|암보험|삼성 가족대표건강보험(2605)(무배당,무해약환급금형)_3종(간편고지형)|사망보험금, 암진단특약, 뇌혈관질환진단특약|18500 원|15,400 원|none
교보생명|암보험|교보간편암평생보장보험 (무배당)|사망보험금, 암진단보너스 진단보험금, 사망보장증액보너스|400000 원|384,000 원|none
신한라이프생명|암보험|신한(간편가입)통합건강보험 원(ONE)(무배당, 해약환급금 미지급형)|사망보험금, 암진단특약, 남녀특정암진단|12432 원|11,444 원|none
ABL생명|암보험|(무)우리WON더담은암보험(해약환급금 미지급형)(간편심사형)|사망보험금, 일반암진단특약, 소액암진단특약|7260 원|6,150 원|none
동양생명|암보험|(무)우리WON하는암보험(해약환급금 미지급형)|사망보험금, 기타피부암·갑상선암 주요치료비, 암 주요치료비|2030 원|1,692 원|none
삼성생명|질병/건강보험|삼성 인터넷 뇌심건강보험(2505)(갱신형,무배당)|사망보험금, 2대질병 주요검사비, 혈관조영술검사비|210 원|130 원|none
교보생명|질병/건강보험|교보뇌·심장보험(무배당)_만기환급형|사망보험금, 만기환급금, 뇌출혈 및 급성심근경색 진단보장|53820 원|35,280 원|none
신한라이프생명|질병/건강보험|신한통합건강보험 슈퍼원(ONE)(무배당, 해약환급금 미지급형)|사망보험금, 뇌혈관질환진단특약, 질병수술특약|11544 원|10,720 원|none
DB생명|질병/건강보험|(무)e로운 뇌혈관질환보장보험(해약환급금 미지급형)(2601)|뇌혈관질환 진단자금, 수술급여금, 입원급여금|23000 원|20,600 원|none
교보생명|간병/치매보험|교보암·간병평생보장보험 (무배당)|사망보험금, 암/LTC진단보너스, 사망보장증액보너스|355000 원|335,000 원|none
동양생명|간병/치매보험|(무)우리WON하는치매간병보험(해약환급금 미지급형Ⅲ)|사망보험금, 경도이상치매보장, 중등도이상치매보장|2134 원|1,846 원|none
미래에셋생명|간병/치매보험|M-케어 치매간병보험 무배당 일반가입형 [기본형]|사망보험금, 치매진단특약, 월지급형 치매진단특약|25500 원|22,270 원|none
삼성생명|상해보험|삼성 s교통상해보험(2501)(무배당)|교통재해사망보험금, 자동차탑승중교통재해사망, 대중교통사고사망|5700 원|3,300 원|none
NH농협생명|상해보험|ESG쏘옥NHe대중교통보험(무배당)|대중교통재해 사망보험금, 기타교통재해 사망보험금|||none
삼성생명|연금저축보험|삼성 연금저축골드연금보험(2601)(무배당)|연금저축, 계약자적립액, 해약환급금|3,309,060 원||none
교보생명|연금저축보험|교보e연금저축보험|연금저축, 계약자적립액, 해약환급금|3,618,489 원||none
신한라이프생명|연금저축보험|신한VIP참연금저축보험Ⅲ|연금저축, 계약자적립액, 해약환급금|3,404,895 원||none
KDB생명|연금저축보험|e원금보장 KDB하이브리드연금저축보험(무)|연금저축, 원금보장, 계약자적립액|3,630,735 원||none
삼성생명|저축보험|삼성 스마트저축보험(2601)(무배당)|저축, 계약자적립액, 해약환급금|49,792,040 원||none
교보생명|저축보험|교보청년저축보험(무배당)|청년저축, 계약자적립액, 해약환급금|3,650,987 원||none
신한라이프생명|저축보험|신한The안심VIP저축보험Ⅲ(무배당)|VIP저축, 계약자적립액, 해약환급금|50,816,874 원||none
DB생명|저축보험|(무)e로운 DB저축보험(2404)|저축, 계약자적립액, 해약환급금|3,607,762 원||none
미래에셋생명|변액저축보험|미래에셋생명 변액저축보험 (무) 2504|변액저축, 계약자적립액, 해약환급금|3,449,473 원||none
신한라이프생명|변액저축보험|신한모으고키우는변액적립보험v2.0(무배당)|변액적립, 계약자적립액, 해약환급금|3,344,147 원||none
메트라이프생명|변액저축보험|무배당 키즈드림변액유니버셜보험|키즈드림, 변액유니버셜, 저축|3,316,426 원||none`;

type SeedRow={company:string;category:string;productName:string;mainBenefits:string;premiumMale:string;premiumFemale:string;hanwhaPriority:InsuranceProduct['hanwhaPriority']};
const parseSeed=():SeedRow[]=>rawProductSeed.trim().split('\n').slice(1).map(line=>{const [company,category,productName,mainBenefits,premiumMale,premiumFemale,hanwhaPriority]=line.split('|');return{company,category,productName,mainBenefits,premiumMale,premiumFemale,hanwhaPriority:(hanwhaPriority||'none') as InsuranceProduct['hanwhaPriority']}});
const slug=(s:string)=>s.replace(/[^가-힣a-zA-Z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
export const insuranceProducts:InsuranceProduct[]=parseSeed().map((row,index)=>{const mainBenefits=row.mainBenefits.split(',').map(x=>x.trim()).filter(Boolean);const category=classifyProduct(row.productName,row.category);const base={id:`ip-${index+1}-${slug(row.company)}-${slug(row.productName)}`,company:row.company,productName:row.productName,category,sourceKind:sourceKindFor(category),sourceFile:`${sourceKindFor(category)}_상품비교_seed.xls`,mainBenefits,premiumMale:row.premiumMale||undefined,premiumFemale:row.premiumFemale||undefined,tags:tagsFor(row.company,category,row.productName,mainBenefits),targetCustomers:targetCustomersFor(category),salesPoints:salesPointsFor(row.company,category,mainBenefits),cautionPoints:cautionPointsFor(category),isHanwha:row.company==='한화생명',hanwhaPriority:row.hanwhaPriority,scores:{} as InsuranceProduct['scores']};return{...base,scores:scoreInsuranceProduct(base)}});
export const featuredProducts=insuranceProducts.filter(p=>p.isHanwha||p.hanwhaPriority!=='none');
export const demoProducts=insuranceProducts;
const num=(v?:string)=>Number((v||'').replace(/[^0-9]/g,''))||50000;
export const products:Product[]=insuranceProducts.map(p=>({id:p.id,insurer:p.company,name:p.productName,category:p.category,summary:`${p.company} ${p.category}: ${p.mainBenefits.slice(0,3).join(', ')} 중심 상품`,monthlyPremium:num(p.premiumMale),ageRange:p.category.includes('연금')||p.category.includes('저축')?'20~70세':'20~65세',paymentPeriod:p.category.includes('저축')||p.category.includes('연금')?'5/10/20년납':'10/20/30년납',coveragePeriod:p.category.includes('정기')?'정해진 기간':p.category.includes('연금')?'연금개시 후':'80세/100세/종신',deathScore:p.scores.deathProtection,healthScore:p.scores.healthProtection,criticalScore:Math.max(p.scores.cancerProtection,p.scores.ciGiProtection),careScore:p.scores.nursingCare,pensionScore:p.scores.pension,refundScore:p.scores.refundCompetitiveness,priceScore:p.scores.premiumCompetitiveness,waiverScore:p.tags.includes('납입면제')?82:45,clarityScore:p.scores.consultingUsability,consultingScore:p.scores.consultingUsability,hanwhaStrategic:p.isHanwha,strengths:p.salesPoints,weaknesses:p.cautionPoints,recommendedFor:p.targetCustomers,talkingPoints:p.salesPoints,differentiator:p.isHanwha?'한화 상담 포인트와 전략상품 badge로 고객 니즈 연결 가능':'타사 상품 강점을 인정하고 한화생명 대안과 함께 비교 가능',sourceKind:p.sourceKind,sourceFile:p.sourceFile,premiumMale:p.premiumMale,premiumFemale:p.premiumFemale,raw:p}));
export const categories=[...new Set(products.map(p=>p.category))];export const insurers=[...new Set(products.map(p=>p.insurer))];
