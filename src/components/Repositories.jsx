import React from 'react'
import { useState,useEffect } from 'react';

function Repositories({ username }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (!username) return;
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
          throw new Error('Could not fetch repositories');
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);
    const sortedRepos = [...repos].sort((a, b) => {
      if (newSortOrder === 'desc') {
        return b.stargazers_count - a.stargazers_count;
      } else {
        return a.stargazers_count - b.stargazers_count;
      }
    });
    setRepos(sortedRepos);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Repositories ({repos.length})</h3>
        <button
          onClick={toggleSortOrder}
          className="px-3 py-1 text-sm font-semibold text-white bg-gray-500 rounded-full hover:bg-gray-600 focus:outline-none cursor-pointer"
        >
          Sort by Stars ({sortOrder === 'desc' ? 'Desceding' : 'Ascending'})
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading Repositories...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      <ul className="space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <a href={repo.html_url} target="_blank"  className="text-lg font-semibold text-blue-600 hover:underline">
                  {repo.name}
                </a>
                {repo.description && <p className="text-sm text-gray-600 mt-1">{repo.description}</p>}
              </div>
              <div className="flex-shrink-0 ml-4">
                <p className="text-sm font-medium text-gray-800">
                  <span role="img" >⭐</span> {repo.stargazers_count}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Repositories;