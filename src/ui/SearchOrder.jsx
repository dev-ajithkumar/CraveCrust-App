import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search Order ID"
        className="w-32 rounded-full bg-yellow-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-600 focus:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:w-64 sm:text-left"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
