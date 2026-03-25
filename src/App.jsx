import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./pages/feed/Feed";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/profile/Profile";
import PostDetails from "./pages/PostDetails";
import NotFound from "./pages/NotFound";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import ProtectAuthRoute from "./protectedRoutes/ProtectAuthRoute";
import AuthContextProvider from "./contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:userId",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "posts/:postId",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "auth",
        element: (
          <ProtectAuthRoute>
            <AuthPage />
          </ProtectAuthRoute>
        ),
      },
      {
        path: "signin",
        element: (
          <ProtectAuthRoute>
            <AuthPage />
          </ProtectAuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <ProtectAuthRoute>
            <AuthPage />
          </ProtectAuthRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <HeroUIProvider>
            <ToastProvider />
            <RouterProvider router={router} />
          </HeroUIProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
