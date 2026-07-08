import type {InsuranceCategory} from '../types/product';
export const productCategories:{id:string;name:InsuranceCategory|'변액보험';description:string}[]=[
{id:'whole-life',name:'종신보험',description:'평생 사망보장 및 상속/가족보장 중심'},
{id:'term-life',name:'정기보험',description:'특정 기간 사망보장 중심'},
{id:'health',name:'질병/건강보험',description:'뇌·심장·질병·수술·입원 보장 중심'},
{id:'cancer',name:'암보험',description:'암진단·암수술·항암치료 보장 중심'},
{id:'ci-gi',name:'CI/GI보험',description:'중대한 질병 진단 시 선지급 또는 라이프케어 구조'},
{id:'nursing',name:'간병/치매보험',description:'치매·간병·장기요양 리스크 대비'},
{id:'accident',name:'상해보험',description:'재해·교통·골절·레저 사고 보장'},
{id:'child',name:'어린이보험',description:'자녀·태아·어린이 보장'},
{id:'dental',name:'치아보험',description:'치아 치료비 보장'},
{id:'pension',name:'연금보험',description:'노후 연금 수령 목적'},
{id:'pension-savings',name:'연금저축보험',description:'세액공제와 노후준비 목적'},
{id:'savings',name:'저축보험',description:'목돈마련과 장기저축 목적'},
{id:'variable',name:'변액보험',description:'투자실적에 따라 적립금 변동 가능'}];
