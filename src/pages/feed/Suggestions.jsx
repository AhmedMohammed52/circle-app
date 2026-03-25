import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../../services/api";
import userAvatar from "../../assets/user avatar.jpg";
import { Link } from "react-router-dom";
import SuggestionSkelton from "../../components/ui/skelton/SuggestionsSkelton";

export default function Suggestions() {
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["suggestions"],
    queryFn: () => apiServices.getSuggestions(),
  });

  if (isLoading) return <SuggestionSkelton />;

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] p-5 border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900 text-sm">
          <i className="fa-solid fa-users text-[#1877f2] mr-2"></i>
          Suggested Friends
        </h3>

        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full font-medium text-gray-600">
          {suggestions.length}
        </span>
      </div>

      <div className="space-y-3">
        {suggestions?.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-3 hover:shadow-sm transition"
          >
            <Link
              to={`/profile/${user._id}`}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <img
                src={user.photo || userAvatar}
                className="w-12 h-12 rounded-full object-cover shrink-0"
                alt={user.name}
              />

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {user.name}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 flex-wrap">
                  <span className="whitespace-nowrap">
                    {user.followersCount} followers
                  </span>

                  {user.mutualFollowersCount > 0 && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {user.mutualFollowersCount} mutual
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <button className="ml-3 shrink-0 flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition">
              <i className="fa-solid fa-user-plus text-[10px]"></i>
              Follow
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-5 text-xs font-medium text-gray-500 hover:text-gray-700 transition">
        See all suggestions
      </button>
    </div>
  );
}
