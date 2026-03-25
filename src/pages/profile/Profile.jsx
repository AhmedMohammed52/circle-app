import { useQuery } from "@tanstack/react-query";
import { apiServices } from "../../services/api";
import ProfileSkeleton from "../../components/ui/skelton/ProfileSkelton";
import ProfileHeader from "./ProfileHeader";
import AboutProfile from "./AboutProfile";
import MainProfileSection from "./MainProfileSection";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../contexts/authContext";

export default function Profile() {
  const { userId } = useParams();
  const { userData: loggedUser } = useContext(authContext);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => apiServices.getUserProfile(userId),
    select: (res) => res.data.user,
  });

  const { data: myPosts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["myPosts", userId],
    queryFn: () => apiServices.getUserPosts(userId),
  });

  const isMyProfile = String(loggedUser?._id) === String(userId);

  if (userLoading || postsLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="bg-[#F0F2F5] min-h-screen mt-20 pb-20 font-sans">
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-6">
        <section className="mb-8 w-full">
          <ProfileHeader
            user={user}
            myPosts={myPosts}
            isMyProfile={isMyProfile}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          <aside className="lg:col-span-4 lg:sticky lg:top-28 h-fit space-y-6">
            <AboutProfile user={user} isMyProfile={isMyProfile} />
          </aside>

          <main className="lg:col-span-8 space-y-6">
            <MainProfileSection
              myPosts={myPosts}
              isMyProfile={isMyProfile}
              user={user}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
