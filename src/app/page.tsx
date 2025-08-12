'use client';

import { useState, useEffect, useCallback } from 'react';
import { ConstructionTerm, SearchResult } from '@/types';
import { searchTerms } from '@/utils/search';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

export default function Home() {
  const [terms, setTerms] = useState<ConstructionTerm[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTerms = async () => {
      try {
        const response = await fetch('/api/terms');
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error('用語データの読み込みに失敗しました:', error);
      }
    };

    loadTerms();
  }, []);

  const handleSearch = useCallback((query: string, category: string) => {
    setCurrentQuery(query);
    setSelectedCategory(category);
    
    // 即座に検索を実行（setTimeoutを削除）
    const results = searchTerms(query, terms, category);
    setSearchResults(results);
  }, [terms]);

  return (
    <main className="min-h-screen bg-gray-50 py-8 overflow-y-scrollbar-gutter">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            積算・業界用語辞典
          </h1>
          <p className="text-gray-600">
            積算・業界の専門用語を素早く検索できます
          </p>
        </div>

        <SearchForm onSearch={handleSearch} isLoading={isLoading} terms={terms} />
        
        <SearchResults 
          results={searchResults} 
          query={currentQuery} 
          selectedCategory={selectedCategory}
        />
      </div>
    </main>
  );
}