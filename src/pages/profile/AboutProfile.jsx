export default function AboutProfile({ user }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-20">
      <div className="bg-white rounded-[30px] p-6 shadow-sm border border-slate-100">
        <h3 className="text-slate-800 font-black text-lg mb-6 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
          About
        </h3>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <i className="fa-regular fa-envelope text-lg"></i>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </p>
              <p className="text-slate-700 font-semibold">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500">
              <i className="fa-solid fa-venus-mars text-lg"></i>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Gender
              </p>
              <p className="text-slate-700 font-semibold capitalize">
                {user?.gender || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              <i className="fa-solid fa-cake-candles text-lg"></i>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Birthday
              </p>

              <p className="text-slate-700 font-semibold">
                {formatDate(user?.dateOfBirth)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <i className="fa-regular fa-calendar-check text-lg"></i>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Joined Circle
              </p>

              <p className="text-slate-700 font-semibold">
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
