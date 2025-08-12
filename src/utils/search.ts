import { ConstructionTerm, SearchResult, Category } from '@/types';

export function searchTerms(
  query: string,
  terms: ConstructionTerm[],
  selectedCategory: string = 'all'
): SearchResult[] {
  if (!query.trim() && selectedCategory === 'all') return [];

  let filteredTerms = terms;

  // カテゴリフィルター適用（動的カテゴリ: 用語データの category をそのまま ID として扱う）
  if (selectedCategory !== 'all') {
    // selectedCategory は category 名（例: "あ行"）を想定
    filteredTerms = terms.filter(term => term.category === selectedCategory);
  }

  // 検索クエリがない場合は、カテゴリフィルターのみ適用
  if (!query.trim()) {
    return filteredTerms.map(term => ({
      term,
      matchType: 'partial' as const,
      relevance: 0
    }));
  }

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  filteredTerms.forEach(term => {
    const normalizedTerm = term.term.toLowerCase();
    const normalizedReading = term.reading.toLowerCase();
    const normalizedDefinition = term.definition.toLowerCase();

    // 完全一致
    if (normalizedTerm === normalizedQuery || normalizedReading === normalizedQuery) {
      results.push({
        term,
        matchType: 'exact',
        relevance: 100
      });
      return;
    }

    // 部分一致
    let relevance = 0;
    if (normalizedTerm.includes(normalizedQuery)) relevance += 50;
    if (normalizedReading.includes(normalizedQuery)) relevance += 30;
    if (normalizedDefinition.includes(normalizedQuery)) relevance += 20;

    if (relevance > 0) {
      results.push({
        term,
        matchType: 'partial',
        relevance
      });
    }
  });

  return results.sort((a, b) => b.relevance - a.relevance);
}

export function getCategoryTerms(terms: ConstructionTerm[], categoryId: string): ConstructionTerm[] {
  if (categoryId === 'all') return terms;

  // categoryId は category 名（例: "あ行"）を想定
  return terms.filter(term => term.category === categoryId);
}

// 実際に存在するカテゴリを取得する関数
export function getAvailableCategories(terms: ConstructionTerm[]): Category[] {
  const categoryCounts: { [key: string]: number } = {};
  terms.forEach(term => {
    categoryCounts[term.category] = (categoryCounts[term.category] || 0) + 1;
  });

  const categories: Category[] = [{ id: 'all', name: 'すべて', description: '全積算・業界用語' }];
  Object.entries(categoryCounts).forEach(([categoryName, count]) => {
    categories.push({
      id: categoryName, // ID はカテゴリ名をそのまま使用
      name: `${categoryName} (${count})`,
      description: `${categoryName} の積算・業界用語`
    });
  });

  return categories;
}
