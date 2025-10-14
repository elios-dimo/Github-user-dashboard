import { useState,useEffect } from 'react';


function Followers({ username }) {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;
    const fetchFollowers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}/followers`);
        if (!response.ok) {
          throw new Error('Could not load followers.');
        }
        const data = await response.json();
        setFollowers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [username]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Followers ({followers.length})</h3>
      {loading && <p className="text-center text-gray-500">Loading Followers...</p>}
      {error && <p className="text-center text-red-500">Errors: {error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {followers.map((follower) => (
          <a 
            href={follower.html_url}
            key={follower.id} 
            target="_blank" 
            className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-md hover:shadow-lg transition-shadow"
          >
            <img 
              src={follower.avatar_url} 
              alt={`${follower.login}'s avatar`}
              className="w-20 h-20 rounded-full mb-2"
            />
            <p className="text-sm font-semibold text-gray-800 break-all">{follower.login}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Followers;