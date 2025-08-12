import { SearchResult } from '@/types';

interface TermCardProps {
  result: SearchResult;
}

export default function TermCard({ result }: TermCardProps) {
  const { term, matchType } = result;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-900">{term.term}</h3>
        {matchType === 'exact' && (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
            完全一致
          </span>
        )}
      </div>
      <p className="text-gray-600 mb-2">{term.reading}</p>
      <p className="text-gray-800 mb-3">{term.definition}</p>
      <div className="text-sm text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded">{term.category}</span>
      </div>
    </div>
  );
}
