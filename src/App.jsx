import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { HashRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <HeroUIProvider>
          <ToastProvider />
          <HashRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Feed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="profile/:userId"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="posts/:postId"
                  element={
                    <ProtectedRoute>
                      <PostDetails />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Route>

              <Route element={<AuthLayout />}>
                <Route
                  path="auth"
                  element={
                    <ProtectAuthRoute>
                      <AuthPage />
                    </ProtectAuthRoute>
                  }
                />
                <Route
                  path="signin"
                  element={
                    <ProtectAuthRoute>
                      <AuthPage />
                    </ProtectAuthRoute>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <ProtectAuthRoute>
                      <AuthPage />
                    </ProtectAuthRoute>
                  }
                />
              </Route>
            </Routes>
          </HashRouter>
        </HeroUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
