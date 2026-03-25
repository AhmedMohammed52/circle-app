import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";

export default function Navbar() {
  const { userToken, setUserToken, userData, setUserData } =
    useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUserToken(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <HeroUiNavbar
      maxWidth="xl"
      className="bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 fixed top-0 inset-x-0 z-100"
    >
      <NavbarBrand>
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <p className="font-bold text-2xl tracking-tighter text-slate-800">
            Circle
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        {userToken && (
          <Dropdown
            placement="bottom-end"
            className="rounded-3xl shadow-2xl border border-slate-50 p-2"
          >
            <DropdownTrigger>
              <div className="flex items-center gap-3 cursor-pointer bg-slate-50 hover:bg-slate-100 px-4 py-2 rounded-full border border-slate-100 transition-all duration-300 group">
                <Avatar
                  size="sm"
                  src={userData?.photo}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />

                <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
                  <span className="text-sm font-bold text-slate-700">
                    {userData?.name || "User"}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                    Developer
                  </span>
                </div>

                <i className="fa-solid fa-bars text-slate-400 group-hover:text-slate-600 transition-colors ml-1 text-xs"></i>
              </div>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              itemClasses={{
                base: "rounded-xl py-3 px-4 gap-3",
              }}
            >
              <DropdownItem
                key="profile-info"
                className="h-14 gap-2 opacity-100 pointer-events-none mb-1"
              >
                <p className="font-semibold text-slate-400 text-xs">
                  Signed in as
                </p>
                <p className="font-bold text-slate-900">
                  {userData?.email || "user@example.com"}
                </p>
              </DropdownItem>

              <DropdownItem
                key="profile"
                startContent={
                  <i className="fa-regular fa-user text-slate-500"></i>
                }
                className="hover:bg-slate-50!"
              >
                <Link
                  to={`/profile/${userData?._id}`}
                  className="w-full h-full block text-slate-700 font-medium"
                >
                  My Profile
                </Link>
              </DropdownItem>

              {/* فاصل شيك */}
              <DropdownItem
                key="divider"
                className="p-0 h-px bg-slate-100 my-1 pointer-events-none"
              ></DropdownItem>

              <DropdownItem
                key="logout"
                onPress={logout}
                startContent={
                  <i className="fa-solid fa-arrow-right-from-bracket text-red-400"></i>
                }
                className="hover:bg-red-50!"
              >
                <span className="text-red-500 font-bold">Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </HeroUiNavbar>
  );
}
