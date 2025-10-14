

function Profile({ profile }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex justify-center md:justify-start">
          <img 
            src={profile.avatar_url}
            alt={`${profile.name || profile.login}'s avatar`}
            className="w-32 h-32 rounded-full border-4 border-gray-200"
          />
        </div>
        <div className="md:col-span-2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-xl text-gray-500 mb-2">@{profile.login}</p>
          {profile.bio && <p className="text-gray-700 mb-4">{profile.bio}</p>}
          {profile.location && (
            <p className="text-sm text-gray-500 mb-4">
              <span role="img" aria-label="location pin">📍</span> {profile.location}
            </p>
          )}
          <div className="flex justify-center md:justify-start gap-4 text-center">
            <div>
              <p className="text-xl font-bold text-gray-900">{profile.public_repos}</p>
              <p className="text-sm text-gray-500">Respositories</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{profile.followers}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;