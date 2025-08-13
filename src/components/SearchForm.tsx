'use client';

import { useState, useMemo } from 'react';
import { ConstructionTerm } from '@/types';
import { getAvailableCategories } from '@/utils/search';

interface SearchFormProps {
  onSearch: (query: string, category: string) => void;
  isLoading?: boolean;
  terms: ConstructionTerm[]; // 用語データを渡す
}

export default function SearchForm({ onSearch, isLoading = false, terms }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // useMemoを使用してカテゴリ計算を最適化
  const availableCategories = useMemo(() => {
    if (terms.length > 0) {
      return getAvailableCategories(terms);
    }
    return [];
  }, [terms]);

  // インクリメンタルサーチの実装
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // 入力が変更されるたびに即座に検索を実行
    onSearch(newQuery.trim(), selectedCategory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信時も検索を実行（既存の動作を維持）
    if (query.trim() || selectedCategory !== 'all') {
      onSearch(query.trim(), selectedCategory);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (query.trim() || selectedCategory !== 'all')) {
      onSearch(query.trim(), selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // カテゴリ変更時も即座に検索を実行
    onSearch(query.trim(), category);
  };

  const handleClearQuery = () => {
    setQuery('');
    // クリア時も検索を実行（空のクエリで）
    onSearch('', selectedCategory);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          {/* 検索アイコン */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              className="h-6 w-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>

          {/* 検索入力フィールド */}
                         <input
                 type="text"
                 value={query}
                 onChange={handleQueryChange}
                 onKeyPress={handleKeyPress}
                 placeholder="用語を入力（例：積算、単価）"
                 className="w-full pl-10 pr-12 py-3 text-base sm:text-lg text-gray-900 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md placeholder-gray-500"
                 disabled={isLoading}
               />

          {/* クリアボタン（入力がある場合のみ表示） */}
          {query && (
            <button
              type="button"
              onClick={handleClearQuery}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
              disabled={isLoading}
              aria-label="検索をクリア"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* カテゴリ選択 */}
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {availableCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
                disabled={isLoading}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 検索ヒント */}
        <div className="mt-3 text-sm text-gray-500 text-center">
          <span className="bg-gray-100 px-2 py-1 rounded-md mr-2">部分一致</span>
          <span className="bg-gray-100 px-2 py-1 rounded-md mr-2">完全一致</span>
          <span className="bg-gray-100 px-2 py-1 rounded-md">カテゴリ別</span>
          <span className="bg-blue-100 px-2 py-1 rounded-md text-blue-700">リアルタイム検索</span>
        </div>
      </form>

      {/* 人気検索キーワード */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-2 text-center">よく検索される積算・業界用語:</p>
                     <div className="flex flex-wrap justify-center gap-2">
               {['積算', '単価', '歩掛', '内訳書', '工事費'].map((keyword) => (
                 <button
                   key={keyword}
                   onClick={() => onSearch(keyword, selectedCategory)}
                   disabled={isLoading}
                   className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                 >
                   {keyword}
                 </button>
               ))}
             </div>
      </div>
    </div>
  );
}