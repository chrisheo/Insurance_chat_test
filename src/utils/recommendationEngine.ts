import {products} from '../data/products';import type {Customer} from '../types/customer';import type {Product} from '../types/product';import type {Recommendation,RecommendationView} from '../types/recommendation';
export const views:RecommendationView[]=['보장 강화','보험료 절감','가족 생계보장','건강 리스크 대비','노후준비','기존 보험 리모델링','한화생명 우선 검토'];
function has(text:string,words:string[]){return words.some(w=>text.includes(w));}
export function scoreProduct(c:Customer,p:Product,view:RecommendationView){const text=[...c.healthIssues,...c.recentEvents,...c.interests,c.family,c.memo,...c.existingPolicies].join(' ');let s=p.consultingScore*.16+p.clarityScore*.08;const onlySilson=c.existingPolicies.length===1&&c.existingPolicies[0].includes('실손');
 if(c.hasChildren||has(text,['배우자','자녀','가장']))s+=p.deathScore*((p.category==='종신보험'||p.category==='정기보험')?0.38:0.16);
 if(has(text,['건강','검진','질병','고혈압','당뇨','결절','디스크']))s+=(p.healthScore+p.criticalScore)*(p.category==='질병/건강보험'?0.24:0.11);
 if(has(text,['암','가족력']))s+=p.criticalScore*(p.category==='암보험'?0.36:0.16);
 if(has(text,['은퇴','노후','연금']))s+=p.pensionScore*((['연금보험','연금저축보험','저축보험','변액저축보험','변액연금보험'].includes(p.category)?0.36:0.14));
 if(has(text,['부모','간병','치매']))s+=p.careScore*(p.category==='간병/치매보험'?0.38:0.13);
 if(has(text,['상속','자산','증여','법인대표']))s+=p.deathScore*(p.category==='종신보험'?0.32:0.10)+p.refundScore*0.08;
 if(c.premiumSensitivity==='높음'||has(text,['보험료 부담','저렴','절감']))s+=p.priceScore*(p.category==='정기보험'?0.28:0.14);
 if(onlySilson)s+=(p.healthScore+p.criticalScore+p.deathScore)*.07;
 if(view==='보험료 절감')s+=p.priceScore*.35; if(view==='가족 생계보장')s+=p.deathScore*.33; if(view==='건강 리스크 대비')s+=(p.healthScore+p.criticalScore)*.22; if(view==='노후준비')s+=p.pensionScore*.38; if(view==='기존 보험 리모델링')s+=(p.priceScore+p.waiverScore+p.healthScore)*.13; if(view==='보장 강화')s+=(p.deathScore+p.healthScore+p.criticalScore)*.12; if(view==='한화생명 우선 검토'&&p.insurer==='한화생명')s+=5;
 return Math.min(98,Math.round(s));}
export function recommend(c:Customer,view:RecommendationView,category='전체'):Recommendation[]{return products.filter(p=>category==='전체'||p.category===category).map(p=>{const score=scoreProduct(c,p,view);const hanwhaAlt=products.find(x=>x.insurer==='한화생명'&&x.category===p.category);return {product:p,score,reason:`${c.name} 고객의 ${c.interests.slice(0,2).join(', ')} 니즈와 ${p.category}의 역할이 연결됩니다. ${view} 관점에서는 ${score}점으로 산출되었습니다.`,matching:`가족구성(${c.family}), 기존보험(${c.existingPolicies.join(', ')}), 최근 이벤트(${c.recentEvents.join(', ')})를 반영했습니다.`,emphasis:p.insurer==='한화생명'?'한화 상담 포인트: 고객 니즈와 보장 구조를 한 흐름으로 설명하고, 과도한 확정 표현 없이 약관 확인을 전제로 제안합니다.':`타사 강점도 인정하되 한화 대안으로 ${hanwhaAlt?.name||'동일 상품군 전략상품'}을 함께 비교 제시할 수 있습니다.`,objection:'보험료가 부담되거나 기존 보험과 중복되지 않을까요?',response:'기존 계약의 중복 보장과 부족 보장을 먼저 분리한 뒤 필요한 보장만 단계적으로 검토하겠습니다.'};}).sort((a,b)=>b.score-a.score).slice(0,5)}
