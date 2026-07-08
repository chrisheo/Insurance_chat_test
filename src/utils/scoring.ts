import type {ProductResearch} from '../types/product';
export function researchConfidenceLabel(product:ProductResearch){
  if(product.confidenceScore>=90)return '공식출처 확인';
  if(product.confidenceScore>=75)return '공식/공시 기반';
  if(product.sourceType==='mock')return 'Mock 보완 필요';
  return '추가 검증 필요';
}
