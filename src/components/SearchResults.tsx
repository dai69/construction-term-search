import { SearchResult } from '@/types';
import TermCard from '@/components/TermCard';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  selectedCategory: string;
}

export default function SearchResults({ results, query, selectedCategory }: SearchResultsProps) {
  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'all') return 'すべて';
    return categoryId; // 動的カテゴリ
  };

  if (!query && selectedCategory === 'all') {
    return (
      <div className="text-center text-gray-500 mt-8">
        積算・業界の専門用語を検索してください
      </div>
    );
  }

  if (results.length === 0) {
    const categoryName = getCategoryName(selectedCategory);
    const searchText = query ? `「${query}」` : '';
    const categoryText = selectedCategory !== 'all' ? `${categoryName}カテゴリ` : '';
    
    return (
      <div className="text-center text-gray-500 mt-8">
        {searchText && categoryText ? (
          <p>{searchText}に一致する{categoryText}の積算・業界用語が見つかりませんでした</p>
        ) : searchText ? (
          <p>{searchText}に一致する積算・業界用語が見つかりませんでした</p>
        ) : (
                      <p>{categoryText}の積算・業界用語が見つかりませんでした</p>
        )}
      </div>
    );
  }

  const categoryName = getCategoryName(selectedCategory);
  const searchText = query ? `「${query}」` : '';
  const categoryText = selectedCategory !== 'all' ? `${categoryName}カテゴリ` : '';

  return (
    <div className="mt-8 space-y-4 overflow-y-scrollbar-gutter">
      <div className="text-sm text-gray-600">
        {searchText && categoryText ? (
          <p>{searchText}に一致する{categoryText}の積算・業界用語が{results.length}件見つかりました</p>
        ) : searchText ? (
                      <p>{searchText}に一致する積算・業界用語が{results.length}件見つかりました</p>
        ) : (
                      <p>{categoryText}の積算・業界用語が{results.length}件見つかりました</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <TermCard key={result.term.id} result={result} />
        ))}
      </div>
    </div>
  );
}
