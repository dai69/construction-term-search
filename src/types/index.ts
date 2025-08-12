export interface ConstructionTerm {
  id: string;
  term: string;
  reading: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
  sourceUrl?: string; // 取得元URL（Being社の該当行ページ）
}

export interface SearchResult {
  term: ConstructionTerm;
  matchType: 'exact' | 'partial';
  relevance: number;
}
