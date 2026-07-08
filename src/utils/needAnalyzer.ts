import type {Customer,NeedScore} from '../types/customer';
export function analyzeNeeds(c:Customer):NeedScore[]{const t=[...c.interests,...c.healthIssues,...c.recentEvents,c.family,c.memo].join(' ');const child=c.hasChildren||t.includes('자녀');const health=/건강|검진|질병|암|고혈압|당뇨|결절/.test(t);const old=/은퇴|노후|연금/.test(t);const care=/부모|간병|치매/.test(t);const save=/저축|목돈/.test(t);const burden=c.premiumSensitivity==='높음'||/부담|절감|리모델링/.test(t);return[
{key:'death',label:'사망보장 필요도',score:child?88:45,description:child?'배우자/자녀 생계보장 니즈가 높습니다.':'부양가족이 적어 기본 보장 중심 검토가 적합합니다.'},
{key:'health',label:'건강보장 필요도',score:health?90:62,description:health?'건강 이슈 또는 검진 이벤트가 있어 건강보장 보완 상담이 적합합니다.':'기본 의료비 보장 점검이 필요합니다.'},
{key:'critical',label:'암/뇌/심장 보장 필요도',score:health?88:58,description:'3대 질병 진단비와 납입면제 구조를 함께 비교합니다.'},
{key:'care',label:'간병/치매 보장 필요도',score:care?91:c.age>50?75:38,description:'부모 부양·연령 요인을 고려해 장기 간병 리스크를 점검합니다.'},
{key:'pension',label:'노후/연금 필요도',score:old||c.age>50?90:52,description:'은퇴 이후 현금흐름과 연금전환 가능성을 비교합니다.'},
{key:'saving',label:'저축성/목돈마련 필요도',score:save?84:45,description:'목돈 마련 관심도에 따라 저축/연금 상품군을 검토합니다.'},
{key:'price',label:'보험료 절감 필요도',score:burden?92:50,description:'현재 보험료 부담과 보장 중복 여부를 확인합니다.'},
{key:'remodel',label:'리모델링 필요도',score:c.existingPolicies.length>2||burden?86:54,description:'기존 가입 보험과 부족 보장을 기준으로 리모델링 여지를 산출합니다.'}];}
export function analyzeNaturalLanguage(input:string){const needs=[]; if(/자녀|배우자|가장/.test(input))needs.push('사망보장/가족보장'); if(/암|뇌|심장|건강검진|질병|이상/.test(input))needs.push('건강보험/암보험/3대 질병'); if(/은퇴|노후|연금/.test(input))needs.push('연금보험/종신보험 연금전환'); if(/보험료|저렴|부담/.test(input))needs.push('보험료 경쟁력/리모델링'); if(/부모|간병|치매/.test(input))needs.push('간병보험/치매보험'); if(/목돈|저축/.test(input))needs.push('저축보험/연금보험'); return needs.length?needs:['기본 보장 점검'];}
