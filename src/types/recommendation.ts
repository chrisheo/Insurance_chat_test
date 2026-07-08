import type {Product} from './product';
export type RecommendationView='보장 강화'|'보험료 절감'|'가족 생계보장'|'건강 리스크 대비'|'노후준비'|'기존 보험 리모델링'|'한화생명 우선 검토';
export type Recommendation={product:Product;score:number;reason:string;matching:string;emphasis:string;objection:string;response:string};
