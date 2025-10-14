import React from 'react'
import { useState,useEffect } from 'react';
import Profile from './components/Profile';
import Repositories from './components/Repositories';
import Followers from './components/Followers';

function App() {
  //  Δήλωση States 
  const [username, setUsername] = useState('');
  const [searchTerm, setSearchTerm] = useState('taylorotwell');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('profile');

  //  useEffect για την κλήση του API όταν αλλάζει το `username`
  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      setProfile(null);
      setView('profile');

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setProfile(data);
          console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);



  //  useEffect για την αρχική φόρτωση της σελίδας 
  useEffect(() => {
    setUsername(searchTerm);
  }, []);

  // Φόρμα αναζήτησης χρήστη
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setUsername(searchTerm);
    }
  };

  //  Βοηθητική Συνάρτηση για το Στυλ των Κουμπιών 
  const getButtonClass = (buttonView) => {
    return view === buttonView
      ? 'bg-blue-600 text-white '
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer';
  };

  //  Η δομή της σελίδας που θα εμφανιστεί 
  return (
    <div className="min-h-screen bg-gray-100  p-4">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        <header className="bg-white p-6 rounded-lg shadow-md text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">GitHub Dashboard</h1>
          <form onSubmit={handleSubmit} className="flex justify-center gap-2 mt-4">
            <input
              type="text"
              placeholder="GitHub use search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-6 py-2 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none  cursor-pointer">
              Search
            </button>
          </form>
        </header>
        
        <main>
          {loading && <p className="text-center text-gray-500 py-10 text-lg">Loading...</p>}
          {error && <p className="text-center text-red-500 py-10 text-lg">Error: {error}</p>}
          
          {profile && (
            <>
              <nav className="flex justify-center gap-2 mb-6">
                <button onClick={() => setView('profile')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getButtonClass('profile')}`}>
                  Profile
                </button>
                <button onClick={() => setView('repos')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getButtonClass('repos')}`}>
                  Repositories
                </button>
                <button onClick={() => setView('followers')} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${getButtonClass('followers')}`}>
                  Followers
                </button>
              </nav>

              {/* Εμφάνιση του κατάλληλου component ανάλογα με το state 'view' */}
              {view === 'profile' && <Profile profile={profile} />}
              {view === 'repos' && <Repositories username={profile.login} />}
              {view === 'followers' && <Followers username={profile.login} />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
